import React from 'react';
import { useTheme } from '@mui/material/styles';

interface ICrossSvg {
  stroke?: string;
}

export const CrossSvg: React.FC<ICrossSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { mediumGray },
    },
  } = useTheme();
  return (
    <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.16831 1.09722L10.9738 10.9027'
        stroke={stroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.9739 1.09733L1.16842 10.9028'
        stroke={stroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
