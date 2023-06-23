import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { useTheme, Dialog, DialogContent } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { ReactComponent as PeopleIcon } from 'assets/svg/icons/people.svg'
import { Button } from 'components'
import { useNavigateWithLang } from 'hooks'
import { IRootState } from 'store'
import { hideLoginLimitModal } from 'store/reducers/modal'

import { ModalActions } from './ModalActions'
import { ModalTitle } from './ModalTitle'

export const LoginLimitModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen, type, title, message } = useSelector((state: IRootState) => state.modal.loginLimitModal)
  const theme = useTheme()
  const navigateWithLang = useNavigateWithLang()

  const handleClose = () => {
    dispatch(hideLoginLimitModal())
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby={title} open={isOpen} sx={{ '.MuiPaper-root': { width: '550px' } }}>
      <ModalTitle onClose={handleClose} showIcon={true}>
        {title}
      </ModalTitle>
      <DialogContent sx={{ textAlign: 'center', p: '40px' }}>
        <Typography variant='text14' color={theme.palette.common.darkGray.main}>
          {message}
        </Typography>
      </DialogContent>
      <ModalActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
        }}
      >
        <Button
          onClick={handleClose}
          variant='contained'
          size='xlarge'
          color='primary'
          sx={{
            width: '170px',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }}
          wrapperSx={{
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }}
        >
          {type === 'SIGN_OUT_WARNING' ? t('got_it_button') : t('dismiss_button')}
        </Button>
        {type === 'LOGIN_LIMIT_REACHED' && (
          <Button
            onClick={() => {
              navigateWithLang('/settings/account_billing')
              handleClose()
            }}
            variant='outlined'
            size='xlarge'
            sx={{
              ml: 3,
              width: '170px',
              [theme.breakpoints.down('sm')]: {
                m: 0,
                width: '100%',
              },
            }}
            wrapperSx={{
              [theme.breakpoints.down('sm')]: {
                width: '100%',
                m: '15px 0 0 0 !important',
              },
            }}
            startIcon={<PeopleIcon />}
          >
            {t('add_user_button')}
          </Button>
        )}
      </ModalActions>
    </Dialog>
  )
}
