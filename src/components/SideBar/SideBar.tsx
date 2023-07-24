import { useState, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Divider, Stack, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import { AppSwitcher, Typography, Button } from '@ubersuggest/common-ui'
import { ReactComponent as PriceIcon } from 'assets/svg/price.svg'
import { ProjectSelector } from 'components'
import { useMediaHelper, useNavigateWithLang } from 'hooks'

import { BottomMenu } from './BottomMenu'
import { SideBarMenu, SideBarMenuSummary, SideBarMenuContent } from './SideBarMenu'
import { SideBarMenuItemWrapper, SideBarMenuItem } from './SideBarMenuItem'
import { SideBarWrapper } from './SideBarWrapper'
import { TrialNotification } from './TrialNotification'
import { SIDEBAR_MENUS, ISidebarMenuItem, ISidebarMenu } from './constants'

interface ISideBar {
  mobileOpen: boolean
  toggleMobile: () => void
}

export const SideBar = ({ mobileOpen, toggleMobile }: ISideBar) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const {
    palette: {
      primary: { main: activeColor },
    },
  } = theme
  const { isDesktop } = useMediaHelper()
  const navigate = useNavigateWithLang()

  const [expanded, setExpanded] = useState<string | false>(false)
  const [activeMenuItem, setActiveMenuItem] = useState('')

  const handleChange = (menu: ISidebarMenu) => (_: SyntheticEvent, newExpanded: boolean) => {
    const newPanel = !!menu.subMenus && !newExpanded ? false : menu.name
    setExpanded(newPanel)
    if (!menu.subMenus) {
      navigate(menu.path)
    }
  }

  const handleClickMenuItem = (subMenu: ISidebarMenuItem) => () => {
    setActiveMenuItem(subMenu.name)
    navigate(subMenu.path)
  }

  return (
    <SideBarWrapper open={mobileOpen} toggle={toggleMobile}>
      <Box sx={{ flex: 1 }}>
        {!isDesktop && (
          <>
            <Stack sx={{ p: 1.25 }}>
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
            </Stack>
            <Divider />
          </>
        )}
        <ProjectSelector />
        {SIDEBAR_MENUS.map((menu: ISidebarMenu) => (
          <SideBarMenu
            expanded={!isDesktop || !menu.expanded ? expanded === menu.name : true}
            onChange={handleChange(menu)}
            key={menu.name}
          >
            {(!isDesktop || !menu.expanded) && (
              <SideBarMenuSummary
                expandIcon={menu.subMenus ? <ArrowForwardIosSharpIcon sx={{ fontSize: 12 }} /> : null}
              >
                <Typography variant='body1' font='medium' color={expanded === menu.name ? activeColor : ''}>
                  {t(menu.name)}
                </Typography>
                {menu.isNew && (
                  <Typography
                    variant='text12'
                    color={activeColor}
                    sx={{ mt: 0, textTransform: 'uppercase', marginLeft: 0.75 }}
                  >
                    {t('tab_new')}!
                  </Typography>
                )}
              </SideBarMenuSummary>
            )}
            <SideBarMenuContent>
              {menu.subMenus?.map((content: ISidebarMenuItem[], contentIndex: number) => (
                <SideBarMenuItemWrapper key={contentIndex}>
                  {content.map((item: ISidebarMenuItem) => {
                    return (
                      <SideBarMenuItem
                        active={activeMenuItem === item.name ? true : undefined}
                        key={item.name}
                        disablePadding
                        onClick={handleClickMenuItem(item)}
                      >
                        <Typography variant='text14'>{t(item.name!)}</Typography>
                        {item.isNew && (
                          <Typography
                            variant='text12'
                            color={activeColor}
                            sx={{ textTransform: 'uppercase', marginLeft: 0.75 }}
                          >
                            {t('tab_new')}!
                          </Typography>
                        )}
                      </SideBarMenuItem>
                    )
                  })}
                </SideBarMenuItemWrapper>
              ))}
            </SideBarMenuContent>
          </SideBarMenu>
        ))}
      </Box>
      <TrialNotification />
      {!isDesktop && (
        <Stack
          direction='row'
          alignItems='center'
          sx={{ borderRadius: 35, backgroundColor: (theme) => theme.palette.common.orange['10'] }}
          px={1.75}
          py={1.25}
          mt={1.5}
          mb={3}
          mx={2.5}
        >
          <Stack mr={1.25}>
            <PriceIcon />
          </Stack>
          <Typography variant='text14' font='book'>
            {t('plans_pricing')}
          </Typography>
        </Stack>
      )}
      <BottomMenu />
      {!isDesktop && (
        <Box pb={8} mx={1.5}>
          <Button variant='contained' color='secondary' disableElevation sx={{ borderRadius: '2px', height: 34 }}>
            <Typography variant='text14' font='medium' sx={{ textTransform: 'none', color: 'white' }}>
              {t('sign_in')}
            </Typography>
          </Button>
        </Box>
      )}
    </SideBarWrapper>
  )
}
