import '@mui/system/Theme';
import { IDrawer } from './layout/drawer/types';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      layout: {
        drawer: IDrawer;
      };
    };
  }
  interface ThemeOptions {
    custom: {
      layout: {
        drawer: IDrawer;
      };
    };
  }
}
