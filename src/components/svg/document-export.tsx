import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IStrokeSvg } from './types';

export const DocumentExportSvg: React.FC<IStrokeSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { orange },
    },
  } = useTheme();
  return (
    <svg width='15' height='16' viewBox='0 0 15 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1 10V14.3333C1 14.5101 1.08279 14.6797 1.23017 14.8047C1.37754 14.9298 1.57742 15 1.78584 15H13.2142C13.4226 15 13.6225 14.9298 13.7698 14.8047C13.9172 14.6797 14 14.5101 14 14.3333V10'
        stroke={stroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M7.31229 1.17411L9.93339 5.35081C9.97266 5.41325 9.99549 5.48617 9.9994 5.56168C10.0033 5.63718 9.98815 5.71242 9.95558 5.77925C9.92301 5.84608 9.87425 5.90197 9.81458 5.94087C9.75491 5.97978 9.6866 6.00023 9.61701 6H4.38299C4.3134 6.00023 4.24508 5.97978 4.1854 5.94087C4.12573 5.90197 4.07697 5.84608 4.0444 5.77925C4.01183 5.71242 3.99669 5.63718 4.0006 5.56168C4.00451 5.48617 4.02733 5.41325 4.06659 5.35081L6.69042 1.17411C6.72574 1.12026 6.77239 1.07637 6.82648 1.04608C6.88056 1.0158 6.94052 1 7.00136 1C7.0622 1 7.12217 1.0158 7.17625 1.04608C7.23034 1.07637 7.27698 1.12026 7.31229 1.17411V1.17411Z'
        stroke={stroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M9 12C9 12 6.99928 12.0789 7 11.9667V7'
        stroke={stroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
};
