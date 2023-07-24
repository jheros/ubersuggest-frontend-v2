import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { Paper, Box, FormHelperText, FormControl, FormLabel } from '@mui/material'
import { Button, Dialog, Typography } from '@ubersuggest/common-ui'
import { useNavigateWithLang } from 'hooks'
import { ROUTES } from 'routes/consts'
import { useChangePasswordMutation } from 'store/api/authApi'
import { getErrorMessage } from 'utils/error'
import * as yup from 'yup'
import { PasswordInput } from 'components'

export interface IChangePasswordInput {
  password: string
  rePassword: string
}

export const ChangePasswordForm = () => {
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const { t } = useTranslation()
  const schema = yup
    .object({
      password: yup.string().min(8, t('invalid_password')).required(t('invalid_password')),
      rePassword: yup.string().min(8, t('invalid_password')).required(t('invalid_password'))
        .test('passwords-match', t('wrong_password_tooltip'), function (value) {
          return this.parent.password === value
        }),
    })
    .required()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      rePassword: '',
    },
  })
  const [changePassword, { isLoading }] = useChangePasswordMutation()
  const navigateWithLang = useNavigateWithLang()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const code = searchParams.get('code')

  const onSubmit = async ({ password }: IChangePasswordInput) => {
    setError('')
    if (email && code) {
      try {
        const data = {
          email,
          password,
          code
        }
        await changePassword(data).unwrap()
        setShowModal(true)
      } catch (err) {
        const errMsg: string = getErrorMessage(err)
        setError(errMsg)
      }
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    navigateWithLang(`/${ROUTES.LOGIN}`)
  }

  if (!email || !code) {
    navigateWithLang(`/${ROUTES.LOGIN}`)
    return null
  }

  return (
    <Paper elevation={2} sx={{ width: '100%', maxWidth: '500px', padding: '20px' }} square>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }} noValidate autoComplete='off'>
        {error && (
          < FormHelperText error sx={{ mb: '10px' }}>
            {t(error)}
          </FormHelperText>
        )}

        <FormControl fullWidth sx={{ mt: 1.5 }}>
          <FormLabel>{t('new_password')}</FormLabel>
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
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mt: 1.5 }}>
          <FormLabel>{t('re_enter_password')}</FormLabel>
          <Controller
            name='rePassword'
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
          {errors.rePassword && (
            <FormHelperText error sx={{ marginBottom: '10px' }}>
              {errors.rePassword.message}
            </FormHelperText>
          )}
        </FormControl>

        <Button type='submit' variant='contained' size='xlarge' loading={isLoading} disabled={false} fullWidth wrapperSx={{ mt: 3, textAlign: 'center' }}>
          {t('change_password')}
        </Button>
      </Box>

      <Dialog
        onClose={handleModalClose}
        open={showModal}
        title={t('password_changed_title')}
        hideActions
        showTitleCloseButton
      >
        <Typography variant='text14Book' color='common.darkGray.main'>
          {t('password_changed_message')}
        </Typography>
      </Dialog>
    </Paper >
  )
}
