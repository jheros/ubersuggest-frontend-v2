import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { IApiError } from './types';
import { SHORT_POLLING_ATTEMPT_INTERVAL, SHORT_POLLING_FIRST_ATTEMPT_DELAY } from './constants';

export const retryCondition = (error: FetchBaseQueryError, _: any, extraArgs: any) => {
  if (error && 'data' in error) {
    const errorData = error.data as IApiError;
    if (error.status === 504 && errorData.error === 'PROCESSING_IN_PROGRESS') {
      const maxRetries = extraArgs.extraOptions?.maxRetries || 0;
      return extraArgs.attempt <= maxRetries;
    }
  }
  return false;
};

export const getShortPollingBackoff: any = ({
  firstAttemptDelay = SHORT_POLLING_FIRST_ATTEMPT_DELAY,
  attemptInterval = SHORT_POLLING_ATTEMPT_INTERVAL,
}) => {
  return async function backoff(attempt = 0) {
    const timeout = 1000 * (attempt === 1 ? firstAttemptDelay : attemptInterval);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout((res) => resolve(res), timeout));
  };
};
