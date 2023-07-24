import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import i18next from 'i18next'

export const ERR_UNKNOWN_ERROR = 'unknown_error'
export const ERR_WRONG_COUPON = 'wrong_coupon'
export const ERR_USER_NOT_CONFIRMED = 'user_not_confirmed'

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string'
}

export function getErrorMessage(error: unknown) {
  if (isFetchBaseQueryError(error)) {
    const data = error.data as any
    if (typeof data?.description === 'object') {
      return data?.description?.error || i18next.t(ERR_UNKNOWN_ERROR)
    } else {
      return data?.description || i18next.t(ERR_UNKNOWN_ERROR)
    }
  } else if (isErrorWithMessage(error)) {
    return i18next.t(ERR_UNKNOWN_ERROR)
  }
}
