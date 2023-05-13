import { useTranslation } from 'react-i18next';
import { Button, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Typography } from 'components';
import checkOrangeSvg from 'assets/svg/check-orange.svg';
import { ReactComponent as UpdateIcon } from 'assets/svg/update-icon.svg';

const CTAWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  margin: 12,
  marginTop: 48,
  border: `1px solid ${theme.palette.lightGray.main}`,
  padding: 16,
  paddingTop: 41,
  backgroundColor: theme.palette.lightGray[10],
}));

const UpdateIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: -30,
  left: 'calc(50% - 31px)',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${theme.palette.lightGray.main}`,
  borderTopLeftRadius: 31,
  borderTopRightRadius: 31,
  borderBottom: 0,
  width: 60,
  height: 30,
  backgroundColor: theme.palette.lightGray[10],
}));

const UpdateIconContent = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
  borderRadius: 25,
  width: 50,
  height: 50,
  backgroundColor: 'white',
  boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.07)',
});

const List = styled('ul')({
  padding: 0,
  width: '100%',
  margin: 0,
  listStyle: 'none',
});

const Item = styled('li')(({ theme }) => ({
  margin: '7px 0',
  paddingLeft: 30,
  color: theme.palette.darkGray.main,
  backgroundImage: `url('${checkOrangeSvg}')`,
  backgroundPosition: 'left',
  backgroundRepeat: 'no-repeat',
}));

const bullets = ['pay_nothing_today', 'cancel_anytime', 'zero_risk_free_trial'];

export const TrialNotification = () => {
  const {
    palette: { darkGray },
  } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <CTAWrapper>
        <UpdateIconWrapper>
          <UpdateIconContent>
            <UpdateIcon />
          </UpdateIconContent>
        </UpdateIconWrapper>
        <Typography font='medium' variant='body1' sx={{ lineHeight: 'normal' }}>
          {t('start_free_trial_to_unlock', { '0': 7 })}
        </Typography>
        <List>
          {bullets.map((text, index) => (
            <Item key={index}>
              <Typography variant='body2' color={darkGray[50]}>
                {t(text)}
              </Typography>
            </Item>
          ))}
        </List>
        <Button variant='contained' sx={{ borderRadius: '2px', height: 34 }}>
          <Typography variant='body2' font='medium' sx={{ textTransform: 'none', color: 'white' }}>
            {t('sign_in')}
          </Typography>
        </Button>
        {/* <PrimaryButton
          theme='orange'
          tag={translate('get_started')}
          width='100%'
          mobileWidth='100%'
          style={{
            marginTop: '8px',
            minHeight: '36px',
            lineHeight: '14px',
            boxShadow: '0px 4px 8px 0px rgba(241, 100, 52, 0.3)',
          }}
          onClick={() => {

          }}
        /> */}
        PrimaryButton
      </CTAWrapper>
    </>
  );
};
