import { PaletteColorOptions, PaletteColor } from '@mui/material/styles';

import { colors, fonts, shadows } from './variables';
import type { IPaletteColors, IFonts, IShadows } from './variables';

const palette = {
  primary: colors.orange,
  secondary: colors.blue,
  dark: colors.dark,
  grey: colors.grey,
  light: colors.light,

  error: colors.red,
  warning: colors.yellow,
  success: colors.green,

  common: {
    // ...shadows,
    ...fonts,
  },
};

type IPaletteVariants = keyof typeof palette;
type IPaletteColorVariants = Exclude<IPaletteVariants, 'common'>;

type IPalette = {
  [variant in IPaletteColorVariants]: PaletteColor;
};
type IPaletteOptions = {
  [variant in IPaletteColorVariants]?: PaletteColorOptions;
};

declare module '@mui/material/styles' {
  interface PaletteColor extends IPaletteColors {}

  interface Palette extends IPalette {}

  interface PaletteOptions extends IPaletteOptions {}

  interface SimplePaletteColorOptions extends IPaletteColors {}
}

declare module '@mui/material/styles/createPalette' {
  interface CommonColors extends IFonts {}
}

export default palette;
