import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { TOKEN, TOKEN_TTL } from 'utils/constants/local-storage';
import { GET_TOKEN_URL, USER_URL } from './constants';
import { retryCondition } from './utils';

type GetTokenResponse = {
  token: string;
  ttl: string;
};

function saveToken(data: GetTokenResponse): void {
  localStorage.setItem(TOKEN, data.token);
  localStorage.setItem(TOKEN_TTL, data.ttl);
}

export function saveUser(data: string): void {
  localStorage.setItem(USER_URL, data);
  const userEvent = new CustomEvent('custom-event-user', {
    bubbles: true,
    detail: data,
  });
  document.dispatchEvent(userEvent);
}

export function removeUser(): void {
  localStorage.removeItem(USER_URL);
  const userEvent = new CustomEvent('custom-event-user', {
    bubbles: true,
    detail: null,
  });
  document.dispatchEvent(userEvent);
}

function clearToken(): void {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(TOKEN_TTL);
}

const mutex = new Mutex();

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem(TOKEN);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include',
  }),
  { retryCondition },
);

const userQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL}/`,
  prepareHeaders: (headers: Headers) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result: any = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const tokenResult: any = await baseQuery(GET_TOKEN_URL, api, extraOptions);
        if (tokenResult.data) {
          saveToken(tokenResult.data);
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          clearToken();
          removeUser();
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  if (!localStorage.getItem(USER_URL) && localStorage.getItem(TOKEN)) {
    await mutex.waitForUnlock();
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const userResult: any = await userQuery(USER_URL, api, extraOptions);
        saveUser(userResult?.data?.tier || 'unlogged');
      } finally {
        release();
      }
    } else {
      const release = await mutex.acquire();
      release();
    }
  }

  return result;
};

export const ubersuggestApi = createApi({
  reducerPath: 'ai-writer/api',
  baseQuery: baseQueryWithReauth,
  // refetchOnFocus: true,
  endpoints: () => ({}),
});
