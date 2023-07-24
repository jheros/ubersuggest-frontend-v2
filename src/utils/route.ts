import { reduce } from 'lodash'
import { ROUTES } from 'routes'

import { getLanguageCode } from './translation'

export const pathWithLang = (path: string) => {
  const languageCode = getLanguageCode()
  const { pathname } = window.location
  
  if (path.startsWith(`/${languageCode}/`) || path.startsWith(`${languageCode}/`)) {
    return path
  } else if (pathname.match(/^(\/en|\/pt|\/de|\/es|\/it|\/fr|\/nl|\/ja|\/zh)\/(.+)/gi)) {
    return `/${languageCode}${path.startsWith('/') ? path : `/${path}`}`
  } else {
    return path
  }
}

export const getUrlFromRoutes = (path: string) => {
  const keys = path.split('.')
  return reduce(
    keys,
    ({ route, url }: { route: any; url: string }, key) => ({
      route: route[key],
      url: url + '/' + (route[key]?.MAIN || route[key]),
    }),
    { route: ROUTES, url: '' },
  ).url
}
