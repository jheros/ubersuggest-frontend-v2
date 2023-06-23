import { createContext, ReactNode, useContext, useRef } from 'react'
import Recaptcha from 'react-google-recaptcha'
import { useSelector } from 'react-redux'

import { GoogleRecaptcha } from 'components'
import { IRootState } from 'store'

export interface IRecaptchaContext {
  executeRecaptcha: () => void
  executeRecaptchaAsync: () => Promise<string | null>
}
export const RecaptchaContext = createContext<IRecaptchaContext>({
  executeRecaptcha: () => {},
  executeRecaptchaAsync: async () => null,
})
export const useRecaptchaContext = () => useContext(RecaptchaContext)
export const RecaptchaProvider = ({ children }: { children: ReactNode }) => {
  const recaptchaRef = useRef<Recaptcha>(null)
  const token = useSelector((state: IRootState) => state.recaptcha.token)

  const executeRecaptcha = () => {
    if (recaptchaRef.current && !token) {
      recaptchaRef.current.execute()
    }
  }

  const executeRecaptchaAsync = async () => {
    if (token) return token
    if (recaptchaRef.current) {
      return await recaptchaRef.current.executeAsync()
    }
    return null
  }

  return (
    <RecaptchaContext.Provider value={{ executeRecaptcha, executeRecaptchaAsync }}>
      <GoogleRecaptcha ref={recaptchaRef} />
      {children}
    </RecaptchaContext.Provider>
  )
}
