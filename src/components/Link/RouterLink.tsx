import { Link as ReactRouterLink } from 'react-router-dom'

import { Link, LinkProps } from '@mui/material'
import { pathWithLang } from 'utils/route'

interface IRouterLink extends LinkProps {
  to: string
}

export const RouterLink = ({ to, type = 'route', children, ...otherProps }: IRouterLink) => {
  const path = type === 'route' ? pathWithLang(to) : to
  return (
    <Link component={ReactRouterLink} to={path} {...otherProps}>
      {children}
    </Link>
  )
}
