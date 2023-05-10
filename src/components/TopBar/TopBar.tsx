import { AppBar, Toolbar } from '@mui/material';

export const TopBar = () => {
  return (
    <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={0}>
      <Toolbar>
        <div>Hello</div>
      </Toolbar>
    </AppBar>
  );
};
