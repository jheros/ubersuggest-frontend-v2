import textCrop from 'utils/textCrop';

const MuiButton = {
  styleOverrides: {
    root: () => ({
      borderRadius: '2px',
      boxShadow: 'none',
      fontWeight: 500,
      '& span': {
        ...textCrop(1, 0, 0.2),
      },
    }),
  },
};

export default MuiButton;
