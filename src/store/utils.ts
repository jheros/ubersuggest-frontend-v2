import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { t } from 'i18next'
import { IRootState } from 'store'

import { authApi } from './api'
import { SHORT_POLLING_ATTEMPT_INTERVAL, SHORT_POLLING_FIRST_ATTEMPT_DELAY } from './consts'
import { showLoginLimitModal } from './reducers/modal'
import { IApiError } from './types'

const mutex = new Mutex()

export const retryCondition = (error: FetchBaseQueryError, _: any, extraArgs: any) => {
  if (error && 'data' in error) {
    const errorData = error.data as IApiError
    if (error.status === 504 && errorData.error === 'PROCESSING_IN_PROGRESS') {
      const maxRetries = extraArgs.extraOptions?.maxRetries || 0
      return extraArgs.attempt <= maxRetries
    }
  }
  return false
}

export const getShortPollingBackoff: any = ({
  firstAttemptDelay = SHORT_POLLING_FIRST_ATTEMPT_DELAY,
  attemptInterval = SHORT_POLLING_ATTEMPT_INTERVAL,
}) => {
  return async function backoff(attempt = 0) {
    const timeout = 1000 * (attempt === 1 ? firstAttemptDelay : attemptInterval)
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout((res) => resolve(res), timeout))
  }
}

export const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as IRootState).auth.userToken?.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  { retryCondition },
)

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  console.log('______________', result)
  if (result.error) {
    const status = result.error.status
    const error = (result.error.data as any)?.error
    const errorCode = (result.error.data as any)?.code
    const response = result.meta?.response
    const weight = response?.headers?.get('x-ratelimit-requestcost') || 100
    const resetTime = response?.headers?.get('x-ratelimit-reset') || Math.floor(Date.now() / 1000)
    const remaining = response?.headers?.get('x-ratelimit-remaining') || 0

    const isBearerTokenExpired = status === 429 && error === 'TOO_MANY_REQUEST'
    const isReportLimitReached = status === 403 && error === 'REPORT_LIMIT_REACHED'
    const isVisualizationReportLimitReached = status === 403 && !!response?.url?.split('?')?.[1]?.includes('labs')
    const isKeywordMetricLimitReached =
      status === 403 && error === 'REPORT_LIMIT_REACHED' && errorCode === 'monthly_keyword_metrics_updates'
    const isBearerTokenInvalid = status === 401 && error === 'INVALID_TOKEN'
    const isInvalidUserSession = status === 401 && error === 'INVALID_USER_SESSION'

    if (isBearerTokenExpired) {
      if (resetTime > Math.floor(Date.now() / 1000)) {
        if (remaining === 0 || remaining < weight) {
          // todo: create limit reached alert modal and state
          // sendMessage('LIMIT_REACHED')
        }
      }
      // checking whether the mutex is locked
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()
        try {
          const recaptchaToken = (api.getState() as IRootState).recaptcha.token as string
          await api.dispatch(authApi.endpoints.getToken.initiate(recaptchaToken)).unwrap()
          result = await baseQuery(args, api, extraOptions)
        } finally {
          // release must be called once the mutex should be released again.
          release()
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }
    } else if (isVisualizationReportLimitReached) {
      // todo: create visualization limit reached alert modal
      // sendMessage('VISUALIZATION_LIMIT_REACHED')
    } else if (isKeywordMetricLimitReached) {
      // todo: create keyword metrics update limit reached modal
      // sendMessage('KEYWORD_METRICS_UPDATE_LIMIT_REACHED')
    } else if (isReportLimitReached) {
      // todo: create limit reached alert modal
      // sendMessage('LIMIT_REACHED')
    } else if (isBearerTokenInvalid) {
      // checking whether the mutex is locked
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()
        try {
          const recaptchaToken = (api.getState() as IRootState).recaptcha.token as string
          await api.dispatch(authApi.endpoints.getToken.initiate(recaptchaToken)).unwrap()
          result = await baseQuery(args, api, extraOptions)
        } finally {
          // release must be called once the mutex should be released again.
          release()
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }
    } else if (isInvalidUserSession) {
      api.dispatch(
        showLoginLimitModal({
          type: 'SIGN_OUT_WARNING',
          title: t('signed_out_warning'),
          message: t('signed_out_warning_text'),
        }),
      )
      return new Promise((resolve) => resolve({ data: {}, meta: result.meta }))
    }
  }
  return result
}

export const normalize = (arr: Array<any>, { idAttribute = 'id' } = {}) => {
  return arr.reduce((normalized, item) => {
    normalized[item[idAttribute]] = item
    return normalized
  }, {})
}
