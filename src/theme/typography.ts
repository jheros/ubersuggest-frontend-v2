import { CSSProperties } from 'react';

interface ICssPropertiesObject {
  [variant: string]: CSSProperties;
}

interface IFontFamilyCssProperty {
  fontFamily: CSSProperties['fontFamily'];
}

const typography: ICssPropertiesObject | IFontFamilyCssProperty = {
  fontFamily: 'Geomanist',
  h1: {
    fontSize: '2.5rem', // 40px
    lineHeight: '2.5rem', // 40px
    fontWeight: 500,
  },
  h2: {
    fontSize: '2rem', // 32px
    lineHeight: '2rem', // 32px
    fontWeight: 500,
  },
  h3: {
    fontSize: '1.75rem', // 28px
    lineHeight: '1.75rem', // 28px
    fontWeight: 500,
  },
  h4: {
    fontSize: '1.5rem', // 24px
    lineHeight: '2rem', // 32px
    fontWeight: 500,
  },
  stats: {
    fontSize: '1.5rem', // 24px
    lineHeight: '2rem', // 32px
    fontWeight: 700,
  },
  caption1: {
    fontSize: '1.5rem', // 24px
    lineHeight: '1.5rem', // 24px
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  caption2: {
    fontSize: '1rem', // 16 px
    lineHeight: '1rem', // 16 px
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  caption3: {
    fontSize: '0.875rem', // 14 px
    lineHeight: '1rem', // 16 px
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  caption4: {
    fontSize: '0.75rem', // 12 px
    lineHeight: '0.75rem', // 12 px,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: '0.875rem', // 14 px
    lineHeight: '1rem', // 16 px
    letterSpacing: '0.08',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  body1: {
    fontSize: '1.5rem', // 24px,
    lineHeight: '2.5rem', // 40px
  },
  body2: {
    fontSize: '1.25rem', // 20px,
    lineHeight: '2rem', // 32px
  },
  body3: {
    fontSize: '1rem', //16px,
    lineHeight: '1.75rem', // 28px
  },
  body4: {
    fontSize: '0.875rem', // 14px,
    lineHeight: '1.5rem', // 24px
  },
  body5: {
    fontSize: '0.75rem', // 12px,
    lineHeight: '1.125rem', // 18px
  },
};

type ITypographyVariants = keyof typeof typography;

type ITypography = {
  [variant in ITypographyVariants]: CSSProperties;
};

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    stats: true;
    caption1: true;
    caption2: true;
    caption3: true;
    caption4: true;
    button: true;
    body1: true;
    body2: true;
    body3: true;
    body4: true;
    body5: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants extends ITypography {}

  interface TypographyVariantsOptions extends Partial<ITypography> {}
}

export default typography;
