import { ReactNode } from 'react';
import { Toolbar, Drawer } from '@mui/material';

const SIDEBAR_WIDTH = 220;

interface ISideBarWrapper {
  open: boolean;
  toggle: () => void;
  children?: ReactNode;
}

export const SideBarWrapper = ({ open, toggle, children }: ISideBarWrapper) => {
  return (
    <>
      <Drawer
        variant='temporary'
        open={open}
        onClose={toggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },

          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        <Toolbar />
        {children}
      </Drawer>

      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },

          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
          },
        }}
        open
      >
        <Toolbar />
        {children}
      </Drawer>
    </>
  );
};
