import React from 'react';
import { useTheme } from '@mui/material/styles';

interface ISaveSvg {
  stroke?: string;
}

export const SaveSvg: React.FC<ISaveSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { orange },
    },
  } = useTheme();
  return (
    <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.1057 1.00015H1.7898C1.58033 1.00015 1.37943 1.08336 1.23131 1.23148C1.08319 1.3796 1 1.58049 1 1.78996V15.2136C1 15.4231 1.08319 15.6239 1.23131 15.7721C1.37943 15.9202 1.58033 16.0034 1.7898 16.0034H15.2102C15.4197 16.0034 15.6206 15.9202 15.7687 15.7721C15.9168 15.6239 16 15.4231 16 15.2136V4.89765C15.9989 4.69005 15.9168 4.49109 15.7711 4.34316L12.6731 1.22904C12.5989 1.15462 12.5103 1.09599 12.4128 1.05665C12.3153 1.01732 12.2109 0.9981 12.1057 1.00015Z'
        stroke={stroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.53638 1.02295V5.32341C4.53638 5.4337 4.58018 5.53948 4.65817 5.61747C4.73616 5.69546 4.84196 5.73927 4.95225 5.73927C7.71059 5.73927 7.25708 5.73927 10.0154 5.73927C10.1257 5.73927 10.2315 5.69546 10.3095 5.61747C10.3875 5.53948 10.4313 5.4337 10.4313 5.32341V1.45042'
        stroke={stroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
