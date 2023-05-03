import React from 'react';
import { useTheme } from '@mui/material/styles';

export const GMailLogoSvg: React.FC<any> = () => {
  const theme = useTheme();
  return (
    <svg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='28' cy='28' r='27.5' fill='white' stroke={theme.palette.common.grayGoose} />
      <path
        d='M15.3421 38.5996H19.7891V27.7999L13.4363 23.0353V36.6938C13.4363 37.7483 14.2907 38.5996 15.3421 38.5996Z'
        fill='#4285F4'
      />
      <path
        d='M35.0357 38.5996H39.4827C40.5372 38.5996 41.3885 37.7451 41.3885 36.6938V23.0353L35.0357 27.7999'
        fill='#34A853'
      />
      <path
        d='M35.0357 19.5414V27.8L41.3885 23.0354V20.4943C41.3885 18.1374 38.6981 16.7938 36.8145 18.2073'
        fill='#FBBC04'
      />
      <path d='M19.7891 27.7999V19.5412L27.4124 25.2587L35.0357 19.5412V27.7999L27.4124 33.5174' fill='#EA4335' />
      <path
        d='M13.4363 20.4943V23.0354L19.7891 27.8V19.5414L18.0103 18.2073C16.1235 16.7938 13.4363 18.1374 13.4363 20.4943Z'
        fill='#C5221F'
      />
    </svg>
  );
};
