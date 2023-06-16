import { styled } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'

export const ModalActions = styled(DialogActions)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.common.lightGray[50]}`,
  padding: '40px',
  justifyContent: 'center',
}))
