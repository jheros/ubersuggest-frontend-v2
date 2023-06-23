import { ROUTES } from 'routes/consts'

export interface ISidebarMenuItem {
  name: string
  expanded?: boolean
  isNew?: boolean
  path: string
}

export interface ISidebarMenu extends ISidebarMenuItem {
  subMenus?: ISidebarMenuItem[][]
}

export const SIDEBAR_WIDTH = 221

const getRouterLink = (...paths: string[]) => {
  return ['', ...paths].join('/')
}

export const SIDEBAR_MENUS: ISidebarMenu[] = [
  {
    name: 'menu_general',
    path: '',
    expanded: true,
    subMenus: [
      [
        { name: 'dashboard', path: getRouterLink(ROUTES.DASHBOARD.MAIN) },
        { name: 'rank_tracking', path: getRouterLink(ROUTES.RANK_TRACKING) },
        { name: 'seo_opportunities', path: getRouterLink(ROUTES.SEO_OPPORTUNITIES) },
        { name: 'menu_workspace', isNew: true, path: getRouterLink(ROUTES.WORKSPACE) },
        { name: 'menu_extension', path: getRouterLink(ROUTES.EXTENSION) },
      ],
    ],
  },
  {
    name: 'menu_seo_analyzer',
    path: getRouterLink(ROUTES.SEO_ANALYZER.MAIN, ROUTES.SEO_ANALYZER.SITE_AUDIT),
  },
  {
    name: 'menu_keyword_research',
    path: '',
    subMenus: [
      [
        {
          name: 'menu_keyword_overview',
          path: getRouterLink(ROUTES.KEYWORD_RESEARCH.MAIN, ROUTES.KEYWORD_RESEARCH.KEYWORD_OVERVIEW),
        },
        {
          name: 'menu_keyword_ideas',
          path: getRouterLink(ROUTES.KEYWORD_RESEARCH.MAIN, ROUTES.KEYWORD_RESEARCH.KEYWORD_IDEAS),
        },
        {
          name: 'menu_keyword_visualization',
          isNew: true,
          path: getRouterLink(ROUTES.KEYWORD_RESEARCH.MAIN, ROUTES.KEYWORD_RESEARCH.KEYWORD_VISUALIZATION),
        },
        {
          name: 'menu_keywords_traffic',
          path: getRouterLink(ROUTES.TRAFFIC_ANALYZER.MAIN, ROUTES.TRAFFIC_ANALYZER.KEYWORDS_BY_TRAFFIC),
        },
        {
          name: 'menu_similar_websites',
          path: getRouterLink(ROUTES.TRAFFIC_ANALYZER.MAIN, ROUTES.TRAFFIC_ANALYZER.COMPETITORS),
        },
        {
          name: 'menu_content_ideas',
          path: getRouterLink(ROUTES.KEYWORD_RESEARCH.MAIN, ROUTES.KEYWORD_RESEARCH.CONTENT_IDEAS),
        },
      ],
      [
        {
          name: 'menu_keyword_lists',
          isNew: true,
          path: getRouterLink(ROUTES.KEYWORD_RESEARCH.MAIN, ROUTES.KEYWORD_RESEARCH.KEYWORD_LISTS),
        },
      ],
    ],
  },
  {
    name: 'menu_traffic_estimation',
    path: '',
    subMenus: [
      [
        {
          name: 'menu_traffic_overview',
          path: getRouterLink(ROUTES.TRAFFIC_ANALYZER.MAIN, ROUTES.TRAFFIC_ANALYZER.OVERVIEW),
        },
        {
          name: 'menu_top_pages_traffic',
          path: getRouterLink(ROUTES.TRAFFIC_ANALYZER.MAIN, ROUTES.TRAFFIC_ANALYZER.TOP_PAGES),
        },
      ],
    ],
  },
  {
    name: 'menu_backlinks',
    path: '',
    subMenus: [
      [
        {
          name: 'menu_backlinks_overview',
          path: getRouterLink(ROUTES.SEO_ANALYZER.MAIN, ROUTES.SEO_ANALYZER.BACKLINKS),
        },
        {
          name: 'menu_backlinks_opportunity',
          path: getRouterLink(ROUTES.SEO_ANALYZER.MAIN, ROUTES.SEO_ANALYZER.BACKLINK_OPPORTUNITY),
        },
      ],
    ],
  },
  {
    name: 'menu_labs',
    isNew: true,
    path: '',
    subMenus: [
      [
        { name: 'menu_labs', path: getRouterLink(ROUTES.LABS.MAIN, ROUTES.LABS.LANDING) },
        { name: 'keywords_generator', path: getRouterLink(ROUTES.LABS.MAIN, ROUTES.LABS.KEYWORDS_GENERATOR) },
        { name: 'ai_writer', path: getRouterLink(ROUTES.LABS.MAIN, ROUTES.LABS.AI_WRITER) },
      ],
    ],
  },
]
