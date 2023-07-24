import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Paper, SvgIcon } from '@mui/material'
import { styled } from '@mui/system'
import { Button, fonts, Typography } from '@ubersuggest/common-ui'
import { ReactComponent as InfoIcon } from 'assets/svg/icons/info.svg'
import { RouterLink } from 'components'
import { PLAN_INTERVALS, PLAN_PRICE_BY_INTERVAL, TIER_INFO, TIERS } from 'configs'
import { useAlertContext } from 'contexts'
import { useNavigateWithLang } from 'hooks'
import { ROUTES } from 'routes'
import { IRootState } from 'store'
import { useRenewSubscriptionMutation } from 'store/api'
import {
  isRenewableSelector,
  isSubUserSelector,
  userAddonCountSelector,
  userAddonsPriceSelector,
  userCountryCodeSelector,
  userPlanEndDateSelector,
  userPlanIntervalSelector,
  userPlanPriceSelector,
  userTierSelector,
} from 'store/reducers/user'
import { formatDate } from 'utils/dateTime'
import { getErrorMessage } from 'utils/error'
import { getCurrencyAndRegion } from 'utils/location'

export const PlanPrice = styled('div')((props) => ({
  display: 'flex',
  color: props.color ? props.color : 'common.darkGray.main',
  fontSize: '20px',
  fontFamily: fonts.primary.light,
  margin: '24px 0 0',
  lineHeight: '36px',
  '& b': {
    color: props.color ? props.color : 'common.darkGray.main',
    fontFamily: fonts.primary.medium,
    fontWeight: 'normal',
    marginRight: 5,
  },
  '& small': {
    color: 'common.darkGray[50]',
    fontSize: '12px',
    lineHeight: '14px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 5,
    textAlign: 'left',
  },
  '& span': {
    fontFamily: fonts.primary.light,
    fontSize: '18px',
    lineHeight: '36px',
    display: 'flex',
    marginLeft: 5,
  },
}))

export const PlanSection = () => {
  const { t } = useTranslation()
  const { addAlert } = useAlertContext()
  const navigateWithLang = useNavigateWithLang()
  const [renewSubscription, { isLoading: isRenewing }] = useRenewSubscriptionMutation()

  const isSubUser = useSelector(isSubUserSelector)
  const tier = useSelector(userTierSelector)
  const planInterval = useSelector(userPlanIntervalSelector)
  const planPrice = useSelector(userPlanPriceSelector)
  const addonsPrice = useSelector(userAddonsPriceSelector)
  const addonCount = useSelector(userAddonCountSelector)
  const planEndDate = useSelector(userPlanEndDateSelector)
  const isRenewable = useSelector(isRenewableSelector)
  const countryCode = useSelector(userCountryCodeSelector)

  const { currency } = getCurrencyAndRegion(countryCode)
  const currencyAtSymbol = t('currency_at_symbol', {
    0: planPrice + (planInterval === PLAN_INTERVALS.MONTHLY ? addonsPrice : 0), // todo: formatNumber
    1: '', // * from v1: As we are determined to hide currency code, put empty string instead of `currency` variable.
  })
  const planPriceContent = t(PLAN_PRICE_BY_INTERVAL[planInterval], {
    0: currencyAtSymbol,
  })

  return (
    <Box display='flex' flexDirection='column' height={'100%'}>
      <Typography variant='text16Medium' mt={4} mb='10px' paragraph>
        {t('current_plan_heading')}
      </Typography>

      {isSubUser && (
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <SvgIcon component={InfoIcon} inheritViewBox sx={{ mr: 1, color: 'transparent' }} />
          {t('update_plan_invited_user_warning')}
        </Typography>
      )}

      <Paper
        variant='outlined'
        square
        sx={{
          p: '20px 30px',
          borderColor: 'common.lightGray.main',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Typography variant='text24Medium' align='center' m={0} sx={{ color: 'primary.main' }} paragraph>
          {`${t((TIER_INFO as any)[tier].title)} ${tier !== 'restart' ? t(planInterval) : ''}`}
        </Typography>
        <Typography variant='text14Light' mt={3} mb={0} align='center' sx={{ color: 'common.darkGray.main' }} paragraph>
          {t((TIER_INFO as any)[tier].description)}
        </Typography>
        {tier !== TIERS.FREE_TIER && (
          <PlanPrice
            dangerouslySetInnerHTML={{
              __html: planPriceContent,
            }}
          />
        )}
        {addonCount > 0 && (
          <Typography
            color='common.darkGray.main'
            boldColor='common.darkGray.main'
            variant='text14Light'
            m='4px 0 24px 0'
            align='center'
            dangerouslySetInnerHTML={{
              __html:
                planInterval === PLAN_INTERVALS.LIFETIME
                  ? t('value_addon_package', {
                      0: t('currency_at_symbol', { 0: addonsPrice, 1: currency }), // todo: formatNumber(addonsPrice, true, 0, region, false)
                      1: addonCount,
                    })
                  : t('plan_plus_addon', { 0: planPrice, 1: addonCount }), // todo: formatNumber(subscriptionPrice,true,2,region,false)
            }}
          />
        )}
        {tier !== TIERS.TIER3 && !isRenewable && (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              // todo:
              // kissmetricsRecordingEvent(KISSMETRICS_TRACK_EVENTS.clicked_upgrade, {
              //   [PROPERTY_NAMES.btn_location]: PROPERTY_VALUES.billing_settings,
              // })
              navigateWithLang(ROUTES.PRICING)
            }}
            sx={{
              margin: tier === TIERS.FREE_TIER ? '52px 0 0 0' : '0',
            }}
            disabled={isSubUser}
          >
            {tier === TIERS.FREE_TIER ? t('start_my_trial') : t('upgrade_plan_button')}
          </Button>
        )}
        {isRenewable && (
          <>
            <Box
              sx={{
                width: '100%',
                maxWidth: '220px',
                flexDirection: 'column',
                padding: '8px 24px',
                margin: '',
                backgroundColor: 'common.gray.10',
              }}
            >
              <Typography
                variant='text12'
                align='center'
                boldColor='common.darkGray.main'
                dangerouslySetInnerHTML={{
                  __html: t('plan_cancelled_warning', {
                    0: !!planEndDate && formatDate(planEndDate, 'YYYY-MM-DD', 'MMMM DD, YYYY'),
                  }),
                }}
              />
            </Box>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => {
                renewSubscription().catch((err) => {
                  addAlert({ severity: 'error', message: t(getErrorMessage(err)) })
                })
              }}
              wrapperSx={{
                width: '100%',
                maxWidth: '220px',
              }}
              fullWidth
              loading={isRenewing}
            >
              {t('renew_subscription')}
            </Button>
          </>
        )}
        {!isSubUser && (
          <Typography
            variant='text14Book'
            sx={{
              margin: tier === TIERS.TIER3 ? '56px 0 0 0' : '26px 0 0 0',
            }}
            paragraph
          >
            <RouterLink to={`/${ROUTES.PRICING}#pick_plan`} sx={{ ml: '5px' }}>
              {t('view_details')}
            </RouterLink>
          </Typography>
        )}
      </Paper>
    </Box>
  )
}
