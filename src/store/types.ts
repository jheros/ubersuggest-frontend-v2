import React from 'react'

import { ITier } from 'configs'
import { ICountryCode } from 'utils/location'

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

export interface IInvoicingSettings {
  city: string | null
  company: string | null
  country: ICountryCode | null
  first_name: string | null
  last_name: string | null
  phone: string | null
  postal_code: string | null
  preferred_locale: string
  region: string | null
  street1: string | null
  street2: string | null
  vat_number: string | null
}

export interface ISubscription {
  subscriptionStatus: string // todo: enum
  pastDueStartedAt?: string // todo
  tier: ITier
  planInterval: string
  addOns?: any // todo
  subscriptionCanceled: boolean
  reactivationAvailable: boolean
  endOfCurrentPeriod: Date
  planIsDeprecated: boolean
  creditCard: string
  latestInvoiceData?: {
    paid: boolean
    amountPaid: number
    total: number
    currency: string
    created: Date
    attemptCount: number
  }
  nextInvoiceData?: any // todo
  redeemedCouponCodes: Array<any> // todo
  externalProfile: string
  invoicingSettings: IInvoicingSettings
}

export interface IUserLocation {
  countryCode: string
  country: string
  city: string
}

export interface IUserInfo {
  id: string
  email: string
  picture: string | null
  name: string
  last_active: number
  tier: string // todo: enum?
  biweekly_call: boolean
  seo_help: boolean
  grow_your_traffic: boolean
  kw_research_banner_closed: boolean
  workspace_banner_closed: boolean
  opportunities_thumbs_banner_closed: boolean
  is_in_salesforce: boolean
  lifetime_offer_until: null // todo
  lifetime_unique_offer: boolean
  subscription: ISubscription // todo
  preferences: {
    lang: string
    locId: number
    nav_change_notified: boolean
  }
  user_type: string // todo: enum?
  free_trial_used: null // todo
  free_trial_days: number
  user_group: string
  coupon: null // todo
  labs_settings: object // todo
  confirmed: boolean
  limits: any // todo
  is_annonymous: boolean
  mainUser: any // todo
  addons: any // todo
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

export interface IAddonEntity {
  [key: string]: any
}

export interface IResetPasswordInput {
  email: string
  lang: string
}

export interface IChangePasswordInput {
  email: string
  password: string
  code: string
}

export interface IPurchaseAddonInput {
  addonCode: string
  addonType: string
  projectId?: string
}

export interface IProjectEntity {
  id: string
  title: string
  domain?: string
  icon?: React.ReactNode
  keywords?: {
    [key: string]: []
  }
  audit?: {
    issues_per_category?: {
      errors?: {
        count: number
      }
    }
  }
}

export interface IDailyReportLimits {
  monthly_keyword_metrics_updates_limits: number
  monthly_keyword_metrics_updates_used: number
  reports_limits: number
  reports_used: number
  visualization_reports_limits: number
  visualization_reports_used: number
}

export interface IReportLimits {
  reports_limits: number
  reports_used: number
  visualization_reports_limits: number
  visualization_reports_used: number
}

export interface IUpdatePaymentMethodInput {
  tokenId: string
  threeDSecureToken?: string
}

export interface IUpdateBillingInformationInput {
  company: string
  firstName: string
  lastName: string
  street1: string
  street2: string
  city: string
  region: string
  postalCode: string
  phone: string
  countryCode: string
  vatNumber: string
}

export interface ISendCancelationFeedbackInput {
  category: string
  notes: string
  status: string
}
