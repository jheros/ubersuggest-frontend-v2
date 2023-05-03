import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IStrokeSvg } from './types';

export const DocumentPreviewSvg: React.FC<IStrokeSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { osloGray },
    },
  } = useTheme();
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.0574 4.94556H4.94501V11.058H11.0574V4.94556Z'
        stroke={stroke || osloGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path d='M10.7507 0.870605H15V4.77454' stroke={stroke || osloGray} strokeWidth='1.5' strokeLinecap='round' />
      <path
        d='M5.11943 0.870605H0.870041V4.77454'
        stroke={stroke || osloGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path d='M5.11943 14.9368H0.870041V11.0363' stroke={stroke || osloGray} strokeWidth='1.5' strokeLinecap='round' />
      <path d='M10.7507 14.9368H15V11.0363' stroke={stroke || osloGray} strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  );
};
