import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useSearchParams, useParams } from 'react-router-dom'

import { Stack, Box, Link } from '@mui/material'
import { Typography, Alert } from '@ubersuggest/common-ui'
import { LogoOrange, GoogleLogin, LoginForm, Hr, RouterLink } from 'components'
import { ROUTES } from 'routes/consts'
import { showEmailConfirmModal } from 'store/reducers/modal'
import { pathWithLang } from 'utils/route'

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
  email?: string
  verificationStatus?: string
  aiwAddon?: string
}

export const Login = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const pathParams = useParams()
  const params: IParams = { ...Object.fromEntries(searchParams.entries()), ...pathParams } as IParams
  const {
    sentResetLink = params.sentResetLink,
    emailVerification: { email = params.email, verificationStatus = params.verificationStatus } = {},
  } = location.state || {}
  const [showResetAlert, setShowResetAlert] = useState<boolean>(sentResetLink)
  const [showEmailVerificationAlert, setShowEmailVerificationAlert] = useState<boolean>(email && verificationStatus)

  let redirectUrl = `/${ROUTES.DASHBOARD.MAIN}`
  if (params.next) {
    if (params.from === 'ai_writer') {
      redirectUrl = params.next
    } else if (params.coupon) {
      redirectUrl = `/checkout?next=${pathWithLang(redirectUrl)}&plan=${
        params.plan ? params.plan : 'monthly'
      }&tier=${params.tier ? params.tier : 'tier1'}&coupon=${params.coupon}`
    } else if (
      params.next === '/checkout' &&
      params.showPayPlans === 'true' &&
      params.tier === 'restart' &&
      params.plan === 'monthly'
    ) {
      redirectUrl = `/checkout?next=${pathWithLang(redirectUrl)}&plan=monthly&tier=restart`
    } else if (
      params.next === '/checkout' &&
      params.showPayPlans === 'true' &&
      params.plan === 'monthly' &&
      !!params.aiwAddon
    ) {
      redirectUrl = `/checkout?next=${pathWithLang(redirectUrl)}&plan=monthly&tier=${
        params.tier
      }&aiwAddon=${params.aiwAddon}`
    } else {
      redirectUrl = params.next
    }
  } else if (params.showPayPlans === 'true' && params.tier && params.plan) {
    redirectUrl = `/checkout?next=${pathWithLang(redirectUrl)}&plan=${params.plan}&tier=${params.tier}${
      params.aiwAddon ? `&aiwAddon=${params.aiwAddon}` : ''
    }`
  } else if (location.state?.next) {
    redirectUrl = location.state?.next
  }
  redirectUrl = pathWithLang(redirectUrl)

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

        {showEmailVerificationAlert && (
          <Alert
            onClose={() => setShowEmailVerificationAlert(false)}
            severity={verificationStatus === 'confirmed' ? 'success' : 'error'}
            sx={{ mb: 3, width: '90%', maxWidth: '728px' }}
          >
            {verificationStatus === 'confirmed' ? (
              <Typography
                variant='text14'
                lineHeight='24px'
                boldColor='common.darkGray.main'
                dangerouslySetInnerHTML={{
                  __html: t('confirm_email_success_message', { 0: email }),
                }}
              />
            ) : (
              <>
                <Typography
                  variant='text14'
                  lineHeight='24px'
                  boldColor='common.darkGray.main'
                  dangerouslySetInnerHTML={{
                    __html: t('expired_confirmation_link_message', { 0: email }),
                  }}
                  paragraph
                  m={0}
                />
                <Typography
                  variant='text14Medium'
                  lineHeight='24px'
                  color='common.darkGray.main'
                  boldColor='common.darkGray.main'
                >
                  <Link onClick={() => dispatch(showEmailConfirmModal({ email: email }))}>
                    {t('resend_confirmation_button')}
                  </Link>
                </Typography>
              </>
            )}
          </Alert>
        )}

        {showResetAlert && (
          <Alert
            onClose={() => setShowResetAlert(false)}
            severity='info'
            variant='filled'
            color='warning'
            sx={{ mb: '24px' }}
          >
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
