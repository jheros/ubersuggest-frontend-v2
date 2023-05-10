import { createTheme } from '@mui/material/styles';

import palette from './palette';
import typography from './typography';
import { shadows } from './variables/shadows';

const a = Array(25).fill('');
type b = typeof a;

const theme = createTheme({
  palette,
  typography,
  shadows,
});

export default theme;
export type ITheme = typeof theme;
