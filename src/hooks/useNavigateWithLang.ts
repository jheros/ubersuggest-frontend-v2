import { NavigateOptions, useNavigate } from 'react-router-dom'

import { pathWithLang } from 'utils/route'

export const useNavigateWithLang = () => {
  const navigate = useNavigate()
  const navigateWithLang = (path: string, options?: NavigateOptions) => {
    navigate(pathWithLang(path.startsWith('/') ? path : `/${path}`), options)
  }

  return navigateWithLang
}
