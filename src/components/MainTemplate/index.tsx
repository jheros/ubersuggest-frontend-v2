import { useState } from 'react';
import { Toolbar, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { TopBar, SideBar } from 'components';

const drawerWidth = 240;

export const MainTemplate = () => {
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(true);

  const handleMobileSideBarToggle = () => {
    setMobileSideBarOpen(!mobileSideBarOpen);
  };

  return (
    <>
      <div className='container'>
        <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <TopBar mobileSideBarOpen={mobileSideBarOpen} toggleMobileSideBar={handleMobileSideBarToggle} />
          <SideBar mobileOpen={mobileSideBarOpen} toggleMobile={handleMobileSideBarToggle} />
        </Box>
        <div className='content'>
          <Toolbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};
