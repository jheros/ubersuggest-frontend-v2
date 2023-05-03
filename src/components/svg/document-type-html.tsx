import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IFillSvg } from './types';

export const DocumentTypeHtmlSvg: React.FC<IFillSvg> = ({ fill }) => {
  const {
    palette: {
      common: { dullYellow, yellow },
    },
  } = useTheme();
  return (
    <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='36' height='36' rx='2' fill={fill || yellow} />
      <mask
        id='mask0_2392_3242'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='8'
        y='3'
        width='23'
        height='31'
      >
        <path
          d='M8.4729 5.42126C8.4729 4.28759 9.39192 3.36858 10.5256 3.36858H22.1574L30.3682 11.5793V31.4219C30.3682 32.5555 29.4491 33.4746 28.3155 33.4746H10.5256C9.39192 33.4746 8.4729 32.5555 8.4729 31.4219V5.42126Z'
          fill='black'
        />
      </mask>
      <g mask='url(#mask0_2392_3242)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.5256 3.36858C9.39192 3.36858 8.4729 4.28759 8.4729 5.42126V31.4219C8.4729 31.4312 8.47296 31.4405 8.47309 31.4498V5.76335C8.47309 4.62969 9.3921 3.71067 10.5258 3.71067H28.3157C29.44 3.71067 30.3533 4.61468 30.3682 5.7355V5.42126C30.3682 4.28759 29.4491 3.36858 28.3155 3.36858H10.5256Z'
          fill='#7BAAF7'
        />
        <path
          d='M30.3684 18.5928L23.0338 11.2581C22.7105 10.9348 22.9394 10.382 23.3966 10.382H30.3684V18.5928Z'
          fill='url(#paint0_linear_2392_3242)'
        />
        <path
          d='M22.1577 3.36858L30.3684 11.5793H24.2104C23.0767 11.5793 22.1577 10.6603 22.1577 9.52662V3.36858Z'
          fill='#A6C5FA'
        />
        <mask
          id='mask1_2392_3242'
          style={{ maskType: 'alpha' }}
          maskUnits='userSpaceOnUse'
          x='8'
          y='2'
          width='23'
          height='31'
        >
          <path
            d='M8.4585 4.92619C8.4585 3.79252 9.37751 2.8735 10.5112 2.8735H22.143L30.3538 11.0842V30.9268C30.3538 32.0605 29.4347 32.9795 28.3011 32.9795H10.5112C9.37751 32.9795 8.4585 32.0605 8.4585 30.9268V4.92619Z'
            fill='black'
          />
        </mask>
        <g mask='url(#mask1_2392_3242)'>
          <path
            d='M8.4585 4.92619C8.4585 3.79252 9.37751 2.8735 10.5112 2.8735H28.3011C29.4347 2.8735 30.3538 3.79252 30.3538 4.92619V30.9268C30.3538 32.0605 29.4347 32.9795 28.3011 32.9795H10.5112C9.37751 32.9795 8.4585 32.0605 8.4585 30.9268V4.92619Z'
            fill={fill || yellow}
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.5919 20.1351L16.4192 17.0633L17.2425 18.357L12.8131 21.1757L17.1481 23.1462L16.5135 24.5423L11.7492 22.3767C10.8256 21.9568 10.736 20.6798 11.5919 20.1351Z'
            fill='white'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M25.5668 21.4704L20.7395 24.5423L19.9162 23.2485L24.3456 20.4298L20.0106 18.4593L20.6452 17.0632L25.4095 19.2288C26.3331 19.6487 26.4227 20.9257 25.5668 21.4704Z'
            fill='white'
          />
          <path
            d='M30.354 18.0977L23.0193 10.763C22.6961 10.4397 22.925 9.88698 23.3822 9.88698H30.354V18.0977Z'
            fill='url(#paint1_linear_2392_3242)'
          />
          <path
            d='M22.1433 2.8735L30.354 11.0842H24.196C23.0623 11.0842 22.1433 10.1652 22.1433 9.03155V2.8735Z'
            fill={fill || dullYellow}
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_2392_3242'
          x1='26.2631'
          y1='18.5928'
          x2='26.2631'
          y2='10.211'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#4E8DF5' />
          <stop offset='1' stopColor='#3D6ACD' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_2392_3242'
          x1='26.2487'
          y1='18.0977'
          x2='26.2487'
          y2='9.71592'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={fill || yellow} />
          <stop offset='0.84375' stopColor='#DD9414' />
        </linearGradient>
      </defs>
    </svg>
  );
};
