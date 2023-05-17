declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    tb: true
    md: true
    lg: true
    xl: true
  }
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    tb: 768,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
}

export default breakpoints
