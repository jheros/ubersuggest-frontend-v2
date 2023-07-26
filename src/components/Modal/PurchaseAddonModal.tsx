import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, Divider, Paper, SvgIcon, useTheme } from '@mui/material'
import { Typography, Dialog } from '@ubersuggest/common-ui'
import { ProjectSelect } from 'components/Select'
import { PLAN_INTERVALS, PLAN_INTERVAL_TRANSLATIONS } from 'configs'
import { ADDON_LINE_ITEMS, ADDON_MAIN_LIMIT_NAMES, ADDON_TYPES } from 'configs/addon'
import { useAlertContext } from 'contexts'
import { useFormatNumber } from 'hooks/useFormatNumber'
import { IRootState } from 'store'
import { useMigrateDeprecatedLifetimeMutation } from 'store/api'
import { usePurchaseAddonMutation } from 'store/api/addonApi'
import { addonByTypeSelector } from 'store/reducers/addon'
import {
  isLifetimePlanDeprecatedSelector,
  userAddonsPriceSelector,
  userCountryCodeSelector,
  userPlanIntervalSelector,
  userPlanPriceSelector,
} from 'store/reducers/user'
import { getErrorMessage } from 'utils/error'
import { getCurrencyAndRegion } from 'utils/location'

interface IPurchaseAddonModal {
  open: boolean
  addonType: string
  onClose: () => void
  projectId?: string
}

