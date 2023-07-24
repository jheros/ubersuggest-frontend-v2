import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { yupResolver } from '@hookform/resolvers/yup'
import { Paper, Box, InputBase, FormHelperText, FormControl, FormLabel } from '@mui/material'
import { Button } from '@ubersuggest/common-ui'
import { useNavigateWithLang } from 'hooks'
import { ROUTES } from 'routes/consts'
import { useLazyResetPasswordQuery } from 'store/api/authApi'
import { getErrorMessage } from 'utils/error'
import { getLanguageCode } from 'utils/translation'
import * as yup from 'yup'

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required()

export interface IForgotPasswordInput {
  email: string
}

export const ForgotPasswordForm = () => {
  const [error, setError] = useState('')
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  })
  const [resetPassword, { isLoading }] = useLazyResetPasswordQuery()
  const navigateWithLang = useNavigateWithLang()
  const languageCode = getLanguageCode()

  const onSubmit = async ({ email }: IForgotPasswordInput) => {
    setError('')
    try {
      await resetPassword({ email, lang: languageCode }).unwrap()
      navigateWithLang(`/${ROUTES.LOGIN}`, { state: { sentResetLink: true } })
    } catch (err) {
      const errMsg: string = getErrorMessage(err)
      setError(errMsg)
    }
  }

  return (
    <Paper elevation={2} sx={{ width: '100%', maxWidth: '500px', padding: '20px' }} square>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ dth: '100%' }} noValidate autoComplete='off'>
        {error && (
          <FormHelperText error sx={{ mb: '10px' }}>
            {t(error)}
          </FormHelperText>
        )}

        <FormControl fullWidth sx={{ mt: 1.5 }}>
          <FormLabel>{t('email')}</FormLabel>
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
        </FormControl>

        <Button
          type='submit'
          variant='contained'
          size='xlarge'
          fullWidth
          loading={isLoading}
          disabled={false}
          wrapperSx={{ mt: 3 }}
        >
          {t('reset_password')}
        </Button>
      </Box>
    </Paper>
  )
}
