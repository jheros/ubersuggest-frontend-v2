import { colors, fonts } from 'theme/variables';
import { shadows } from '../variables/shadows';

const palette = {
  primary: {
    main: colors.orange,
  },
  secondary: {
    main: colors.blue,
  },
  error: {
    main: colors.darkRed,
  },
  warning: {
    main: colors.sazerac,
  },
  success: {
    main: colors.success,
  },
  info: {
    main: colors.info,
  },
  yellow: {
    main: colors.darkYellow,
    contrastText: colors.white,
  },
  bridesmaid: {
    main: colors.bridesmaid,
    contrastText: colors.darkGray,
  },
  gray: {
    main: colors.lightGray,
    contrastText: colors.white,
  },
  common: {
    ...colors,
    ...shadows,
    ...fonts,
  },
};

export default palette;
