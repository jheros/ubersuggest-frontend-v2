import { forwardRef, LegacyRef } from 'react'
import Recaptcha from 'react-google-recaptcha'
import { useDispatch, useSelector } from 'react-redux'
import { enableRecaptchaSelector, changeToken, setScriptLoaded } from 'store/reducers/recaptcha'

export const GoogleRecaptcha = forwardRef((props, ref: LegacyRef<Recaptcha> | undefined) => {
  const dispatch = useDispatch()
  const enableRecaptcha: boolean = useSelector(enableRecaptchaSelector)

  const handleChange = (token: string | null) => {
    dispatch(changeToken(token))
  }

  const handleScriptLoad = () => {
    dispatch(setScriptLoaded())
  }

  return enableRecaptcha ? (
    <Recaptcha
      ref={ref}
      size='invisible'
      type='image'
      theme='light'
      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ''}
      onChange={handleChange}
      asyncScriptOnLoad={handleScriptLoad}
    />
  ) : null
})
