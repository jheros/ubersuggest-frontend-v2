import React from 'react';
import { useTheme } from '@mui/system';
import { IStrokeSvg } from './types';

export const CopySvg: React.FC<IStrokeSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { mediumGray },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1829_31526)'>
        <path
          d='M3.90936 6.08228H2V17.2101H13.1279V15.3008'
          stroke={stroke || mediumGray}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.2101 2H6.08221V13.1279H17.2101V2Z'
          stroke={stroke || mediumGray}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1829_31526'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
