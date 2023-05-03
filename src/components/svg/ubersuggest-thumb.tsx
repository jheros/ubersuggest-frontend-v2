import React from 'react';
import { useTheme } from '@mui/material/styles';

export interface IUbersuggestThumbSvg {
  fill?: string;
  textColor?: string;
}

export const UbersuggestThumbSvg: React.FC<IUbersuggestThumbSvg> = ({ fill, textColor }) => {
  const {
    palette: {
      common: { orange, white },
    },
  } = useTheme();
  return (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='32' height='32' rx='2' fill={fill || orange} />
      <path
        d='M11.536 22.208C14.432 22.208 16.048 20.432 16.048 17.792V10.8H13.792V17.792C13.792 19.216 12.976 20.112 11.536 20.112C10.096 20.112 9.28 19.216 9.28 17.792V10.8H7.024V17.792C7.024 20.432 8.64 22.208 11.536 22.208ZM21.2861 10.592C19.1421 10.592 17.7661 11.888 17.7661 13.776C17.7661 17.36 22.5981 17.04 22.5981 18.96C22.5981 19.68 22.1021 20.112 21.2701 20.112C20.2621 20.112 19.6381 19.424 19.3341 18.688L17.4301 19.616C17.7501 20.528 18.7421 22.208 21.1421 22.208C23.4781 22.208 24.8861 20.768 24.8861 18.8C24.8861 15.328 20.0221 15.6 20.0221 13.744C20.0221 13.136 20.4701 12.672 21.2381 12.672C22.2141 12.672 22.6301 13.36 22.8701 13.888L24.7421 13.04C24.4701 12.224 23.5421 10.592 21.2861 10.592Z'
        fill={textColor || white}
      />
    </svg>
  );
};
