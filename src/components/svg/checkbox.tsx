import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ICheckBoxSvg } from './types';

export const CheckBoxSvg: React.FC<ICheckBoxSvg> = ({ stroke, checked }) => {
  const {
    palette: {
      common: { gray, orange },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle
        cx='10'
        cy='10'
        r={checked ? '10' : '9.25'}
        fill={checked ? 'url(#paint0_linear_2415_3160)' : ''}
        stroke={checked ? '' : stroke || gray}
        strokeWidth={!checked ? '1.5' : ''}
      />
      {checked ? (
        <g>
          <path
            d='M14.3867 7.12889L8.12892 13.3867L5.00003 10.2578'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <defs>
            <linearGradient
              id='paint0_linear_2415_3160'
              x1='2.85774'
              y1='-0.167138'
              x2='23.9652'
              y2='11.1447'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor={stroke || orange} />
              <stop offset='1' stopColor='#FF912C' />
            </linearGradient>
          </defs>
        </g>
      ) : null}
    </svg>
  );
};
