import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

interface IAuthRoute {
  children?: JSX.Element;
}

const AuthRoute = ({ children }: IAuthRoute) => {
  const isAllowed = true;

  if (!isAllowed) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return children ? children : <Outlet />;
};

const ROUTES = {
  MAIN: ':languageCode?',
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  CHANGE_PASSWORD: 'change-password',
  VERIFY_EMAIL: 'verify-email',

  POSITION_TRACKING: 'position-tracking/:projectId',
  WORKSPACE: 'workspace',
  SEO_OPPORTUNITIES: 'seo-opportunities',
  SURVEY: 'survey',
  ONBOARDING: 'onboarding',
  PRICING: 'pricing',
  EXTENSION: 'extension',
  DOC: 'doc/preview/:id',

  DASHBOARD: {
    MAIN: 'dashboard',
    COMPETITOR_TRACKING: 'competitor-tracking/:projectId',
  },
  UBER: {
    MAIN: 'ubersuggest',
    KEYWORD_IDEAS: 'keyword-ideas',
    KEYWORD_VISUALIZATION: 'keyword-visualization',
    KEYWORD_LISTS: 'keyword-lists',
    CONTENT_IDEAS: 'content-ideas',
    OVERVIEW: 'overview',
  },
  SEO_ANALYZER: {
    MAIN: 'seo-analyzer',
    SITE_AUDIT: 'site_audit',
    BACK_LINKS: 'back-links',
    BACK_LINK_OPPORTUNITY: 'back-link-opportunity',
  },
  TRAFFIC_ANALYZER: {
    MAIN: 'traffic-analyzer',
    OVERVIEW: 'overview',
    TOP_PAGES: 'top-pages',
    KEYWORDS: 'keywords',
    COMPETITORS: 'competitors',
  },
  LABS: {
    MAIN: 'labs',
    LANDING: 'landing',
    AI_WRITER: 'ai-writer',
    KEYWORDS_GENERATOR: 'keywords-generator',
  },

  ALERTS: 'alerts',
  CHECKOUT: 'checkout',
  SETTINGS: 'settings/:page',
  ADMIN: 'admin/:page',
};

const UberRouter = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    children: [
      /* Auth */
      {
        path: ROUTES.LOGIN,
        element: <div>Login</div>,
      },
      { path: ROUTES.REGISTER, element: <div>Register</div> },
      { path: ROUTES.FORGOT_PASSWORD, element: <div>Forgot Password</div> },
      { path: ROUTES.CHANGE_PASSWORD, element: <div>Change Password</div> },
      { path: ROUTES.VERIFY_EMAIL, element: <div>Email Verification Page</div> },
    ],
  },
  {
    path: ROUTES.MAIN,
    async lazy() {
      const { MainTemplate } = await import('components');
      return { Component: MainTemplate };
    },
    children: [
      { path: ROUTES.POSITION_TRACKING, element: <div>Rank Tracking Container</div> },
      { path: ROUTES.WORKSPACE, element: <div>Workspace Container</div> },
      { path: ROUTES.SEO_OPPORTUNITIES, element: <div>SEO Opportunities Container</div> },
      /* TODO: should be AuthRoute, if we decide to backup survey flow. */
      { path: ROUTES.SURVEY, element: <div>Survey Container</div> },
      { path: ROUTES.ONBOARDING, element: <div>Onboarding Container</div> },
      { path: ROUTES.PRICING, element: <div>Pricing Container</div> },
      { path: ROUTES.EXTENSION, element: <div>Extension Container</div> },
      { path: ROUTES.DOC, element: <div>Content Integration Container</div> },
      /* Dashboard */
      {
        index: true,
        async lazy() {
          const { Dashboard } = await import('components');
          return { Component: Dashboard };
        },
      },
      {
        path: ROUTES.DASHBOARD.MAIN,
        children: [
          {
            index: true,
            async lazy() {
              const { Dashboard } = await import('components');
              return { Component: Dashboard };
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
        path: ROUTES.UBER.MAIN,
        children: [
          { path: ROUTES.UBER.KEYWORD_IDEAS, element: <div>New Keyword Ideas Container</div> },
          { path: ROUTES.UBER.KEYWORD_VISUALIZATION, element: <div>Keyword Visualization Container</div> },
          {
            path: ROUTES.UBER.KEYWORD_LISTS,
            children: [
              { path: ':id', element: <div> Keywords Container</div> },
              { index: true, element: <div> Keyword Lists Container</div> },
            ],
          },
          { path: ROUTES.UBER.CONTENT_IDEAS, element: <div>Content Ideas Container</div> },
          { path: ROUTES.UBER.OVERVIEW, element: <div>Keyword Overview Container</div> },
        ],
      },
      /* SEO Analyzer */
      {
        path: ROUTES.SEO_ANALYZER.MAIN,
        children: [
          { path: ROUTES.SEO_ANALYZER.SITE_AUDIT, element: <div>Site Audit Container</div> },
          { path: ROUTES.SEO_ANALYZER.BACK_LINKS, element: <div>Back Links Container</div> },
          { path: ROUTES.SEO_ANALYZER.BACK_LINK_OPPORTUNITY, element: <div>Back Link Opportunity Container</div> },
        ],
      },
      /* Traffic Analyzer */
      {
        path: ROUTES.TRAFFIC_ANALYZER.MAIN,
        children: [
          { path: ROUTES.TRAFFIC_ANALYZER.OVERVIEW, element: <div>Traffic Analyzer Overview Container</div> },
          { path: ROUTES.TRAFFIC_ANALYZER.TOP_PAGES, element: <div>Top Pages Container</div> },
          { path: ROUTES.TRAFFIC_ANALYZER.KEYWORDS, element: <div>Keywords By Traffic Container</div> },
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
          { path: ROUTES.SETTINGS, element: <div>Settings Container</div> },
          { path: ROUTES.ADMIN, element: <div>Admin Container</div> },
        ],
      },

      { path: '*', element: <div>Not Found</div> },
    ],
  },
]);

export default UberRouter;
