export const ROUTES = {
  MAIN: ':languageCode?',
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  CHANGE_PASSWORD: 'change-password',
  VERIFY_EMAIL: 'verify-email',

  SURVEY: 'survey',
  ONBOARDING: 'onboarding',
  PRICING: 'pricing',
  DOC: 'doc/preview/:id',

  DASHBOARD: {
    MAIN: 'dashboard',
    COMPETITOR_TRACKING: 'competitor-tracking/:projectId',
  },

  RANK_TRACKING: 'position_tracking/:projectId',
  WORKSPACE: 'workspace',
  SEO_OPPORTUNITIES: 'seo_opportunities',
  EXTENSION: 'extension',

  KEYWORD_RESEARCH: {
    MAIN: 'ubersuggest',
    KEYWORD_IDEAS: 'keyword_ideas',
    KEYWORD_VISUALIZATION: 'keyword_visualization',
    KEYWORD_LISTS: 'keyword_lists',
    CONTENT_IDEAS: 'content_ideas',
    KEYWORD_OVERVIEW: 'overview',
  },
  SEO_ANALYZER: {
    MAIN: 'seo_analyzer',
    SITE_AUDIT: 'site_audit',
    BACKLINKS: 'backlinks',
    BACKLINK_OPPORTUNITY: 'backlink_opportunity',
  },
  TRAFFIC_ANALYZER: {
    MAIN: 'traffic_analyzer',
    OVERVIEW: 'overview',
    TOP_PAGES: 'top_pages',
    KEYWORDS_BY_TRAFFIC: 'keywords',
    COMPETITORS: 'competitors',
  },
  LABS: {
    MAIN: 'labs',
    LANDING: 'landing',
    AI_WRITER: 'ai_writer',
    KEYWORDS_GENERATOR: 'keywords_generator',
  },

  ALERTS: 'alerts',
  CHECKOUT: 'checkout',
  SETTINGS: 'settings/:page',
  ADMIN: 'admin/:page',
}
