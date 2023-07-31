import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PLAN_INTERVALS, TIERS } from 'configs'
import {
  DEFAULT_MAX_COMPETITOR_LIMIT,
  DEFAULT_MAX_CRAWL_PAGE_LIMIT,
  DEFAULT_MAX_KEYWORD_LIMIT,
  DEFAULT_MAX_PROJECT_LIMIT,
  DEFAULT_MAX_SUB_USER_LIMIT,
} from 'configs/addon'
import { isNumber, reduce } from 'lodash'
import moment from 'moment'
import { IRootState } from 'store'
import { lookUpIP } from 'store/api/ipLookUpApi'
import { plansByTierSelector } from 'store/reducers/plan'
import type { IInvoicingSettings, IReportLimits, ISubscription, IUserInfo, IUserLocation } from 'store/types'
import { formatDate } from 'utils/dateTime'
import { getCurrencyAndRegion, getRegionFromCurrency, ICountryCode } from 'utils/location'
import { formatNumber } from 'utils/numbro'
import { getPlanCode } from 'utils/plan'

import { isSignedInSelector } from './auth'

interface IUserState {
  userInfo: IUserInfo
  location: IUserLocation
  subscription: ISubscription
  reportLimits: IReportLimits
}

const initialState = {
  userInfo: {},
  location: {},
  subscription: {},
  reportLimits: {},
} as IUserState

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      }
    },
    setSubscription: (state, action: PayloadAction<ISubscription>) => {
      state.subscription = {
        ...state.subscription,
        ...action.payload,
      }
    },
    setReportLimits: (state, action: PayloadAction<IReportLimits>) => {
      state.reportLimits = { ...state.reportLimits, ...action.payload }
    },
    setInvoicingSettings: (state, action: PayloadAction<IInvoicingSettings>) => {
      state.subscription.invoicingSettings = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(lookUpIP.fulfilled, (state, { payload }) => {
      state.location = {
        ...state.location,
        ...payload,
      }
    })
  },
})

// * can't use createSelector as it's using time now
export const isUserInGracePeriodSelector = (state: IRootState) => {
  const { pastDueStartedAt, subscriptionStatus } = state.user.subscription
  if (subscriptionStatus === 'past_due') {
    const past = moment(pastDueStartedAt)
    const now = moment()
    if (now.diff(past, 'hours') < 48) return true
  }
  return false
}

export const isPaidUserSelector = createDraftSafeSelector(
  (state: IRootState) => isSignedInSelector(state),
  (state: IRootState) => isUserInGracePeriodSelector(state),
  (state: IRootState) => state.user.subscription.subscriptionStatus as string,
  (isSignedIn, isUserInGracePeriod, subscriptionStatus): boolean =>
    isSignedIn && (['active', 'trialing', 'paid', 'canceled'].includes(subscriptionStatus) || isUserInGracePeriod),
)

export const isFreeUserSelector = createDraftSafeSelector(
  (state: IRootState) => isSignedInSelector(state),
  (state: IRootState) => isPaidUserSelector(state),
  (isSignedIn, isPaidUser) => isSignedIn && !isPaidUser,
)

export const isSubUserSelector = createDraftSafeSelector(
  (state: IRootState) => state.user.userInfo.user_group,
  (userGroup) => userGroup === 'multi_user',
)

export const isInviteAllowedSelector = createDraftSafeSelector(
  (state: IRootState) => isSubUserSelector(state),
  (state: IRootState) => isPaidUserSelector(state),
  (isSubUser, isPaidUser) => !(isSubUser || !isPaidUser),
)

export const isLifetimePlanSelector = (state: IRootState) =>
  state.user.subscription.planInterval === PLAN_INTERVALS.LIFETIME

export const isLifetimePlanDeprecatedSelector = createDraftSafeSelector(
  (state: IRootState) => isLifetimePlanSelector(state),
  (state: IRootState) => state.user.subscription.planIsDeprecated,
  (isLifetimePlan, isPlanDeprecated) => isLifetimePlan && isPlanDeprecated,
)

