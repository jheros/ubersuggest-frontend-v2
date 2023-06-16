import { useTranslation } from 'react-i18next'
import { Stack, Box } from '@mui/material'
import { useLocation, useSearchParams, useParams } from 'react-router-dom'
import queryString from 'query-string'

import { LogoOrange, Typography, GoogleLogin, RegisterForm, Hr, RouterLink } from 'components'
import { getLanguageCode } from 'utils/translation'
import { hasUnloggedUserProject } from 'utils/storage'

interface IParams {
  showPayPlans?: string
  plan?: string
  tier?: string
  coupon?: string
  from?: string
  next?: string
  error?: string
  code?: string
}

// todo: kissmetrics integration
export const Register = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const languageCode = getLanguageCode()
  const [searchParams] = useSearchParams()
  const pathParams = useParams()
  const params: IParams = { ...searchParams, ...pathParams } as IParams
  const addProjectAction = hasUnloggedUserProject()
    ? ''
    : `?action=${params.code ? 'join_account_success' : 'add_project'}`
  let redirectUrl = `/${languageCode}/dashboard${addProjectAction}`
  if (params.next) {
    if (params.from === 'ai_writer') {
      redirectUrl = params.next
    } else if (params.coupon) {
      redirectUrl = `/${languageCode}/checkout?plan=${params.plan ? params.plan : 'monthly'}&tier=${
        params.tier ? params.tier : 'tier1'
      }&coupon=${params.coupon}&next=/${languageCode}/dashboard${addProjectAction}`
    } else if (
      params.next === '/checkout' &&
      params.showPayPlans === 'true' &&
      params.tier === 'restart' &&
      params.plan === 'monthly'
    ) {
      redirectUrl = `/${languageCode}/checkout?plan=monthly&tier=restart&next=/${languageCode}/dashboard${addProjectAction}`
    } else {
      const queries = queryString.parse(params.next)
      if (
        queries.domain ||
        queries.keyword ||
        params.next.includes('?domain=') ||
        params.next.includes('?keyword=') ||
        params.next.includes('ai_writer?draft=1')
      ) {
        redirectUrl = params.next
      } else {
        redirectUrl = `/${languageCode}/dashboard${addProjectAction}`
      }
    }
  } else if (params.showPayPlans === 'true' && params.tier && params.plan) {
    redirectUrl = `/${languageCode}/checkout?plan=${params.plan}&tier=${params.tier}&next=/${languageCode}/dashboard${addProjectAction}`
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
            textAlign: 'center',
          }}
          dangerouslySetInnerHTML={{
            __html: t('register_to_continue_using'),
          }}
        ></Typography>

        <GoogleLogin redirectUrl={redirectUrl} />

        <Hr mt={1} mb={2} text={t('or')} />

        <RegisterForm redirectUrl={redirectUrl} />

        <Typography mt={3} variant='text14'>
          {t('already_have_account')}
          <RouterLink to='LOGIN' sx={{ ml: '5px' }}>
            {t('login_button')}
          </RouterLink>
        </Typography>
      </Stack>
    </>
  )
}
