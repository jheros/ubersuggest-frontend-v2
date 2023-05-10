export const colors = {
  orange: {
    main: '#F16434',
    '500': '#F16434',
    '400': '#F59271',
    '300': '#F8B199',
    '200': '#FBD0C2',
    '100': '#FCE0D6',
    '50': '#FEEFEB',
  },
  blue: {
    main: '#4285F4',
    '500': '#4285F4',
    '400': '#7BAAF7',
    '300': '#A0C2F9',
    '200': '#C6DAFC',
    '100': '#D9E7FD',
    '50': '#ECF3FE',
  },
  dark: {
    main: '#202020',
    '500': '#202020',
    '400': '#636363',
    '300': '#8F8F8F',
    '200': '#BCBCBC',
    '100': '#D2D2D2',
    '50': '#E9E9E9',
  },
  grey: {
    main: '#A3B0B3',
    '500': '#A3B0B3',
    '400': '#BFC8CA',
    '300': '#D1D7D9',
    '200': '#E3E7E8',
    '100': '#EDEFF0',
    '50': '#F6F7F7',
  },
  light: {
    main: '#D1D7D9',
    '500': '#D1D7D9',
    '400': '#DFE3E4',
    '300': '#E8EBEC',
    '200': '#F1F3F4',
    '100': '#F6F7F7',
    '50': '#FAFBFB',
  },
  red: {
    '500': '#E53435',
    '300': '#FE8485',
    '200': '#EE8A88',
    '100': '#F2A7A6',
  },
  pink: {
    '500': '#FDB1FF',
  },
  green: {
    '500': '#00A862',
    '300': '#85ECC1',
    '200': '#C0ECD9',
    '100': '#E0FAEF',
  },
  yellow: {
    '500': '#E89900',
    '400': '#F8BC54',
    '300': '#F4E26C',
    '100': '#FFEAC5',
  },
  lightOrange: {
    '500': '#FFAD7E',
    '400': '#F3AF86',
    '300': '#F5C299',
  },
  lightBlue: {
    '500': '#86B7EC',
  },
};

export type IColorLevels = 'main' | '50' | '100' | '200' | '300' | '400' | '500';
export type IPaletteColors = {
  [color in IColorLevels]?: string;
};
