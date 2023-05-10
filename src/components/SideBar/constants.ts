interface ISidebarMenuItem {
  name?: string;
  isNew?: boolean;
}

interface ISidebarMenu extends ISidebarMenuItem {
  children?: ISidebarMenuItem[][];
}

export const SIDEBAR_MENUS: ISidebarMenu[] = [
  {
    children: [
      [
        { name: 'Dashboard' },
        { name: 'Rank Tracking' },
        { name: 'SEO Opportunities' },
        { name: 'My Workspace' },
        { name: 'Chrome Extension' },
      ],
    ],
  },
  {
    name: 'Site Audit',
  },
  {
    name: 'Keyword Research',
    children: [
      [
        { name: 'Keyword Overview' },
        { name: 'Keyword Ideas' },
        { name: 'Keyword VIsualization' },
        { name: 'Keywords by Traffic' },
        { name: 'Similar Websites' },
        { name: 'Content Ideas' },
      ],
      [{ name: 'Keyword Lists' }],
    ],
  },
  {
    name: 'Traffic Estimation',
    children: [[{ name: 'Traffic Overview' }, { name: 'Top Pages by Traffic' }]],
  },
  {
    name: 'Backlinks',
    children: [[{ name: 'Backlinks Overview' }, { name: 'Backlinks Opportunity' }]],
  },
  {
    name: 'Labs',
    children: [[{ name: 'Labs' }, { name: 'Keywords Generator' }, { name: 'AI Writer' }]],
  },
];
