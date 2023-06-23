import { RouterProvider } from 'react-router-dom'
import { UberRouter } from 'routes'
import { RecaptchaProvider } from 'contexts'
import { EmailConfirmModal, AdBlockerDetectModal, LoginLimitModal } from 'components'

import './App.css'

function App() {
  return (
    <RecaptchaProvider>
      <RouterProvider router={UberRouter} fallbackElement={<p>Loading...</p>} />
    </RecaptchaProvider>
  )
}

export default App
