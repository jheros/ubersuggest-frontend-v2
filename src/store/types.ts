export interface IGenericResponse {
  status: string
  message: string
}

export type IApiError = {
  code: string
  error: string
  description: string
}

export type IErrorLimit = {
  limitType: string
  limitValue?: number
}

export type ILoginInput = {
  email: string
  password: string
  rememberMe: boolean
}

export type IUserToken = {
  token: string
  token_ttl: number
}

export interface IUserInfo {
  id?: string
  email?: string
  picture?: string | null
  name?: string
  last_active?: number
  tier?: string // todo: enum?
  biweekly_call?: boolean
  seo_help?: boolean
  grow_your_traffic?: boolean
  kw_research_banner_closed?: boolean
  workspace_banner_closed?: boolean
  opportunities_thumbs_banner_closed?: boolean
  is_in_salesforce?: boolean
  lifetime_offer_until?: null // todo
  lifetime_unique_offer?: boolean
  subscription?: {
    subscriptionStatus: string // todo: enum
    pastDueStartedAt: string // todo
  } // todo
  preferences?: {
    lang?: string
    locId?: number
  } // todo
  user_type?: string // todo: enum?
  free_trial_used?: null // todo
  free_trial_days?: number
  user_group?: string
  coupon?: null // todo
  labs_settings?: object // todo
  confirmed?: boolean
  limits?: object // todo
  countryCode?: string
  country?: string
  city?: string
  is_annonymous?: boolean
}

export interface IRegisterUserInput {
  email: string
  password: string
  lang: string
  recurly_coupon?: string
  country: string
  city: string
}

export interface IRegisterMultiUsersInput {
  code: string
  password: string
  lang: string
  country: string
  city: string
}

export interface IGetTokenRes {
  token: string
  ttl: number
}

export interface ILoginRes {
  fresh_login: string
}

export interface IResendVerificationEmailInput {
  email: string
  lang: string
}

export interface IPlanEntity {
  [key: string]: {
    [key in 'lifetime' | 'monthly' | 'yearly']?: {
      [key in 'global' | 'local']?: {
        currencies: {
          [key: string]: number
        }
        plan_code: string
      }
    }
  }
}
