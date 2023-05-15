import { ReactNode } from 'react';
import { Toolbar, Drawer, useTheme, useMediaQuery } from '@mui/material';
import SmoothScrollbar from 'react-perfect-scrollbar';

const SIDEBAR_WIDTH = 221;

interface ISideBarWrapper {
  open: boolean;
  toggle: () => void;
  children?: ReactNode;
}

export const SideBarWrapper = ({ open, toggle, children }: ISideBarWrapper) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.up('xs'));

  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={isDesktop ? true : open}
      onClose={toggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: isDesktop ? SIDEBAR_WIDTH : isSmallMobile ? '70%' : '80%',
        },
      }}
    >
      <SmoothScrollbar>
        <Toolbar />
        {children}
      </SmoothScrollbar>
    </Drawer>
  );
};
