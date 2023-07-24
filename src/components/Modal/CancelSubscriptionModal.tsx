import { PropsWithChildren, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  SvgIcon,
} from '@mui/material'
import { Dialog, Alert, Typography, Button, fonts } from '@ubersuggest/common-ui'
import { ReactComponent as ArrowRightIcon } from 'assets/svg/icons/arrow-right.svg'
import { ReactComponent as HeadphoneIcon } from 'assets/svg/icons/headphone.svg'
import { ReactComponent as MailIcon } from 'assets/svg/icons/mail.svg'
import { ReactComponent as PlayIcon } from 'assets/svg/icons/play.svg'
import { RouterLink } from 'components/Link'
import { TextField } from 'components/TextField/TextField'
import { PLAN_INTERVALS, SUBSCRIPTION_CANCEL_REASONS, TIERS, WEBINAR_LINKS } from 'configs'
import { useMediaHelper } from 'hooks'
import { ROUTES } from 'routes'
import { useCancelSubscriptionMutation, useSendCancelationFeedbackMutation } from 'store/api'
import { projectsSelector } from 'store/reducers/project'
import { userTierSelector, userPlanIntervalSelector, userNextInvoiceDataSelector } from 'store/reducers/user'
import { formatDate } from 'utils/dateTime'
import { getErrorMessage } from 'utils/error'
import { getProjectIssueCount, getProjectKeywordCount } from 'utils/project'
import { getLanguageCode } from 'utils/translation'
import * as yup from 'yup'

enum STEPS {
  REASON,
  CONFIRM,
}

const reasonSchema = yup
  .object({
    reason: yup.string().required(),
    response: yup.string().required(),
  })
  .required()

const confirmSchema = yup
  .object({
    confirmDelete: yup.boolean().test('is-true', 'you must agree', (value) => value === true),
    confirmReactive: yup.boolean().test('is-true', 'you must agree', (value) => value === true),
    confirmRejoin: yup.boolean().test('is-true', 'you must agree', (value) => value === true),
  })
  .required()

const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Paper
      variant='outlined'
      square
      sx={{
        p: '0 30px',
        borderColor: 'common.lightGray.50',
        textAlign: 'left',
        minHeight: '98px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      {children}
    </Paper>
  )
}

