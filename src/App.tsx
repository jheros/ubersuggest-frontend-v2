import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UberRouter from './routes';
import useLocalStorageKeyObserver from 'hooks/useCustomEvent';

import { AppProvider } from './context';
import { Button, Typography } from '@mui/material';
import { MainBar, MainSidebar } from 'components';
import './App.css';

const navHeight = 58;

function App() {
  const { t } = useTranslation();
  const { value: userTier } = useLocalStorageKeyObserver('user');

  const [open, setOpen] = useState(true);
  const toggleDrawerOpen = () => {
    setOpen((prev: boolean) => !prev);
  };

  return (
    <AppProvider>
      <UberRouter />

      <MainBar toggleDrawerOpen={toggleDrawerOpen} navHeight={navHeight} userTier={userTier} />

      <div className='container'>
        <MainSidebar open={open} setOpen={setOpen} navHeight={navHeight} handleModalOpen={() => {}} />
        <div className='content'>
          <Button
            variant='contained'
            sx={{
              textTransform: 'none',
              height: '40px',
              marginTop: '16px',
              width: '148px',
              whiteSpace: 'nowrap',
            }}
          >
            <span>Nice</span>
          </Button>
          <Typography variant='h4' sx={{ fontWeight: 500, textAlign: 'center' }}>
            Heading
          </Typography>
          <p>{t('achievable_kw_beta_tooltip')}</p>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
