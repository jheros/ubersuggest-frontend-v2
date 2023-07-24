import { useTranslation } from 'react-i18next'

import { Stack, Box } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { LogoOrange, ForgotPasswordForm, RouterLink } from 'components'
import { ROUTES } from 'routes/consts'

export const ForgotPassword = () => {
  const { t } = useTranslation()

  return (
    <>
      <Stack alignItems='center'>
        <Box sx={{ display: 'flex', mt: '70px', mb: '10px' }}>
          <LogoOrange />
        </Box>

        <Typography
          variant='text24'
          sx={{
            margin: '30px 0 0 0',
            padding: '0 20px',
            lineHeight: '33px',
            mobilePadding: '0 10px', // todo
          }}
        >
          {t('reset_password_heading')}
        </Typography>

        <Typography
          variant='text14'
          textAlign='center'
          sx={{
            margin: '12px 0 24px 0',
            padding: '0 20px',
            mobilePadding: '0 10px', // todo
            whiteSpace: 'pre-wrap',
            lineHeight: 1.4
          }}
        >
          {t('email_to_reset')}
        </Typography>

        <ForgotPasswordForm />

        <Typography mt={3} variant='text16'>
          <RouterLink to={`/${ROUTES.LOGIN}`} sx={{ ml: '5px' }}>
            {t('back_to_login')}
          </RouterLink>
        </Typography>
      </Stack>
    </>
  )
}
