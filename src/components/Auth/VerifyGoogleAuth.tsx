import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useRecaptchaContext } from 'contexts'
import { useNavigateWithLang } from 'hooks'
import { IRootState } from 'store'
import { useLazyGetTokenQuery } from 'store/api'
import { enableRecaptchaSelector } from 'store/reducers/recaptcha'

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
  const enableRecaptcha = useSelector(enableRecaptchaSelector)

  useEffect(() => {
    if (isLoaded) {
      onLoad()
      executeRecaptcha()
    }
  }, [isLoaded])

  useEffect(() => {
    if (token || !enableRecaptcha) {
      onSuccess()
      getToken(token || '')
        .unwrap()
        .then(() => {
          navigate(redirectUrl)
        })
        .catch((err) => {
          navigate('/login')
          onError(err)
        })
    }
  }, [token, enableRecaptcha])

  return null
}
