import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Toolbar, Box, Container } from '@mui/material'
import { TopBar, SideBar, ErrorFallback } from 'components'
import { SIDEBAR_WIDTH } from 'components/SideBar/constants'
import { IAppDispatch } from 'store'
import { useLazyGetPlansQuery, useLazyGetMeQuery, detectAdBlocker, lookUpIP } from 'store/api'
import { isSignedInSelector } from 'store/reducers/auth'
import { getLocations } from 'utils/location'

import { GlobalModalsPartial } from '../Modal/GlobalModalsPartial'

export const MainLayout = () => {
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(true)
  const [getPlans] = useLazyGetPlansQuery()
  const dispatch = useDispatch<IAppDispatch>()
  const isSignedIn = useSelector(isSignedInSelector)
  const [getMe] = useLazyGetMeQuery()
  const [bootstrapDataError, setBootstrapDataError] = useState(null)

  const handleMobileSideBarToggle = () => {
    setMobileSideBarOpen(!mobileSideBarOpen)
  }

  useEffect(() => {
    const loadBoostrapData = () => {
      Promise.all([
        getPlans().unwrap(),
        Promise.resolve().then(() => getLocations(true)), // Preload locations
        Promise.resolve().then(() => getLocations(false)), // Preload locations
        dispatch(detectAdBlocker()).unwrap(),
        dispatch(lookUpIP()).unwrap(),
        Promise.resolve().then(() => {
          if (isSignedIn) {
            getMe().unwrap()
            // todo:
            // if (popLoginLimitMessage()) {
            //   yield put(
            //     updateLoginLimitModal({
            //       isOpen: true,
            //       type: 'LOGIN_LIMIT_REACHED',
            //       title: translate('login_limit_reached'),
            //       message: translate('login_limit_reached_text'),
            //     }),
            //   )
            // }
            // yield put(
            //   updateLifetimeReminderModal({
            //     isOpen: user.lifetime_unique_offer,
            //     tier: user.subscription ? user.subscription.tier : null,
            //   }),
            // )
            // yield put(
            //   updateNavigationChangeModal({
            //     isOpen: user.preferences.nav_change_notified === false,
            //   }),
            // )
            // if (
            //   !skipFetchAfterLoginDataPaths.some((path) =>
            //     history.location.pathname.endsWith(path),
            //   )
            // ) {
            //   yield put(fetchProjects())
            //   yield put(fetchAlerts())
            // }
            // yield put(fetchSubscription())
            // yield put(fetchAddons())
            // if (isSubUser(user)) {
            //   yield put(fetchMainUser())
            // }
          }
        }),
      ]).catch((err) => {
        setBootstrapDataError(err)
      })
    }
    loadBoostrapData()
  }, [])

  return (
    <Container>
      <Box component='nav' sx={{ width: { sm: SIDEBAR_WIDTH }, flexShrink: { sm: 0 } }}>
        <TopBar mobileSideBarOpen={mobileSideBarOpen} toggleMobileSideBar={handleMobileSideBarToggle} />
        <SideBar mobileOpen={mobileSideBarOpen} toggleMobile={handleMobileSideBarToggle} />
      </Box>
      <Box sx={{ marginLeft: { sm: 0, lg: `${SIDEBAR_WIDTH}px` } }}>
        <Toolbar />
        {bootstrapDataError ? (
          <ErrorFallback error={bootstrapDataError} />
        ) : (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        )}
      </Box>
      <GlobalModalsPartial />
    </Container>
  )
}
