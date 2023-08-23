import { useTranslation } from 'react-i18next'
import { useLocation, useSearchParams, useParams } from 'react-router-dom'

import { Stack, Box } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { LogoOrange, GoogleLogin, RegisterForm, Hr, RouterLink } from 'components'
import queryString from 'query-string'
import { ROUTES } from 'routes/consts'
import { pathWithLang } from 'utils/route'
import { hasUnloggedUserProject } from 'utils/storage'
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
  aiwAddon?: string
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
  let redirectUrl = `/${ROUTES.DASHBOARD.MAIN}${addProjectAction}`
  if (params.next) {
    if (params.from === 'ai_writer') {
      redirectUrl = params.next
    } else if (params.coupon) {
      redirectUrl = `/checkout?plan=${params.plan ? params.plan : 'monthly'}&tier=${
        params.tier ? params.tier : 'tier1'
      }&coupon=${params.coupon}&next=${pathWithLang(redirectUrl)}`
    } else if (
      params.next === '/checkout' &&
      params.showPayPlans === 'true' &&
      params.tier === 'restart' &&
      params.plan === 'monthly'
    ) {
      redirectUrl = `/checkout?plan=monthly&tier=restart&next=${pathWithLang(redirectUrl)}`
    } else if (
      params.next === '/checkout' &&
      params.showPayPlans === 'true' &&
      params.plan === 'monthly' &&
      !!params.aiwAddon
    ) {
      redirectUrl = `/checkout?plan=monthly&tier=${params.tier}&aiwAddon=${params.aiwAddon}&next=${pathWithLang(
        redirectUrl,
      )}`
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
      }
    }
  } else if (params.showPayPlans === 'true' && params.tier && params.plan) {
    redirectUrl = `/checkout?plan=${params.plan}&tier=${params.tier}${
      params.aiwAddon ? `&aiwAddon=${params.aiwAddon}` : ''
    }&next=${pathWithLang(redirectUrl)}`
  } else if (location.state?.next) {
    const nextUrl = location.state?.next?.startsWith('/') ? location.state?.next : `/${location.state?.next}`
    if (nextUrl !== `/${languageCode}/dashboard` && nextUrl !== `/dashboard`) {
      redirectUrl = location.state?.next
    }
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
          <RouterLink to={`/${ROUTES.LOGIN}`} sx={{ ml: '5px' }}>
            {t('login_button')}
          </RouterLink>
        </Typography>
      </Stack>
    </>
  )
}
