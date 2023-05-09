import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import useLocalStorageKeyObserver from 'hooks/useCustomEvent';
import { MainBar, MainSidebar } from 'components';

const navHeight = 58;

export const MainTemplate: React.FC = () => {
  const { t } = useTranslation();
  const { value: userTier } = useLocalStorageKeyObserver('user');

  const [open, setOpen] = useState(true);
  const toggleDrawerOpen = () => {
    setOpen((prev: boolean) => !prev);
  };

  return (
    <>
      <MainBar toggleDrawerOpen={toggleDrawerOpen} navHeight={navHeight} userTier={userTier} />
      <div className='container'>
        <MainSidebar open={open} setOpen={setOpen} navHeight={navHeight} handleModalOpen={() => {}} />
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </>
  );
};
