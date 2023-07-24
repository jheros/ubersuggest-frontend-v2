import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, Outlet } from 'react-router-dom'

import { Tab, Tabs } from '@mui/material'
import { useNavigateWithLang } from 'hooks'
import { find } from 'lodash'
import { getUrlFromRoutes } from 'utils/route'

export const SETTINGS_MENU = [
  {
    name: 'account_billing_tab',
    baseUrl: getUrlFromRoutes('SETTINGS.ACCOUNT_BILLING'),
  },
  {
    name: 'manage_users_tab',
    baseUrl: getUrlFromRoutes('SETTINGS.MANAGE_USERS'),
  },
  {
    name: 'manage_addons_tab',
    baseUrl: getUrlFromRoutes('SETTINGS.MANAGE_ADDONS'),
  },
  {
    name: 'notifications_tab',
    baseUrl: getUrlFromRoutes('SETTINGS.NOTIFICATIONS'),
  },
]

export const Settings = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [currentTab, setCurrentTab] = useState(find(SETTINGS_MENU, (i) => pathname.endsWith(i.baseUrl))?.name)
  const navigateWithLang = useNavigateWithLang()

  const handleTabChange = (_event: React.SyntheticEvent, val: string) => {
    setCurrentTab(val)
    navigateWithLang(find(SETTINGS_MENU, (i) => i.name === val)?.baseUrl as string)
  }

  return (
    <>
      <Tabs
        value={currentTab}
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleTabChange}
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {SETTINGS_MENU.map((menu) => (
          <Tab label={t(menu.name)} value={menu.name} key={`tab-${menu.name}`} />
        ))}
      </Tabs>
      <Outlet />
    </>
  )
}
