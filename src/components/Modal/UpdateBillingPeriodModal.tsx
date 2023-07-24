import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, Divider, Radio, Stack, useTheme } from '@mui/material'
import { Alert, Dialog, DialogButton, Typography } from '@ubersuggest/common-ui'
import { IPlanInterval, ITier, PLAN_INTERVALS, YEARLY_PLAN_SAVING_PERCENTAGE } from 'configs'
import { useMediaHelper } from 'hooks'
import { useLazyGetMeQuery, useLazyGetSubscriptionQuery, useUpdatePlanMutation } from 'store/api'
import {
  userPlanExpiryDateSelector,
  userPlanIntervalSelector,
  userSubscriptionOptionsSelector,
} from 'store/reducers/user'

interface ISubscriptionOption {
  subscriptionOption: {
    planCode?: string
    planPrice?: number
    planInterval: string
    currency: string
    region: {
      lang: any
      locId: number
    }
    tier: ITier
  }
  onSelect: () => void
  isActive: boolean
}

const SubscriptionOption = ({
  subscriptionOption: { planInterval, planPrice = 0 },
  onSelect,
  isActive,
}: ISubscriptionOption) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { isDesktop } = useMediaHelper()

  const planDetails = {
    [PLAN_INTERVALS.MONTHLY]: {
      label: t('billed_monthly'),
      description: t('ubersuggest_pro_is', {
        0: planPrice, // todo: format currency
        1: planPrice * 12, // todo: format currency
      }),
      period: t('nper_month'),
    },
    [PLAN_INTERVALS.YEARLY]: {
      label: t('billed_yearly'),
      description: t('ubersuggest_pro_save', {
        0: planPrice, // todo: format currency
        1: YEARLY_PLAN_SAVING_PERCENTAGE,
      }),
      period: t('nper_year'),
    },
    [PLAN_INTERVALS.LIFETIME]: {
      label: t('lifetime_membership'),
      description: t('free_then_lifetime', {
        0: planPrice, // todo: format currency
      }),
      period: t('onetime_fee'),
    },
  }
  const currentPlan = planDetails[planInterval as IPlanInterval]

  return (
    <Stack
      direction={!isDesktop ? 'column' : 'row'}
      alignItems='center'
      justifyContent='space-between'
      mb='10px'
      sx={{
        cursor: 'pointer',
        border: isActive
          ? `1px solid ${theme.palette.common.orange.main}`
          : `1px solid ${theme.palette.common.lightGray[50]}`,
        padding: '26px 20px',
      }}
      onClick={onSelect}
    >
      <Stack direction='column'>
        <Stack direction='row' alignItems='center'>
          <Radio size='small' disableRipple checked={isActive} sx={{ p: 0, mr: 0.5 }} />
          <Typography sx={{ lineHeight: '16px' }}>{currentPlan.label}</Typography>
        </Stack>

        <Typography
          sx={{ lineHeight: '15px', textAlign: 'left' }}
          variant='text14Light'
          color={theme.palette.common.darkGray[50]}
          ml='20px'
          mt='6px'
        >
          {currentPlan.description}
        </Typography>
      </Stack>

      <Stack direction='column' mt={!isDesktop ? 1 : 0}>
        <Typography color={theme.palette.common.orange.main} variant='text20Medium' lineHeight='20px'>
          {`${planPrice}`}
        </Typography>

        <Typography color={theme.palette.common.darkGray[50]} variant='text14Light' lineHeight='15px'>
          {currentPlan.period}
        </Typography>
      </Stack>
    </Stack>
  )
}

interface IUpdateBillingPeriodModal {
  open: boolean
  onClose: () => void
}

export const UpdateBillingPeriodModal = ({ open = false, onClose }: IUpdateBillingPeriodModal) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [updatePlan, { isLoading }] = useUpdatePlanMutation()

  const subscriptionOptions = useSelector(userSubscriptionOptionsSelector)
  const planInterval = useSelector(userPlanIntervalSelector)
  const renewDate = useSelector(userPlanExpiryDateSelector)

  const [selectedPlan, setSelectedPlan] = useState(
    subscriptionOptions.find((option) => option.planInterval === planInterval),
  )
  const [error, setError] = useState<string | null>(null)

  const getDescription = () => {
    if (selectedPlan) {
      const { planInterval: selectedPlanInterval, planPrice } = selectedPlan

      if (planInterval === PLAN_INTERVALS.MONTHLY && selectedPlanInterval === PLAN_INTERVALS.MONTHLY) {
        return t('your_ubersuggest_pro_renew_monthly', { 0: renewDate, 1: planPrice })
      } else if (planInterval === PLAN_INTERVALS.MONTHLY && selectedPlanInterval === PLAN_INTERVALS.YEARLY) {
        return t('starting_on_ubersuggest_pro_yearly', { 0: renewDate, 1: planPrice })
      } else if (planInterval === PLAN_INTERVALS.YEARLY && selectedPlanInterval === PLAN_INTERVALS.MONTHLY) {
        return t('starting_on_ubersuggest_pro_monthly', { 0: renewDate, 1: planPrice })
      } else if (planInterval === PLAN_INTERVALS.YEARLY && selectedPlanInterval === PLAN_INTERVALS.YEARLY) {
        return t('your_ubersuggest_pro_renew_yearly', { 0: renewDate, 1: planPrice })
      } else if (planInterval === PLAN_INTERVALS.MONTHLY && selectedPlanInterval === PLAN_INTERVALS.LIFETIME) {
        return t('price_a_lifetime', { 0: planPrice })
      }
    }
    return ''
  }

  const onSubmit = async () => {
    try {
      if (selectedPlan?.planCode) {
        await updatePlan(selectedPlan.planCode).unwrap()
        onClose()
      }
    } catch (err) {
      setError(t('card_error'))
    }
  }

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        title={t('change_billing_period')}
        size='xl'
        showTitleCloseButton
        actions={
          <DialogButton onClick={onSubmit} loading={isLoading} variant='outlined'>
            {t('confirm_changes')}
          </DialogButton>
        }
      >
        {error && (
          <Alert severity='error' sx={{ mb: 2, textAlign: 'left' }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Box>
          {[...subscriptionOptions].reverse().map((subscriptionOption, index) => (
            <SubscriptionOption
              key={`subscription-option-${index}`}
              subscriptionOption={subscriptionOption}
              onSelect={() => setSelectedPlan(subscriptionOption)}
              isActive={selectedPlan?.planInterval === subscriptionOption.planInterval}
            />
          ))}
        </Box>

        <Divider sx={{ margin: '40px 0 20px' }} />

        {planInterval !== selectedPlan?.planInterval && (
          <Typography variant='text14' mb='25px' component='p'>
            {t('change_summary')}
          </Typography>
        )}

        <Typography variant='text14Light' color={theme.palette.common.darkGray[50]} mb='15px' component='p'>
          {getDescription()}
        </Typography>

        {planInterval !== selectedPlan?.planInterval && (
          <Typography variant='text14Light' color={theme.palette.common.darkGray[50]} component='p'>
            {t('change_plan_addon_warning')}
          </Typography>
        )}
      </Dialog>
    </>
  )
}
