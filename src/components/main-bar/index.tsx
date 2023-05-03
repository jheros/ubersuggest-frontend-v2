import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar, Stack, Divider, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { UberLogo, LanguageSelector, AccountMenu } from 'components';

interface IMainBar {
  toggleDrawerOpen: () => void;
  navHeight: number;
  userTier: string;
}

export const MainBar: React.FC<IMainBar> = ({ toggleDrawerOpen, navHeight, userTier }) => {
  const {
    palette: {
      common: { lightGray, white },
    },
  } = useTheme();
  const { i18n } = useTranslation();

  return (
    <>
      <AppBar
        position='fixed'
        sx={{
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
          background: white,
          boxShadow: 'none',
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{
            px: 2,
            borderBottom: `1px solid ${lightGray}`,
            height: `${navHeight}px`,
            paddingRight: '45px',
          }}
        >
          <Stack direction='row' alignItems='center'>
            <Link to='/'>
              <UberLogo />
            </Link>
            <Divider orientation='vertical' flexItem sx={{ ml: 48, mr: 45 }} />
          </Stack>
          <Stack direction='row' alignItems='center' spacing={3}>
            <LanguageSelector languageCode={i18n.language} />
            <AccountMenu userTier={userTier} setIsSignIn={() => {}} />
          </Stack>
        </Stack>
      </AppBar>
    </>
  );
};
