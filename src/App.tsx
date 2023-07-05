import { useTranslation } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'

import { EmailConfirmModal, AdBlockerDetectModal, LoginLimitModal, UberLoader } from 'components'
import { RecaptchaProvider } from 'contexts'
import { UberRouter } from 'routes'

import './App.css'

function App() {
  return (
    <RecaptchaProvider>
      <RouterProvider router={UberRouter} fallbackElement={<UberLoader />} />
    </RecaptchaProvider>
  )
}

export default App