export const PurchaseAddonModal = ({ open, addonType, onClose, projectId }: IPurchaseAddonModal) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { addAlert } = useAlertContext()
  const [migrateDeprecatedLifetime] = useMigrateDeprecatedLifetimeMutation()
  const [purchaseAddon] = usePurchaseAddonMutation()
  const { formatCurrency } = useFormatNumber()

  const countryCode = useSelector(userCountryCodeSelector)
  const isLifetimePlanDeprecated = useSelector(isLifetimePlanDeprecatedSelector)
  const planInterval = useSelector(userPlanIntervalSelector)
  const planPrice = useSelector(userPlanPriceSelector)
  const addonsPrice = useSelector(userAddonsPriceSelector)
  const domainAddon = useSelector((state: IRootState) => addonByTypeSelector(state, ADDON_TYPES.ADDON_DOMAIN))
  const addon = useSelector((state: IRootState) => addonByTypeSelector(state, addonType))

  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(projectId)
  const [isLoading, setIsLoading] = useState(false)

  const { currency } = getCurrencyAndRegion(countryCode)

  if (!addon) return null

  const addonPrice = addon.prices[currency] || 0
  const addonDescription = t(ADDON_LINE_ITEMS[addonType].text, {
    0: '+' + addon.limits[ADDON_MAIN_LIMIT_NAMES[addonType]],
  })
  const addonPriceText = t('value_per_plan', {
    0: formatCurrency(addonPrice),
    1: t(PLAN_INTERVAL_TRANSLATIONS[planInterval as `${PLAN_INTERVALS}`]),
  })
  const newTotalPrice = t('new_total', {
    0: formatCurrency((planInterval === PLAN_INTERVALS.LIFETIME ? 0 : planPrice) + addonsPrice + addonPrice),
    1: t(`${planInterval === PLAN_INTERVALS.LIFETIME ? 'monthly' : planInterval}_total`),
  })
  const billingChangeSummary = t('billing_changes_summary_addon_purchase', {
    0: formatCurrency(addonPrice),
    1: planInterval,
  })

  const buyAddon = async () => {
    await purchaseAddon({
      addonType,
      addonCode: addon.code,
      projectId:
        addonType === ADDON_TYPES.ADDON_COMPETITOR || addonType === ADDON_TYPES.ADDON_TRACKEDKEYWORDS
          ? selectedProjectId
          : undefined,
    }).unwrap()
  }

  const handleSubmit = async () => {
    // todo
    // kissmetricsRecordingEvent(KISSMETRICS_TRACK_EVENTS.addon_clicked, {
    //   [PROPERTY_NAMES.btn_name]: PROPERTY_VALUES.addon_clicked[addonDetail.addonType],
    // })
    setIsLoading(true)
    try {
      if (isLifetimePlanDeprecated) {
        const res = await migrateDeprecatedLifetime().unwrap()
        if (res.status === '204') {
          setTimeout(async () => {
            await buyAddon()
            onClose && onClose()
          }, 5000)
        }
      } else {
        await buyAddon()
        onClose && onClose()
      }
    } catch (err) {
      addAlert({ severity: 'error', message: getErrorMessage(err) })
      onClose && onClose()
    }
    setIsLoading(false)
  }

  return (
    <Dialog
      onClose={onClose}
      onSubmit={handleSubmit}
      open={open}
      title={t('buy_addon_modal_heading')}
      closeButtonText={t('cancel')}
      submitButtonText={t('buy_addon_button')}
      submitButtonColor='secondary'
      isSubmitting={isLoading}
      showTitleCloseButton
      size='xl'
    >
      {addonType === ADDON_TYPES.ADDON_DOMAIN && (
        <Typography
          variant='text16'
          lineHeight='22px'
          color={theme.palette.common.black}
          textAlign='center'
          margin='5px 0 25px'
          paragraph
        >
          {t('bonus_message_projects', {
            0: domainAddon?.limits?.[ADDON_MAIN_LIMIT_NAMES[ADDON_TYPES.ADDON_TRACKEDKEYWORDS]] || 0,
            1: domainAddon?.limits?.[ADDON_MAIN_LIMIT_NAMES[ADDON_TYPES.ADDON_COMPETITOR]] || 0,
          })}
        </Typography>
      )}

      <Typography
        variant='text14Medium'
        lineHeight='16px'
        color={theme.palette.common.black}
        textAlign='left'
        margin='5px 0'
        paragraph
      >
        {t('addon_label')}
      </Typography>

      <Paper
        variant='outlined'
        square
        sx={{
          p: '10px 20px',
          mb: '10px',
          borderColor: 'common.lightGray.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 'auto !important',
        }}
      >
        <Box display='flex' alignItems='center'>
          <Box
            sx={{
              backgroundColor: ADDON_LINE_ITEMS[addonType].bgColor,
              borderRadius: '19px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: '15px',
            }}
          >
            <SvgIcon
              component={ADDON_LINE_ITEMS[addonType].icon}
              inheritViewBox
              sx={{ color: 'transparent', fontSize: '16px' }}
            />
          </Box>
          <Typography variant='text14Book' lineHeight='22px'>
            {addonDescription}
          </Typography>
        </Box>
        <Box pl='15px'>
          <Typography variant='text14Book' lineHeight='22px' color={theme.palette.common.blue.main}>
            {addonPriceText}
          </Typography>
        </Box>
      </Paper>

      <Typography
        variant='text14Medium'
        lineHeight='22px'
        color={theme.palette.common.blue.main}
        textAlign='right'
        margin='10px 0'
        paragraph
      >
        {newTotalPrice}
      </Typography>

      {(addonType === ADDON_TYPES.ADDON_COMPETITOR || addonType === ADDON_TYPES.ADDON_TRACKEDKEYWORDS) && (
        <>
          <Typography
            variant='text14Medium'
            lineHeight='16px'
            color={theme.palette.common.black}
            textAlign='left'
            margin='5px 0'
            paragraph
          >
            {t('label_ai_writer_project_selector')}
          </Typography>
          <ProjectSelect
            value={selectedProjectId}
            onChange={(id: string) => setSelectedProjectId(id)}
            fullWidth
            // displayEmpty
          />
        </>
      )}

      <Divider sx={{ my: 5, borderColor: 'common.lightGray.50' }} />

      <Typography
        variant='text16Book'
        lineHeight='22px'
        color={theme.palette.common.black}
        textAlign='center'
        m={0}
        paragraph
      >
        {t('billing_changes_summary')}
      </Typography>

      <Typography
        variant='text16'
        lineHeight='22px'
        color={theme.palette.common.darkGray[50]}
        textAlign='center'
        margin='5px 0'
        paragraph
      >
        {billingChangeSummary}
      </Typography>

      {isLifetimePlanDeprecated && (
        <Typography
          font='light'
          fontSize='15px'
          lineHeight='20px'
          color={theme.palette.common.darkGray[50]}
          textAlign='center'
          margin='10px 0 30px'
          paragraph
        >
          {t('change_plan_lifetime_addon_confirm')}
        </Typography>
      )}
    </Dialog>
  )
}
