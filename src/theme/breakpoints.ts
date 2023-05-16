declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
  }
}

const breakpoints = {
  values: {
    xs: 600,
    sm: 768,
    md: 900,
    lg: 1200,
    xl: 1900,
  },
}

export default breakpoints
