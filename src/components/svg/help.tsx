import React from 'react';
import { useTheme } from '@mui/material/styles';

interface IHelpSvg {
  primaryStroke?: string;
  secondaryStroke?: string;
}

export const HelpSvg: React.FC<IHelpSvg> = ({ primaryStroke, secondaryStroke }) => {
  const {
    palette: {
      common: { mediumGray, orange },
    },
  } = useTheme();
  return (
    <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.19725 8.63215C8.19725 8.02405 8.37767 7.42963 8.71559 6.92407C9.05352 6.41852 9.53379 6.02456 10.0957 5.79204C10.6576 5.55953 11.2758 5.4989 11.8721 5.61784C12.4685 5.73678 13.0161 6.02993 13.4458 6.46021C13.8755 6.89049 14.1679 7.43856 14.2861 8.03507C14.4042 8.63158 14.3427 9.24972 14.1094 9.81129C13.8762 10.3729 13.4816 10.8526 12.9756 11.1898C12.4696 11.5271 11.8749 11.7067 11.2668 11.7058'
        stroke={secondaryStroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.2387 16.6734C10.2623 16.5676 10.2988 16.4651 10.3474 16.3681C10.4225 16.2147 10.5348 16.0825 10.6742 15.9838C10.8137 15.8851 10.9757 15.8229 11.1453 15.8031C11.315 15.7832 11.4869 15.8063 11.6453 15.8701C11.8038 15.934 11.9437 16.0366 12.0521 16.1685C12.1606 16.3005 12.2343 16.4575 12.2663 16.6253C12.2983 16.7931 12.2877 16.9663 12.2354 17.1289C12.1831 17.2915 12.0908 17.4384 11.9669 17.5561C11.8431 17.6738 11.6918 17.7585 11.5267 17.8025'
        stroke={secondaryStroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.2057 19.5806C18.1394 18.4429 19.6203 16.6717 20.3976 14.5671C21.1749 12.4625 21.2007 10.154 20.4708 8.03251C19.7409 5.91103 18.3001 4.1071 16.3924 2.92631C14.4847 1.74552 12.2275 1.26047 10.0032 1.55334C7.77886 1.84621 5.72417 2.89899 4.18717 4.53333C2.65017 6.16767 1.72538 8.28307 1.56947 10.5212C1.41356 12.7593 2.0361 14.9825 3.33166 16.8141C4.62721 18.6458 6.5161 19.9733 8.67834 20.5717C8.67834 20.5717 9.15507 20.7139 9.71544 20.8185'
        stroke={primaryStroke || mediumGray}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M11.2705 13.7556V11.7023'
        stroke={secondaryStroke || orange}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
