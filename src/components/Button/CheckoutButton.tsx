import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Stack, SvgIcon, useTheme } from '@mui/material'
import { Button, Typography, IButton } from '@ubersuggest/common-ui'
import { IPlanInterval, ITier, PLAN_INTERVALS, TIERS } from 'configs'
import { isSignedInSelector } from 'store/reducers/auth'
import { isLifetimePlanSelector, userTierSelector } from 'store/reducers/user'

export const CheckoutButton: React.FC<
  { planInterval: IPlanInterval; tier: ITier; icon?: React.ElementType; textVariant?: string } & IButton
> = ({ tier, planInterval, icon, textVariant = 'text16Medium', ...props }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isSignedIn = useSelector(isSignedInSelector)
  const isLifetimePlan = useSelector(isLifetimePlanSelector)
  const currentTier = useSelector(userTierSelector)

  let buttonText = planInterval === PLAN_INTERVALS.MONTHLY ? t('start_my_trial') : t('get_started')

  if (isSignedIn) {
    if (currentTier !== TIERS.FREE_TIER) {
      if (tier === currentTier) {
        if (planInterval === PLAN_INTERVALS.LIFETIME && !isLifetimePlan) {
          buttonText = t('upgrade')
        } else {
          buttonText = t('current_plan')
        }
      } else if (tier < currentTier) {
        buttonText = t('select_plan')
      } else if (tier > currentTier) {
        buttonText = t('upgrade')
      }
    } else {
      if (planInterval === PLAN_INTERVALS.LIFETIME) {
        buttonText = t('lifetime_plan_button')
      } else {
        buttonText = t('start_my_trial')
      }
    }
  }

  return (
    <Button {...props} disabled={currentTier === tier && planInterval !== PLAN_INTERVALS.LIFETIME}>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing='10px'>
        <Typography variant={textVariant} sx={{ textTransform: 'capitalize' }}>
          {buttonText}
        </Typography>
        {icon && (
          <SvgIcon component={icon} sx={{ fontSize: '24px', stroke: theme.palette.common.white }} inheritViewBox />
        )}
      </Stack>
    </Button>
  )
}
