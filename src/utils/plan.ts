import { ITier, PLAN_CODES, TIERS } from 'configs'

export const getPlanCode = (isCurrencySupported: boolean, tier: ITier) => {
  if (!isCurrencySupported && tier !== TIERS.RESTART) {
    return PLAN_CODES.GLOBAL
  } else {
    return PLAN_CODES.LOCAL
  }
}

