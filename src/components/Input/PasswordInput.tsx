import { useState, forwardRef } from 'react'
import { InputBase, IconButton, useTheme, InputBaseProps } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

interface IPasswordInput extends InputBaseProps {
  showToggle?: boolean
}

export const PasswordInput = forwardRef(({ showToggle = true, ...props }: IPasswordInput, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const theme = useTheme()
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <InputBase
      ref={ref}
      {...props}
      type={showPassword ? 'text' : 'password'}
      sx={{ ...props.sx, position: 'relative', input: showToggle ? { pr: '46px' } : {} }}
      endAdornment={
        showToggle && (
          <IconButton
            aria-label='toggle password visibility'
            onClick={handleClickShowPassword}
            edge='end'
            sx={{
              position: 'absolute',
              right: 0,
              mr: '4px',
              '.MuiSvgIcon-root': {
                color: theme.palette.common.gray.main,
              },
              '&:hover .MuiSvgIcon-root': {
                color: theme.palette.common.darkGray.main,
              },
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )
      }
    />
  )
})
