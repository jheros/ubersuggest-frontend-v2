import { fonts } from 'theme/variables';
import { TypographyVariantsOptions } from './types';

export const h1 = {
  fontSize: '2.5rem', // 40px
  lineHeight: '1.2',
  fontWeight: 500,
};

export const h2 = {
  fontSize: '2rem', // 32px
  lineHeight: '1.2',
  fontWeight: 500,
};

export const h3 = {
  fontSize: '1.75rem', // 28px
  lineHeight: '1.2',
  fontWeight: 500,
};

export const h4 = {
  fontFamily: fonts.geomanistMedium,
  fontSize: '1.5rem', // 24px
  lineHeight: '1.2',
};

export const h5 = {
  fontSize: '1.25rem', // 20px
  lineHeight: '1.2',
  fontWeight: 500,
};

export const h6 = {
  fontSize: '1rem', // 16px
  lineHeight: '1.2',
  fontWeight: 500,
};

export const caps26 = {
  fontFamily: fonts.geomanist,
  fontWeight: 500,
  fontSize: '1.625rem', // 26px
  lineHeight: '1',
  textTransform: 'uppercase',
};

export const caps24 = {
  fontFamily: fonts.geomanist,
  fontWeight: 500,
  fontSize: '1.5rem', // 24px
  lineHeight: '1',
  textTransform: 'uppercase',
};

export const caps16 = {
  fontFamily: fonts.geomanist,
  fontWeight: 500,
  fontSize: '1rem', // 16 px
  lineHeight: '1',
  letterSpacing: '0.08',
  textTransform: 'uppercase',
};

export const caps15 = {
  fontFamily: fonts.geomanist,
  fontWeight: 500,
  fontSize: '0.9375rem', // 15 px
  lineHeight: '1',
  textTransform: 'uppercase',
};

export const caps14 = {
  fontFamily: fonts.geomanist,
  fontWeight: 500,
  fontSize: '0.875rem', // 14 px
  lineHeight: '1',
  textTransform: 'uppercase',
};

export const caps12 = {
  fontFamily: fonts.geomanist,
  fontWeight: 500,
  fontSize: '0.75rem', // 12 px
  lineHeight: '1',
  textTransform: 'uppercase',
};

export const caps12Medium = {
  fontFamily: fonts.geomanistMedium,
  fontWeight: 400,
  fontSize: '0.75rem', // 12 px
  lineHeight: '1',
  textTransform: 'uppercase',
};

export const text24 = {
  fontFamily: fonts.geomanist,
  fontSize: '1.5rem', // 24px
  lineHeight: '1.2',
};

export const text24Medium = {
  ...text24,
  fontFamily: fonts.geomanistMedium,
};

export const text24Book = {
  ...text24,
  fontFamily: fonts.geomanistBook,
};

export const text22 = {
  fontFamily: fonts.geomanist,
  fontSize: '1.375rem', // 22px
  lineHeight: '1.2',
};

export const text22Book = {
  ...text22,
  fontFamily: fonts.geomanistBook,
};

export const text20 = {
  fontFamily: fonts.geomanist,
  fontSize: '1.25rem', // 20px
  lineHeight: '1.2',
};

export const text20Book = {
  ...text20,
  fontFamily: fonts.geomanistBook,
};

export const text18 = {
  fontFamily: fonts.geomanist,
  fontSize: '1.125rem', // 18px
  lineHeight: '1.2',
};

export const text18Book = {
  ...text18,
  fontFamily: fonts.geomanistBook,
};

export const text18Medium = {
  ...text18,
  fontFamily: fonts.geomanistMedium,
};

export const text20Medium = {
  ...text20,
  fontFamily: fonts.geomanistMedium,
};

export const text16 = {
  fontFamily: fonts.geomanist,
  fontSize: '16px', // 16px
  lineHeight: '1.2',
};

export const text16Medium = {
  ...text16,
  fontFamily: fonts.geomanistMedium,
};

export const text16Book = {
  ...text16,
  fontFamily: fonts.geomanistBook,
};

export const text15 = {
  fontFamily: fonts.geomanist,
  fontSize: '15px', // 15px
  lineHeight: '1.2',
};

export const text15Book = {
  ...text15,
  fontFamily: fonts.geomanistBook,
};

export const text14 = {
  fontFamily: fonts.geomanist,
  fontSize: '14px',
  lineHeight: '1.2',
};

export const text14Medium = {
  ...text14,
  fontFamily: fonts.geomanistMedium,
};

export const text14Book = {
  ...text14,
  fontFamily: fonts.geomanistBook,
};

export const text12 = {
  fontFamily: fonts.geomanist,
  fontSize: '12px',
  lineHeight: '1.2',
};

export const text12Medium = {
  ...text12,
  fontFamily: fonts.geomanistMedium,
};

export const text12Book = {
  ...text12,
  fontFamily: fonts.geomanistBook,
};

export const text10 = {
  fontFamily: fonts.geomanist,
  fontSize: '10px',
  lineHeight: '1.2',
};

export const text10Book = {
  ...text10,
  fontFamily: fonts.geomanistBook,
};

export const typography = {
  fontFamily: fonts.geomanist,
  fontStyle: 'normal',
  fontWeight: 500,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  caps26,
  caps24,
  caps16,
  caps15,
  caps14,
  caps12,
  caps12Medium,
  text24,
  text22,
  text20,
  text18,
  text16,
  text15,
  text14,
  text12,
  text10,
  text12Medium,
  text14Medium,
  text16Medium,
  text18Medium,
  text20Medium,
  text24Medium,
  text24Book,
  text22Book,
  text20Book,
  text18Book,
  text16Book,
  text15Book,
  text14Book,
  text12Book,
  text10Book,
} as TypographyVariantsOptions;

export default typography;
