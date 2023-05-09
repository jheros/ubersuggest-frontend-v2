import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/system';
import { Theme, alpha } from '@mui/material/styles';

import { openedMixin, closedMixin } from './mixins';

type IDrawerProps = {
  navHeight: number;
  theme?: Theme;
};

export const DrawerStyled = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'navHeight',
})<IDrawerProps>(({ theme, open, navHeight }) => ({
  zIndex: 10,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme, navHeight),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme, navHeight),
  }),
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
  },
}));

export const AccountInfoBox = styled(Box)(({ theme }) => ({
  padding: '16px',
  margin: '0 0 16px 0',
  color: theme.palette.common.darkGray,
  border: `1px solid ${theme.palette.common.dullYellow}`,
  backgroundColor: alpha(theme.palette.common.dullYellow, 0.2),
}));

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: alpha(theme.palette.common.yellow, 0.3),
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.common.yellow,
  },
}));
