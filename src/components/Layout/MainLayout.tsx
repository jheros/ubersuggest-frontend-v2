import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { Box, Container, Breakpoint, useTheme, Toolbar } from '@mui/material'
import { TopBar, SideBar, EmailConfirmAlert, ErrorFallback } from 'components'
import { SIDEBAR_WIDTH } from 'components/SideBar/constants'
import { useMediaHelper } from 'hooks'
import { isEmailVerificationRequiredSelector } from 'store/reducers/auth'

import { GlobalModalsPartial } from '../Modal/GlobalModalsPartial'

export const MainLayout = () => {
  const theme = useTheme()
  const { isDesktop } = useMediaHelper()

  const isEmailVerificationRequired = useSelector(isEmailVerificationRequiredSelector)

  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(true)

  const handleMobileSideBarToggle = () => {
    setMobileSideBarOpen(!mobileSideBarOpen)
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Box component='nav' sx={{ width: { sm: SIDEBAR_WIDTH }, flexShrink: { sm: 0 } }}>
        <TopBar mobileSideBarOpen={mobileSideBarOpen} toggleMobileSideBar={handleMobileSideBarToggle} />
        <SideBar mobileOpen={mobileSideBarOpen} toggleMobile={handleMobileSideBarToggle} />
      </Box>
      <Box
        sx={{
          ml: `${SIDEBAR_WIDTH}px`,
          mt: isEmailVerificationRequired && isDesktop ? '66px' : 0,
          p: 0,
          [theme.breakpoints.down('tb' as Breakpoint)]: { ml: 0 },
        }}
      >
        <Toolbar />
        {isEmailVerificationRequired && !isDesktop && <EmailConfirmAlert />}
        <Box sx={{ p: 5, [theme.breakpoints.down('tb' as Breakpoint)]: { p: '20px 10px' } }}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </Box>
      <GlobalModalsPartial />
    </Container>
  )
}
