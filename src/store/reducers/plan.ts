import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPlanInterval, ITier, PLAN_INTERVALS, TIERS } from 'configs'
import moment from 'moment'
import { IRootState } from 'store'
import type { IPlanEntity } from 'store/types'
import { formatDate } from 'utils/dateTime'
import { getCurrencyAndRegion } from 'utils/location'
import { getPlanCode } from 'utils/plan'

import {
  isLifetimeValidSelector,
  userCountryCodeSelector,
  userPlanEndDateSelector,
  userPlanIntervalSelector,
  userSubscriptionStatusSelector,
} from './user'

interface IPlanState {
  entities: IPlanEntity
  isLoaded: boolean
}

const initialState = {
  entities: {},
  isLoaded: false,
} as IPlanState

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setPlans: (state, action: PayloadAction<IPlanEntity>) => {
      state.entities = action.payload
      state.isLoaded = true
    },
  },
})

export const planByTierAndIntervalSelector = createDraftSafeSelector(
  (state: IRootState) => userCountryCodeSelector(state),
  (state: IRootState) => state.plan.entities,
  (_state: IRootState, tier: ITier) => tier,
  (_state: IRootState, _tier: ITier, planInterval: IPlanInterval) => planInterval,
  (countryCode, plans, tier, planInterval) => {
    const { currency, isCurrencySupported } = getCurrencyAndRegion(countryCode)
    const plan = plans[tier]?.[planInterval]?.[getPlanCode(isCurrencySupported, tier)] || ({} as any)
    return { planCode: plan.plan_code || '', planPrice: plan.currencies?.[currency] }
  },
)

export const plansByTierSelector = createDraftSafeSelector(
  (state: IRootState) => userCountryCodeSelector(state),
  (state: IRootState, tier: ITier) => state.plan.entities[tier],
  () => isLifetimeValidSelector(),
  (_state: IRootState, tier: ITier) => tier,
  (countryCode, plan, isLifetimeValid, tier) => {
    const { currency, region, isCurrencySupported } = getCurrencyAndRegion(countryCode)
    return Object.keys(plan)
      .filter((planInterval) => {
        if (tier === TIERS.TIER0 || tier === TIERS.RESTART) return true
        if (isLifetimeValid) {
          return planInterval !== PLAN_INTERVALS.YEARLY
        } else {
          return planInterval !== PLAN_INTERVALS.LIFETIME
        }
      })
      .map((planInterval) => {
        const planInfo = plan?.[planInterval as IPlanInterval]?.[getPlanCode(isCurrencySupported, tier)]
        return {
          planCode: planInfo?.plan_code,
          planPrice: planInfo?.currencies?.[currency],
          planInterval,
          currency,
          region,
          tier,
        }
      })
  },
)

export const { setPlans } = planSlice.actions

export default planSlice.reducer
