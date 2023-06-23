import * as React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { useTheme, Box, IconButton } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { ReactComponent as WarningIcon } from 'assets/svg/icons/warning-small.svg'
import { Hr } from 'components'

export interface IModalTitle {
  children?: React.ReactNode
  icon?: React.ReactNode
  showIcon?: boolean
  showCloseButton?: boolean
  onClose?: () => void
}

export const ModalTitle = ({
  children,
  showIcon = false,
  icon = <WarningIcon />,
  showCloseButton = true,
  onClose,
  ...other
}: IModalTitle) => {
  const theme = useTheme()

  return (
    <Box sx={{ m: 0, p: '40px 40px 0 40px', textAlign: 'center' }} {...other}>
      <Typography
        font='book'
        variant='text24Book'
        lineHeight={1}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
        }}
      >
        {showIcon && (
          <Box
            mr='20px'
            sx={{
              [theme.breakpoints.down('sm')]: {
                mr: 0,
                mb: '20px',
              },
            }}
          >
            {icon}
          </Box>
        )}
        {children}
      </Typography>
      <Hr lineColor={theme.palette.error.main} sx={{ mt: '17px', width: '90px', mx: 'auto' }} />
      {showCloseButton ? (
        <IconButton
          aria-label='close'
          onClick={() => onClose && onClose()}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: (theme) => theme.palette.common.darkGray.main,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </Box>
  )
}
