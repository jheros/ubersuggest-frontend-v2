import i18next from 'i18next'

export enum TIERS {
  FREE_TIER = 'free',
  TIER0 = 'tier0',
  TIER1 = 'tier1',
  TIER2 = 'tier2',
  TIER3 = 'tier3',
  RESTART = 'restart',
  ANONYMOUS = 'anonymous',
}
export type ITier = `${TIERS}`

export const TIER_INFO = {
  free: {
    title: 'free_plan',
    description: 'free_plan_description',
  },
  tier0: {
    title: 'plans_basic',
    description: '',
  },
  tier1: {
    title: 'plans_individual',
    description: 'managing_1',
  },
  tier2: {
    title: 'plans_business',
    description: 'managing_7',
  },
  tier3: {
    title: 'plans_enterprise',
    description: 'managing_8_plus',
  },
  restart: {
    title: 'plans_restart',
    description: 'plans_restart_description',
  },
}

export enum PLAN_INTERVALS {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  LIFETIME = 'lifetime',
}
export type IPlanInterval = `${PLAN_INTERVALS}`

export const PLAN_PRICE_BY_INTERVAL: { [key: string]: string } = {
  [PLAN_INTERVALS.MONTHLY]: 'per_month',
  [PLAN_INTERVALS.YEARLY]: 'per_year',
  [PLAN_INTERVALS.LIFETIME]: 'per_lifetime',
}
export const PLAN_INTERVAL_TRANSLATIONS = {
  [PLAN_INTERVALS.MONTHLY]: 'month_value',
  [PLAN_INTERVALS.YEARLY]: 'year_value',
  [PLAN_INTERVALS.LIFETIME]: 'month_value',
}

export const SUBSCRIPTION_CANCEL_REASONS = [
  {
    value: 'reason_cost',
    label: i18next.t('reason_cost'),
  },
  {
    value: 'reason_difficulty_of_use',
    label: i18next.t('reason_difficulty_of_use'),
  },
  {
    value: 'reason_missing_functionality',
    label: i18next.t('reason_missing_functionality'),
  },
  {
    value: 'reason_using_other_product',
    label: i18next.t('reason_using_other_product'),
  },
  {
    value: 'reason_temporary_cancellation',
    label: i18next.t('reason_temporary_cancellation'),
  },
  {
    value: 'reason_data_issue',
    label: i18next.t('reason_data_issue'),
  },
  {
    value: 'reason_not_what_i_was_expecting',
    label: i18next.t('reason_not_what_i_was_expecting'),
  },
]

export enum PLAN_CODES {
  GLOBAL = 'global',
  LOCAL = 'local',
}
export type IPlanCode = `${PLAN_CODES}`

export const YEARLY_PLAN_SAVING_PERCENTAGE = '16.67'
