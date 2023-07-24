import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import { Alert as MuiAlert, AlertTitle, Collapse, Fade, Grid, Radio, Stack } from '@mui/material'
import { useTheme, InputBase, FormHelperText, Box, FormControl, InputLabel, FormLabel } from '@mui/material'
import { Typography, Dialog, Alert } from '@ubersuggest/common-ui'
import DinersCard from 'assets/svg/checkout/card-diners.png'
import { ReactComponent as JcbCard } from 'assets/svg/checkout/card-jcb.svg'
import { ReactComponent as MasterCard } from 'assets/svg/checkout/card-master.svg'
import { ReactComponent as UnionpayCard } from 'assets/svg/checkout/card-unionpay.svg'
import { ReactComponent as VisaCard } from 'assets/svg/checkout/card-visa.svg'
import { PasswordInput, PaymentMethodButton } from 'components'
import { PAYMENT_METHODS } from 'configs/payment'
import { useAlertContext } from 'contexts'
import { useMediaHelper } from 'hooks'
import { IRootState } from 'store'
import { useChangeLoginMethodToEmailMutation, useUpdatePaymentMethodMutation } from 'store/api'
import { isPaidUserSelector, userPaymentMethodSelector } from 'store/reducers/user'
import * as yup from 'yup'

interface IUpdatePaymentMethodModal {
  open: boolean
  onClose: () => void
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    postalCode: yup.string().required(),
  })
  .required()

export const UpdatePaymentMethodModal = ({ open = false, onClose }: IUpdatePaymentMethodModal) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { isSmallMobile } = useMediaHelper()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      postalCode: '',
    },
  })
  const [updatePaymentMethod, { isLoading }] = useUpdatePaymentMethodMutation()
  const { addAlert } = useAlertContext()

  const isPaidUser = useSelector(isPaidUserSelector)
  const paymentMethod = useSelector(userPaymentMethodSelector)

  const [activePaymentMethod, setActivePaymentMethod] = useState(
    paymentMethod === PAYMENT_METHODS.PAYPAL ? PAYMENT_METHODS.PAYPAL : PAYMENT_METHODS.CREDIT_CARD,
  )

  const onSubmit = async () => {
    // todo: retrieve recurly token
    const tokenId = ''
    const threeDSecureToken = ''

    try {
      await updatePaymentMethod({ tokenId, threeDSecureToken }).unwrap()
      onClose && onClose()
    } catch (err: any) {
      if (err.response) {
        const { code } = err.response.data

        if (code === 'three_d_secure_action_required') {
          // todo:
        }
      }

      addAlert({ severity: 'error', message: t('card_error') })
      onClose && onClose()
    }
  }

  const handlePaypalClick = () => {
    setActivePaymentMethod(PAYMENT_METHODS.PAYPAL)

    // todo: integrate recurly js
  }

  const handleCreditCardClick = () => {
    setActivePaymentMethod(PAYMENT_METHODS.CREDIT_CARD)
  }

  return (
    <Dialog
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      title={t('update_billing_info')}
      closeButtonText={t('cancel')}
      submitButtonText={t('save_changes')}
      isSubmitting={isLoading}
      size='xl'
      showTitleCloseButton
    >
      <>
        {isPaidUser && !paymentMethod && (
          <Alert severity='warning' sx={{ mb: 5 }}>
            {t('old_lifetime_update_billing_info_modal')}
          </Alert>
        )}

        <Box>
          <PaymentMethodButton
            method={PAYMENT_METHODS.CREDIT_CARD}
            active={activePaymentMethod === PAYMENT_METHODS.CREDIT_CARD}
            onClick={handleCreditCardClick}
            sx={{ mx: '5px' }}
          />
          <PaymentMethodButton
            method={PAYMENT_METHODS.PAYPAL}
            active={activePaymentMethod === PAYMENT_METHODS.PAYPAL}
            onClick={handlePaypalClick}
            sx={{ mx: '5px' }}
          />
        </Box>

        {activePaymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
          <>
            <Box display='flex' alignItems='center' my='10px'>
              <Radio checked={true} size='small' sx={{ mr: 2 }} />
              <Stack
                display={'inline-flex'}
                spacing='10px'
                direction={'row'}
                alignItems='center'
                sx={{ '& svg, & img': { width: isSmallMobile ? '28px' : 'auto' } }}
              >
                <VisaCard />
                <MasterCard />
                <img src={DinersCard} />
                <JcbCard />
                <UnionpayCard />
              </Stack>
            </Box>

            <Box
              component='form'
              textAlign='left'
              mt={3}
              onSubmit={handleSubmit(onSubmit)}
              sx={{ width: '100%' }}
              noValidate
              autoComplete='off'
            >
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item sm={6} xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>{t('first_name')}</FormLabel>
                    <Controller
                      name='firstName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <InputBase
                          {...field}
                          placeholder={t('first_name')}
                          fullWidth
                          sx={{ marginBottom: !errors.firstName ? '10px' : 0 }}
                          error={!!errors.firstName}
                        />
                      )}
                    />
                    {errors.firstName && (
                      <FormHelperText error sx={{ marginBottom: '10px' }}>
                        {t('require_first_name')}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>{t('last_name')}</FormLabel>
                    <Controller
                      name='lastName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <InputBase
                          {...field}
                          placeholder={t('last_name')}
                          fullWidth
                          sx={{ marginBottom: !errors.lastName ? '10px' : 0 }}
                          error={!!errors.lastName}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <FormHelperText error sx={{ marginBottom: '10px' }}>
                        {t('require_last_name')}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item sm={5} xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>{t('credit_card_number')}</FormLabel>
                    {/* todo: add recurly element */}
                  </FormControl>
                </Grid>

                <Grid container item sm={7} xs={12}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <FormLabel>{t('security_code_cvc')}</FormLabel>
                      {/* todo: add recurly element */}
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <FormLabel>{t('expiration_month')}</FormLabel>
                      {/* todo: add recurly element */}
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <FormLabel>{t('expiration_year')}</FormLabel>
                      {/* todo: add recurly element */}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>{t('country')}</FormLabel>
                    {/* todo: add country select */}
                  </FormControl>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>{t('postal_zip_code')}</FormLabel>
                    <Controller
                      name='postalCode'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <InputBase
                          {...field}
                          placeholder={t('postal_zip_code')}
                          fullWidth
                          sx={{ marginBottom: !errors.postalCode ? '10px' : 0 }}
                          error={!!errors.postalCode}
                        />
                      )}
                    />
                    {errors.postalCode && (
                      <FormHelperText error sx={{ marginBottom: '10px' }}>
                        {t('require_postal_code')}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </>
    </Dialog>
  )
}
