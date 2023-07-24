// todo: refactor
import React from 'react'

import { styled } from '@mui/system'
import { ReactComponent as GoogleIcon } from 'assets/svg/icons/google.svg'
import { setOpacity } from 'utils/colors'

interface IContainer {
  height?: string
  width?: string
  mobileStretch?: boolean
  minWidth?: string
  hideIcon?: boolean
  disabled?: boolean
  variant: 'dark' | 'light'
}

const Container = styled('a')<IContainer>(
  ({
    height = '48px',
    width = 'fit-content',
    mobileStretch = false,
    minWidth = 'fit-content',
    hideIcon = false,
    disabled = false,
    variant,
    theme,
  }) => ({
    height,
    border: 'none',
    verticalAlign: 'center',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.084), 0px 1px 1px rgba(0, 0, 0, 0.168)',
    borderRadius: '2px',
    transition: 'background-color .218s, border-color .218s, box-shadow .218s',
    fontFamily: 'Roboto-Medium,arial,sans-serif',
    cursor: 'pointer',
    backgroundColor: disabled
      ? theme.palette.common.lightGray[50]
      : variant === 'dark'
      ? theme.palette.secondary.main  
      : theme.palette.common.white,
    pointerEvents: disabled
      ? ('none' as React.CSSProperties['pointerEvents'])
      : ('all' as React.CSSProperties['pointerEvents']),
    color: variant === 'dark' ? theme.palette.common.white : setOpacity(theme.palette.common.black, 0.54),
    display: 'flex',
    alignItems: 'center',
    width,
    minWidth,
    justifyContent: hideIcon || mobileStretch ? 'center' : 'flex-start',
    [theme.breakpoints.down('sm')]: {
      width: mobileStretch ? '100%' : 'fit-content',
      margin: '0 auto',
    },
    textDecoration: 'none',
  }),
)

export const GoogleIconWrapper = styled('div')(({ theme }) => ({
  width: 'fit-content',
  height: 'calc(100% - 2px)',
  verticalAlign: 'center',
  display: 'flex',
  padding: 0,
  margin: 0,
  marginLeft: '1px',
  alignItems: 'center',
  backgroundColor: theme.palette.common.white,
  borderRadius: '1px',
  whiteSpace: 'nowrap',
}))

interface IGoogleFont {
  mobileStretch: boolean
}

export const GoogleFont = styled('span')<IGoogleFont>(({ mobileStretch, theme }) => ({
  fontFamily: 'Roboto-Medium',
  fontSize: 14,
  paddingRight: 10,
  marginLeft: 10,
  lineHeight: '16px',
  [theme.breakpoints.down('md')]: {
    fontSize: mobileStretch ? 14 : 10,
    lineHeight: '16px',
  },
}))

interface IGoogleSignIn {
  useClickEvent?: boolean
  redirectURL?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  icon?: React.ReactSVGElement
  label: string | React.ReactElement
  width?: string
  height?: string
  minWidth?: string
  variant: 'dark' | 'light'
  hideIcon?: boolean
  mobileStretch?: boolean
  testId?: string
  disabled?: boolean
}

export const GoogleButton = ({
  useClickEvent,
  redirectURL = '#',
  onClick,
  icon,
  label,
  width,
  height,
  minWidth,
  variant,
  hideIcon,
  mobileStretch,
  testId = '',
  ...rest
}: IGoogleSignIn) => {
  return (
    <Container
      data-testid={testId}
      href={redirectURL}
      onClick={(e) => {
        e.preventDefault()
        if (onClick) {
          onClick(e)
        }
      }}
      height={height}
      width={width}
      minWidth={minWidth}
      variant={variant}
      hideIcon={hideIcon}
      mobileStretch={hideIcon && mobileStretch}
      {...rest}
    >
      {!hideIcon && <GoogleIconWrapper>{icon || <GoogleIcon />}</GoogleIconWrapper>}
      {typeof label === 'string' ? <GoogleFont mobileStretch>{label}</GoogleFont> : label}
    </Container>
  )
}

export default GoogleButton
