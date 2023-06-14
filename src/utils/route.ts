import { getLanguageCode } from './translation'

export const pathWithLang = (path: string) => {
  const languageCode = getLanguageCode()
  if (path.startsWith(`/${languageCode}/`) || path.startsWith(`${languageCode}/`)) {
    return path
  }
  return `/${languageCode}${path.startsWith('/') ? path : `/${path}`}`
}
