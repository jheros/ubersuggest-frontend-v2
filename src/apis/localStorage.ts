import moment from 'moment';

import { TIMESTAMP_LIFETIME } from 'src/constants';

export const getTokenTTL = () => localStorage.getItem('token_ttl');

export const hasCurrentTimestamp = () => localStorage.getItem('current_timestamp') !== null;

export const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('token_ttl');
};

export const getCurrentTimestamp = () => {
  const currentTimestamp = moment().utc().unix();

  if (hasCurrentTimestamp()) {
    const reportData = JSON.parse(localStorage.getItem('current_timestamp')!);

    if (currentTimestamp - reportData.ts > TIMESTAMP_LIFETIME) {
      reportData.ts = currentTimestamp;
      localStorage.setItem('current_timestamp', JSON.stringify(reportData));
    }

    return reportData.ts;
  } else {
    localStorage.setItem('current_timestamp', JSON.stringify({ ts: currentTimestamp }));
  }

  return currentTimestamp;
};

const getToken = (forceRefresh = false) => {
  let token = window.localStorage.getItem('token');
  if (forceRefresh) {
    clearToken();
    window.localStorage.removeItem('token_ttl');
    token = null;
    getTokenPromise = null;
  }
  if (!token) {
    if (!getTokenPromise) {
      getTokenPromise = getTokenAPI();
      console.debug('resetting getTokenPromise');
    }
    return getTokenPromise
      .then((response) => {
        token = response.data.token;
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('token_ttl', response.data.ttl);
        getTokenPromise = null;

        setDailyReportInfo(response.data);

        return token;
      })
      .catch((error) => {
        const previousTokenError =
          error.response &&
          error.response.status === 403 &&
          error.response.data &&
          error.response.data.error === 'FORBIDDEN' &&
          error.response.data.description.startsWith('The token');
        const invalidRecaptchaError =
          error.response &&
          error.response.status === 401 &&
          error.response.data &&
          error.response.data.error === 'INVALID_TOKEN' &&
          error.response.data.description.startsWith('Invalid recaptcha token.');
        const missingRecaptchaError =
          error.response &&
          error.response.status === 400 &&
          error.response.data &&
          error.response.data.error === 'BAD_REQUEST' &&
          error.response.data.description.startsWith("Missing 'recaptchaToken' parameter");

        if (previousTokenError) {
          token = error.response.data.description.split(' ')[2];
          window.localStorage.setItem('token', token);
          return token;
        }

        if (invalidRecaptchaError || missingRecaptchaError) {
          console.debug('get token - invalid recaptcha');
          // call getToken again after 1 sec

          return new Promise((resolve) => {
            delay(() => {
              recaptchaTokenValut.reset();
              resolve(getToken(true));
            }, 1000);
          });
        }

        getTokenPromise = null;
        if (error.response && error.response.status === 401) {
          signOut(`/${getLanguageCode()}/login?next=${window.location.href}`);
          return;
        }
        console.debug('get token error', error);
      });
  }
  return Promise.resolve(token);
};
