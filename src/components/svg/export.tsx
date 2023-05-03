import React from 'react';
import { useTheme } from '@mui/material/styles';

interface IExportSvg {
  stroke?: string;
}

export const ExportSvg: React.FC<IExportSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { mediumGray },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1829_31518)'>
        <path
          d='M17.4995 15.1873V17.3198H3.20047V15.1873'
          stroke={stroke || mediumGray}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M14.4761 5.96633L10.3734 2L6.26685 5.96633'
          stroke={stroke || mediumGray}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M10.3734 13.1873V2' stroke='#636363' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </g>
      <defs>
        <clipPath id='clip0_1829_31518'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
