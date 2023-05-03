import React from 'react';
import { useTheme } from '@mui/material/styles';

type ChevronRightSvgProps = {
  stroke?: string;
};

export const ChevronRightSvg: React.FC<ChevronRightSvgProps> = ({ stroke }) => {
  const {
    palette: {
      common: { darkGray },
    },
  } = useTheme();
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M6.05194 3.54805L10.5039 8L6.05194 12.4519' stroke={stroke || darkGray} strokeWidth='1.5' />
    </svg>
  );
};
