import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Button, Typography } from 'components'
import checkOrangeSvg from 'assets/svg/check-orange.svg'
import { ReactComponent as UpdateIcon } from 'assets/svg/update-icon.svg'

const TrialNotificationWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  margin: 12,
  marginTop: 48,
  border: `1px solid ${theme.palette.common.lightGray.main}`,
  padding: 16,
  paddingTop: 41,
  backgroundColor: theme.palette.common.lightGray[10],
}))

const UpdateIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: -30,
  left: 'calc(50% - 31px)',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${theme.palette.common.lightGray.main}`,
  borderTopLeftRadius: 31,
  borderTopRightRadius: 31,
  borderBottom: 0,
  width: 60,
  height: 30,
  backgroundColor: theme.palette.common.lightGray[10],
}))

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
})

const List = styled('ul')({
  padding: 0,
  width: '100%',
  margin: 0,
  listStyle: 'none',
})

const Item = styled('li')(({ theme }) => ({
  margin: '7px 0',
  paddingLeft: 30,
  color: theme.palette.common.darkGray.main,
  backgroundImage: `url('${checkOrangeSvg}')`,
  backgroundPosition: 'left',
  backgroundRepeat: 'no-repeat',
}))

const bullets = ['pay_nothing_today', 'cancel_anytime', 'zero_risk_free_trial']

export const TrialNotification = () => {
  const {
    palette: {
      common: { darkGray },
    },
  } = useTheme()
  const { t } = useTranslation()

  return (
    <>
      <TrialNotificationWrapper>
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
        <Button
          variant='contained'
          size='large'
          sx={{
            boxShadow: '0px 4px 8px 0px rgba(241, 100, 52, 0.3)',
            width: '100%',
            textTransform: 'uppercase',
            marginTop: 1.5,
          }}
        >
          <Typography variant='text12Medium' sx={{ color: 'white', letterSpacing: 2 }}>
            {t('get_started')}
          </Typography>
        </Button>
      </TrialNotificationWrapper>
    </>
  )
}
