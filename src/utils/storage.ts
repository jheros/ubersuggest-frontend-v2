export const hasUnloggedUserProject = () => localStorage.getItem('unlogged_user_project') !== null

export const removeAdblockDetectModalStatus = () => {
  localStorage.removeItem('closed_ad_block_detect_modal')
}

// todo: remove this after this is done via redux
export const pushLoginLimitMessage = () => {
  localStorage.setItem('LOGIN_LIMIT_REACHED', 'true')
}
