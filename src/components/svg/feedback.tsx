import React from 'react';
import { useTheme } from '@mui/material/styles';

interface IFeedbackSvg {
  primaryStroke?: string;
  secondaryStroke?: string;
}

export const FeedbackSvg: React.FC<IFeedbackSvg> = ({ primaryStroke, secondaryStroke }) => {
  const {
    palette: {
      common: { mediumGray, orange },
    },
  } = useTheme();
  return (
    <svg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M18.9749 8.31513V17.4635C18.9761 17.6549 18.9234 17.8427 18.8229 18.0055C18.7223 18.1683 18.5779 18.2995 18.4062 18.384C18.2345 18.4686 18.0425 18.503 17.8521 18.4835C17.6617 18.464 17.4807 18.3912 17.3298 18.2735L15.3548 16.3528L13.6095 14.6827C13.4189 14.5024 13.1662 14.4022 12.9038 14.4029H3.42978H2.59469C2.32261 14.4007 2.06243 14.2911 1.87082 14.0979C1.67921 13.9047 1.57169 13.6437 1.5717 13.3716V2.1313C1.5717 1.99716 1.5982 1.86434 1.64966 1.74046C1.70112 1.61658 1.77653 1.50408 1.87158 1.40942C1.96663 1.31476 2.07943 1.2398 2.20352 1.18885C2.32761 1.1379 2.46055 1.11195 2.59469 1.1125H19.977C20.2476 1.11249 20.5072 1.2197 20.6989 1.41064C20.8906 1.60159 20.9989 1.86072 21 2.1313V14.4071'
        stroke={primaryStroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M5.66396 7.2207C6.23199 7.78883 6.90637 8.2395 7.64859 8.54697C8.39081 8.85445 9.18632 9.01271 9.9897 9.01271C10.7931 9.01271 11.5886 8.85445 12.3308 8.54697C13.0731 8.2395 13.7474 7.78883 14.3155 7.2207'
        stroke={secondaryStroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
