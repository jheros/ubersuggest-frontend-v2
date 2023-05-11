import { Toolbar, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { TopBar, SideBar } from 'components';

const drawerWidth = 240;

export const MainTemplate = () => {
  return (
    <>
      <div className='container'>
        <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <TopBar />
          <SideBar />
        </Box>
        <div className='content'>
          <Toolbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};
