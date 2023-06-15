import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Paper, Box, FormControlLabel, Checkbox, InputBase, FormHelperText } from '@mui/material'
import { fonts } from '@ubersuggest/common-ui'
import { useSearchParams } from 'react-router-dom'

import { useRegisterUserMutation, useRegisterMultiUsersMutation } from 'store/api'
import { getLanguageCode } from 'utils/translation'
import { removeAdblockDetectModalStatus } from 'utils/storage'
import { getErrorMessage, ERR_WRONG_COUPON } from 'utils/error'
import { useNavigateWithLang } from 'hooks'
import { Typography, Button, PasswordInput } from 'components'
import { useRecaptchaContext } from 'contexts'

export interface IRegisterInput {
  email: string
  password: string
}

interface IRegisterForm {
  redirectUrl: string
}

const registerSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    agreeToTerms: yup.boolean().test('is-true', 'you must agree to terms', (value) => value === true),
  })
  .required()

export const RegisterForm = ({ redirectUrl }: IRegisterForm) => {
  const [error, setError] = useState<string>()
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      agreeToTerms: false,
    },
  })
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterUserMutation()
  const [registerMultiUsers, { isLoading: isRegisterMULoading }] = useRegisterMultiUsersMutation()
  const { coupon, code }: any = searchParams
  const languageCode = getLanguageCode()
  const navigateWithLang = useNavigateWithLang()
  const { executeRecaptchaAsync } = useRecaptchaContext()

  const onSubmit = async (data: IRegisterInput) => {
    setError('')
    await executeRecaptchaAsync()
    try {
      // todo: country, city
      if (code) {
        await registerMultiUsers({ ...data, code, lang: languageCode, country: '', city: '' }).unwrap()
      } else {
        await registerUser({ ...data, lang: languageCode, recurly_coupon: coupon, country: '', city: '' }).unwrap()
      }
      removeAdblockDetectModalStatus() // todo: use state instead of local storage
      navigateWithLang(redirectUrl)
    } catch (err) {
      const errMsg: string = getErrorMessage(err)
      setError(errMsg)
      if (errMsg === ERR_WRONG_COUPON) {
        setTimeout(() => {
          navigateWithLang(`/pricing#pick_plan`)
        }, 5000)
      }
    }
  }

  return (
    <Paper elevation={2} sx={{ width: '100%', maxWidth: '500px', padding: '20px' }} square>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }} noValidate autoComplete='off'>
        {error && (
          <FormHelperText error sx={{ mb: '10px' }}>
            {t(error)}
          </FormHelperText>
        )}

        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputBase
              {...field}
              placeholder={t('email')}
              fullWidth
              sx={{ mb: !errors.email ? '10px' : 0 }}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <FormHelperText error sx={{ mb: '10px' }}>
            {t('invalid_email')}
          </FormHelperText>
        )}

        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              placeholder={t('password')}
              fullWidth
              error={!!errors.password}
              sx={{ marginBottom: !errors.password ? '10px' : 0 }}
            />
          )}
        />
        {errors.password && (
          <FormHelperText error sx={{ mb: '10px' }}>
            {t('invalid_password')}
          </FormHelperText>
        )}

        <Controller
          name='agreeToTerms'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} color='primary' sx={{ alignSelf: 'flex-start', mt: '4px' }} />}
              disableTypography={false}
              label={
                <Typography
                  variant='text12'
                  boldFontFamily={fonts.primary.light}
                  dangerouslySetInnerHTML={{
                    __html: `${t('notification_agreement', {
                      0: `<a href="https://neilpatel.com/privacy/" target="blank" rel="noreferrer">${t(
                        'privacy_policy',
                      )}</a>`,
                      1: `<a href="https://neilpatel.com/terms/" target="blank" rel="noreferrer">${t(
                        'terms_of_service',
                      )}</a>`,
                    })}${errors.agreeToTerms ? `<b style="margin-left: 4px">${t('text_required')}</b>` : ''}`,
                  }}
                />
              }
              componentsProps={{ typography: { variant: 'text14', sx: { lineHeight: 1 } } }}
              sx={{ mx: 0, mt: '4px', mb: '24px' }}
            />
          )}
        />

        <Button
          type='submit'
          variant='contained'
          size='xlarge'
          fullWidth
          loading={isRegisterLoading || isRegisterMULoading}
        >
          {t('register')}
        </Button>
      </Box>
    </Paper>
  )
}
