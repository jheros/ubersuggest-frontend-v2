import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from '@mui/material'
import { Dialog, Typography } from '@ubersuggest/common-ui'
import { useAlertContext } from 'contexts'
import { useNavigateWithLang } from 'hooks'
import { IRootState } from 'store'
import { useDeleteMeMutation } from 'store/api'
import { logout } from 'store/reducers/auth'
import { isPaidUserSelector, userTierSelector } from 'store/reducers/user'
import { getErrorMessage } from 'utils/error'

export const DeleteAccountSection = () => {
  const { t } = useTranslation()
  const [openModal, setOpenModal] = useState(false)
  const [deleteMe, { isLoading }] = useDeleteMeMutation()
  const isPaidUser = useSelector(isPaidUserSelector)
  const userTier = useSelector(userTierSelector)
  const planInterval = useSelector((state: IRootState) => state.user.subscription.planInterval || 'free')
  const dispatch = useDispatch()
  const navigateWithLang = useNavigateWithLang()
  const { addAlert } = useAlertContext()

  const onSubmit = async () => {
    try {
      await deleteMe().unwrap()
      // todo:
      //   kissmetricsRecordingEvent(KISSMETRICS_TRACK_EVENTS.acccount_deleted, {
      //     [PROPERTY_NAMES.plan_tier]: PROPERTY_VALUES.plan_tier[userTier],
      //     [PROPERTY_NAMES.billing_plan]: PROPERTY_VALUES.billing_plan[planInterval],
      //     [PROPERTY_NAMES.paid]: isPaidUser,
      //   })
      dispatch(logout()) // todo: review this after refactoring signout workflow
      navigateWithLang('/dashboard')
    } catch (err) {
      const errMsg: string = getErrorMessage(err)
      addAlert({ severity: 'error', message: t(errMsg) })
    }
    setOpenModal(false)
  }

  return (
    <>
      <Link component='button' variant='text16Book' color='common.gray.main' onClick={() => setOpenModal(true)}>
        {t('delete_my_account')}
      </Link>

      <Dialog
        onClose={() => setOpenModal(false)}
        onSubmit={onSubmit}
        open={openModal}
        title={t('delete_my_account')}
        closeButtonText={t('no_aff')}
        submitButtonText={t('yes')}
        isSubmitting={isLoading}
      >
        <Typography variant='text14Book' color='common.darkGray.main'>
          {t('delete_account_message')}
        </Typography>
      </Dialog>
    </>
  )
}
