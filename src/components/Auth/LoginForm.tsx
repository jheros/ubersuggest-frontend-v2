import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Paper, Box, FormControlLabel, Checkbox, InputBase, FormHelperText } from '@mui/material'

import { RouterLink, Button, Typography, PasswordInput } from 'components'
import { useLoginUserMutation } from 'store/api/authApi'
import { useNavigateWithLang } from 'hooks'
import { pushLoginLimitMessage, removeAdblockDetectModalStatus } from 'utils/storage'
import { ERR_USER_NOT_CONFIRMED, getErrorMessage } from 'utils/error'
import { useRecaptchaContext } from 'contexts'

const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    rememberMe: yup.boolean().required(),
  })
  .required()

export interface ILoginInput {
  email: string
  password: string
  rememberMe: boolean
}

interface ILoginForm {
  redirectUrl: string
}

export const LoginForm = ({ redirectUrl }: ILoginForm) => {
  const [error, setError] = useState('')
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const navigateWithLang = useNavigateWithLang()
  const { executeRecaptchaAsync } = useRecaptchaContext()

  const onSubmit = async (data: ILoginInput) => {
    setError('')
    await executeRecaptchaAsync()
    try {
      const res = await loginUser(data).unwrap()
      if (!res.fresh_login) {
        pushLoginLimitMessage() // todo: use state instead of localstorage
      }
      removeAdblockDetectModalStatus() // todo: use state instead of localstorage
      navigateWithLang(redirectUrl)
    } catch (err) {
      const errMsg: string = getErrorMessage(err)
      setError(errMsg)
      if (errMsg === ERR_USER_NOT_CONFIRMED) {
        // todo: show confirm modal
        // sendMessage('SHOW_EMAIL_CONFIRM_MODAL', {
        //   email: email,
        // })
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
              sx={{ marginBottom: !errors.email ? '10px' : 0 }}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <FormHelperText error sx={{ marginBottom: '10px' }}>
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
          <FormHelperText error sx={{ marginBottom: '10px' }}>
            {t('invalid_password')}
          </FormHelperText>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 0 24px 0' }}>
          <Controller
            name='rememberMe'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} color='primary' />}
                label={t('remember_login')}
                componentsProps={{ typography: { variant: 'text14', sx: { lineHeight: 1 } } }}
                sx={{ margin: 0 }}
              />
            )}
          />

          <RouterLink to='FORGOT_PASSWORD'>
            <Typography variant='text14'>{t('login_forgot_password')}</Typography>
          </RouterLink>
        </Box>

        <Button type='submit' variant='contained' size='xlarge' fullWidth loading={isLoading}>
          {t('login_button')}
        </Button>
      </Box>
    </Paper>
  )
}
