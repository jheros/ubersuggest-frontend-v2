import { PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, ButtonProps, Divider, Grid, Link, LinkProps, SvgIcon, useTheme } from '@mui/material'
import { TypographyProps } from '@mui/system'
import { Button, Typography } from '@ubersuggest/common-ui'
import { ReactComponent as DownloadIcon } from 'assets/svg/icons/download.svg'
import {
  CancelSubscriptionModal,
  SpecialLifetimeOfferModal,
  UpdateBillingInformationModal,
  UpdateBillingPeriodModal,
  UpdatePaymentMethodModal,
} from 'components'
import { PLAN_INTERVALS, TIERS } from 'configs'
import { PAYMENT_METHODS } from 'configs/payment'
import { useCancelSubscriptionMutation, useSendCancelationFeedbackMutation } from 'store/api'
import {
  is30DaysPeriodSelector,
  isCouponUserSelector,
  isSubscriptionCanceledSelector,
  userLastPaymentInfoSelector,
  userNextPaymentInfoSelector,
  userPaymentMethodSelector,
  userPlanEndDateSelector,
  userPlanIntervalSelector,
  userSubscriptionExternalProfileSelector,
  userSubscriptionStatusSelector,
  userTierSelector,
} from 'store/reducers/user'
import { formatDate } from 'utils/dateTime'

const VerticalDivider = () => {
  return (
    <Divider
      orientation='vertical'
      flexItem
      sx={{ mx: 3, mt: 0.5, borderColor: (theme) => theme.palette.common.lightGray[50], maxHeight: '20px' }}
    />
  )
}

const ButtonLink: React.FC<PropsWithChildren & LinkProps & TypographyProps & ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Link component='button' variant='text14Book' lineHeight='28px' {...props}>
      {children}
    </Link>
  )
}

