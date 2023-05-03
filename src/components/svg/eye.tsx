import React from 'react';
import { useTheme } from '@mui/material/styles';

interface IEyeSvg {
  stroke?: string;
}

export const EyeSvg: React.FC<IEyeSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { mediumGray },
    },
  } = useTheme();
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1837_28695)'>
        <path
          d='M1.99998 7.17907C2.32935 4.26959 5.65969 2.03351 9.72198 2.00057C13.7843 1.96764 17.1768 4.27691 17.5428 7.17907'
          stroke={stroke || mediumGray}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M1.99998 12.2151C2.36595 15.1172 5.76582 17.4265 9.81713 17.3936C13.8684 17.3606 17.2061 15.1209 17.5355 12.2151'
          stroke={stroke || mediumGray}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M13.3926 9.66578C13.3991 10.383 13.1928 11.0861 12.7997 11.6861C12.4066 12.2861 11.8444 12.7561 11.1842 13.0366C10.524 13.317 9.79551 13.3955 9.09075 13.2619C8.386 13.1284 7.73667 12.7888 7.22488 12.2863C6.71309 11.7837 6.36182 11.1406 6.2155 10.4384C6.06917 9.73621 6.13436 9.00638 6.40281 8.34121C6.67126 7.67604 7.13093 7.10541 7.72368 6.70149C8.31644 6.29756 9.01566 6.07848 9.73292 6.07194C10.2092 6.06759 10.6817 6.1571 11.1234 6.33536C11.565 6.51362 11.9673 6.77714 12.3071 7.11086C12.647 7.44458 12.9177 7.84198 13.104 8.28035C13.2903 8.71873 13.3883 9.1895 13.3926 9.66578Z'
          stroke={stroke || mediumGray}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1837_28695'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
