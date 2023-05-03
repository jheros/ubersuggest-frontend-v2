import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IStrokeSvg } from './types';

export const DocumentShareSvg: React.FC<IStrokeSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { orange },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1829_31522)'>
        <path
          d='M14.1599 18.3005C15.3528 18.3005 16.3198 17.3335 16.3198 16.1406C16.3198 14.9477 15.3528 13.9807 14.1599 13.9807C12.967 13.9807 12 14.9477 12 16.1406C12 17.3335 12.967 18.3005 14.1599 18.3005Z'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4.43799 11.4525C5.63088 11.4525 6.59791 10.4855 6.59791 9.2926C6.59791 8.09972 5.63088 7.13269 4.43799 7.13269C3.2451 7.13269 2.27808 8.09972 2.27808 9.2926C2.27808 10.4855 3.2451 11.4525 4.43799 11.4525Z'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15.2421 6.31983C16.435 6.31983 17.402 5.3528 17.402 4.15991C17.402 2.96703 16.435 2 15.2421 2C14.0492 2 13.0822 2.96703 13.0822 4.15991C13.0822 5.3528 14.0492 6.31983 15.2421 6.31983Z'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.9999 13.9807L6.05902 10.9137'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6.59796 8.21488L13.0777 5.24219'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1829_31522'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
