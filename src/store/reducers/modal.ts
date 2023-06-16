import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IGenericModal {
  isOpen: boolean
}

interface IEmailConfirmModal extends IGenericModal {
  email?: string
  hideRefreshButton?: boolean
}

interface ILoginLimitModal extends IGenericModal {
  type?: 'SIGN_OUT_WARNING' | 'LOGIN_LIMIT_REACHED'
  title?: string
  message?: string
}

interface IModalState {
  emailConfirmModal: IEmailConfirmModal
  adBlockerDetectModal: IGenericModal
  loginLimitModal: ILoginLimitModal
}

const initialState = {
  emailConfirmModal: {
    isOpen: false,
  },
  adBlockerDetectModal: {
    isOpen: false,
  },
  loginLimitModal: {
    isOpen: false,
  },
} as IModalState

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showEmailConfirmModal: (state, action: PayloadAction<Omit<IEmailConfirmModal, 'isOpen'>>) => {
      state.emailConfirmModal = {
        ...action.payload,
        isOpen: true,
      }
    },
    hideEmailConfirmModal: (state) => {
      state.emailConfirmModal = {
        isOpen: false,
      }
    },
    showAdBlockerDetectModal: (state, action: PayloadAction<Omit<IGenericModal, 'isOpen'>>) => {
      state.adBlockerDetectModal = {
        ...action.payload,
        isOpen: true,
      }
    },
    hideAdBlockerDetectModal: (state) => {
      state.adBlockerDetectModal = {
        isOpen: false,
      }
    },
    showLoginLimitModal: (state, action: PayloadAction<Omit<ILoginLimitModal, 'isOpen'>>) => {
      state.loginLimitModal = {
        ...action.payload,
        isOpen: true,
      }
    },
    hideLoginLimitModal: (state) => {
      state.loginLimitModal = {
        isOpen: false,
      }
    },
  },
})

export const {
  showEmailConfirmModal,
  hideEmailConfirmModal,
  showAdBlockerDetectModal,
  hideAdBlockerDetectModal,
  showLoginLimitModal,
  hideLoginLimitModal,
} = modalSlice.actions

export default modalSlice.reducer
