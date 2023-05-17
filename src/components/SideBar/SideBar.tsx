import { useState, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider, Stack, useTheme, useMediaQuery } from '@mui/material'
import { Box } from '@mui/material'

import { Button, AppSwitcher, ProjectSelector, Typography } from 'components'
import { ReactComponent as PriceIcon } from 'assets/svg/price.svg'
import { SIDEBAR_MENUS, ISidebarMenuItem, ISidebarMenu } from './constants'
import { SideBarMenu, SideBarMenuSummary, SideBarMenuContent } from './SideBarMenu'
import { SideBarMenuItemWrapper, SideBarMenuItem } from './SideBarMenuItem'
import { SideBarWrapper } from './SideBarWrapper'
import { TrialNotification } from './TrialNotification'
import { BottomMenu } from './BottomMenu'

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
  const isDesktop = useMediaQuery(theme.breakpoints.up('tb'))

  const [expanded, setExpanded] = useState<string | false>(false)
  const [activeMenuItem, selectMenuItem] = useState('')

  const handleChange = (panel: string, shouldToggle: boolean) => (_: SyntheticEvent, newExpanded: boolean) => {
    const newPanel = shouldToggle && !newExpanded ? false : panel
    setExpanded(newPanel)
  }

  const handleClickMenuItem = (index: string) => () => {
    selectMenuItem(index)
  }

  return (
    <SideBarWrapper open={mobileOpen} toggle={toggleMobile}>
      <Box sx={{ flex: 1 }}>
        {!isDesktop && (
          <>
            <AppSwitcher />
            <Divider />
          </>
        )}
        <ProjectSelector />
        {SIDEBAR_MENUS.map((menu: ISidebarMenu) => (
          <SideBarMenu
            expanded={!isDesktop || !menu.expanded ? expanded === menu.name : true}
            onChange={handleChange(menu.name, !!menu.children)}
            key={menu.name}
          >
            {(!isDesktop || !menu.expanded) && (
              <SideBarMenuSummary hasChildren={!!menu.children}>
                <Typography variant='body1' font='medium' color={expanded === menu.name ? activeColor : ''}>
                  {t(menu.name)}
                </Typography>
                {menu.isNew && (
                  <Typography
                    variant='body3'
                    color={activeColor}
                    sx={{ mt: 0, textTransform: 'uppercase', marginLeft: 0.75 }}
                  >
                    {t('tab_new')}!
                  </Typography>
                )}
              </SideBarMenuSummary>
            )}
            <SideBarMenuContent>
              {menu.children?.map((content: ISidebarMenuItem[], contentIndex: number) => (
                <SideBarMenuItemWrapper key={contentIndex}>
                  {content.map((item: ISidebarMenuItem) => {
                    return (
                      <SideBarMenuItem
                        active={activeMenuItem === menu.name}
                        key={item.name}
                        disablePadding
                        onClick={handleClickMenuItem(item.name)}
                      >
                        <Typography variant='body2'>{t(item.name!)}</Typography>
                        {item.isNew && (
                          <Typography
                            variant='body3'
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
          sx={{ borderRadius: 35, backgroundColor: (theme) => theme.palette.primary[10] }}
          px={1.75}
          py={1.25}
          mt={1.5}
          mb={3}
          mx={2.5}
        >
          <Stack mr={1.25}>
            <PriceIcon />
          </Stack>
          <Typography variant='body2' font='book'>
            {t('plans_pricing')}
          </Typography>
        </Stack>
      )}
      <BottomMenu />
      {!isDesktop && (
        <Box pb={8} mx={1.5}>
          <Button variant='contained' color='secondary' disableElevation sx={{ borderRadius: '2px', height: 34 }}>
            <Typography variant='body2' font='medium' sx={{ textTransform: 'none', color: 'white' }}>
              {t('sign_in')}
            </Typography>
          </Button>
        </Box>
      )}
    </SideBarWrapper>
  )
}
