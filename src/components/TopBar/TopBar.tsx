import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  AccountBalance as AccountBalanceIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import { AppBar, Toolbar, Stack, Divider, useTheme, Box } from '@mui/material'
import { AppSwitcher, LanguageSelector, Typography, UserProfile, Button } from '@ubersuggest/common-ui'
import UberLogo from 'assets/svg/logos/logo-orange.svg'
import { EmailConfirmAlert, RouterLink } from 'components'
import { useMediaHelper, useNavigateWithLang } from 'hooks'
import { ROUTES } from 'routes/consts'
import { isEmailVerificationRequiredSelector, isSignedInSelector, logout } from 'store/reducers/auth'
import { isPaidUserSelector, userInfoSelector } from 'store/reducers/user'
import { getUrlFromRoutes, pathWithLang } from 'utils/route'
import { getLanguageCode, pathWithNewLang, storeCurrLang } from 'utils/translation'

import { getConsultingLink, languageOptions } from './consts'

interface ITopBar {
  mobileSideBarOpen: boolean
  hideAppSwitcher?: boolean
  hideNavLink?: boolean
  hideToggle?: boolean
  toggleMobileSideBar: () => void
}

export const TopBar = ({
  mobileSideBarOpen,
  toggleMobileSideBar,
  hideAppSwitcher = false,
  hideNavLink = false,
  hideToggle = false,
}: ITopBar) => {
  const theme = useTheme()
  const { isDesktop } = useMediaHelper()
  const { t, i18n } = useTranslation()
  const navigateWithLang = useNavigateWithLang()
  const user = useSelector(userInfoSelector)
  const isSignedIn = useSelector(isSignedInSelector)
  const isPaidUser = useSelector(isPaidUserSelector)
  const isEmailVerificationRequired = useSelector(isEmailVerificationRequiredSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const langCode = getLanguageCode()

  const handleLogout = () => {
    dispatch(logout())
    navigateWithLang('/dashboard')
  }

  const handleChangeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang)
    storeCurrLang(newLang)
    navigate(pathWithNewLang(newLang))
  }

  const handleSelectMenu = (menu: string) => {
    if (menu === '#') {
      handleLogout()
    }
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: (theme) => theme.palette.common.lightGray[70],
        color: (theme) => theme.palette.common.darkGray.main,
      }}
      elevation={0}
    >
      {isEmailVerificationRequired && isDesktop && <EmailConfirmAlert />}
      <Toolbar disableGutters>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ px: 2.5, width: '100%' }}>
          <Stack direction='row' alignItems='center' spacing={3}>
            <RouterLink to={ROUTES.DASHBOARD.MAIN} sx={{ ml: '5px', display: 'flex', alignItems: 'center' }}>
              <img src={UberLogo} height='38' alt='uber-logo' />
            </RouterLink>
            <Divider orientation='vertical' flexItem />
            <LanguageSelector active={langCode} langOptions={languageOptions} onChange={handleChangeLanguage} />
            {isDesktop && (
              <Box width={228}>
                {!hideAppSwitcher && (
                  <AppSwitcher
                    appOptions={[
                      {
                        color: 'orange',
                        default: true,
                        description: t('empty_state_kw_overview_desp_1'),
                        icon: 'UbersuggestThumbSvg',
                        title: t('ubersuggest'),
                        url: '/url1',
                      },
                      {
                        color: 'blue',
                        description: t('switcher_ai_writer_subheading'),
                        icon: 'AIWriterThumbSvg',
                        title: t('ai_writer'),
                        url: '/url2',
                      },
                    ]}
                    hideSelected
                  />
                )}
              </Box>
            )}
          </Stack>
          <Stack direction='row' alignItems='center' spacing={3.75} mr={2.5}>
            {isDesktop && (
              <>
                {!hideNavLink && (
                  <>
                    <RouterLink type='direct' to={getConsultingLink(langCode)} underline='none'>
                      <Typography
                        font='book'
                        variant='text14'
                        sx={{ textTransform: 'uppercase' }}
                        color={theme.palette.common.darkGray.main}
                      >
                        {t('consluting')}
                      </Typography>
                    </RouterLink>
                    <RouterLink to={ROUTES.PRICING} underline='none'>
                      <Typography
                        font='book'
                        variant='text14'
                        sx={{ textTransform: 'uppercase' }}
                        color={theme.palette.common.darkGray.main}
                      >
                        {t('plans_pricing')}
                      </Typography>
                    </RouterLink>
                  </>
                )}
                {!isSignedIn && (
                  <Button
                    variant='contained'
                    color='secondary'
                    disableElevation
                    sx={{ borderRadius: '2px', height: 34 }}
                    onClick={() => navigateWithLang('/login')}
                  >
                    <Typography variant='text14' font='medium' sx={{ textTransform: 'none', color: 'white' }}>
                      {t('sign_in')}
                    </Typography>
                  </Button>
                )}
                {isSignedIn && (
                  <UserProfile
                    isPaid={isPaidUser}
                    avatar={user?.picture ?? undefined}
                    menuItems={[
                      {
                        label: t('account_billing_tab'),
                        url: pathWithLang(getUrlFromRoutes('SETTINGS.ACCOUNT_BILLING')),
                        icon: <AccountBalanceIcon />,
                      },
                      {
                        label: t('notification'),
                        url: pathWithLang(getUrlFromRoutes('SETTINGS.NOTIFICATIONS')),
                        icon: <NotificationsIcon />,
                      },
                      {
                        label: t('sign_out'),
                        url: '#',
                        icon: <LogoutIcon />,
                      },
                    ]}
                    onSelectMenu={handleSelectMenu}
                  />
                )}
              </>
            )}
            {!isDesktop && (
              <Stack direction='row' sx={{ color: (theme) => theme.palette.common.darkGray[30] }} mr={-2.5}>
                <NotificationsIcon sx={{ fontSize: 38 }} />
                {!hideToggle && (
                  <Stack onClick={toggleMobileSideBar} sx={{ cursor: 'pointer' }}>
                    {mobileSideBarOpen && <CloseIcon sx={{ fontSize: 38 }} />}
                    {!mobileSideBarOpen && <MenuIcon sx={{ fontSize: 38 }} />}
                  </Stack>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
