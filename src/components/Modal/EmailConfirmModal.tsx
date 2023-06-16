import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme, Box, Dialog, DialogContent } from '@mui/material'

import { IRootState } from 'store'
import { Button, Typography } from 'components'
import { ModalTitle } from './ModalTitle'
import { ModalActions } from './ModalActions'
import { hideEmailConfirmModal } from 'store/reducers/modal'
import { getLanguageCode } from 'utils/translation'
import { useResendVerificationEmailMutation } from 'store/api'
import { isSignedInSelector } from 'store/reducers/auth'
import { ReactComponent as CheckIcon } from 'assets/svg/icons/circle-check-green-fill.svg'

export const EmailConfirmModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen, email, hideRefreshButton } = useSelector((state: IRootState) => state.modal.emailConfirmModal)
  const theme = useTheme()
  const [resendVerificationEmail, { isLoading }] = useResendVerificationEmailMutation()
  const isSignedIn = useSelector(isSignedInSelector)
  const [isEmailSent, setIsEmailSent] = React.useState(false)

  const handleClose = () => {
    dispatch(hideEmailConfirmModal())
  }

  const handleResend = async () => {
    const lang = getLanguageCode()
    if (email && lang) {
      await resendVerificationEmail({ email, lang }).unwrap()
      setIsEmailSent(true)

      if (!isSignedIn || hideRefreshButton) {
        dispatch(hideEmailConfirmModal())
      }
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby={t('confirm_email_modal_heading')}
      open={isOpen}
      sx={{ '.MuiPaper-root': { width: '504px' } }}
    >
      <ModalTitle onClose={handleClose} showIcon={true}>
        {t('confirm_email_modal_heading')}
      </ModalTitle>
      <DialogContent sx={{ textAlign: 'center', p: '40px' }}>
        <Box>
          <Typography
            variant='text12'
            color={theme.palette.common.darkGray.main}
            dangerouslySetInnerHTML={{ __html: t('confirm_email_modal_text', { 0: email }) }}
          ></Typography>
        </Box>
        <Box>
          <Typography variant='text12' color={theme.palette.common.darkGray[70]}>
            {t('confirm_email_modal_note')}
          </Typography>
        </Box>
      </DialogContent>
      <ModalActions>
        {isEmailSent && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box display={'flex'} alignItems='center'>
              <CheckIcon />
              <Typography
                color={theme.palette.common.darkGray.main}
                variant='text14'
                lineHeight={1}
                sx={{ ml: 1, mt: '2px' }}
              >
                {t('email_confirmation_sent')}
              </Typography>
            </Box>
            <Typography
              mt={'12px'}
              variant='text14'
              align='center'
              color={theme.palette.common.darkGray.main}
              dangerouslySetInnerHTML={{
                __html: t('refresh_email_confirmed', {
                  0: `<a href="javascript: window.location.reload()">${t('refresh_page')}</a>`,
                }),
              }}
              sx={{ a: { fontWeight: 'bold' } }}
            ></Typography>
          </Box>
        )}
        {!isEmailSent && (
          <Button autoFocus onClick={handleResend} variant='contained' size='xlarge' loading={isLoading}>
            {t('resend_confirmation_button')}
          </Button>
        )}
      </ModalActions>
    </Dialog>
  )
}
