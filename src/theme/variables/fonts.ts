export const fonts = {
  geomanist: 'Geomanist',
  geomanistMedium: 'Geomanist Medium',
  geomanistBook: 'Geomanist Book',
  geomanistUltra: 'Geomanist Ultra',
};

export type IFontsVariants = keyof typeof fonts;
export type IFonts = {
  [variant in IFontsVariants]: string;
};
