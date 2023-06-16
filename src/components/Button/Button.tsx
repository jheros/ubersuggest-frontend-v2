import MuiButton, { ButtonProps } from '@mui/material/Button'
import { Theme } from '@mui/material/styles'
import { Box, CircularProgress, SxProps } from '@mui/material'

interface IButton extends ButtonProps {
  loading?: boolean
  theme?: Theme
  wrapperSx?: SxProps
}

export const Button = ({
  children,
  color = 'primary',
  size = 'medium',
  loading = false,
  wrapperSx,
  ...props
}: IButton) => {
  const PROGRESS_SIZES = {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  }

  return (
    <Box sx={{ position: 'relative', ...wrapperSx }}>
      <MuiButton {...props} disabled={loading} color={color} size={size}>
        {children}
      </MuiButton>
      {loading && (
        <CircularProgress
          size={PROGRESS_SIZES[size]}
          color={color}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: `-${PROGRESS_SIZES[size] / 2}px`,
            marginLeft: `-${PROGRESS_SIZES[size] / 2}px`,
          }}
        />
      )}
    </Box>
  )
}
