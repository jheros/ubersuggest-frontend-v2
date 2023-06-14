import { useState, useRef, SyntheticEvent, KeyboardEvent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Box,
  Stack,
  Button,
  Link,
  useTheme,
  Backdrop,
  CircularProgress,
  useMediaQuery,
} from '@mui/material'
import { get } from 'lodash'
import { ExpandMore as ExpandMoreIcon, KeyboardArrowRight as KeyboardArrowRightIcon } from '@mui/icons-material'

import { Typography } from 'components'
import { ReactComponent as AIWriterThumbSvg } from 'assets/svg/ai-writer-thumb.svg'
import { ReactComponent as UbersuggestThumbSvg } from 'assets/svg/ubersuggest-thumb.svg'
import { ReactComponent as AppSelectedSvg } from 'assets/svg/app-selector.svg'

const appOptions = {
  ubersuggest: {
    title: 'ubersuggest',
    label: 'ubersuggest',
    description: 'empty_state_kw_overview_desp_1',
    url: '',
    icon: <UbersuggestThumbSvg />,
    color: 'orange',
  },
  aiWriter: {
    title: 'aiWriter',
    label: 'ai_writer',
    description: 'switcher_ai_writer_subheading',
    url: '',
    icon: <AIWriterThumbSvg />,
    color: 'blue',
  },
}

const appType = 'ubersuggest'

export const AppSwitcher = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const isDesktop = useMediaQuery(theme.breakpoints.up('tb'))

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleSelectApp = () => {
    setLoading(true)
    setOpen(false)
  }

  const handleListKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <Backdrop sx={{ zIndex: 5 }} open={loading}>
        <CircularProgress />
      </Backdrop>
      <Stack direction='row' alignItems='center' spacing={2}>
        <Button
          ref={anchorRef}
          sx={{
            background: (theme) => theme.palette.common.gray[10],
            textTransform: 'none',
            justifyContent: 'space-between',
            minWidth: isDesktop ? 228 : 'auto',
            flex: 1,
            py: 0.5,
            px: 1.5,
            mx: isDesktop ? 3.75 : 1.75,
            my: isDesktop ? 0 : 1.5,
          }}
          startIcon={get(appOptions, `${appType}.icon`)}
          endIcon={open ? <ExpandMoreIcon sx={{ fontSize: 16 }} /> : <KeyboardArrowRightIcon sx={{ fontSize: 16 }} />}
          onClick={handleToggle}
        >
          <Typography
            variant='body2'
            font='book'
            sx={{
              ml: 0.5,
              textAlign: 'left',
            }}
            flexGrow={1}
          >
            {t(get(appOptions, `${appType}.label`) || '')}
          </Typography>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    sx={{ mt: 1, maxWidth: '274px' }}
                    onKeyDown={handleListKeyDown}
                  >
                    {Object.values(appOptions).map((app, index) => (
                      <Link href={app.url} key={(index + 1).toString()} sx={{ textDecoration: 'none' }}>
                        <MenuItem onClick={handleSelectApp}>
                          <Stack direction='row' sx={{ py: 1 }}>
                            <Box>{app.icon}</Box>
                            <Stack sx={{ ml: 2 }} flexGrow={1}>
                              <Stack direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
                                <Typography variant='body1' font='book'>
                                  {t(app.label)}
                                </Typography>
                                {appType === app.title && <AppSelectedSvg />}
                              </Stack>
                              <Typography
                                variant='text12'
                                sx={{
                                  color: (theme) => theme.palette.common.darkGray[50],
                                  whiteSpace: 'normal',
                                }}
                              >
                                {t(app.description)}
                              </Typography>
                            </Stack>
                          </Stack>
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Stack>
    </>
  )
}
