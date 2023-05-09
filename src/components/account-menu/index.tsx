import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Avatar, Stack, Menu, Box, MenuItem, Typography, Divider, useTheme, Button } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import CreditCard from '@mui/icons-material/CreditCard';
import { TOKEN } from 'utils/constants/local-storage';
import AvartarImg from 'assets/svg/avatar.svg';

interface IAccountMenu {
  userTier: string;
  setIsSignIn: (val: boolean) => void;
}

export const AccountMenu: React.FC<IAccountMenu> = ({ userTier, setIsSignIn }) => {
  const { i18n, t } = useTranslation();
  const {
    palette: {
      common: { mediumGray },
    },
  } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const logout = () => {};
  const isLogoutLoading = false;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    setIsSignIn(true);
    localStorage.removeItem(TOKEN);
  };

  useEffect(() => {
    setIsSignIn(!userTier || isLogoutLoading);
  }, [isLogoutLoading, setIsSignIn, userTier]);

  if (userTier === 'unlogged' || !localStorage.getItem(TOKEN))
    return (
      <Button
        disabled={!userTier || isLogoutLoading}
        onClick={handleSignIn}
        variant='contained'
        color='secondary'
        sx={{ textTransform: 'capitalize', p: '10px' }}
      >
        <Typography variant='text14Book'>{t('sign_in')}</Typography>
      </Button>
    );

  return (
    <>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar alt='User Avatar' src={AvartarImg} />
      </IconButton>
      {/* TODO: need to write and use common menu component (projects, documents) */}
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Stack direction='row' alignItems='center'>
            <Avatar alt='User Avatar' src={AvartarImg} />
            <Box sx={{ minWidth: 100, px: 0.5 }}>
              <Typography variant='text15Book'>{t('my_account')}</Typography>
            </Box>
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem component='a' href='https://app.neilpatel.com/en/settings/account_billing'>
          <Stack direction='row' alignItems='center'>
            <Avatar sx={{ bgcolor: 'transparent', color: mediumGray }}>
              <CreditCard fontSize='small' />
            </Avatar>
            <Box sx={{ minWidth: 100, px: 0.5 }}>
              <Typography variant='text15Book'>{t('account_billing_tab')}</Typography>
            </Box>
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            setIsSignIn(true);
            localStorage.removeItem(TOKEN);
            handleClose();
          }}
        >
          <Stack direction='row' alignItems='center'>
            <Avatar sx={{ bgcolor: 'transparent', color: mediumGray }}>
              <Logout fontSize='small' />
            </Avatar>
            <Box sx={{ minWidth: 100, px: 0.5 }}>
              <Typography variant='text15Book'>{t('sign_out')}</Typography>
            </Box>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};
