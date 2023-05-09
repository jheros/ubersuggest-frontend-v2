import { CSSObject } from '@mui/system';
import { Theme } from '@mui/material/styles';

export const openedMixin = (theme: Theme, navHeight?: number): CSSObject => ({
  width: theme.custom.layout.drawer.width,
  paddingTop: navHeight ? `${navHeight}px` : 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: 0,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
});

export const closedMixin = (theme: Theme, navHeight?: number): CSSObject => ({
  width: theme.custom.layout.drawer.width,
  paddingTop: navHeight ? `${navHeight}px` : 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  marginLeft: -theme.custom.layout.drawer.width,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: '-100%',
  },
});
