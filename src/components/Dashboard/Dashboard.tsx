import { useTranslation } from 'react-i18next';

import { Typography } from 'components';

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant='h1'>{t('dashboard')}</Typography>
    </>
  );
};
