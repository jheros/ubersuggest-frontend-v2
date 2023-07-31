// todo: define it as enum
export const PAYMENT_METHODS = {
  PAYPAL: 'paypal',
  CREDIT_CARD: 'cc', // todo
}

export const RECURLY_PUBLIC_KEY: string = process.env.REACT_APP_RECURLY_PUBLIC_KEY || ''
