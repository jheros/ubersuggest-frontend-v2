import MuiTypography, { TypographyProps } from '@mui/material/Typography';
import { styled, Theme } from '@mui/material/styles';

import { fonts, IFontsVariants } from 'theme/variables';

interface ITypography extends TypographyProps {
  color?: string;
  font?: IFontsVariants;
  fontWeight?: number;
  theme?: Theme;
}

export const Typography = styled(MuiTypography)(({ color, font, fontWeight = 400, theme, ...rest }: ITypography) => ({
  fontFamily: font ? fonts[font] : 'inherit',
  fontWeight,
  color: color || theme?.palette.dark.main,
}));
