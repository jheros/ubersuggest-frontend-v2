import React from 'react';
import { useTheme } from '@mui/material/styles';

interface IMyProjectsSvg {
  primaryStroke?: string;
  secondaryStroke?: string;
}

export const MyProjectsSvg: React.FC<IMyProjectsSvg> = ({ primaryStroke, secondaryStroke }) => {
  const {
    palette: {
      common: { mediumGray, orange },
    },
  } = useTheme();
  return (
    <svg width='22' height='19' viewBox='0 0 22 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16.6957 6.69904H9.88905'
        stroke={secondaryStroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.1584 11.4705H9.88905'
        stroke={secondaryStroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.66481 6.69904H5.86237'
        stroke={secondaryStroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.66481 11.4705H5.86237'
        stroke={secondaryStroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.23595 3.23688V17.7818H21V1.15759H1.54453'
        stroke={primaryStroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
};
