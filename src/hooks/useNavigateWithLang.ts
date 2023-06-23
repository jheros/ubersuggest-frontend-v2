import { useNavigate } from 'react-router-dom'

import { pathWithLang } from 'utils/route'

export const useNavigateWithLang = () => {
  const navigate = useNavigate()
  const navigateWithLang = (path: string) => {
    navigate(pathWithLang(path))
  }

  return navigateWithLang
}
