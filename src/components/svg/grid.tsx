import React from 'react';
import { useTheme } from '@mui/material/styles';

type GridSvgProps = {
  stroke?: string;
};

export const GridSvg: React.FC<GridSvgProps> = ({ stroke }) => {
  const {
    palette: {
      common: { silver },
    },
  } = useTheme();
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10.2266 5H4.99994V10.2267H10.2266V5Z'
        stroke={stroke || silver}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.2267 13.7731H5V18.9998H10.2267V13.7731Z'
        stroke={stroke || silver}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.0001 5H13.7734V10.2267H19.0001V5Z'
        stroke={stroke || silver}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.0001 13.7731H13.7734V18.9998H19.0001V13.7731Z'
        stroke={stroke || silver}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

type ListSvgProps = {
  stroke?: string;
};

export const ListSvg: React.FC<ListSvgProps> = ({ stroke }) => {
  const {
    palette: {
      common: { mediumGray },
    },
  } = useTheme();
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5.50807 5.81641H4.13898'
        stroke={stroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.9999 5.81641H8.34351'
        stroke={stroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.50801 17.1836H4.13892'
        stroke={stroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.9999 17.1836H8.34351'
        stroke={stroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.50801 11.5029H4.13892'
        stroke={stroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.1594 11.5029H8.34351'
        stroke={stroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
