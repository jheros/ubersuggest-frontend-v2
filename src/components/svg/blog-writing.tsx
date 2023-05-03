import React from 'react';
import { useTheme } from '@mui/material/styles';

export interface IBlogWritingSvg {
  stroke?: string;
}

export const BlogWritingSvg: React.FC<IBlogWritingSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { blue },
    },
  } = useTheme();
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'>
      <path
        d='M20.3047 10.9293V22.8077H1.08508V1.09326L14.1674 1.09326'
        stroke={stroke || blue}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M6.06325 14.7324L17.8523 3.31348L20.8221 6.28333L9.08045 17.6635L4.7677 19.3765L6.06325 14.7324Z'
        stroke={stroke || blue}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M23 4.46229L19.6471 1.10938L17.6457 3.10648L20.9986 6.45942L23 4.46229Z'
        stroke={stroke || blue}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path d='M6.06325 14.7451L9.10197 17.6031' stroke={stroke || blue} strokeWidth='1.5' strokeLinecap='round' />
      <path d='M4.34749 4.38281H9.78088' stroke={stroke || blue} strokeWidth='1.5' strokeLinecap='round' />
      <path d='M4.34749 7.65625H7.75827' stroke={stroke || blue} strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  );
};
