import { useTranslation } from 'react-i18next'
import { useLocation, useSearchParams, useParams } from 'react-router-dom'

import { Stack, Box, Alert } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { LogoOrange, GoogleLogin, LoginForm, Hr, RouterLink } from 'components'
import { ROUTES } from 'routes/consts'
import { getLanguageCode } from 'utils/translation'

interface IParams {
  showPayPlans?: string
  plan?: string
  tier?: string
  coupon?: string
  from?: string
  next?: string
  error?: string
  code?: string
  sentResetLink?: string
}

export const Login = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const pathParams = useParams()
  const params: IParams = { ...Object.fromEntries(searchParams.entries()), ...pathParams } as IParams
  const languageCode = getLanguageCode()
  const sentResetLink = location.state?.sentResetLink
  let redirectUrl = `/${languageCode}/dashboard`
  if (params.next) {
    if (params.from === 'ai_writer') {
      redirectUrl = params.next
    } else if (params.coupon) {
      redirectUrl = `/${languageCode}/checkout?next=/${languageCode}/dashboard&plan=${
        params.plan ? params.plan : 'monthly'
      }&tier=${params.tier ? params.tier : 'tier1'}&coupon=${params.coupon}`
    } else if (
      params.next === '/checkout' &&
      params.showPayPlans === 'true' &&
      params.tier === 'restart' &&
      params.plan === 'monthly'
    ) {
      redirectUrl = `/${languageCode}/checkout?next=/${languageCode}/dashboard&plan=monthly&tier=restart`
    } else {
      redirectUrl = params.next
    }
  } else if (params.showPayPlans === 'true' && params.tier && params.plan) {
    redirectUrl = `/${languageCode}/checkout?next=/${languageCode}/dashboard&plan=${params.plan}&tier=${params.tier}`
  } else if (location.state?.next) {
    redirectUrl = location.state?.next
  }

  return (
    <>
      <Stack alignItems='center'>
        <Box sx={{ display: 'flex', mt: '70px', mb: '10px' }}>
          <LogoOrange />
        </Box>

        <Typography
          font='light'
          variant='text24'
          sx={{
            margin: '37px 0',
            padding: '0 20px',
            mobilePadding: '0 10px', // todo
          }}
        >
          {t('new_login_heading')}
        </Typography>

        {(sentResetLink || params.sentResetLink) && (
          <Alert severity='info' variant='filled' color='warning' sx={{ mb: '24px' }}>
            {t('email_sent_google_login')}
          </Alert>
        )}

        <GoogleLogin redirectUrl={redirectUrl} />

        <Hr mt={1} mb={2} text={t('or')} />

        <LoginForm redirectUrl={redirectUrl} />

        <Typography mt={3} variant='text14'>
          {t('no_account', { 0: '' })}
          <RouterLink to={ROUTES.REGISTER} sx={{ ml: '5px' }}>
            {t('register_here')}
          </RouterLink>
        </Typography>
      </Stack>
    </>
  )
}
