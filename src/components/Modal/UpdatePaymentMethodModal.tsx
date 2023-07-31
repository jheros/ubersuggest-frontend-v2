import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Radio, Stack } from '@mui/material'
import { InputBase, FormHelperText, Box, FormControl, FormLabel } from '@mui/material'
import {
  useRecurly,
  RecurlyProvider,
  Elements as RecurlyElements,
  CardNumberElement as RecurlyCardNumberElement,
  CardMonthElement as RecurlyCardMonthElement,
  CardYearElement as RecurlyCardYearElement,
  CardCvvElement as RecurlyCardCvvElement,
} from '@recurly/react-recurly'
import { Dialog, Alert } from '@ubersuggest/common-ui'
import DinersCard from 'assets/svg/checkout/card-diners.png'
import { ReactComponent as JcbCard } from 'assets/svg/checkout/card-jcb.svg'
import { ReactComponent as MasterCard } from 'assets/svg/checkout/card-master.svg'
import { ReactComponent as UnionpayCard } from 'assets/svg/checkout/card-unionpay.svg'
import { ReactComponent as VisaCard } from 'assets/svg/checkout/card-visa.svg'
import { PaymentMethodButton, RecurlyInput, RecurlyThreeDSecureActionModal } from 'components'
import { PAYMENT_METHODS, RECURLY_PUBLIC_KEY } from 'configs/payment'
import { useMediaHelper } from 'hooks'
import { useUpdatePaymentMethodMutation } from 'store/api'
import { isPaidUserSelector, userPaymentMethodSelector } from 'store/reducers/user'
import { ERR_3DS_ACTION_REQUIRED, getErrorMessage } from 'utils/error'
import * as yup from 'yup'

interface IUpdatePaymentMethodModal {
  open: boolean
  onClose: () => void
}

interface ICreditCardFormRef {
  submit(): void
}

interface IRecurlyPayPalRef {
  start(): void
}

type TField = 'cardNumber' | 'cardCvv' | 'cardMonth' | 'cardYear' | 'firstName' | 'lastName' | 'postalCode'

const fieldMap = {
  number: 'cardNumber',
  cvv: 'cardCvv',
  month: 'cardMonth',
  year: 'cardMonth',
  first_name: 'firstName',
  last_name: 'lastName',
  postal_code: 'postalCode',
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    postalCode: yup.string().required(),
    cardNumber: yup.boolean().test((value) => value === true), // * only check if field is valid or not
    cardCvv: yup.boolean().test((value) => value === true), // * only check if field is valid or not
    cardMonth: yup.boolean().test((value) => value === true), // * only check if field is valid or not
    cardYear: yup.boolean().test((value) => value === true), // * only check if field is valid or not
  })
  .required()

