import { createTheme, ThemeOptions } from '@mui/material/styles';
import palette from './palette';
// eslint-disable-next-line import/no-named-as-default
import typography from './typography';
import components from './mui-components';
import custom from './custom';
import breakpoints from './breakpoints';

const theme = createTheme({
  palette,
  typography,
  components,
  custom,
  breakpoints,
}) as ThemeOptions;

export default theme;
