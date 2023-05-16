import MuiButton, { ButtonProps } from '@mui/material/Button';
import { styled, Theme } from '@mui/material/styles';

const SIZE = {
  large: 48,
  medium: 40,
  small: 36,
};
type ISize = keyof typeof SIZE;

interface IButton extends ButtonProps {
  size?: ISize;
  theme?: Theme;
}

export const Button = styled((props: IButton) => <MuiButton disableElevation {...props} />)(
  ({ size = 'large' }: IButton) => ({
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 400,
    height: SIZE[size],
  }),
);
