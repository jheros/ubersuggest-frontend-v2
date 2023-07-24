import { useTranslation } from 'react-i18next'

import { Typography, Dialog } from '@ubersuggest/common-ui'
import { ReactComponent as WarningIcon } from 'assets/svg/icons/warning-small.svg'
import { useRemoveMeFromAccountMutation } from 'store/api'

interface IRemoveUserFromAccountModal {
  open: boolean
  onClose: () => void
}

export const RemoveUserFromAccountModal = ({ open = false, onClose }: IRemoveUserFromAccountModal) => {
  const { t } = useTranslation()
  const [removeMeFromAccount, { isLoading }] = useRemoveMeFromAccountMutation()

  const onSubmit = async () => {
    try {
      await removeMeFromAccount().unwrap()
    } catch (err) {
      // todo: confirm no error handles
    }
    onClose()
  }

  return (
    <Dialog
      onClose={onClose}
      onSubmit={onSubmit}
      open={open}
      title={t('unlink_account_heading')}
      titleIcon={<WarningIcon />}
      closeButtonText={t('cancel')}
      submitButtonText={t('remove_this')}
      isSubmitting={isLoading}
    >
      <Typography variant='text14' color='common.darkGray.main'>
        {t('unlink_account_text')}
      </Typography>
    </Dialog>
  )
}
