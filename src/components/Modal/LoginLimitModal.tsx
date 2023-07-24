import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { Typography, Dialog, DialogButton } from '@ubersuggest/common-ui'
import { ReactComponent as PeopleIcon } from 'assets/svg/icons/people.svg'
import { ReactComponent as WarningIcon } from 'assets/svg/icons/warning-small.svg'
import { useNavigateWithLang } from 'hooks'
import { IRootState } from 'store'
import { LOGIN_LIMIT_REACHED, SIGN_OUT_WARNING } from 'store/consts'
import { logout } from 'store/reducers/auth'
import { hideLoginLimitModal } from 'store/reducers/modal'
import { getUrlFromRoutes } from 'utils/route'
import { ROUTES } from 'routes'

export const LoginLimitModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen, type, title, message } = useSelector((state: IRootState) => state.modal.loginLimitModal)
  const navigateWithLang = useNavigateWithLang()

  const handleClose = () => {
    if (type === SIGN_OUT_WARNING) {
      dispatch(logout())
      navigateWithLang(ROUTES.LOGIN)
    }

    dispatch(hideLoginLimitModal())
  }

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      title={title}
      titleIcon={<WarningIcon />}
      actions={
        <>
          <DialogButton onClick={handleClose} variant='contained' color='primary'>
            {type === SIGN_OUT_WARNING ? t('got_it_button') : t('dismiss_button')}
          </DialogButton>
          {type === LOGIN_LIMIT_REACHED && (
            <DialogButton
              onClick={() => {
                navigateWithLang(getUrlFromRoutes('SETTINGS.ACCOUNT_BILLING'))
                handleClose()
              }}
              variant='outlined'
              startIcon={<PeopleIcon />}
            >
              {t('add_user_button')}
            </DialogButton>
          )}
        </>
      }
    >
      <Typography variant='text14' color='common.darkGray.main'>
        {message}
      </Typography>
    </Dialog>
  )
}