export const CancelSubscriptionModal: React.FC<{
  open: boolean
  onClose: (hasSpecialLifetimeOffer?: boolean, reason?: string, response?: string) => void
}> = ({ open, onClose }) => {
  const { t } = useTranslation()
  const { isSmallMobile } = useMediaHelper()
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(reasonSchema),
    defaultValues: {
      reason: '',
      response: '',
    },
  })
  const {
    control: confirmControl,
    handleSubmit: handleConfirmSubmit,
    formState: { errors: confirmErrors, isDirty: isConfirmDirty },
  } = useForm({
    resolver: yupResolver(confirmSchema),
    defaultValues: {
      confirmDelete: false,
      confirmReactive: false,
      confirmRejoin: false,
    },
  })
  const [cancelSubscription] = useCancelSubscriptionMutation()
  const [sendCancelationFeedback] = useSendCancelationFeedbackMutation()
  type IData = { reason: string; response: string; cancelDate?: string }

  const projects = useSelector(projectsSelector)
  const tier = useSelector(userTierSelector)
  const planInterval = useSelector(userPlanIntervalSelector)
  const nextInvoiceData = useSelector(userNextInvoiceDataSelector)

  const [step, setStep] = useState(STEPS.REASON)
  const [data, setData] = useState<IData | null>(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleClose = (hasSpecialLifetimeOffer = false) => {
    onClose(hasSpecialLifetimeOffer, data?.reason, data?.response)
  }

  const onSubmit = async (data: IData) => {
    const cancelDate =
      !nextInvoiceData || planInterval === PLAN_INTERVALS.LIFETIME
        ? formatDate(Date.now(), 'timestamp')
        : formatDate(nextInvoiceData.nextInvoiceAt)
    setData({ ...data, cancelDate })
    setStep(STEPS.CONFIRM)
  }

  const onConfirmSubmit = async () => {
    // todo
    // kisssmetrickTracking(
    //   reason,
    //   subscriptionStatus === 'trialing' ? 'trial' : 'paid',
    // )

    if (tier !== TIERS.TIER0 || planInterval !== PLAN_INTERVALS.LIFETIME) {
      handleClose(true)
    } else if (data) {
      setIsLoading(true)
      try {
        await cancelSubscription().unwrap()
        await sendCancelationFeedback({ category: data.reason, notes: data.response, status: 'completed' }).unwrap()
        handleClose()
      } catch (err) {
        setError(getErrorMessage(err))
      }
      setIsLoading(false)
    }
  }

  const renderReasonStep = () => {
    return (
      <>
        <Typography
          variant='text14Light'
          boldColor='inherit'
          lineHeight='18px'
          mt='30px'
          mb={0}
          dangerouslySetInnerHTML={{ __html: t('cancel_subheading') }}
          textAlign='left'
          paragraph
        />

        <Grid container spacing={1.5} mt='43px'>
          <Grid item xs={12} sm={4}>
            <Card>
              <Typography variant='text14Medium'>{t('ubersuggest_projects')}</Typography>
              <Typography variant='text24Medium' mt={1.25}>
                {Object.keys(projects).length}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card>
              <Typography variant='text14Medium'>{t('tracked_keywords')}</Typography>
              <Typography variant='text24Medium' mt={1.25}>
                {Object.values(projects).reduce((sum, project) => sum + getProjectKeywordCount(project), 0)}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card>
              <Typography variant='text14Medium'>{t('fixable_issues')}</Typography>
              <Typography variant='text24Medium' mt={1.25}>
                {Object.values(projects).reduce((sum, project) => sum + getProjectIssueCount(project), 0)}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Box mt='30px'>
          <RouterLink to={ROUTES.DASHBOARD.MAIN} color='inherit' underline='none'>
            <Typography variant='text14Book' mr={1}>
              {t('view_projects_dashboard')}
            </Typography>
            <ArrowRightIcon />
          </RouterLink>
        </Box>

        <Divider sx={{ borderColor: 'common.lightGray.50', my: '30px' }} />

        <Stack direction={isSmallMobile ? 'column' : 'row'} spacing='30px'>
          <Box flexGrow={1} flexBasis={0} textAlign='left'>
            <Typography variant='text20Medium' my={2.5} paragraph>
              {t('help_title')}
            </Typography>
            <Typography variant='text14Light' lineHeight='24px' paragraph m={0}>
              {t('help_text1')}
            </Typography>
            <Button href='https://neilpatel.com/coaching/' size='xlarge' variant='outlined' fullWidth sx={{ mt: 2.5 }}>
              <SvgIcon component={MailIcon} sx={{ fontSize: '20px', mr: '10px' }} inheritViewBox />
              {t('button_rsvp_coaching')}
            </Button>
            <Button
              href={WEBINAR_LINKS[getLanguageCode() as keyof typeof WEBINAR_LINKS]}
              size='xlarge'
              variant='outlined'
              fullWidth
              sx={{ mt: 1 }}
            >
              <SvgIcon component={PlayIcon} sx={{ fontSize: '20px', mr: '10px' }} inheritViewBox />
              {t('button_watch_webinar')}
            </Button>
            <Button href='https://neilpatel.com/contact' size='xlarge' variant='outlined' fullWidth sx={{ mt: 1 }}>
              <SvgIcon component={HeadphoneIcon} sx={{ fontSize: '20px', mr: '10px' }} inheritViewBox />
              {t('button_contact')}
            </Button>
            <Typography variant='text14Light' lineHeight='24px' paragraph mt={2.5} mb={2}>
              {t('help_text2')}
            </Typography>
          </Box>
          <Divider
            orientation={isSmallMobile ? 'horizontal' : 'vertical'}
            sx={{ borderColor: 'common.lightGray.50' }}
            flexItem
          />
          <Box flexGrow={1} flexBasis={0} textAlign='left'>
            <Typography variant='text20Medium' my={2.5} paragraph>
              {t('cancellation_reason')}
            </Typography>
            <Box component='form' noValidate autoComplete='off' mb={2}>
              <FormControl fullWidth>
                <FormLabel required>
                  <Typography variant='text16Medium' lineHeight='24px'>
                    {t('reason_cancel')}
                  </Typography>
                </FormLabel>
                <Controller
                  name='reason'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} defaultValue='' error={!!errors.reason}>
                      {SUBSCRIPTION_CANCEL_REASONS.map((reason) => (
                        <MenuItem key={`cancel-reason-${reason.value}`} value={reason.value}>
                          {reason.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {/* {errors.reason && <FormHelperText error>{t('test')}</FormHelperText>} */}
              </FormControl>

              <FormControl fullWidth sx={{ mt: '30px' }}>
                <FormLabel required>
                  <Typography variant='text16Medium' lineHeight='24px'>
                    {t('before_cancel')}
                  </Typography>
                </FormLabel>
                <Controller
                  name='response'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      minRows={4}
                      placeholder={t('placeholder_response')}
                      error={!!errors.response}
                      maxLength={300}
                      showLengthStatus
                    />
                  )}
                />
                {errors.response && <FormHelperText error>{t('require_response')}</FormHelperText>}
              </FormControl>
            </Box>
          </Box>
        </Stack>
      </>
    )
  }

  const renderConfirmStep = () => {
    return (
      <>
        <Typography variant='text18Light' lineHeight={1.5}>
          {t('double_verification_subheading')}
        </Typography>

        <Divider sx={{ borderColor: 'common.lightGray.50', mt: '50px', mb: '20px' }} />

        <Box component='form' textAlign='left' noValidate autoComplete='off'>
          <FormControl fullWidth sx={{ my: 2 }}>
            <Controller
              name='confirmDelete'
              control={confirmControl}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color='primary' sx={{ alignSelf: 'flex-start' }} />}
                  disableTypography={true}
                  label={
                    <Typography
                      variant='text14Light'
                      boldFontFamily={fonts.primary.light}
                      dangerouslySetInnerHTML={{
                        __html: `${t('double_verification_option_one', {
                          0: Object.values(projects)?.[0]?.title || '',
                        })}${
                          confirmErrors.confirmDelete ? `<b style="margin-left: 4px">${t('text_required')}</b>` : ''
                        }`,
                      }}
                    />
                  }
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ my: 2 }}>
            <Controller
              name='confirmReactive'
              control={confirmControl}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color='primary' sx={{ alignSelf: 'flex-start' }} />}
                  disableTypography={true}
                  label={
                    <Typography
                      variant='text14Light'
                      boldFontFamily={fonts.primary.light}
                      dangerouslySetInnerHTML={{
                        __html: `${t('double_verification_option_two', {
                          0: data?.cancelDate || '',
                        })}${
                          confirmErrors.confirmReactive ? `<b style="margin-left: 4px">${t('text_required')}</b>` : ''
                        }`,
                      }}
                    />
                  }
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <Controller
              name='confirmRejoin'
              control={confirmControl}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color='primary' sx={{ alignSelf: 'flex-start' }} />}
                  disableTypography={true}
                  label={
                    <Typography
                      variant='text14Light'
                      boldFontFamily={fonts.primary.light}
                      dangerouslySetInnerHTML={{
                        __html: `${t('double_verification_option_three')}${
                          confirmErrors.confirmRejoin ? `<b style="margin-left: 4px">${t('text_required')}</b>` : ''
                        }`,
                      }}
                    />
                  }
                />
              )}
            />
          </FormControl>
        </Box>
      </>
    )
  }

  return (
    <Dialog
      onClose={() => handleClose()}
      onSubmit={step === STEPS.REASON ? handleSubmit(onSubmit) : handleConfirmSubmit(onConfirmSubmit)}
      open={open}
      title={step === STEPS.REASON ? t('cancel_uber_account') : t('double_verification_title')}
      closeButtonText={t('button_dont_cancel')}
      closeButtonDisabled={isLoading}
      submitButtonText={t('button_cancel')}
      submitButtonDisabled={step === STEPS.REASON ? !isDirty : !isConfirmDirty}
      isSubmitting={isLoading}
      size='xxl'
      showTitleCloseButton
    >
      {error && (
        <Alert severity='error' sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {step === STEPS.REASON && renderReasonStep()}
      {step === STEPS.CONFIRM && renderConfirmStep()}
    </Dialog>
  )
}
