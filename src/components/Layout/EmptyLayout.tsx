import { useState } from 'react'
import { Toolbar, Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { GlobalModalsPartial } from '../Modal/GlobalModalsPartial'
import { TopBar, SideBar } from 'components'

const drawerWidth = 240

export const EmptyLayout = () => {
  return (
    <Container>
      <Outlet />
      <GlobalModalsPartial />
    </Container>
  )
}