const CreditCardForm = forwardRef<ICreditCardFormRef, { onSuccess: () => void; onError: (err: unknown) => void }>(
  ({ onSuccess, onError }, ref) => {
    const { t } = useTranslation()
    const { isSmallMobile } = useMediaHelper()
    const {
      control,
      handleSubmit,
      setError: setFormError,

      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        firstName: '',
        lastName: '',
        postalCode: '',
        cardNumber: false,
        cardCvv: false,
        cardMonth: false,
        cardYear: false,
      },
    })
    const [updatePaymentMethod] = useUpdatePaymentMethodMutation()
    const recurly = useRecurly()

    const [error, setError] = useState<string | null>(null)
    const [threeDActionTokenId, setThreeDActionTokenId] = useState<string | null>(null)
    const [tokenId, setTokenId] = useState<string | null>(null)

    const onSubmit = async ({
      firstName,
      lastName,
      postalCode,
    }: {
      firstName: string
      lastName: string
      postalCode: string
    }) => {
      setError(null)
      recurly.token(
        { first_name: firstName, last_name: lastName, postal_code: postalCode, country: 'US' },
        async (err, token) => {
          if (err) {
            // todo: kissmetrics
            // kissmetricsRecordingEvent(KISSMETRICS_TRACK_EVENTS.checkout, {
            //   [PROPERTY_NAMES.checkout_error]: `${err.code}: ${err.message}`,
            // })
            setError(err.message)
            if (err.details) {
              err.details.forEach(({ field, messages }) => {
                setFormError(fieldMap[field as keyof typeof fieldMap] as TField, new Error(messages[0]))
              })
            }
            onError(err)
          } else {
            try {
              await updatePaymentMethod({ tokenId: token.id }).unwrap()
              onSuccess()
            } catch (err: any) {
              if (err.data) {
                const { code, description } = err.data

                if (code === ERR_3DS_ACTION_REQUIRED || description.error_code === ERR_3DS_ACTION_REQUIRED) {
                  setTokenId(token.id)
                  setThreeDActionTokenId(description.three_d_secure_action_token_id)
                  return
                }
              }

              setError(getErrorMessage(err, t('card_error')))
              onError(err)
            }
          }
        },
      )
    }

    const submitForm = handleSubmit(onSubmit, onError)

    useImperativeHandle(ref, () => ({
      submit() {
        return submitForm()
      },
    }))

    return (
      <>
        {error && (
          <Alert severity='error' sx={{ my: 2, textAlign: 'left' }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {threeDActionTokenId && tokenId && (
          <RecurlyThreeDSecureActionModal
            tokenId={tokenId}
            threeDSecureActionTokenId={threeDActionTokenId}
            onError={(message, err) => {
              setThreeDActionTokenId(null)
              setTokenId(null)
              setError(message)
              onError(err)
            }}
            onSuccess={() => {
              setThreeDActionTokenId(null)
              setTokenId(null)
              onSuccess()
            }}
          />
        )}

        <>
          <Box display='flex' alignItems='center' my='10px'>
            <Radio checked size='small' sx={{ mr: 2 }} />
            <Stack
              display={'inline-flex'}
              spacing='10px'
              direction={'row'}
              alignItems='center'
              sx={{ '& svg, & img': { width: isSmallMobile ? '28px' : 'auto' } }}
            >
              <VisaCard />
              <MasterCard />
              <img src={DinersCard} alt='diners' />
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
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <FormLabel required>{t('first_name')}</FormLabel>
                  <Controller
                    name='firstName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <InputBase {...field} placeholder={t('first_name')} fullWidth error={!!errors.firstName} />
                    )}
                  />
                  {errors.firstName && <FormHelperText error>{t('require_first_name')}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <FormLabel required>{t('last_name')}</FormLabel>
                  <Controller
                    name='lastName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <InputBase {...field} placeholder={t('last_name')} fullWidth error={!!errors.lastName} />
                    )}
                  />
                  {errors.lastName && <FormHelperText error>{t('require_last_name')}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <FormLabel required>{t('credit_card_number')}</FormLabel>
                  <Controller
                    name='cardNumber'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RecurlyInput
                        {...field}
                        placeholder='1234 1234 1234 1234'
                        component={RecurlyCardNumberElement}
                        error={!!errors.cardNumber}
                      />
                    )}
                  />
                  {errors.cardNumber && <FormHelperText error>{t('invalid_cc_number')}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid container item sm={8} xs={12} rowSpacing={3} columnSpacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <FormLabel required>{t('security_code_cvc')}</FormLabel>
                    <Controller
                      name='cardCvv'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <RecurlyInput
                          {...field}
                          placeholder='CVV'
                          component={RecurlyCardCvvElement}
                          error={!!errors.cardCvv}
                        />
                      )}
                    />
                    {errors.cardCvv && <FormHelperText error>{t('invalid_cvc_code')}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <FormLabel required>{t('expiration_month')}</FormLabel>
                    <Controller
                      name='cardMonth'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <RecurlyInput
                          {...field}
                          placeholder={t('mm')}
                          component={RecurlyCardMonthElement}
                          error={!!errors.cardMonth}
                        />
                      )}
                    />
                    {errors.cardMonth && <FormHelperText error>{t('invalid_expiration_date')}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <FormLabel required>{t('expiration_year')}</FormLabel>
                    <Controller
                      name='cardYear'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <RecurlyInput
                          {...field}
                          placeholder={t('yy')}
                          component={RecurlyCardYearElement}
                          error={!!errors.cardYear}
                        />
                      )}
                    />
                    {errors.cardYear && <FormHelperText error>{t('invalid_expiration_date')}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <FormLabel required>{t('country')}</FormLabel>
                  {/* todo: add country select */}
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <FormLabel required>{t('postal_zip_code')}</FormLabel>
                  <Controller
                    name='postalCode'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <InputBase {...field} placeholder={t('postal_zip_code')} fullWidth error={!!errors.postalCode} />
                    )}
                  />
                  {errors.postalCode && <FormHelperText error>{t('require_postal_code')}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </>
      </>
    )
  },
)

