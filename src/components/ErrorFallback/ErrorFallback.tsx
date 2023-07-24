import { useTranslation } from 'react-i18next'
import { useRouteError } from 'react-router-dom'
import reactStringReplace from 'react-string-replace'

import { Box } from '@mui/material'
import { Typography, Button } from '@ubersuggest/common-ui'
import { ReactComponent as ReloadIcon } from 'assets/svg/icons/reload.svg'
import { ReactComponent as AlertIcon } from 'assets/svg/icons/white_screen_alert.svg'

export const ErrorFallback = (props: any) => {
  const routerError = useRouteError()
  const error = props._error || routerError

  console.error(error)

  const { t } = useTranslation()

  // Uncaught ReferenceError: path is not defined
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '500px',
        margin: '200px auto',
      }}
    >
      <AlertIcon />
      <Typography variant='text16' sx={{ m: '16px 0 0 0' }} boldColor='darkGray'>
        {t('general_error_page_message')}
      </Typography>

      <Typography variant='text14' sx={{ m: '16px 0 0 0' }} boldColor='darkGray' textAlign='center'>
        {reactStringReplace(
          t('if_issue_persists', {
            0: t('support_email'),
          }),
          t('support_email'),
          (match, i) => {
            return (
              <a target='_blank' key={`privacy-${i}`} href='mailto:support@ubersuggest.com' rel='noreferrer'>
                {match}
              </a>
            )
          },
        )}
      </Typography>

      <Button variant='outlined' onClick={() => window.location.reload()} startIcon={<ReloadIcon />} sx={{ mt: 2 }}>
        {t('refresh_button')}
      </Button>
    </Box>
  )
}
