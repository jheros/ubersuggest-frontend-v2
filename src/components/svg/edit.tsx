import React from 'react';
import { useTheme } from '@mui/material/styles';

interface IEditSvg {
  stroke?: string;
}

export const EditSvg: React.FC<IEditSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { orange },
    },
  } = useTheme();
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='17' height='18' viewBox='0 0 17 18' fill='none'>
      <path
        d='M6.94716 12.8853L2.45361 13.7829L3.35127 9.28936L9.21241 3.69751L12.803 7.2934L6.94716 12.8853Z'
        stroke={stroke || orange}
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.9084 1.00662L9.21265 3.70239L12.8045 7.29426L15.5003 4.59848L11.9084 1.00662Z'
        stroke={stroke || orange}
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.6961 16.5815H0.631836'
        stroke={stroke || orange}
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
