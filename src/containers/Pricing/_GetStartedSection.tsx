import { useTranslation } from 'react-i18next'

import { Box, useTheme } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { CheckoutButton } from 'components'
import { PLAN_INTERVALS, TIERS } from 'configs'

export const GetStartedSection = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        padding: '78px 15px',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
      }}
    >
      <Typography
        color={theme.palette.common.white}
        variant='text28Medium'
        lineHeight='1.3em'
        textAlign='center'
        margin='0'
        paragraph
      >
        {t('everything_you_need')}
      </Typography>
      <Typography
        color={theme.palette.common.white}
        variant='text28'
        lineHeight='1.3em'
        textAlign='center'
        margin='0 0 35px'
        paragraph
      >
        {t('find_kw_optimize')}
      </Typography>
      <CheckoutButton
        tier={TIERS.TIER1}
        planInterval={PLAN_INTERVALS.LIFETIME}
        variant='contained'
        color='primary'
        size='xlarge'
        wrapperSx={{ mx: 'auto', mb: '30px' }}
        sx={{
          backgroundColor: theme.palette.common.white,
          color: theme.palette.primary.main,
          minWidth: '226px',
          '&:hover': { color: theme.palette.common.white },
        }}
      />
      <Typography
        variant='text20'
        lineHeight='1.5em'
        color={theme.palette.common.white}
        textAlign='center'
        margin='0'
        paragraph
      >
        {t('money_guarantee')}
      </Typography>
    </Box>
  )
}
