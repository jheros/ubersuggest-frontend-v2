import React from 'react';
import { useTheme } from '@mui/material/styles';

interface IBulbSvg {
  stroke?: string;
}

export const BulbSvg: React.FC<IBulbSvg> = ({ stroke }) => {
  const {
    palette: {
      common: { orange },
    },
  } = useTheme();
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M5.70159 13.7365C4.86918 12.7686 4.38619 11.5491 4.33019 10.2737C4.27419 8.99834 4.64841 7.74114 5.39277 6.70401C6.13713 5.66687 7.20844 4.90998 8.43466 4.55486C9.66088 4.19975 10.9709 4.26703 12.1542 4.74588C13.3376 5.22474 14.3258 6.08739 14.96 7.19532C15.5942 8.30324 15.8376 9.59216 15.6513 10.8551C15.4649 12.118 14.8596 13.2817 13.9324 14.1592C13.5127 14.5564 13.0381 14.8846 12.5264 15.1357'
        stroke={orange || stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.65135 13.3295C8.39256 13.3232 8.14178 13.4195 7.95372 13.5974C7.76567 13.7753 7.65557 14.0204 7.64746 14.2791V18.252C7.6545 18.4528 7.73927 18.6431 7.88389 18.7827C8.02851 18.9222 8.22168 19.0001 8.42265 19H11.5816C11.7825 19.0001 11.9757 18.9222 12.1203 18.7827C12.265 18.6431 12.3497 18.4528 12.3568 18.252V14.2791C12.3533 14.1508 12.3245 14.0245 12.2721 13.9073C12.2198 13.7902 12.1448 13.6845 12.0516 13.5963C11.9584 13.5081 11.8487 13.4391 11.7288 13.3934C11.6089 13.3476 11.4812 13.3259 11.3529 13.3295H8.65135Z'
        stroke={orange || stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.019 1V1.94961'
        stroke={orange || stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.0355 10.0193H18.0859'
        stroke={orange || stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1.94961 10.0193H1'
        stroke={orange || stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.70912 3.70924L3.03857 3.0387'
        stroke={orange || stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.3257 3.70924L17.0001 3.0387'
        stroke={orange || stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