export const BillingSection = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [cancelSubscription] = useCancelSubscriptionMutation()
  const [sendCancelationFeedback] = useSendCancelationFeedbackMutation()
  const tier = useSelector(userTierSelector)
  const paymentMethod = useSelector(userPaymentMethodSelector)
  const isSubscriptionCanceled = useSelector(isSubscriptionCanceledSelector)
  const planEndDate = useSelector(userPlanEndDateSelector)
  const planInterval = useSelector(userPlanIntervalSelector)
  const lastPaymentInfo = useSelector(userLastPaymentInfoSelector)
  const subscriptionStatus = useSelector(userSubscriptionStatusSelector)
  const nextPaymentInfo = useSelector(userNextPaymentInfoSelector)
  const isCouponUser = useSelector(isCouponUserSelector)
  const is30DaysPeriod = useSelector(is30DaysPeriodSelector)
  const subscriptionExternalProfile = useSelector(userSubscriptionExternalProfileSelector)

  const [isUpdatePaymentMethodModalOpen, setIsUpdatePaymentMethodModalOpen] = useState(false)
  const [isUpdateBillingInformationModalOpen, setIsUpdateBillingInformationModalOpen] = useState(false)
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = useState(false)
  const [isSpecialLifetimeOfferModalOpen, setIsSpecialLifetimeOfferModalOpen] = useState(false)
  const [cancelResponse, setCancelResponse] = useState<{ reason?: string; response?: string }>({})
  const [isUpdateBillingPeriodModalOpen, setIsUpdateBillingPeriodModalOpen] = useState(false)

  return (
    <Box>
      <Typography variant='text16Medium' mt={4} mb={2} paragraph>
        {t('billing_heading')}
      </Typography>

      <Grid container spacing={3}>
        <Grid container item spacing={3} md={4} sm={6} xs={12} alignSelf='flex-start'>
          <Grid item xs={12}>
            <Typography variant='text14Book'>{t('payment_method')}</Typography>
            {tier !== TIERS.FREE_TIER && (
              <Box display='flex' alignItems='center' mt={1}>
                {paymentMethod && (
                  <Typography variant='text16' lineHeight='28px'>
                    {paymentMethod === PAYMENT_METHODS.PAYPAL
                      ? t('paypal_account')
                      : t('credit_card_ending_in', { 0: paymentMethod })}
                  </Typography>
                )}

                {paymentMethod && <VerticalDivider />}

                <ButtonLink
                  disabled={isSubscriptionCanceled}
                  onClick={() => setIsUpdatePaymentMethodModalOpen(true)}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  {paymentMethod ? t('update') : t('add_payment')}
                </ButtonLink>

                {isUpdatePaymentMethodModalOpen && (
                  <UpdatePaymentMethodModal
                    open={isUpdatePaymentMethodModalOpen}
                    onClose={() => setIsUpdatePaymentMethodModalOpen(false)}
                  />
                )}
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant='text14Book'>{t('last_payment')}</Typography>
            {tier !== TIERS.FREE_TIER && lastPaymentInfo && (
              <Box display='flex' alignItems='flex-start' mt={1}>
                <Typography variant='text16' lineHeight='28px'>
                  {lastPaymentInfo}
                </Typography>

                <VerticalDivider />

                <Typography lineHeight='28px'>{t(subscriptionStatus)}</Typography>
              </Box>
            )}
          </Grid>

          {tier !== 'free' && (
            <Grid item xs={12}>
              <Button
                variant='outlined'
                size='large'
                href={subscriptionExternalProfile}
                target='_blank'
                disabled={!paymentMethod}
              >
                <SvgIcon component={DownloadIcon} sx={{ fontSize: '20px', mr: '10px' }} inheritViewBox />
                {t('click_invoice')}
              </Button>
            </Grid>
          )}
        </Grid>

        <Grid container item spacing={3} md={4} sm={6} xs={12} alignSelf='flex-start'>
          <Grid item xs={12}>
            <Typography variant='text14Book'>{t('billing_period')}</Typography>
            {tier !== TIERS.FREE_TIER && (
              <Box display='flex' alignItems='flex-start' mt={1}>
                <Typography variant='text16' lineHeight='28px'>
                  {isSubscriptionCanceled
                    ? t('subscription_canceled', { 0: formatDate(planEndDate, 'YYYY-MM-DD', 'MMMM DD, YYYY') })
                    : t(`plan_billed_${planInterval}`)}
                </Typography>

                <VerticalDivider />

                <ButtonLink
                  disabled={planInterval === PLAN_INTERVALS.LIFETIME || isSubscriptionCanceled}
                  onClick={() => setIsUpdateBillingPeriodModalOpen(true)}
                >
                  {t('update')}
                </ButtonLink>

                {isUpdateBillingPeriodModalOpen && (
                  <UpdateBillingPeriodModal
                    open={isUpdateBillingPeriodModalOpen}
                    onClose={() => setIsUpdateBillingPeriodModalOpen(false)}
                  />
                )}
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant='text14Book'>{t('next_payment')}</Typography>
            {tier !== TIERS.FREE_TIER && nextPaymentInfo && (
              <>
                <Typography variant='text16' lineHeight='28px' paragraph mt={1} mb={0}>
                  {nextPaymentInfo}
                </Typography>
                {isCouponUser && (
                  <Typography color={theme.palette.common.gray.main} lineHeight='18px' paragraph mt={1} mb={0}>
                    {t('no_coupons_no_discounts')}
                  </Typography>
                )}
              </>
            )}
          </Grid>
        </Grid>

        <Grid container item spacing={3} md={4} sm={6} xs={12} alignSelf='flex-start'>
          <Grid item xs={12}>
            <Typography variant='text14Book'>{t('billing_information')}</Typography>
            {tier !== TIERS.FREE_TIER && (
              <Box mt={1}>
                <ButtonLink
                  disabled={isSubscriptionCanceled}
                  onClick={() => setIsUpdateBillingInformationModalOpen(true)}
                >
                  {t('update')}
                </ButtonLink>

                {isUpdateBillingInformationModalOpen && (
                  <UpdateBillingInformationModal
                    open={isUpdateBillingInformationModalOpen}
                    onClose={() => setIsUpdateBillingInformationModalOpen(false)}
                  />
                )}
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant='text14Book'>{t('cancel_subscription')}</Typography>
            {tier !== TIERS.FREE_TIER && (
              <Box mt={1}>
                <ButtonLink
                  disabled={(planInterval === PLAN_INTERVALS.LIFETIME && !is30DaysPeriod) || isSubscriptionCanceled}
                  onClick={() => setIsCancelSubscriptionModalOpen(true)}
                >
                  {t('cancel')}
                </ButtonLink>

                {isCancelSubscriptionModalOpen && (
                  <CancelSubscriptionModal
                    open={isCancelSubscriptionModalOpen}
                    onClose={(hasSpecialLifetimeOffer, reason, response) => {
                      setIsCancelSubscriptionModalOpen(false)
                      if (hasSpecialLifetimeOffer) {
                        setCancelResponse({ reason, response })
                        setIsSpecialLifetimeOfferModalOpen(true)
                      }
                    }}
                  />
                )}

                {isSpecialLifetimeOfferModalOpen && (
                  <SpecialLifetimeOfferModal
                    open={isSpecialLifetimeOfferModalOpen}
                    onClose={() => setIsSpecialLifetimeOfferModalOpen(false)}
                    onDeny={async () => {
                      await cancelSubscription().unwrap()
                      await sendCancelationFeedback({
                        category: cancelResponse.reason || '',
                        notes: cancelResponse.response || '',
                        status: 'completed',
                      }).unwrap()
                      //   todo
                      //   kisssmetrickTracking(reason, tier, plan)
                    }}
                  />
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
