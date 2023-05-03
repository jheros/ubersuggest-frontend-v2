import React from 'react';
import { useTheme } from '@mui/material/styles';

interface IDeleteSvg {
  stroke?: string;
}

export const DeleteSvg: React.FC<IDeleteSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { orange },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1829_31530)'>
        <path
          d='M4.99802 4.97987V16.0529C4.99802 16.2984 5.09556 16.5338 5.26914 16.7074C5.44272 16.881 5.6781 16.9785 5.92358 16.9785H14.235C14.4804 16.9785 14.7159 16.881 14.8894 16.7074C15.063 16.5338 15.1606 16.2984 15.1606 16.0529V4.72876'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.3986 3.85117V2.92559C12.3987 2.68076 12.3017 2.4459 12.1289 2.27243C11.9561 2.09896 11.7217 2.001 11.4769 2H8.70012C8.45464 2 8.21921 2.09752 8.04563 2.2711C7.87205 2.44468 7.77451 2.68011 7.77451 2.92559V3.85117'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M3.14667 4.72876H17.0267'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10.0864 8.86975V13.194'
          stroke={stroke || orange}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1829_31530'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
