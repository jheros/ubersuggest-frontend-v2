import MuiContainer, { ContainerProps } from '@mui/material/Container'
import { styled, Theme } from '@mui/material/styles'

interface IContainer extends ContainerProps {
  theme: Theme
}

export const Container = styled(MuiContainer)(({ theme }: IContainer) => ({
  color: theme.palette.common.darkGray.main,
  fontWeight: 400,
}))
