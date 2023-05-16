export const UBS_AUTH_URL = 'ubs_auth'

export const composeOauthUrl = (path: string, language: string, queries = '') => {
  const beAuthUrl = `${process.env.REACT_APP_API_URL}/${UBS_AUTH_URL}`
  const feAuthUrl = `${process.env.REACT_APP_UBS_OAUTH_URL}/${language}/${path}`
  return `${beAuthUrl}?fe_url=${feAuthUrl}?from=ubersuggest&next=${window.location.href}?${queries}`
}
