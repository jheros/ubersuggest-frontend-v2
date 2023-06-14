import MuiTypography, { TypographyProps } from '@mui/material/Typography'
import { styled, Theme } from '@mui/material/styles'
import { fonts } from '@common-ui/esm'
import type { IFontVariants } from '@common-ui/esm'

import { setOpacity } from 'utils/colors'
import { includes } from 'lodash'

interface ITypography extends TypographyProps {
  color?: string
  font?: IFontVariants
  fontFamily?: 'primary' | 'secondary'
  fontWeight?: number
  theme: Theme
  boldColor?: string
  boldFontFamily?: string
  boldFontSize?: string
  boldFontWeight?: string
}

export const Typography = styled(MuiTypography, {
  shouldForwardProp: (prop) =>
    !includes(
      ['color', 'font', 'fontFamily', 'fontWeight', 'boldColor', 'boldFontFamily', 'boldFontSize', 'boldFontWeight'],
      prop,
    ),
})(
  ({
    color,
    font,
    fontFamily = 'primary',
    fontWeight,
    theme,
    boldColor,
    boldFontFamily,
    boldFontSize,
    boldFontWeight,
  }: ITypography) => ({
    fontFamily: font ? fonts[fontFamily]?.[font] || 'inherit' : 'inherit',
    fontWeight: fontWeight || 'inherit',
    color: color || 'inherit',
    '& b': {
      color: boldColor || theme.palette.primary.main,
      fontFamily: boldFontFamily || fonts.primary.medium,
      fontSize: boldFontSize || 'inherit',
      fontWeight: boldFontWeight || 'normal',
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      textDecorationColor: setOpacity(theme.palette.primary.main, 0.4),
      '&:hover': {
        textDecorationColor: 'inherit',
      },
    },
  }),
)
