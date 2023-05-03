import React from 'react';
import { useTheme } from '@mui/material/styles';

interface ILandingPageSvg {
  primaryStroke?: string;
  secondaryStroke?: string;
}

export const LandingPageSvg: React.FC<ILandingPageSvg> = ({ primaryStroke, secondaryStroke }) => {
  const {
    palette: {
      common: { mediumGray, orange },
    },
  } = useTheme();
  return (
    <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M19.1911 16.1604C18.4181 17.6772 17.1152 18.8574 15.5297 19.4772C13.9441 20.097 12.1862 20.1132 10.5895 19.5227C8.99285 18.9322 7.66847 17.7762 6.86769 16.2739C6.06691 14.7716 5.84548 13.0277 6.24537 11.3729C6.64527 9.71817 7.63868 8.2678 9.03711 7.29699C10.4356 6.32619 12.1417 5.90251 13.8318 6.10634C15.522 6.31018 17.0785 7.12735 18.206 8.4028C19.3336 9.67824 19.9537 11.3232 19.9487 13.0256'
        stroke={primaryStroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M12.9845 17.4255C11.8122 17.4255 10.688 16.9598 9.85902 16.1309C9.03009 15.3019 8.56438 14.1777 8.56438 13.0054'
        stroke={secondaryStroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.9999 3.52755V0.998779'
        stroke={primaryStroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path d='M12.9999 25.0004V22.4769' stroke={primaryStroke || mediumGray} strokeWidth='1.5' strokeLinecap='round' />
      <path d='M18.6832 12.9999H24.9999' stroke={primaryStroke || mediumGray} strokeWidth='1.5' strokeLinecap='round' />
      <path d='M0.998734 12.9999H3.5275' stroke={primaryStroke || mediumGray} strokeWidth='1.5' strokeLinecap='round' />
      <path
        d='M19.7037 19.7037L21.4853 21.4854'
        stroke={primaryStroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M4.51471 4.51477L9.21174 9.2118'
        stroke={primaryStroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M6.30157 19.7037L4.51471 21.4854'
        stroke={primaryStroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M21.4853 4.51477L19.7037 6.30163'
        stroke={primaryStroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
};
