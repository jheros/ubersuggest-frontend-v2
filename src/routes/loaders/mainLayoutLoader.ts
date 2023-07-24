import { LoaderFunctionArgs, redirect } from 'react-router-dom'

import { ROUTES } from 'routes/consts'
import { store } from 'store'
import { detectAdBlocker, lookUpIP, planApi, userApi, projectApi, addonApi } from 'store/api'
import { isSignedInSelector } from 'store/reducers/auth'
import { getLocations } from 'utils/location'

export const mainLayoutLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const email = url.searchParams.get('email')
  const verificationStatus = url.searchParams.get('verification_status')

  if (email && verificationStatus) {
    return redirect(`${ROUTES.LOGIN}?email=${email}&verificationStatus=${verificationStatus}`)
  }

  const isSignedIn = isSignedInSelector(store.getState())

  return Promise.all([
    store.dispatch(planApi.endpoints.getPlans.initiate()).unwrap(),
    Promise.resolve().then(() => getLocations(true)), // Preload locations
    Promise.resolve().then(() => getLocations(false)), // Preload locations
    store.dispatch(detectAdBlocker()).unwrap(),
    store.dispatch(lookUpIP()).unwrap(),
    Promise.resolve().then(async () => {
      if (isSignedIn) {
        const userInfo = await store.dispatch(userApi.endpoints.getMe.initiate()).unwrap()
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
        store.dispatch(projectApi.endpoints.getProjects.initiate())
        //   yield put(fetchProjects())
        //   yield put(fetchAlerts())
        // }
        if (userInfo.subscription) {
          await Promise.all([
            store.dispatch(addonApi.endpoints.getAddons.initiate()).unwrap(),
            store.dispatch(planApi.endpoints.getSubscription.initiate()).unwrap(),
          ])
        }
        // if (isSubUser(user)) {
        //   yield put(fetchMainUser())
        // }
      }
    }),
  ])
}
