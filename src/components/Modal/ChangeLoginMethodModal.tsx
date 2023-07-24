import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import { useTheme, InputBase, FormHelperText, Box, FormControl, InputLabel, FormLabel } from '@mui/material'
import { Typography, Dialog } from '@ubersuggest/common-ui'
import { PasswordInput } from 'components'
import { useAlertContext } from 'contexts'
import { IRootState } from 'store'
import { useChangeLoginMethodToEmailMutation } from 'store/api'
import * as yup from 'yup'

interface IChangeLoginMethodModal {
  open: boolean
  onClose: () => void
}

const registerSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required()

export const ChangeLoginMethodModal = ({ open = false, onClose }: IChangeLoginMethodModal) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const email = useSelector((state: IRootState) => state.user.userInfo.email)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: email || '',
      password: '',
    },
  })
  const [step, setStep] = useState(1)
  const [newPassword, setNewPassword] = useState<string>()
  const [changeLoginMethodToEmail, { isLoading }] = useChangeLoginMethodToEmailMutation()
  const { addAlert } = useAlertContext()

  useEffect(() => {
    setValue('email', email || '')
  }, [email])

  const onNext = (data: { password: string }) => {
    if (step === 1) {
      setNewPassword(data.password)
      setStep(2)
    }
  }

  const onSubmit = async () => {
    if (step === 2 && newPassword) {
      try {
        await changeLoginMethodToEmail(newPassword).unwrap()
        addAlert({ message: t('change_login_success') })
      } catch (err) {
        addAlert({
          severity: 'error',
          message: (
            <Typography
              variant='text14'
              linkColor={theme.palette.common.darkGray.main}
              dangerouslySetInnerHTML={{
                __html: t('change_login_error', {
                  0: `<a href='https://ubersuggest.zendesk.com/hc/en-us/requests/new' target='blank'>
                      ${t('contact_link')}
                    </a>`,
                }),
              }}
            ></Typography>
          ),
        })
      }
      handleClose()
    }
  }

  const handleClose = () => {
    if (step !== 1) setStep(1)
    setNewPassword('')
    setValue('password', '')
    onClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      onSubmit={step === 1 ? handleSubmit(onNext) : onSubmit}
      open={open}
      title={t('change_login_to_email')}
      closeButtonText={t('cancel')}
      submitButtonText={step === 1 ? t('next') : t('change_login_button')}
      isSubmitting={isLoading}
    >
      {step === 1 && (
        <Box
          component='form'
          onSubmit={handleSubmit(onNext)}
          sx={{ width: '100%', textAlign: 'left' }}
          noValidate
          autoComplete='off'
        >
          <FormControl fullWidth>
            <FormLabel>{t('email')}</FormLabel>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputBase {...field} placeholder={t('email')} fullWidth error={!!errors.email} readOnly />
              )}
            />
            {errors.email && <FormHelperText error>{t('invalid_email')}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <FormLabel>{t('new_password')}</FormLabel>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder={t('placeholder_new_password')}
                  fullWidth
                  error={!!errors.password}
                />
              )}
            />
            {errors.password && <FormHelperText error>{t('invalid_password')}</FormHelperText>}
          </FormControl>
        </Box>
      )}
      {step === 2 && (
        <>
          <Typography
            variant='text14'
            mb={3}
            boldColor={theme.palette.common.darkGray.main}
            dangerouslySetInnerHTML={{
              __html: t('confirm_change_login'),
            }}
            paragraph
          />
          <InputBase placeholder={t('email')} value={email} fullWidth readOnly />
        </>
      )}
    </Dialog>
  )
}
