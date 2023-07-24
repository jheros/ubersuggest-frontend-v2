import { Divider, Grid, Typography } from '@mui/material'
import { AlertProvider } from 'contexts'

import { AccountSection } from './_AccountSection'
import { AddonSection } from './_AddonSection'
import { BillingSection } from './_BillingSection'
import { DeleteAccountSection } from './_DeleteAccountSection'
import { PlanSection } from './_PlanSection'

export const AccountBilling = () => {
  return (
    <AlertProvider autoClose transition='collapse'>
      <AccountSection />

      {/* todo:  */}
      {/* {isPaidUser() &&
          shouldUpdateBillingInfo() &&
          !this.props.hideUpdateBillingInfoAlert && (
            <TableNotificationBar
              key="update-billing-info"
              style={{ marginBottom: '24px', maxWidth: '1134px' }}
            >
              <TableNotification
                type="warning"
                content={
                  <div>
                    <Text
                      fontSize="16px"
                      lineHeight="24px"
                      boldColor={palette.darkGray}
                      dangerouslySetInnerHTML={{
                        __html: translate('old_lifetime_update_billing_info'),
                      }}
                    />
                    <Text lineHeight="24px">
                      {translate('old_lifetime_update_billing_info2')}
                    </Text>
                  </div>
                }
                onClose={() => {
                  this.props.closeUpdateBillingInfoAlter()
                }}
              />
            </TableNotificationBar>
          )} */}

      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <PlanSection />
        </Grid>

        <Grid item lg={9} xs={12}>
          <AddonSection />
        </Grid>
      </Grid>

      <BillingSection />

      <Divider sx={{ my: 5, borderColor: (theme) => theme.palette.common.lightGray[50] }} />

      <DeleteAccountSection />
    </AlertProvider>
  )
}
