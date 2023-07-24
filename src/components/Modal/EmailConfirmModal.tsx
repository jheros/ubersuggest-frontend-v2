import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { useTheme, Box } from '@mui/material'
import { Typography, Dialog, Button } from '@ubersuggest/common-ui'
import { ReactComponent as CheckIcon } from 'assets/svg/icons/circle-check-green-fill.svg'
import { ReactComponent as WarningIcon } from 'assets/svg/icons/warning-small.svg'
import { IRootState } from 'store'
import { useResendVerificationEmailMutation } from 'store/api'
import { isSignedInSelector } from 'store/reducers/auth'
import { hideEmailConfirmModal, setConfirmEmailSent } from 'store/reducers/modal'
import { getLanguageCode } from 'utils/translation'

export const EmailConfirmModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen, email, hideRefreshButton, isEmailSent, disableClose } = useSelector(
    (state: IRootState) => state.modal.emailConfirmModal,
  )
  const theme = useTheme()
  const [resendVerificationEmail, { isLoading }] = useResendVerificationEmailMutation()
  const isSignedIn = useSelector(isSignedInSelector)

  const handleClose = () => {
    dispatch(hideEmailConfirmModal())
  }

  const handleResend = async () => {
    const lang = getLanguageCode()
    if (email && lang) {
      try {
        await resendVerificationEmail({ email, lang }).unwrap()
        dispatch(setConfirmEmailSent())

        if (!isSignedIn || hideRefreshButton) {
          dispatch(hideEmailConfirmModal())
        }
      } catch (err) {
        console.error(err)
        // todo: handle error
      }
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      title={t('confirm_email_modal_heading')}
      size='sm'
      titleIcon={<WarningIcon />}
      showTitleCloseButton={!disableClose}
      actions={
        <>
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
        </>
      }
    >
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
    </Dialog>
  )
}
