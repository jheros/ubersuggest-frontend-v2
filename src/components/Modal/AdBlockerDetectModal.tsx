import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { useTheme, Dialog, DialogContent } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { Button } from 'components'
import { IRootState } from 'store'
import { hideAdBlockerDetectModal } from 'store/reducers/modal'

import { ModalActions } from './ModalActions'
import { ModalTitle } from './ModalTitle'

export const AdBlockerDetectModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen } = useSelector((state: IRootState) => state.modal.adBlockerDetectModal)
  const theme = useTheme()

  const handleClose = () => {
    dispatch(hideAdBlockerDetectModal())
  }

  const handleAccept = () => {
    dispatch(hideAdBlockerDetectModal())
    window.location.reload()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby={t('ad_blocker_detected_heading')}
      open={isOpen}
      sx={{ '.MuiPaper-root': { width: '550px' } }}
    >
      <ModalTitle onClose={handleClose} showIcon={false}>
        {t('ad_blocker_detected_heading')}
      </ModalTitle>
      <DialogContent sx={{ textAlign: 'center', p: '40px' }}>
        <Typography variant='text14' color={theme.palette.common.darkGray.main}>
          {t('ad_blocker_detected_warning')}
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
          variant='outlined'
          size='xlarge'
          color='tertiary'
          sx={{
            width: '170px',
            mr: 3,
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
          {t('close')}
        </Button>
        <Button
          onClick={handleAccept}
          variant='contained'
          size='xlarge'
          sx={{
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }}
          wrapperSx={{
            [theme.breakpoints.down('sm')]: {
              width: '100%',
              m: '15px 0 0 0 !important',
            },
          }}
        >
          {t('ad_blocker_detected_button')}
        </Button>
      </ModalActions>
    </Dialog>
  )
}
