import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack } from '@mui/material'
import { Button, Typography } from '@ubersuggest/common-ui'
import { ReactComponent as ReloadIcon } from 'assets/svg/icons/reload-blue.svg'
import { useMediaHelper } from 'hooks'
import { IRootState } from 'store'
import { useResendVerificationEmailMutation } from 'store/api'
import { showEmailConfirmModal } from 'store/reducers/modal'
import { getLanguageCode } from 'utils/translation'

export const EmailConfirmAlert = () => {
  const { isDesktop } = useMediaHelper()
  const { t } = useTranslation()
  const email = useSelector((state: IRootState) => state.user.userInfo.email)
  const confirmed = useSelector((state: IRootState) => state.user.userInfo.confirmed)
  const [resendVerificationEmail, { isLoading }] = useResendVerificationEmailMutation()
  const lang = getLanguageCode()
  const dispatch = useDispatch()

  const handleResendClick = async () => {
    if (!email) return
    try {
      await resendVerificationEmail({ email, lang }).unwrap()
      dispatch(showEmailConfirmModal({ email, isEmailSent: true }))
    } catch (err) {
      console.error(err)
      // todo: handle error
    }
  }

  if (!email || confirmed) return null

  return (
    <Stack
      direction={!isDesktop ? 'column' : 'row'}
      alignItems='center'
      justifyContent='space-between'
      px={!isDesktop ? 15 / 8 : 3}
      py={!isDesktop ? 10 / 8 : 1.5}
      sx={{
        backgroundColor: 'common.blue.10',
        height: !isDesktop ? 'auto' : '66px',
      }}
    >
      <Box>
        <Typography
          variant='text14'
          dangerouslySetInnerHTML={{
            __html: t('confirm_email_modal_text', {
              0: `<span style="color: black">${email}</span>`,
            }),
          }}
          my={0.5}
          paragraph
        ></Typography>
        <Typography variant='text14' my={0.5} paragraph>
          {t('check_spam_note')}
        </Typography>
      </Box>

      <Button
        onClick={handleResendClick}
        variant='text'
        color='secondary'
        sx={{ textTransform: 'none' }}
        wrapperSx={{ flexShrink: 0 }}
        disabled={isLoading}
      >
        <ReloadIcon />
        <Typography variant='text14Book' ml={1}>
          {t('resend_confirmation_button')}
        </Typography>
      </Button>
    </Stack>
  )
}
