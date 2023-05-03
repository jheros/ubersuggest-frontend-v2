import { Suspense } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';

import { useAppContext } from 'context';
const Dashboard = loadable(() => import('components/Dashboard'));

const AuthRoute = ({ user, role = 'user', redirectTo, children, ...rest }: any) => {
  const { languageCode } = useAppContext();
  const location = useLocation();

  //TODO role === 'user' ? isSignedIn() : isSignedIn() && isAdminUser(user);
  const isAllowed = true;

  if (!isAllowed) {
    // Remove language code from the pathname and add it as next query
    const pathname = location.pathname.slice(4);
    const search = location.search ? `&${location.search.slice(1)}` : '';
    const redirectPath = redirectTo ? redirectTo : `/login?next=/${pathname}${search}`;

    return <Navigate to={`/${languageCode}${redirectPath}`} />;
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

function UberRouter(props: any) {
  const { user } = props;

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route path={ROUTES.MAIN}>
          {/* Auth */}
          <Route path={ROUTES.LOGIN} element={<div>Login</div>} />
          <Route path={ROUTES.REGISTER} element={<div>Register</div>} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<div>Forgot Password</div>} />
          <Route path={ROUTES.CHANGE_PASSWORD} element={<div>Change Password</div>} />
          <Route path={ROUTES.VERIFY_EMAIL} element={<div>Email Verification Page</div>} />

          <Route path={ROUTES.POSITION_TRACKING} element={<div>Rank Tracking Container</div>} />
          <Route path={ROUTES.WORKSPACE} element={<div>Workspace Container</div>} />
          <Route path={ROUTES.SEO_OPPORTUNITIES} element={<div>SEO Opportunities Container</div>} />
          {/* TODO: should be AuthRoute, if we decide to backup survey flow. */}
          <Route path={ROUTES.SURVEY} element={<div>Survey Container</div>} />
          <Route path={ROUTES.ONBOARDING} element={<div>Onboarding Container</div>} />
          <Route path={ROUTES.PRICING} element={<div>Pricing Container</div>} />
          <Route path={ROUTES.EXTENSION} element={<div>Extension Container</div>} />
          <Route path={ROUTES.DOC} element={<div>Content Integration Container</div>} />

          {/* Dashboard */}
          <Route path={ROUTES.DASHBOARD.MAIN}>
            <Route index element={<Dashboard />} />
            <Route path={ROUTES.DASHBOARD.COMPETITOR_TRACKING} element={<div>Competitor Tracking Container</div>} />
          </Route>

          {/* Ubersuggest */}
          <Route path={ROUTES.UBER.MAIN}>
            <Route path={ROUTES.UBER.KEYWORD_IDEAS} element={<div>New Keyword Ideas Container</div>} />
            <Route path={ROUTES.UBER.KEYWORD_VISUALIZATION} element={<div>Keyword Visualization Container</div>} />
            <Route path={ROUTES.UBER.KEYWORD_LISTS}>
              <Route path=':id' element={<div>Keywords Container</div>} />
              <Route index element={<div>Keyword Lists Container</div>} />
            </Route>
            <Route path={ROUTES.UBER.CONTENT_IDEAS} element={<div>Content Ideas Container</div>} />
            <Route path={ROUTES.UBER.OVERVIEW} element={<div>Keyword Overview Container</div>} />
          </Route>

          {/* SEO Analyzer */}
          <Route path={ROUTES.SEO_ANALYZER.MAIN}>
            <Route path={ROUTES.SEO_ANALYZER.SITE_AUDIT} element={<div>Site Audit Container</div>} />
            <Route path={ROUTES.SEO_ANALYZER.BACK_LINKS} element={<div>Back Links Container</div>} />
            <Route
              path={ROUTES.SEO_ANALYZER.BACK_LINK_OPPORTUNITY}
              element={<div>Back Link Opportunity Container</div>}
            />
          </Route>

          {/* Traffic Analyzer */}
          <Route path={ROUTES.TRAFFIC_ANALYZER.MAIN}>
            <Route path={ROUTES.TRAFFIC_ANALYZER.OVERVIEW} element={<div>Traffic Analyzer Overview Container</div>} />
            <Route path={ROUTES.TRAFFIC_ANALYZER.TOP_PAGES} element={<div>Top Pages Container</div>} />
            <Route path={ROUTES.TRAFFIC_ANALYZER.KEYWORDS} element={<div>Keywords By Traffic Container</div>} />
            <Route path={ROUTES.TRAFFIC_ANALYZER.COMPETITORS} element={<div>Competitor Analysis Container</div>} />
          </Route>

          {/* Labs */}
          <Route path={ROUTES.LABS.MAIN}>
            <Route path={ROUTES.LABS.LANDING} element={<div>Labs Container</div>} />
            <Route path={ROUTES.LABS.AI_WRITER} element={<div>Content Integration Container</div>} />
            <Route path={ROUTES.LABS.KEYWORDS_GENERATOR} element={<div>Keywords Generator Container</div>} />
          </Route>

          {/* Authenticated Routes */}
          <Route path={ROUTES.ALERTS} element={<AuthRoute user={user} redirectTo={ROUTES.DASHBOARD.MAIN} />}>
            <Route index element={<div>Alerts Container</div>}></Route>
            <Route path=':id' element={<div>Alert Page</div>}></Route>
          </Route>

          <Route
            path={ROUTES.CHECKOUT}
            element={
              <AuthRoute user={user}>
                <div>Checkout Container</div>
              </AuthRoute>
            }
          />
          <Route
            path={ROUTES.SETTINGS}
            element={
              <AuthRoute user={user}>
                <div>Settings Container</div>
              </AuthRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN}
            element={
              <AuthRoute user={user} role='admin' redirectTo={ROUTES.DASHBOARD.MAIN}>
                <div>Admin Container</div>
              </AuthRoute>
            }
          />

          <Route path='*' element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default UberRouter;
