import queryString from 'query-string'

export const API_BASE_URL = process.env.REACT_APP_API_URL || '/api'
export const UBS_AUTH_URL = 'ubs_auth'

export const getGoogleSignInURL = (options: object = {}): string => {
  return `${API_BASE_URL}/google_auth?${queryString.stringify(options)}`
}

export const composeOauthUrl = (path: string, language: string, queries = '') => {
  const beAuthUrl = `${process.env.REACT_APP_API_URL}/${UBS_AUTH_URL}`
  const feAuthUrl = `${process.env.REACT_APP_UBS_OAUTH_URL}/${language}/${path}`
  return `${beAuthUrl}?fe_url=${feAuthUrl}?from=ubersuggest&next=${window.location.href}?${queries}`
}
