import React from 'react';
import { useTheme } from '@mui/material/styles';

type PlugSvgProps = {
  stroke?: string;
};

export const PlusSvg: React.FC<PlugSvgProps> = ({ stroke }) => {
  const {
    palette: {
      common: { orange },
    },
  } = useTheme();
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='17' viewBox='0 0 16 17' fill='none'>
      <path d='M8 1.75V15.75' stroke={stroke || orange} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M15 8.75L1 8.75'
        stroke={stroke || orange}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

type PlugCircleSvgProps = {
  stroke?: string;
  fill?: string;
};

export const PlusCircleSvg: React.FC<PlugCircleSvgProps> = ({ stroke, fill }) => {
  const {
    palette: {
      common: { orange },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='10' cy='10' r='9' fill={fill || 'currentColor'} />
      <path d='M10 6V14' stroke={stroke || orange} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14 10L6 10' stroke={stroke || orange} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};
