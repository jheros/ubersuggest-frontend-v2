import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { GlobalModalsPartial } from '../Modal/GlobalModalsPartial'

export const EmptyLayout = () => {
  return (
    <Container>
      <Outlet />
      <GlobalModalsPartial />
    </Container>
  )
}
