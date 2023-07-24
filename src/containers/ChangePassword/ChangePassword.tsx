import { useTranslation } from 'react-i18next'

import { Stack, Box } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { LogoOrange, ChangePasswordForm } from 'components'

export const ChangePassword = () => {
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
            margin: '35px 0',
            mobilePadding: '0 10px', // todo
          }}
        >
          {t('change_password')}
        </Typography>

        <ChangePasswordForm />
      </Stack>
    </>
  )
}
