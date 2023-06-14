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
  [theme.breakpoints.down('md')]: {
    margin: margin || '0 -10px',
  },
}))

interface IHr extends BoxProps {
  text?: string
}

export const Hr = ({ text, sx, ...otherProps }: IHr) => {
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
      <Line sx={{ padding: 0, margin: 0, position: 'absolute', top: '50%' }} />
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
    </Box>
  )
}
