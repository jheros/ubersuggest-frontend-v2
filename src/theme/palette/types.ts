import '@mui/material/styles/createPalette';

interface IColors {
  orange: string;
  darkGray: string;
  gray: string;
  silver: string;
  lightGray: string;
  porcelain: string;
  iron: string;
  lightestGray: string;
  grayGoose: string;
  osloGray: string;
  mediumGray: string;
  blue: string;
  darkRed: string;
  red: string;
  lightRed: string;
  dullRed: string;
  pink: string;
  brightOrange: string;
  dullOrange: string;
  lightOrange: string;
  bridesmaid: string;
  lightBlue: string;
  dimBlue: string;
  hawkesBlue: string;
  darkGreen: string;
  brightGreen: string;
  dullGreen: string;
  lightGreen: string;
  darkYellow: string;
  yellow: string;
  dullYellow: string;
  limeYellow: string;
  success: string;
  danger: string;
  warning: string;
  good: string;
  info: string;
  white: string;
  zircon: string;
  sazerac: string;
  wildSand: string;
  grandis: string;
}

interface IShadows {
  shadowA: string;
  shadowB: string;
  shadowC: string;
  shadowD: string;
  shadowE: string;
}

interface IFonts {
  geomanist: string;
  geomanistMedium: string;
  geomanistBook: string;
  geomanistUltra: string;
}

declare module '@mui/material/styles/createPalette' {
  interface CommonColors extends IColors, IShadows, IFonts {}
}

declare module '@mui/material/styles' {
  interface Palette {
    yellow: Palette['primary'];
    gray: Palette['primary'];
  }

  interface PaletteOptions {
    yellow?: PaletteOptions['primary'];
    gray?: PaletteOptions['primary'];
  }

  interface PaletteColor {
    yellow?: string;
    gray?: string;
  }

  interface SimplePaletteColorOptions {
    yellow?: string;
    gray?: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    yellow: true;
    gray: true;
    bridesmaid: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    yellow: true;
    gray: true;
    bridesmaid: true;
  }
}
