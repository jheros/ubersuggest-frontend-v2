import { Link, LinkProps } from '@mui/material'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ROUTES } from 'routes'
import { pathWithLang } from 'utils/route'

interface IRouterLink extends LinkProps {
  to: string
}

export const RouterLink = ({ to, children, ...otherProps }: IRouterLink) => {
  return (
    <Link
      component={ReactRouterLink}
      to={`${pathWithLang(ROUTES[to as keyof typeof ROUTES] as string)}`}
      {...otherProps}
    >
      {children}
    </Link>
  )
}
