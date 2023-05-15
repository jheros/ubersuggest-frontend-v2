export interface ISidebarMenuItem {
  name: string;
  expanded?: boolean;
  isNew?: boolean;
}

export interface ISidebarMenu extends ISidebarMenuItem {
  children?: ISidebarMenuItem[][];
}

export const SIDEBAR_MENUS: ISidebarMenu[] = [
  {
    name: 'menu_general',
    expanded: true,
    children: [
      [
        { name: 'dashboard' },
        { name: 'rank_tracking' },
        { name: 'seo_opportunities' },
        { name: 'menu_workspace', isNew: true },
        { name: 'menu_extension' },
      ],
    ],
  },
  {
    name: 'menu_seo_analyzer',
  },
  {
    name: 'menu_keyword_research',
    children: [
      [
        { name: 'menu_keyword_overview' },
        { name: 'menu_keyword_ideas' },
        { name: 'menu_keyword_visualization', isNew: true },
        { name: 'menu_keywords_traffic' },
        { name: 'menu_similar_websites' },
        { name: 'menu_content_ideas' },
      ],
      [{ name: 'menu_keyword_lists', isNew: true }],
    ],
  },
  {
    name: 'menu_traffic_estimation',
    children: [[{ name: 'menu_traffic_overview' }, { name: 'menu_top_pages_traffic' }]],
  },
  {
    name: 'menu_backlinks',
    children: [[{ name: 'menu_backlinks_overview' }, { name: 'menu_backlinks_opportunity' }]],
  },
  {
    name: 'menu_labs',
    isNew: true,
    children: [[{ name: 'menu_labs' }, { name: 'keywords_generator' }, { name: 'ai_writer' }]],
  },
];
