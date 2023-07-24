import { lightTheme } from '@ubersuggest/common-ui'
import { ReactComponent as metricsIcon } from 'assets/svg/icons/bar-chart.svg'
import { ReactComponent as trackedkeywordsIcon } from 'assets/svg/icons/check-green.svg'
import { ReactComponent as competitorIcon } from 'assets/svg/icons/cup.svg'
import { ReactComponent as domainIcon } from 'assets/svg/icons/globe.svg'
import { ReactComponent as dailysearchIcon } from 'assets/svg/icons/search-blue.svg'
import { ReactComponent as userIcon } from 'assets/svg/icons/users-green.svg'
import { setOpacity } from 'utils/colors'

export const ADDON_TYPES = {
  ADDON_COMPETITOR: 'competitor',
  ADDON_TRACKEDKEYWORDS: 'trackedkeywords',
  ADDON_USER: 'user',
  ADDON_DAILYSEARCH: 'dailysearch',
  ADDON_DOMAIN: 'domain',
  ADDON_KEYWORD_METRICS_UPDATES: 'keyword_metrics_updates',
}

export const ADDON_MAIN_LIMIT_NAMES = {
  [ADDON_TYPES.ADDON_COMPETITOR]: 'competitors_per_project',
  [ADDON_TYPES.ADDON_TRACKEDKEYWORDS]: 'keywords_per_project',
  [ADDON_TYPES.ADDON_USER]: 'users_per_account',
  [ADDON_TYPES.ADDON_DAILYSEARCH]: 'reports',
  [ADDON_TYPES.ADDON_DOMAIN]: 'projects',
  [ADDON_TYPES.ADDON_KEYWORD_METRICS_UPDATES]: 'monthly_keyword_metrics_updates',
}

export const DEFAULT_MAX_PROJECT_LIMIT = 1
export const DEFAULT_MAX_KEYWORD_LIMIT = 25
export const DEFAULT_MAX_SUB_USER_LIMIT = 0
export const DEFAULT_MAX_COMPETITOR_LIMIT = 2
export const DEFAULT_MAX_CRAWL_PAGE_LIMIT = 150

export const ADDON_LINE_ITEMS = {
  [ADDON_TYPES.ADDON_COMPETITOR]: {
    icon: competitorIcon,
    bgColor: setOpacity(lightTheme.palette.common.orange[30], 0.25),
    text: 'additional_competitors',
  },
  [ADDON_TYPES.ADDON_TRACKEDKEYWORDS]: {
    icon: trackedkeywordsIcon,
    bgColor: setOpacity(lightTheme.palette.common.green.main, 0.25),
    text: 'additional_tracked_kws',
  },
  [ADDON_TYPES.ADDON_USER]: {
    icon: userIcon,
    bgColor: setOpacity(lightTheme.palette.common.green.main, 0.25),
    text: 'additional_user',
  },
  [ADDON_TYPES.ADDON_DAILYSEARCH]: {
    icon: dailysearchIcon,
    bgColor: setOpacity(lightTheme.palette.info.main, 0.25),
    text: 'additional_searches',
  },
  [ADDON_TYPES.ADDON_DOMAIN]: {
    icon: domainIcon,
    bgColor: setOpacity(lightTheme.palette.common.orange[30], 0.25),
    text: 'additional_project',
  },
  [ADDON_TYPES.ADDON_KEYWORD_METRICS_UPDATES]: {
    icon: metricsIcon,
    bgColor: setOpacity(lightTheme.palette.common.orange[30], 0.25),
    text: 'kw_metrics_credits',
  },
}