// * We enable lifetime always for now.
export const isLifetimeValidSelector = () => true

export const isRenewableSelector = (state: IRootState) =>
  state.user.subscription.subscriptionCanceled && state.user.subscription.reactivationAvailable

export const isSubscriptionCanceledSelector = (state: IRootState) =>
  state.user.subscription.subscriptionCanceled as boolean

export const isCouponUserSelector = (state: IRootState) => !!state.user.subscription.redeemedCouponCodes?.length

export const is30DaysPeriodSelector = (state: IRootState) => {
  const planInterval = userPlanIntervalSelector(state)
  const { created } = state.user.subscription.latestInvoiceData || {}
  return planInterval === PLAN_INTERVALS.LIFETIME && created && moment().diff(moment(created), 'day') <= 30
}

export const userInfoSelector = (state: IRootState) => state.user.userInfo

export const userTierSelector = createDraftSafeSelector(
  (state: IRootState) => isSignedInSelector(state),
  (state: IRootState) => state.user.subscription.tier,
  (isSignedIn, tier) => {
    if (!isSignedIn) return TIERS.ANONYMOUS
    return tier || TIERS.FREE_TIER
  },
)

export const userCountryCodeSelector = (state: IRootState) => state.user.location.countryCode as ICountryCode

export const userPlanIntervalSelector = (state: IRootState) => {
  return state.user.subscription.planInterval || ''
}

export const userPlanPriceSelector = createDraftSafeSelector(
  (state: IRootState) => state.plan.entities,
  (state: IRootState) => userTierSelector(state),
  (state: IRootState) => userPlanIntervalSelector(state),
  (state: IRootState) => state.user.location.countryCode as ICountryCode,
  (plans, tier, planInterval, countryCode: ICountryCode) => {
    const { currency, isCurrencySupported } = getCurrencyAndRegion(countryCode)

    return (plans as any)?.[tier]?.[planInterval]?.[getPlanCode(isCurrencySupported, tier)]?.currencies?.[currency] || 0
  },
)

export const userAddonsPriceSelector = createDraftSafeSelector(
  (state: IRootState) => state.addon.entities,
  (state: IRootState) => state.user.subscription.addOns,
  (state: IRootState) => userCountryCodeSelector(state),
  (availableAddons, purchasedAddons, countryCode: ICountryCode) => {
    const { currency } = getCurrencyAndRegion(countryCode)
    let price = 0
    if (availableAddons && purchasedAddons && purchasedAddons.length) {
      purchasedAddons.forEach(({ code, quantity }: { code: string; quantity: number }) => {
        price += (availableAddons[code]?.prices?.[currency] || 0) * quantity
      })
    }
    return price
  },
)

export const userAddonCountSelector = createDraftSafeSelector(
  (state: IRootState) => state.user.subscription.addOns,
  (purchasedAddons) => {
    return reduce(
      purchasedAddons,
      (count, addon) => {
        return count + addon.quantity
      },
      0,
    )
  },
)

// * don't use createSelector as this returns Date.now()
export const userPlanEndDateSelector = (state: IRootState) => {
  const { planInterval, endOfCurrentPeriod } = state.user.subscription
  return planInterval === PLAN_INTERVALS.LIFETIME ? Date.now() : endOfCurrentPeriod
}

export const userMaxProjectLimitSelector = (state: IRootState) =>
  state.user.userInfo.limits.projects || DEFAULT_MAX_PROJECT_LIMIT

export const userMaxKeywordLimitSelector = (state: IRootState) =>
  state.user.userInfo.limits.keywords_per_project || DEFAULT_MAX_KEYWORD_LIMIT

export const userMaxSubUserLimitSelector = (state: IRootState) =>
  state.user.userInfo.limits.users_per_account || DEFAULT_MAX_SUB_USER_LIMIT

export const userMaxCompetitorLimitSelector = (state: IRootState) =>
  state.user.userInfo.limits.competitors_per_project || DEFAULT_MAX_COMPETITOR_LIMIT

