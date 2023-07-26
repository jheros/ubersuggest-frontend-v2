import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, List, ListItem, ListItemIcon, Stack, useTheme } from '@mui/material'
import { Dialog, Alert, Typography, Button } from '@ubersuggest/common-ui'
import { ReactComponent as CheckIcon } from 'assets/svg/icons/check.svg'
import { PLAN_INTERVALS, TIERS } from 'configs'
import { useFormatNumber } from 'hooks/useFormatNumber'
import { IRootState } from 'store'
import { useUpdatePlanMutation } from 'store/api'
import { planByTierAndIntervalSelector } from 'store/reducers/plan'
import { userTierSelector } from 'store/reducers/user'
import { getErrorMessage } from 'utils/error'

const tier0Bullets = [
  'special_lifetime_modal_bullet_one',
  'special_lifetime_modal_bullet_two',
  'special_lifetime_modal_bullet_two2',
  'special_lifetime_modal_bullet_three',
  'special_lifetime_modal_bullet_four',
  'special_lifetime_modal_bullet_five',
  'special_lifetime_modal_bullet_six',
]

const otherBullets = ['lifetime_offer_bullet1', 'lifetime_offer_bullet2', 'lifetime_offer_bullet3']

export const SpecialLifetimeOfferModal: React.FC<{
  open: boolean
  onClose: () => void
  onDeny: () => void
}> = ({ open, onClose, onDeny }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [updatePlan, { isLoading: isUpdatingPlan }] = useUpdatePlanMutation()
  const { formatCurrency } = useFormatNumber()

  const tier = useSelector(userTierSelector)
  const { planCode: lifetimePlanCode, planPrice: lifetimePlanPrice } = useSelector((state: IRootState) =>
    planByTierAndIntervalSelector(state, tier, PLAN_INTERVALS.LIFETIME),
  )

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelAccount = async () => {
    setIsLoading(true)
    try {
      await onDeny()
      onClose()
    } catch (err) {
      setError(t('card_error'))
    }
    setIsLoading(false)
  }

  const handleUpgrade = async () => {
    try {
      await updatePlan(lifetimePlanCode).unwrap()
      //   todo: discuss this logic using message
      //   sendMessage('SUBSCRIPTION_UPGRADED', { tier, plan, paymentMethod })
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const renderTier0 = () => {
    return (
      <Box textAlign='left'>
        <Typography
          variant='text16'
          lineHeight='24px'
          boldColor='inherit'
          dangerouslySetInnerHTML={{
            __html: t('special_lifetime_modal_includes'),
          }}
          paragraph
          m={0}
        />
        <List>
          {tier0Bullets.map((bullet, index) => (
            <ListItem key={`bullet-item-${index}`} disablePadding sx={{ alignItems: 'flex-start' }}>
              <ListItemIcon sx={{ minWidth: 'unset', mr: '10px', mt: '5px' }}>
                <CheckIcon />
              </ListItemIcon>
              <Typography
                variant='text14Light'
                lineHeight='28px'
                boldColor='inherit'
                dangerouslySetInnerHTML={{ __html: t(bullet) }}
              ></Typography>
            </ListItem>
          ))}
        </List>
        <Typography
          variant='text12Light'
          lineHeight='20px'
          boldColor='inherit'
          dangerouslySetInnerHTML={{
            __html: t('special_lifetime_modal_note', {
              0: `<a href="https://ubersuggest.zendesk.com/hc/en-us/articles/4405442751771-Tier-0-Lifetime-Plan" target="_blank" rel="noopener noreferrer">${t(
                'special_lifetime_modal_checkout_this_article',
              )}</a>`,
            }),
          }}
          paragraph
          m={0}
        />
      </Box>
    )
  }

  const renderLifetime = () => {
    return (
      <List>
        {otherBullets.map((bullet, index) => (
          <ListItem key={`bullet-item-${index}`} disablePadding sx={{ alignItems: 'flex-start' }}>
            <ListItemIcon sx={{ minWidth: 'unset', mr: '10px', mt: '5px' }}>
              <CheckIcon />
            </ListItemIcon>
            <Typography
              variant='text14Light'
              lineHeight='28px'
              boldColor='inherit'
              dangerouslySetInnerHTML={{ __html: t(bullet) }}
            ></Typography>
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      title={
        <>
          <Typography variant='text16Book' lineHeight={1} color={theme.palette.primary.main} paragraph m={0}>
            {t('limited_time_offer')}
          </Typography>
          <Typography
            variant='text24'
            lineHeight={1}
            color={theme.palette.common.darkGray.main}
            boldColor={theme.palette.common.darkGray.main}
            mt='20px'
            mb={0}
            dangerouslySetInnerHTML={{
              __html: t(tier === TIERS.TIER0 ? 'special_lifetime_modal_heading' : 'lifetime_offer_heading', {
                0: formatCurrency(lifetimePlanPrice),
              }),
            }}
            paragraph
          />
          <Typography
            variant='text14Light'
            lineHeight={1}
            color={theme.palette.common.darkGray[70]}
            mt={2}
            mb={0}
            dangerouslySetInnerHTML={{
              __html: t(tier === TIERS.TIER0 ? 'special_lifetime_modal_desp' : 'lifetime_offer_sub_heading'),
            }}
            paragraph
          />
        </>
      }
      actions={
        <Stack direction='row' spacing={1.5} display='flex' alignItems='flex-start'>
          <Button
            size='xlarge'
            variant='outlined'
            color='tertiary'
            onClick={onClose}
            disabled={isLoading || isUpdatingPlan}
          >
            {t('button_keep_account')}
          </Button>
          <Box textAlign='center'>
            <Button
              size='xlarge'
              variant='contained'
              color='dark'
              onClick={handleCancelAccount}
              loading={isLoading}
              disabled={isUpdatingPlan}
            >
              {t('no_thanks')}
            </Button>
            <Typography variant='text12Light' lineHeight='20px' mt={1.5} mb={0} paragraph>
              {t('cancel_account')}
            </Typography>
          </Box>
          <Box textAlign='center'>
            <Button
              size='xlarge'
              variant='contained'
              onClick={handleUpgrade}
              loading={isUpdatingPlan}
              disabled={isLoading}
            >
              {t('get_lifetime_access_button', { 0: lifetimePlanPrice })}
            </Button>
            <Typography variant='text12Light' lineHeight='20px' mt={1.5} mb={0} paragraph>
              {t('money_guarantee')}
            </Typography>
          </Box>
        </Stack>
      }
      size='xxl'
      disableTitleTypography
    >
      {error && (
        <Alert severity='error' sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {tier === TIERS.TIER0 ? renderTier0() : renderLifetime()}
    </Dialog>
  )
}
