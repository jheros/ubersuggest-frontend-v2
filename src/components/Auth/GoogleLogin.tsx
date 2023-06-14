import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'
import { useSearchParams } from 'react-router-dom'
import { useTheme } from '@mui/material'

import { GoogleButton, Typography } from 'components'
import { getGoogleSignInURL } from 'utils/oauth'
import { VerifyGoogleAuth } from './VerifyGoogleAuth'
import { useState } from 'react'

interface IGoogleLogin {
  redirectUrl: string
}

export const GoogleLogin = ({ redirectUrl }: IGoogleLogin) => {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  const theme = useTheme()
  const googleError = searchParams.get('error') === 'existing_email'
  const { code, coupon, google_auth: googleAuth }: any = { ...Object.fromEntries(searchParams.entries()) }
  const [disabled, setDisabled] = useState(!!googleAuth)

  const handleLoginClick = async () => {
    setDisabled(true)
    window.location.replace(
      getGoogleSignInURL({
        coupon: coupon,
        next: `/login?google_auth=${redirectUrl}`,
        ...(code && { code }),
      }),
    )
  }

  return (
    <>
      {googleAuth && (
        <VerifyGoogleAuth
          redirectUrl={googleAuth as string}
          onLoad={() => setDisabled(false)}
          onSuccess={() => setDisabled(true)}
          onError={() => setDisabled(false)}
        />
      )}
      <Box mb='10px'>
        <GoogleButton
          variant='dark'
          label={t('continue_with_google')}
          onClick={handleLoginClick}
          width='200px'
          minWidth='fit-content'
          height='42px'
          disabled={disabled}
          mobileStretch
        />
      </Box>
      {googleError && (
        <Typography
          font='light'
          variant='text14'
          align='center'
          sx={{
            margin: '10px 0 15px 0',
            padding: '0 30px',
            color: theme.palette.primary.main,
          }}
        >
          {t('registered_google_email')}
        </Typography>
      )}
    </>
  )
}
