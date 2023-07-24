import { ReactNode } from 'react'
import SmoothScrollbar from 'react-perfect-scrollbar'
import { useSelector } from 'react-redux'

import { Toolbar, Drawer } from '@mui/material'
import { SIDEBAR_WIDTH } from 'components/SideBar/constants'
import { useMediaHelper } from 'hooks'
import { isEmailVerificationRequiredSelector } from 'store/reducers/auth'

interface ISideBarWrapper {
  open: boolean
  toggle: () => void
  children?: ReactNode
}

export const SideBarWrapper = ({ open, toggle, children }: ISideBarWrapper) => {
  const isEmailVerificationRequired = useSelector(isEmailVerificationRequiredSelector)
  const { isDesktop, isSmallMobile } = useMediaHelper()

  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={isDesktop ? true : open}
      onClose={toggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: isDesktop ? SIDEBAR_WIDTH : isSmallMobile ? '70%' : '50%',
        },
      }}
    >
      <SmoothScrollbar>
        <Toolbar sx={{ mt: isEmailVerificationRequired && isDesktop ? '66px' : 0 }} />
        {children}
      </SmoothScrollbar>
    </Drawer>
  )
}
