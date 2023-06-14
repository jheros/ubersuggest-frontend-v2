import { combineReducers } from 'redux'

import authReducer from './auth'
import recaptchaReducer from './recaptcha'

export const rootReducer = combineReducers({ auth: authReducer, recaptcha: recaptchaReducer })
export { authReducer, recaptchaReducer }
