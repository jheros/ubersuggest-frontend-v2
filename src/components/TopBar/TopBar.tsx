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
import { AppBar, Toolbar, Stack, Divider, Button, useTheme, useMediaQuery, Breakpoint, Box } from '@mui/material'
import { AppSwitcher, LanguageSelector, Typography, UserProfile } from '@ubersuggest/common-ui'
import UberLogo from 'assets/svg/logos/logo-orange.svg'
import { RouterLink } from 'components'
import { useNavigateWithLang } from 'hooks'
import { ROUTES } from 'routes/consts'
import { isPaidUserSelector, isSignedInSelector, logout, userInfoSelector } from 'store/reducers/auth'
import { getLanguageCode, pathWithNewLang } from 'utils/translation'

import { getConsultingLink, languageOptions } from './consts'

interface ITopBar {
  mobileSideBarOpen: boolean
  toggleMobileSideBar: () => void
}

export const TopBar = ({ mobileSideBarOpen, toggleMobileSideBar }: ITopBar) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('tb' as Breakpoint))
  const { t, i18n } = useTranslation()
  const navigateWithLang = useNavigateWithLang()
  const user = useSelector(userInfoSelector)
  const isSignedIn = useSelector(isSignedInSelector)
  const isPaidUser = useSelector(isPaidUserSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigateWithLang('/dashboard')
  }

  const handleChangeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang)
    navigate(pathWithNewLang(newLang))
  }

  const handleSelectMenu = (menu: string) => {
    if (menu === '#') {
      handleLogout()
    }
  }

  const langCode = getLanguageCode()

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        height: 59,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: (theme) => theme.palette.common.lightGray[70],
        color: (theme) => theme.palette.common.darkGray.main,
      }}
      elevation={0}
    >
      <Toolbar disableGutters>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ px: 2.5, width: '100%' }}>
          <Stack direction='row' alignItems='center' spacing={3}>
            <RouterLink to={ROUTES.DASHBOARD.MAIN} sx={{ ml: '5px' }}>
              <img src={UberLogo} height='38' alt='uber-logo' />
            </RouterLink>
            <Divider orientation='vertical' flexItem />
            <LanguageSelector active={langCode} langOptions={languageOptions} onChange={handleChangeLanguage} />
            {isDesktop && (
              <Box width={228}>
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
              </Box>
            )}
          </Stack>
          <Stack direction='row' alignItems='center' spacing={3.75} mr={2.5}>
            {isDesktop && (
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
                        label: 'Account & Billing',
                        url: '/settings/account_billing',
                        icon: <AccountBalanceIcon />,
                      },
                      {
                        label: 'Notification',
                        url: '/settings/notification',
                        icon: <NotificationsIcon />,
                      },
                      {
                        label: 'Sing Out',
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
                <Stack onClick={toggleMobileSideBar} sx={{ cursor: 'pointer' }}>
                  {mobileSideBarOpen && <CloseIcon sx={{ fontSize: 38 }} />}
                  {!mobileSideBarOpen && <MenuIcon sx={{ fontSize: 38 }} />}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
