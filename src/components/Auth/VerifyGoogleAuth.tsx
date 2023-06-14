import { useSelector } from 'react-redux'

import { IRootState } from 'store'
import { useLazyGetTokenQuery } from 'store/api'
import { useNavigateWithLang } from 'hooks'
import { useEffect } from 'react'
import { useRecaptchaContext } from 'contexts'

interface IVerifyGoogleAuth {
  redirectUrl: string
  onLoad: () => void
  onSuccess: () => void
  onError: (err: Error) => void
}

export const VerifyGoogleAuth = ({ redirectUrl, onLoad, onSuccess, onError }: IVerifyGoogleAuth) => {
  const { token, isLoaded } = useSelector((state: IRootState) => state.recaptcha)
  const [getToken] = useLazyGetTokenQuery()
  const navigate = useNavigateWithLang()
  const { executeRecaptcha } = useRecaptchaContext()

  useEffect(() => {
    if (isLoaded) {
      onLoad()
      executeRecaptcha()
    }
  }, [isLoaded])

  useEffect(() => {
    if (token) {
      onSuccess()
      getToken(token)
        .unwrap()
        .then(() => {
          navigate(redirectUrl)
        })
        .catch((err) => {
          navigate('/login')
          onError(err)
        })
    }
  }, [token])

  return null
}
