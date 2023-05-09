import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
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
      <p>{t('dashboard')}</p>
    </>
  );
};

export default Dashboard;
