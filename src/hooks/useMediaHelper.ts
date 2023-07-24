import { Breakpoint, useMediaQuery, useTheme } from '@mui/material'

export const useMediaHelper = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('tb' as Breakpoint))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm' as Breakpoint))

  return { isDesktop, isSmallMobile }
}
