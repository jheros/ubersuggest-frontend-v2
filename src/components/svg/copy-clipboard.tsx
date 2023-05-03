import React from 'react';
import { IStrokeSvg } from './types';

export const CopyClipboardSvg: React.FC<IStrokeSvg> = ({ stroke }) => {
  return (
    <svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.31771 5.71626H1.21002V18H13.4938V15.8923'
        stroke={stroke || '#F59271'}
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path d='M18 1.21H5.71631V13.4937H18V1.21Z' stroke={stroke || '#F59271'} strokeWidth='2' strokeLinecap='round' />
    </svg>
  );
};
