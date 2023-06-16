import { Box, BoxProps, styled, useTheme } from '@mui/system'

import { Typography } from 'components'

interface ILine {
  width?: string
  margin?: string
  color?: string
}

export const Line = styled('div')<ILine>(({ width, margin, color, theme }) => ({
  borderTop: '1px solid ' + (color || theme.palette.common.lightGray[50]),
  width: width || '100%',
  margin: margin || '0 -10px',
  paddingTop: '20px',
}))

interface IHr extends BoxProps {
  text?: string
  lineColor?: string
}

export const Hr = ({ text, sx, lineColor, ...otherProps }: IHr) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '14px',
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        ...sx,
      }}
      {...otherProps}
    >
      <Line color={lineColor} sx={{ padding: 0, margin: 0, position: 'absolute', top: '50%' }} />
      {text && (
        <Typography
          variant='text14'
          sx={{
            width: 'fit-content',
            padding: '0 12px',
            left: '50%',
            top: '1px',
            background: theme.palette.common.white,
            transform: 'translateX(-50%)',
            position: 'absolute',
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  )
}
