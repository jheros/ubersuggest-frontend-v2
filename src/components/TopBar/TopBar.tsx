import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Stack, Divider, Button, useTheme } from '@mui/material';

import { LanguageSelector, Typography, AppSwitcher } from 'components';
import UberLogo from 'assets/svg/logo.svg';

interface ITopBarMenu {
  name: string;
}
const TOPBAR_MENUS: ITopBarMenu[] = [{ name: 'consulting' }, { name: 'plans_pricing' }];

export const TopBar = () => {
  const theme = useTheme();
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
        borderBottomColor: theme.palette.light[400],
        color: theme.palette.dark.main,
      }}
      elevation={0}
    >
      <Toolbar disableGutters>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ px: 2.5, width: '100%' }}>
          <Stack direction='row' alignItems='center' spacing={3}>
            <img src={UberLogo} height='38' alt='uber-logo' />
            <Divider orientation='vertical' flexItem />
            <LanguageSelector />
            <AppSwitcher />
          </Stack>
          <Stack direction='row' alignItems='center' spacing={3.75} mr={2.5}>
            {TOPBAR_MENUS.map((item: ITopBarMenu, itemIndex: number) => (
              <Typography font='book' variant='body2' sx={{ textTransform: 'uppercase' }}>
                {t(item.name)}
              </Typography>
            ))}
            <Button variant='contained' color='secondary' disableElevation sx={{ borderRadius: '2px', height: 34 }}>
              <Typography variant='body2' font='medium' sx={{ textTransform: 'none', color: 'white' }}>
                {t('sign_in')}
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
