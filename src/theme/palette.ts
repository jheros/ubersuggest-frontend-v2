import { PaletteColorOptions, PaletteColor } from '@mui/material/styles'

import { IStatusColors, colors, fonts, shadows } from './variables'
import type { IPaletteColors, IFonts, IShadows } from './variables'

const palette = {
  primary: colors.orange,
  secondary: colors.blue,
  gray: colors.gray,
  lightGray: colors.lightGray,
  darkGray: colors.darkGray,
  red: colors.red,
  green: colors.green,
  yellow: colors.yellow,

  common: {
    ...shadows,
    ...fonts,
    ...colors.status,
  },
}

type IPaletteVariants = keyof typeof palette
type IPaletteColorVariants = Exclude<IPaletteVariants, 'common'>

type IPalette = {
  [variant in IPaletteColorVariants]: PaletteColor
}
type IPaletteOptions = {
  [variant in IPaletteColorVariants]?: PaletteColorOptions
}

declare module '@mui/material/styles' {
  interface PaletteColor extends IPaletteColors {}

  interface Palette extends IPalette {}

  interface PaletteOptions extends IPaletteOptions {}

  interface SimplePaletteColorOptions extends IPaletteColors {}
}

declare module '@mui/material/styles/createPalette' {
  interface CommonColors extends IFonts, IShadows, IStatusColors {}
}

export default palette
