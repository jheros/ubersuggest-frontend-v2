import React from 'react';
import { useTheme } from '@mui/material/styles';

export interface IAppSelectedSvg {
  fill?: string;
  secondaryColor?: string;
}

export const AppSelectedSvg: React.FC<IAppSelectedSvg> = ({ fill, secondaryColor }) => {
  const {
    palette: {
      common: { orange, white },
    },
  } = useTheme();
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect
        x='0.25'
        y='0.25'
        width='15.5'
        height='15.5'
        rx='7.75'
        fill={fill || orange}
        stroke={fill || orange}
        strokeWidth='0.5'
      />
      <path d='M11.8284 4.82843L6.17157 10.4853L3.34315 7.65685' stroke={secondaryColor || white} strokeWidth='1.5' />
    </svg>
  );
};
