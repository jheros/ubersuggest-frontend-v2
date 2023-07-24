import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { Typography, Dialog } from '@ubersuggest/common-ui'
import { IRootState } from 'store'
import { hideAdBlockerDetectModal } from 'store/reducers/modal'

export const AdBlockerDetectModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen } = useSelector((state: IRootState) => state.modal.adBlockerDetectModal)

  const handleClose = () => {
    dispatch(hideAdBlockerDetectModal())
  }

  const handleAccept = () => {
    dispatch(hideAdBlockerDetectModal())
    window.location.reload()
  }

  return (
    <Dialog
      onClose={handleClose}
      onSubmit={handleAccept}
      open={isOpen}
      title={t('ad_blocker_detected_heading')}
      closeButtonText={t('close')}
      submitButtonText={t('ad_blocker_detected_button')}
    >
      <Typography variant='text14' color='common.darkGray.main'>
        {t('ad_blocker_detected_warning')}
      </Typography>
    </Dialog>
  )
}
