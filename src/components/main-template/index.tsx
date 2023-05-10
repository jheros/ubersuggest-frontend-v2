import { Toolbar, AppBar, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { TopBar, SideBar } from 'components';

// import useLocalStorageKeyObserver from 'hooks/useCustomEvent';
// import { MainBar, MainSidebar } from 'components';

// const navHeight = 58;

const drawerWidth = 240;

export const MainTemplate: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const { t } = useTranslation();
  // const { value: userTier } = useLocalStorageKeyObserver('user');

  // const [open, setOpen] = useState(true);
  // const toggleDrawerOpen = () => {
  //   setOpen((prev: boolean) => !prev);
  // };

  const drawer = (
    <div>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {/* <MainBar toggleDrawerOpen={toggleDrawerOpen} navHeight={navHeight} userTier={userTier} /> */}
      <div className='container'>
        <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <TopBar />
          <SideBar />
        </Box>
        {/* <MainSidebar open={open} setOpen={setOpen} navHeight={navHeight} handleModalOpen={() => {}} /> */}
        <div className='content'>
          <Toolbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};
