export const fonts = {
  regular: 'Geomanist',
  medium: 'Geomanist Medium',
  book: 'Geomanist Book',
  ultra: 'Geomanist Ultra',
};

export type IFontsVariants = keyof typeof fonts;
export type IFonts = {
  [variant in IFontsVariants]: string;
};
