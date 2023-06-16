import { AdBlockerDetectModal } from './AdBlockerDetectModal'
import { EmailConfirmModal } from './EmailConfirmModal'
import { LoginLimitModal } from './LoginLimitModal'

export const GlobalModalsPartial = () => {
  return (
    <>
      <EmailConfirmModal />
      <AdBlockerDetectModal />
      <LoginLimitModal />
    </>
  )
}
