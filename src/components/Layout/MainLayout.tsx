import { useState } from 'react'
import { Toolbar, Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { TopBar, SideBar } from 'components'
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
      <Box className='content'>
        <Toolbar />
        <Outlet />
      </Box>
      <GlobalModalsPartial />
    </Container>
  )
}
