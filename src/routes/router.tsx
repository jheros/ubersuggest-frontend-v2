import { useSelector } from 'react-redux'
import { Navigate, Outlet, createBrowserRouter, useSearchParams, useLocation } from 'react-router-dom'

import { ErrorFallback, MainLayout } from 'components'
import { ROUTES } from 'routes/consts'
import { isSignedInSelector } from 'store/reducers/auth'

import { mainLayoutLoader } from './loaders/mainLayoutLoader'

interface IAuthRoute {
  children?: JSX.Element
}

const AuthRoute = ({ children }: IAuthRoute) => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const isAllowed = useSelector(isSignedInSelector)
  const hasAiwAddon = !!searchParams.get('aiwAddon')

  if (!isAllowed) {
    return (
      <Navigate
        to={`${hasAiwAddon ? ROUTES.REGISTER : ROUTES.LOGIN}?next=${location.pathname}${
          location.search ? `&${location.search.slice(1)}` : ''
        }`}
      />
    )
  }

  return children ? children : <Outlet />
}

export const UberRouter = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    async lazy() {
      const { EmptyLayout } = await import('components')
      return { Component: EmptyLayout }
    },
    children: [
      /* Auth */
      {
        path: ROUTES.LOGIN,
        async lazy() {
          const { Login } = await import('containers')
          return { Component: Login }
        },
      },
      {
        path: ROUTES.REGISTER,
        async lazy() {
          const { Register } = await import('containers')
          return { Component: Register }
        },
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        async lazy() {
          const { ForgotPassword } = await import('containers')
          return { Component: ForgotPassword }
        },
      },
      {
        path: ROUTES.CHANGE_PASSWORD,
        async lazy() {
          const { ChangePassword } = await import('containers')
          return { Component: ChangePassword }
        },
      },
      { path: ROUTES.VERIFY_EMAIL, element: <div>Email Verification Page</div> },
    ],
  },
  {
    path: ROUTES.MAIN,
    loader: mainLayoutLoader,
    async lazy() {
      const { MainLayout } = await import('components')
      return { Component: MainLayout }
    },
    children: [
      /* Dashboard */
      {
        index: true,
        async lazy() {
          const { Dashboard } = await import('components')
          return { Component: Dashboard }
        },
      },

      { path: ROUTES.RANK_TRACKING, element: <div>Rank Tracking Container</div> },
      { path: ROUTES.WORKSPACE, element: <div>Workspace Container</div> },
      { path: ROUTES.SEO_OPPORTUNITIES, element: <div>SEO Opportunities Container</div> },
      /* TODO: should be AuthRoute, if we decide to backup survey flow. */
      { path: ROUTES.SURVEY, element: <div>Survey Container</div> },
      { path: ROUTES.ONBOARDING, element: <div>Onboarding Container</div> },
      { path: ROUTES.PRICING, element: <div>Pricing Container</div> },
      { path: ROUTES.EXTENSION, element: <div>Extension Container</div> },
      { path: ROUTES.DOC, element: <div>Content Integration Container</div> },
      {
        path: ROUTES.DASHBOARD.MAIN,
        children: [
          {
            index: true,
            async lazy() {
              const { Dashboard } = await import('components')
              return { Component: Dashboard }
            },
          },
          {
            path: ROUTES.DASHBOARD.COMPETITOR_TRACKING,
            element: <div>Competitor Tracking Container</div>,
          },
        ],
      },
      /* Ubersuggest */
      {
        path: ROUTES.KEYWORD_RESEARCH.MAIN,
        children: [
          { path: ROUTES.KEYWORD_RESEARCH.KEYWORD_IDEAS, element: <div>New Keyword Ideas Container</div> },
          { path: ROUTES.KEYWORD_RESEARCH.KEYWORD_VISUALIZATION, element: <div>Keyword Visualization Container</div> },
          {
            path: ROUTES.KEYWORD_RESEARCH.KEYWORD_LISTS,
            children: [
              { path: ':id', element: <div> Keywords Container</div> },
              { index: true, element: <div> Keyword Lists Container</div> },
            ],
          },
          { path: ROUTES.KEYWORD_RESEARCH.CONTENT_IDEAS, element: <div>Content Ideas Container</div> },
          { path: ROUTES.KEYWORD_RESEARCH.KEYWORD_OVERVIEW, element: <div>Keyword Overview Container</div> },
        ],
      },
      /* SEO Analyzer */
      {
        path: ROUTES.SEO_ANALYZER.MAIN,
        children: [
          { path: ROUTES.SEO_ANALYZER.SITE_AUDIT, element: <div>Site Audit Container</div> },
          { path: ROUTES.SEO_ANALYZER.BACKLINKS, element: <div>Back Links Container</div> },
          { path: ROUTES.SEO_ANALYZER.BACKLINK_OPPORTUNITY, element: <div>Back Link Opportunity Container</div> },
        ],
      },
      /* Traffic Analyzer */
      {
        path: ROUTES.TRAFFIC_ANALYZER.MAIN,
        children: [
          { path: ROUTES.TRAFFIC_ANALYZER.OVERVIEW, element: <div>Traffic Analyzer Overview Container</div> },
          { path: ROUTES.TRAFFIC_ANALYZER.TOP_PAGES, element: <div>Top Pages Container</div> },
          { path: ROUTES.TRAFFIC_ANALYZER.KEYWORDS_BY_TRAFFIC, element: <div>Keywords By Traffic Container</div> },
          { path: ROUTES.TRAFFIC_ANALYZER.COMPETITORS, element: <div>Competitor Analysis Container</div> },
        ],
      },
      /* Labs */
      {
        path: ROUTES.LABS.MAIN,
        children: [
          { path: ROUTES.LABS.LANDING, element: <div>Labs Container</div> },
          { path: ROUTES.LABS.AI_WRITER, element: <div>Content Integration Container</div> },
          { path: ROUTES.LABS.KEYWORDS_GENERATOR, element: <div>Keywords Generator Container</div> },
        ],
      },
      /* Authenticated Routes */
      {
        element: <AuthRoute />,
        children: [
          {
            path: ROUTES.ALERTS,
            children: [
              { path: ':id', element: <div>Alert Page</div> },
              { index: true, element: <div>Alerts Container</div> },
            ],
          },
          { path: ROUTES.CHECKOUT, element: <div>Checkout Container</div> },
          {
            path: ROUTES.SETTINGS.MAIN,
            async lazy() {
              const { Settings } = await import('containers')
              return { Component: Settings }
            },
            children: [
              {
                path: ROUTES.SETTINGS.ACCOUNT_BILLING,
                async lazy() {
                  const { AccountBilling } = await import('containers')
                  return { Component: AccountBilling }
                },
              },
            ],
          },
          { path: ROUTES.ADMIN, element: <div>Admin Container</div> },
        ],
      },

      { path: '*', element: <div>Not Found</div> },
    ],
  },
])
