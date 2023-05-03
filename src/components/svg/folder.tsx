import React from 'react';
import { useTheme } from '@mui/material/styles';

interface IFolderSvg {
  stroke?: string;
}

export const FolderSvg: React.FC<IFolderSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { orange },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1829_31514)'>
        <path
          d='M2 15.3545V3.69007C2 3.50756 2.07228 3.33248 2.20104 3.20313C2.3298 3.07378 2.50453 3.00071 2.68704 2.99988H8.44432C9.20667 2.99988 9.38551 3.76224 9.57061 4.15126C9.62587 4.26999 9.7148 4.36984 9.82635 4.43845C9.9379 4.50705 10.0672 4.54138 10.1981 4.53714H15.7385'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6.64319 16.1103H16.5007C16.7046 16.1103 16.9001 16.0293 17.0442 15.8852C17.1884 15.741 17.2694 15.5455 17.2694 15.3417V8.45223C17.2694 8.24837 17.1884 8.05287 17.0442 7.90872C16.9001 7.76457 16.7046 7.68359 16.5007 7.68359H5.8871C5.78616 7.68359 5.68622 7.70348 5.59297 7.74211C5.49971 7.78074 5.41497 7.83735 5.3436 7.90872C5.27222 7.98009 5.21561 8.06484 5.17699 8.15809C5.13836 8.25134 5.11847 8.35129 5.11847 8.45223V16.1103'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M2 15.3547C2 15.5586 2.08096 15.7541 2.22511 15.8982C2.36925 16.0424 6.34627 16.1234 6.55012 16.1234H7.31247'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1829_31514'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
