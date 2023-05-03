import React from 'react';
import { useTheme } from '@mui/material/styles';

export const FacebookLogoSvg: React.FC<any> = () => {
  const theme = useTheme();
  return (
    <svg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='28' cy='28' r='27.5' fill='white' stroke={theme.palette.common.grayGoose} />
      <path
        d='M33.6155 29.499L34.2994 25.1575H30.0865V22.3356C30.0865 21.1485 30.6747 19.9885 32.5554 19.9885H34.4977V16.2915C33.3666 16.1113 32.2237 16.0138 31.0782 15.9998C27.6108 15.9998 25.3471 18.0824 25.3471 21.8472V25.1575H21.5035V29.499H25.3471V39.9998H30.0865V29.499H33.6155Z'
        fill='#337FFF'
      />
    </svg>
  );
};
