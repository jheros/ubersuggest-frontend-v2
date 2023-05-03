import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IFillSvg } from './types';

export const DocumentTypeDocxSvg: React.FC<IFillSvg> = ({ fill }) => {
  const {
    palette: {
      common: { blue },
    },
  } = useTheme();
  return (
    <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='36' height='36' rx='2' fill={fill || blue} />
      <mask
        id='mask0_2381_8076'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='7'
        y='2'
        width='23'
        height='31'
      >
        <path
          d='M7.4729 4.42126C7.4729 3.28759 8.39192 2.36858 9.52558 2.36858H21.1574L29.3682 10.5793V30.4219C29.3682 31.5555 28.4491 32.4746 27.3155 32.4746H9.52558C8.39192 32.4746 7.4729 31.5555 7.4729 30.4219V4.42126Z'
          fill='black'
        />
      </mask>
      <g mask='url(#mask0_2381_8076)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.52558 32.4745C8.39192 32.4745 7.4729 31.5555 7.4729 30.4218V4.42117C7.4729 4.41185 7.47296 4.40254 7.47309 4.39325V30.0798C7.47309 31.2135 8.3921 32.1325 9.52577 32.1325H27.3157C28.44 32.1325 29.3533 31.2285 29.3682 30.1077V30.4218C29.3682 31.5555 28.4491 32.4745 27.3155 32.4745H9.52558Z'
          fill={fill || blue}
        />
        <path
          d='M29.3684 17.5928L22.0338 10.2581C21.7105 9.9348 21.9394 9.38205 22.3966 9.38205H29.3684V17.5928Z'
          fill='url(#paint0_linear_2381_8076)'
        />
        <path
          d='M21.1577 2.36858L29.3684 10.5793H23.2104C22.0767 10.5793 21.1577 9.66028 21.1577 8.52662V2.36858Z'
          fill='#A6C5FA'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M23.8962 17.4217H12.9485V18.7901H23.8962V17.4217ZM23.8959 20.1586H12.9482V21.527H23.8959V20.1586ZM12.9482 22.8953H23.8959V24.2638H12.9482V22.8953ZM21.159 25.6325H12.9482V27.0009H21.159V25.6325Z'
          fill='white'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_2381_8076'
          x1='25.2631'
          y1='17.5928'
          x2='25.2631'
          y2='9.21099'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#4E8DF5' />
          <stop offset='1' stopColor='#3D6ACD' />
        </linearGradient>
      </defs>
    </svg>
  );
};
