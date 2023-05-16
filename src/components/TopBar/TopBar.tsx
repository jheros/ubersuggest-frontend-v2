import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Stack, Divider, Button, useTheme, useMediaQuery } from '@mui/material';
import { Close as CloseIcon, Notifications as NotificationsIcon, Menu as MenuIcon } from '@mui/icons-material';

import { LanguageSelector, Typography, AppSwitcher } from 'components';
import UberLogo from 'assets/svg/logo.svg';

interface ITopBarMenu {
  name: string;
}
const TOPBAR_MENUS: ITopBarMenu[] = [{ name: 'consulting' }, { name: 'plans_pricing' }];

interface ITopBar {
  mobileSideBarOpen: boolean;
  toggleMobileSideBar: () => void;
}

export const TopBar = ({ mobileSideBarOpen, toggleMobileSideBar }: ITopBar) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation();

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        height: 59,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: (theme) => theme.palette.lightGray[70],
        color: (theme) => theme.palette.darkGray.main,
      }}
      elevation={0}
    >
      <Toolbar disableGutters>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ px: 2.5, width: '100%' }}>
          <Stack direction='row' alignItems='center' spacing={3}>
            <img src={UberLogo} height='38' alt='uber-logo' />
            <Divider orientation='vertical' flexItem />
            <LanguageSelector />
            {isDesktop && <AppSwitcher />}
          </Stack>
          <Stack direction='row' alignItems='center' spacing={3.75} mr={2.5}>
            {isDesktop && (
              <>
                {TOPBAR_MENUS.map((item: ITopBarMenu) => (
                  <Typography key={item.name} font='book' variant='body2' sx={{ textTransform: 'uppercase' }}>
                    {t(item.name)}
                  </Typography>
                ))}
                <Button variant='contained' color='secondary' disableElevation sx={{ borderRadius: '2px', height: 34 }}>
                  <Typography variant='body2' font='medium' sx={{ textTransform: 'none', color: 'white' }}>
                    {t('sign_in')}
                  </Typography>
                </Button>
              </>
            )}
            {!isDesktop && (
              <Stack direction='row' sx={{ color: (theme) => theme.palette.darkGray[30] }} mr={-2.5}>
                <NotificationsIcon sx={{ fontSize: 38 }} />
                <Stack onClick={toggleMobileSideBar} sx={{ cursor: 'pointer' }}>
                  {mobileSideBarOpen && <CloseIcon sx={{ fontSize: 38 }} />}
                  {!mobileSideBarOpen && <MenuIcon sx={{ fontSize: 38 }} />}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
