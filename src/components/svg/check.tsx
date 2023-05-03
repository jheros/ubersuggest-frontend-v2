import React from 'react';
import { useTheme } from '@mui/material/styles';

type CheckSvgProps = {
  stroke?: string;
};

export const CheckSvg: React.FC<CheckSvgProps> = ({ stroke }) => {
  const {
    palette: {
      common: { mediumGray },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1840_26654)'>
        <path
          d='M6.99997 10.0004L9.34328 12.2623L13 8.50037'
          stroke={stroke || mediumGray}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <circle
          cx='9.99999'
          cy='10'
          r='7.2'
          stroke={stroke || mediumGray}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1840_26654'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

type CheckGradientSvgProps = {
  stroke?: string;
  gradient?: [string, string];
};

export const CheckGradientSvg: React.FC<CheckGradientSvgProps> = ({ stroke, gradient }) => {
  const {
    palette: {
      common: { white },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='10' cy='10' r='10' fill='url(#paint0_linear_1840_27155)' />
      <path
        d='M14.3867 7.12889L8.12892 13.3867L5.00003 10.2578'
        stroke={stroke || white}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1840_27155'
          x1='2.85774'
          y1='-0.167138'
          x2='23.9652'
          y2='11.1447'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={gradient?.[0] || '#F16434'} />
          <stop offset='1' stopColor={gradient?.[1] || '#FF912C'} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const CheckCircleEmptySvg: React.FC<CheckSvgProps> = ({ stroke }) => {
  const {
    palette: {
      common: { gray },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='10' cy='10' r='9.25' stroke={stroke || gray} strokeWidth='1.5' />
    </svg>
  );
};
