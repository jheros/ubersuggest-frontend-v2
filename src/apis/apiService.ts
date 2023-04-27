import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getCurrentTimestamp, getTokenTTL } from 'src/apis';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// config.headers['ts'] = getCurrentTimestamp();
// if (config._skipAuth) {
//   return Promise.resolve(config);
// } else {
//   return getToken().then((token) => {
//     config.headers['Authorization'] = `Bearer ${token}`;
//     return config;
//   });
// }

export const apiService = createApi({
  reducerPath: 'public',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const currentTimestamp = getCurrentTimestamp();
      headers.set('ts', currentTimestamp);
      if (headers.get('_skipAuth')) {
        return headers;
      }

      const token = await getToken();
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const apiWithTags = apiService.enhanceEndpoints({
  addTagTypes: [
    'PublicAuction',
    'BannerAuctions',
    'FeaturedAuctions',
    'AuctionItem',
    'SearchItems',
    'Home',
    'UserAccount',
    'UserDashboard',
    'UserWatchList',
    'UserAuctions',
    'AuctionBidder',
    'UserBidActivity',
    'UserInvoices',
  ],
});