const RecurlyPayPal = forwardRef<IRecurlyPayPalRef, { onSuccess: () => void; onError: (err: any) => void }>(
  ({ onSuccess, onError }, ref) => {
    const recurly = useRecurly()
    const [updatePaymentMethod] = useUpdatePaymentMethodMutation()
    const payPal = recurly.PayPal({
      display: { displayName: 'Ubersuggest' },
    })

    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      payPal.on('token', async (token) => {
        try {
          await updatePaymentMethod({ tokenId: token.id }).unwrap()
          onSuccess()
        } catch (err) {
          setError(getErrorMessage(err))
        }
      })

      payPal.on('error', (err) => {
        // todo: kissmetrics
        // kissmetricsRecordingEvent(KISSMETRICS_TRACK_EVENTS.checkout, {
        //   [PROPERTY_NAMES.checkout_error]: `${err.code}: ${err.message}`,
        // })
        setError(err.message)
        onError(err)
      })

      payPal.on('cancel', () => {
        onError(new Error('canceled'))
      })
    }, [payPal, onError, onSuccess, updatePaymentMethod])

    useImperativeHandle(ref, () => ({
      start() {
        setError(null)
        payPal.start()
      },
    }))

    return (
      <>
        {error && (
          <Alert severity='error' sx={{ mt: 3, textAlign: 'left' }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
      </>
    )
  },
)

export const UpdatePaymentMethodModal = ({ open = false, onClose }: IUpdatePaymentMethodModal) => {
  const { t } = useTranslation()
  const ccFormRef = useRef<ICreditCardFormRef>(null)
  const recurlyPPRef = useRef<IRecurlyPayPalRef>(null)

  const isPaidUser = useSelector(isPaidUserSelector)
  const paymentMethod = useSelector(userPaymentMethodSelector)

  const [activePaymentMethod, setActivePaymentMethod] = useState(
    paymentMethod === PAYMENT_METHODS.PAYPAL ? PAYMENT_METHODS.PAYPAL : PAYMENT_METHODS.CREDIT_CARD,
  )
  const [isLoading, setIsLoading] = useState(false)

  const handlePaypalClick = () => {
    setActivePaymentMethod(PAYMENT_METHODS.PAYPAL)
  }

  const handleCreditCardClick = () => {
    setActivePaymentMethod(PAYMENT_METHODS.CREDIT_CARD)
  }

  const handleSubmit = () => {
    setIsLoading(true)
    if (activePaymentMethod === PAYMENT_METHODS.CREDIT_CARD && ccFormRef.current) {
      ccFormRef.current.submit()
    }

    if (activePaymentMethod === PAYMENT_METHODS.PAYPAL && recurlyPPRef.current) {
      recurlyPPRef.current.start()
    }
  }

  return (
    <Dialog
      onClose={onClose}
      onSubmit={handleSubmit}
      open={open}
      title={t('update_billing_info')}
      closeButtonText={t('cancel')}
      submitButtonText={t('save_changes')}
      isSubmitting={isLoading}
      size='xl'
      showTitleCloseButton
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <RecurlyProvider publicKey={RECURLY_PUBLIC_KEY}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <RecurlyElements>
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
            <CreditCardForm ref={ccFormRef} onSuccess={onClose} onError={(err) => setIsLoading(false)} />
          )}

          {activePaymentMethod === PAYMENT_METHODS.PAYPAL && (
            <RecurlyPayPal ref={recurlyPPRef} onSuccess={onClose} onError={(err) => setIsLoading(false)} />
          )}
        </RecurlyElements>
      </RecurlyProvider>
    </Dialog>
  )
}
