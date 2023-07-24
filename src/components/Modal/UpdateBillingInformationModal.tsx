import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Breakpoint,
  FormControl,
  FormHelperText,
  FormLabel as MuiFormLabel,
  Grid,
  InputBase,
  styled,
} from '@mui/material'
import { Dialog, Alert } from '@ubersuggest/common-ui'
import { PhoneCodeSelect } from 'components/Select'
import { IRootState } from 'store'
import { useUpdateBillingInformationMutation } from 'store/api'
import { userCountryCodeSelector } from 'store/reducers/user'
import { IUpdateBillingInformationInput } from 'store/types'
import { getErrorMessage } from 'utils/error'
import { parsePhoneNumber } from 'utils/phoneNumber'
import * as yup from 'yup'

const schema = yup
  .object({
    company: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    street1: yup.string().required(),
    street2: yup.string().required(),
    city: yup.string().required(),
    region: yup.string().required(),
    postalCode: yup.string().required(),
    phone: yup.string().required(),
    countryCode: yup.string().required(),
    vatNumber: yup.string().required(),
  })
  .required()

const FormLabel = styled(MuiFormLabel)(({ theme }: any) => ({
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  [theme.breakpoints.down('sm' as Breakpoint)]: {
    height: 'auto',
  },
}))

export const UpdateBillingInformationModal: React.FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const { t } = useTranslation()
  const invoicingSettings = useSelector((state: IRootState) => state.user.subscription.invoicingSettings)
  const countryCode = useSelector(userCountryCodeSelector)
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      const {
        company,
        first_name: firstName,
        last_name: lastName,
        street1,
        street2,
        city,
        region,
        postal_code: postalCode,
        vat_number: vatNumber,
        phone,
        country,
      } = invoicingSettings || {}
      const [_phoneCode, nationalNumber] = parsePhoneNumber(phone as string, country ?? countryCode)
      return {
        company: company || '',
        firstName: firstName || '',
        lastName: lastName || '',
        street1: street1 || '',
        street2: street2 || '',
        city: city || '',
        region: region || '',
        postalCode: postalCode || '',
        phone: nationalNumber || '',
        countryCode: country ?? countryCode,
        vatNumber: vatNumber || '',
      }
    }, [invoicingSettings, countryCode]),
  })
  const [updateBillingInformation, { isLoading }] = useUpdateBillingInformationMutation()
  const [error, setError] = useState(null)

  const onSubmit = async (data: IUpdateBillingInformationInput) => {
    setError(null)
    try {
      await updateBillingInformation(data).unwrap()
      onClose()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <Dialog
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      title={t('edit_information')}
      closeButtonText={t('cancel')}
      submitButtonText={t('save_changes')}
      submitButtonDisabled={!isDirty}
      isSubmitting={isLoading}
      size='xl'
      showTitleCloseButton
    >
      {error && (
        <Alert severity='error' sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <Box
        component='form'
        textAlign={'left'}
        // onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
        noValidate
        autoComplete='off'
      >
        <Grid container rowSpacing={2} columnSpacing={1.25}>
          <Grid item xs={12} sm={4}>
            <FormLabel required>{t('company_name')}</FormLabel>
          </Grid>

          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <Controller
                name='company'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputBase {...field} placeholder={t('company_name')} fullWidth error={!!errors.company} />
                )}
              />
              {errors.company && <FormHelperText error>{t('require_company_name')}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel required>{t('placeholder_name')}</FormLabel>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
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

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
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

          <Grid item xs={12} sm={4}>
            <FormLabel required>{t('street_address')}</FormLabel>
          </Grid>

          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <Controller
                name='street1'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputBase {...field} placeholder={t('street1')} fullWidth error={!!errors.street1} />
                )}
              />
              {errors.street1 && <FormHelperText error>{t('invalid_street1')}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel required>{t('apartment_unit')}</FormLabel>
          </Grid>

          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <Controller
                name='street2'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputBase {...field} placeholder={t('street2')} fullWidth error={!!errors.street2} />
                )}
              />
              {errors.street2 && <FormHelperText error>{t('invalid_street2')}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel required>{t('city')}</FormLabel>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='city'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputBase {...field} placeholder={t('city_placeholder')} fullWidth error={!!errors.city} />
                )}
              />
              {errors.city && <FormHelperText error>{t('invalid_city')}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Controller
                name='region'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputBase {...field} placeholder={t('state_province')} fullWidth error={!!errors.region} />
                )}
              />
              {errors.region && <FormHelperText error>{t('invalid_region')}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel required>{t('postal_zip_code')}</FormLabel>
          </Grid>

          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <Controller
                name='postalCode'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputBase {...field} placeholder={t('postal_zip_code')} fullWidth error={!!errors.postalCode} />
                )}
              />
              {errors.postalCode && <FormHelperText error>{t('require_zip_postal_code')}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel required>{t('phone_number')}</FormLabel>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <Controller
                name='countryCode'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <PhoneCodeSelect value={value} onChange={onChange} fullWidth />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <Controller
                name='phone'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputBase {...field} placeholder={t('phone_number')} fullWidth error={!!errors.phone} />
                )}
              />
              {errors.phone && <FormHelperText error>{t('require_phone_number')}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel required>{t('vat_number')}</FormLabel>
          </Grid>

          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <Controller
                name='vatNumber'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputBase {...field} placeholder={t('vat_number')} fullWidth error={!!errors.vatNumber} />
                )}
              />
              {errors.vatNumber && <FormHelperText error>{t('require_zip_postal_code')}</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
