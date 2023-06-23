import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Toolbar, Box, Container } from '@mui/material'
import { TopBar, SideBar } from 'components'
import { SIDEBAR_WIDTH } from 'components/SideBar/constants'

import { GlobalModalsPartial } from '../Modal/GlobalModalsPartial'

const drawerWidth = 240

export const MainLayout = () => {
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(true)

  const handleMobileSideBarToggle = () => {
    setMobileSideBarOpen(!mobileSideBarOpen)
  }

  return (
    <Container>
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <TopBar mobileSideBarOpen={mobileSideBarOpen} toggleMobileSideBar={handleMobileSideBarToggle} />
        <SideBar mobileOpen={mobileSideBarOpen} toggleMobile={handleMobileSideBarToggle} />
      </Box>
      <Box sx={{ marginLeft: { sm: 0, lg: `${SIDEBAR_WIDTH}px` } }}>
        <Toolbar />
        <Outlet />
      </Box>
      <GlobalModalsPartial />
    </Container>
  )
}
