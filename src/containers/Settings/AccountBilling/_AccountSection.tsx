import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, Grid, Link, Paper, SvgIcon, Divider } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { ReactComponent as GoogleIcon } from 'assets/svg/icons/google-black.svg'
import { ChangeLoginMethodModal, RemoveUserFromAccountModal } from 'components'
import { IRootState } from 'store'
import { isSubUserSelector, userInfoSelector } from 'store/reducers/user'

export const AccountSection = () => {
  const { t } = useTranslation()
  const user = useSelector(userInfoSelector)
  const isSubUser = useSelector(isSubUserSelector)
  const [isChangeLoginMethodModalOpen, setIsChangeLoginMethodModalOpen] = useState(false)
  const [isRemoveUserFromAccountModalOpen, setIsRemoveUserFromAccountModalOpen] = useState(false)

  if (!user) return null

  return (
    <>
      <Typography variant='text16Medium' mt={4} paragraph>
        {t('account_heading')}
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography component='div' variant={'text14Book'} mt={2} mb={1}>
              {user.user_type === 'google' ? t('google_account_email') : t('email')}
            </Typography>
            <Box>
              <Typography variant='text16' mr={2}>
                {user.email}
              </Typography>
              {user.user_type === 'google' && (
                <Link
                  component='button'
                  variant='text16Book'
                  onClick={() => {
                    setIsChangeLoginMethodModalOpen(true)
                  }}
                >
                  {t('change_login_method')}
                </Link>
              )}
            </Box>
          </Grid>
          {isSubUser && user.mainUser && (
            <Grid item xs={12} md={6}>
              <Typography component='div' variant='text14Book' mt={2} mb={1}>
                {t('account_connected_to')}
              </Typography>
              <Box>
                {/* <Typography variant='text16'>{user.mainUser.email}</Typography> */}
                {/* todo: no matching design with other grid */}
                {/* <Divider orientation='vertical' variant='middle' flexItem sx={{ ml: 2, mr: 2, my: 0 }} /> */}
                <Link
                  component='button'
                  variant='text16Book'
                  onClick={() => {
                    setIsRemoveUserFromAccountModalOpen(true)
                  }}
                >
                  {t('remove_user_from_account')}
                </Link>
              </Box>
            </Grid>
          )}
        </Grid>
        {user.user_type === 'google' && (
          <Paper
            elevation={2}
            sx={{ display: 'flex', alignItems: 'center', padding: 2, mt: 3, mb: 8, color: 'common.darkGray.main' }}
          >
            <SvgIcon component={GoogleIcon} inheritViewBox />
            <Typography variant='text16Light' ml={2}>
              {t('currently_google_sign_in')}
            </Typography>
          </Paper>
        )}
      </Box>
      <ChangeLoginMethodModal
        open={isChangeLoginMethodModalOpen}
        onClose={() => setIsChangeLoginMethodModalOpen(false)}
      />
      <RemoveUserFromAccountModal
        open={isRemoveUserFromAccountModalOpen}
        onClose={() => setIsRemoveUserFromAccountModalOpen(false)}
      />
    </>
  )
}