export const userMaxCrawlPageLimitSelector = (state: IRootState) =>
  state.user.userInfo.limits.pages_to_crawl || DEFAULT_MAX_CRAWL_PAGE_LIMIT

export const userKeywordMetricsSelector = createDraftSafeSelector(
  (state: IRootState) => state.user.userInfo.limits.monthly_keyword_metrics_updates_used,
  (state: IRootState) => state.user.userInfo.limits.monthly_keyword_metrics_updates_limits,
  (keywordMetricsUsed, keywordMetricsLimit) => ({
    keywordMetricsUsed,
    keywordMetricsLimit,
  }),
)

export const userDailyReportLimitSelector = createDraftSafeSelector(
  (state: IRootState) => state.user.reportLimits.reports_limits,
  (state: IRootState) => state.user.reportLimits.reports_used,
  (reportLimit = 0, reportUsed = 0) => ({ reportLimit, reportUsed }),
)

export const userPaymentMethodSelector = (state: IRootState) => state.user.subscription.creditCard

export const userLastPaymentInfoSelector = createDraftSafeSelector(
  (state: IRootState) => state.user.subscription.latestInvoiceData?.created,
  (state: IRootState) => state.user.subscription.latestInvoiceData?.total,
  (state: IRootState) => state.user.subscription.latestInvoiceData?.currency,
  (created, total, currency) => {
    if (created && isNumber(total) && currency) {
      const region = getRegionFromCurrency(currency)
      return `${formatDate(created, 'YYYY-MM-DD', 'MMMM DD, YYYY')} - ${formatNumber(total, {
        region,
        withCurrency: true,
        useAbbreviation: false,
      })}`
    }
    return ''
  },
)

export const userNextPaymentInfoSelector = createDraftSafeSelector(
  (state: IRootState) => state.user.subscription.nextInvoiceData?.nextInvoiceAt,
  (state: IRootState) => state.user.subscription.nextInvoiceData?.total,
  (state: IRootState) => state.user.subscription.nextInvoiceData?.currency,
  (state: IRootState) => userPlanIntervalSelector(state),
  (nextInvoiceAt, total, currency, planInterval) =>
    nextInvoiceAt && isNumber(total) && planInterval !== PLAN_INTERVALS.LIFETIME && currency
      ? `${formatDate(nextInvoiceAt, 'YYYY-MM-DD', 'MMMM DD, YYYY')} - ${formatNumber(total, {
          region: getRegionFromCurrency(currency),
          withCurrency: true,
          useAbbreviation: false,
        })}`
      : ``,
)

export const userNextInvoiceDataSelector = (state: IRootState) => state.user.subscription.nextInvoiceData

export const userSubscriptionStatusSelector = (state: IRootState) => state.user.subscription.subscriptionStatus
export const userSubscriptionExternalProfileSelector = (state: IRootState) => state.user.subscription.externalProfile
export const userSubscriptionOptionsSelector = (state: IRootState) => {
  const tier = userTierSelector(state)
  return plansByTierSelector(state, tier)
}

export const userPlanExpiryDateSelector = createDraftSafeSelector(
  (state: IRootState) => userPlanIntervalSelector(state),
  (state: IRootState) => userSubscriptionStatusSelector(state),
  (state: IRootState) => userPlanEndDateSelector(state),
  (planInterval, subscriptionStatus, planEndDate) => {
    const trialEnd = moment(planEndDate, 'YYYY-MM-DD')
    if (subscriptionStatus === 'trialing') {
      if (planInterval === PLAN_INTERVALS.MONTHLY) {
        trialEnd.add(1, 'month')
      } else if (planInterval === PLAN_INTERVALS.YEARLY) {
        trialEnd.add(1, 'years')
      }
    }
    return formatDate(new Date(trialEnd.format('YYYY-MM-DD')))
  },
)

export const { setUserInfo, setSubscription, setReportLimits, setInvoicingSettings } = userSlice.actions

export default userSlice.reducer
