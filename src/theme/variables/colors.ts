export const colors = {
  orange: {
    main: '#F16434',
    '70': '#F59271',
    '50': '#F8B199',
    '30': '#FBD0C2',
    '20': '#FCE0D6',
    '10': '#FEEFEB',
  },
  blue: {
    main: '#4285F4',
    '70': '#7BAAF7',
    '50': '#A0C2F9',
    '30': '#C6DAFC',
    '20': '#D9E7FD',
    '10': '#ECF3FE',
  },
  darkGray: {
    main: '#202020',
    '70': '#636363',
    '50': '#8F8F8F',
    '30': '#BCBCBC',
    '20': '#D2D2D2',
    '10': '#E9E9E9',
  },
  gray: {
    main: '#A3B0B3',
    '70': '#BFC8CA',
    '50': '#D1D7D9',
    '30': '#E3E7E8',
    '20': '#EDEFF0',
    '10': '#F6F7F7',
  },
  lightGray: {
    main: '#D1D7D9',
    '70': '#DFE3E4',
    '50': '#E8EBEC',
    '30': '#F1F3F4',
    '20': '#F6F7F7',
    '10': '#FAFBFB',
  },
  red: {
    dark: '#E53435',
    main: '#FE8485',
    light: '#EE8A88',
    dull: '#F2A7A6',
  },
  pink: {
    main: '#FDB1FF',
  },
  green: {
    dark: '#00A862',
    main: '#85ECC1',
    dull: '#C0ECD9',
    light: '#E0FAEF',
  },
  yellow: {
    dark: '#E89900',
    main: '#F8BC54',
    lime: '#F4E26C',
    dull: '#FFEAC5',
  },
  lightOrange: {
    bright: '#FFAD7E',
    dull: '#F3AF86',
    light: '#F5C299',
  },
  lightBlue: {
    main: '#86B7EC',
  },
};

export type IColorLevels = 'main' | '70' | '50' | '30' | '20' | '10';
export type IPaletteColors = {
  [color in IColorLevels]?: string;
};
