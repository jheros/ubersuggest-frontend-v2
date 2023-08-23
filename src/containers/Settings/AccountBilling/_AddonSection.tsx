import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { Box, Grid, Paper, SvgIcon, Tooltip, LinearProgress } from '@mui/material'
import { Button, Typography } from '@ubersuggest/common-ui'
import { ReactComponent as QuestionIcon } from 'assets/svg/icons/question-default.svg'
import { PurchaseAddonModal, RouterLink } from 'components'
import { TIERS } from 'configs'
import { ADDON_MAIN_LIMIT_NAMES, ADDON_TYPES } from 'configs/addon'
import { useNavigateWithLang } from 'hooks'
import { ROUTES } from 'routes'
import { IRootState } from 'store'
import { addonByTypeSelector, isAddonsAvailableSelector } from 'store/reducers/addon'
import { projectCountSelector } from 'store/reducers/project'
import { subUserCountSelector } from 'store/reducers/subUser'
import {
  isFreeUserSelector,
  isInviteAllowedSelector,
  isSubUserSelector,
  userAiwWordsLimitSelector,
  userDailyReportLimitSelector,
  userKeywordMetricsSelector,
  userMaxCompetitorLimitSelector,
  userMaxCrawlPageLimitSelector,
  userMaxKeywordLimitSelector,
  userMaxProjectLimitSelector,
  userMaxSubUserLimitSelector,
  userTierSelector,
} from 'store/reducers/user'
import { getUrlFromRoutes } from 'utils/route'

interface IAddonCard {
  title: string
  subTitle?: string
  infoText?: string
  tooltip?: string
  children?: React.ReactNode
  progress?: number
  buttonText?: string
  noButton?: boolean
  onBuyClick?: () => void
}

const AddonCard = ({
  title,
  subTitle,
  infoText,
  tooltip,
  children,
  progress,
  buttonText,
  noButton,
  onBuyClick,
}: IAddonCard) => {
  const { t } = useTranslation()
  return (
    <Paper
      variant='outlined'
      square
      sx={{
        p: '15px 25px',
        borderColor: 'common.lightGray.main',
        textAlign: 'center',
        minHeight: '144px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box flexGrow={1} textAlign='left'>
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant='text14Book'>{title}</Typography>
            {tooltip && (
              <Tooltip arrow title={tooltip}>
                <SvgIcon
                  component={QuestionIcon}
                  sx={{ fontSize: '14px', cursor: 'pointer', opacity: 0.5, mx: '5px', '&:hover': { opacity: 1 } }}
                  inheritViewBox
                />
              </Tooltip>
            )}
          </Box>

          {infoText && <Typography variant='text14'>{infoText}</Typography>}
        </Box>
        {subTitle && (
          <Typography
            variant='text14'
            boldColor='common.darkGray.main'
            dangerouslySetInnerHTML={{ __html: subTitle }}
            paragraph
            m={0}
            // sx={{ lineHeight: '24px' }}
          />
        )}
        {children}
        {progress !== undefined && (
          <LinearProgress
            color={progress > 74 ? 'error' : progress > 49 ? 'warning' : 'success'}
            variant='determinate'
            value={Math.max(1, progress)}
            sx={{ height: '10px', backgroundColor: 'common.lightGray.30' }}
          />
        )}
      </Box>
      {!noButton && (
        <Button
          onClick={onBuyClick}
          variant='outlined'
          color='secondary'
          size='large'
          fullWidth
          wrapperSx={{ mt: '15px', mb: '10px' }}
        >
          {buttonText || t('buy_addon_button')}
        </Button>
      )}
    </Paper>
  )
}

export const AddonSection = () => {
  const { t } = useTranslation()
  const navigateWithLang = useNavigateWithLang()
  const [searchParams] = useSearchParams()

  const isAddonsAvailable = useSelector(isAddonsAvailableSelector)
  const isSubUser = useSelector(isSubUserSelector)
  const isInviteAllowed = useSelector(isInviteAllowedSelector)
  const isFreeUser = useSelector(isFreeUserSelector)
  const domainAddon = useSelector((state: IRootState) => addonByTypeSelector(state, ADDON_TYPES.ADDON_DOMAIN))
  const maxProjectLimit = useSelector(userMaxProjectLimitSelector)
  const maxKeywordLimit = useSelector(userMaxKeywordLimitSelector)
  const maxSubUserLimit = useSelector(userMaxSubUserLimitSelector)
  const maxCompetitorLimit = useSelector(userMaxCompetitorLimitSelector)
  const maxCrawlPageLimit = useSelector(userMaxCrawlPageLimitSelector)
  const projectCount = useSelector(projectCountSelector)
  const subUserCount = useSelector(subUserCountSelector)
  const { keywordMetricsUsed, keywordMetricsLimit } = useSelector(userKeywordMetricsSelector)
  const { aiwWordsLimit, aiwWordsUsed } = useSelector(userAiwWordsLimitSelector)
  const tier = useSelector(userTierSelector)
  const { reportUsed, reportLimit } = useSelector(userDailyReportLimitSelector)

  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false)
  const [purchaseAddonType, setPurchaseAddonType] = useState(ADDON_TYPES.ADDON_DOMAIN)
  const isAiwAddon = !!searchParams.get('aiwAddon')

  useEffect(() => {
    if (isAiwAddon && !isSubUser) {
      showPurchaseModal(ADDON_TYPES.ADDON_AIW_BLOGGER)
    }
  }, [])

  const showPurchaseModal = (addonType: string) => {
    if (tier === TIERS.FREE_TIER) {
      // todo
      // kissmetricsRecordingEvent(KISSMETRICS_TRACK_EVENTS.clicked_upgrade, {
      //   [PROPERTY_NAMES.btn_location]:
      //     PROPERTY_VALUES.addon_block_off[addonType],
      // })
      navigateWithLang(ROUTES.PRICING)
    } else {
      setPurchaseAddonType(() => {
        setPurchaseModalOpen(true)
        return addonType
      })
    }
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='text16Medium' mt={4} mb='10px' paragraph sx={{ textTransform: 'uppercase' }}>
          {t(isAddonsAvailable && !isSubUser ? 'usage_and_addons' : 'account_usage')}
        </Typography>

        {isAddonsAvailable && !isSubUser && (
          <RouterLink to={getUrlFromRoutes('SETTINGS.MANAGE_ADDONS')}>
            <Typography variant='text14Book'>{t('manage_settings')}</Typography>
          </RouterLink>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <AddonCard
            title={t('projects')}
            infoText={`${projectCount}/${maxProjectLimit}`}
            tooltip={
              domainAddon
                ? t('current_plan_projects_tooltip', {
                    0: domainAddon?.limits?.[ADDON_MAIN_LIMIT_NAMES[ADDON_TYPES.ADDON_TRACKEDKEYWORDS]] || 0,
                    1: domainAddon?.limits?.[ADDON_MAIN_LIMIT_NAMES[ADDON_TYPES.ADDON_COMPETITOR]] || 0,
                  })
                : ''
            }
            progress={(projectCount / maxProjectLimit) * 100}
            onBuyClick={() => showPurchaseModal(ADDON_TYPES.ADDON_DOMAIN)}
            noButton={isSubUser}
          >
            {tier !== TIERS.TIER3 && projectCount === maxProjectLimit && (
              <Box my={1} textAlign='center'>
                <RouterLink
                  to={ROUTES.PRICING}
                  onClick={() => {
                    // todo
                    // kissmetricsRecordingEvent(KISSMETRICS_TRACK_EVENTS.clicked_upgrade, {
                    //   [PROPERTY_NAMES.btn_location]: 'billing settings upgrade',
                    // })
                  }}
                >
                  <Typography variant='text14Book'>{t('upgrade')}</Typography>
                </RouterLink>
              </Box>
            )}
          </AddonCard>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <AddonCard
            title={t('tracked_keywords')}
            subTitle={`${t('tracked_kw_per_project', { 0: maxKeywordLimit })}`}
            tooltip={`${t('current_plan_keywords_tooltip', { 0: maxKeywordLimit })}`}
            onBuyClick={() => showPurchaseModal(ADDON_TYPES.ADDON_TRACKEDKEYWORDS)}
            noButton={isSubUser || projectCount === 0}
          ></AddonCard>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <AddonCard
            title={tier === TIERS.FREE_TIER ? t('daily_search_limit') : t('daily_report_limit')}
            infoText={`${reportUsed}/${reportLimit}`}
            progress={(reportUsed / reportLimit) * 100}
            onBuyClick={() => showPurchaseModal(ADDON_TYPES.ADDON_DAILYSEARCH)}
            noButton={isSubUser}
          ></AddonCard>
        </Grid>

        {(isInviteAllowed || isFreeUser) && (
          <Grid item md={4} sm={6} xs={12}>
            <AddonCard
              title={`${t('users_on_account')}`}
              infoText={maxSubUserLimit > 0 ? `${subUserCount}/${maxSubUserLimit}` : `0`}
              progress={maxSubUserLimit > 0 ? (subUserCount / maxSubUserLimit) * 100 : undefined}
              onBuyClick={() => showPurchaseModal(ADDON_TYPES.ADDON_USER)}
              noButton={isSubUser}
            ></AddonCard>
          </Grid>
        )}

        <Grid item md={4} sm={6} xs={12}>
          <AddonCard
            title={t('tracked_competitors')}
            subTitle={`${t('tracked_kw_per_project', { 0: maxCompetitorLimit })}`}
            tooltip={`${t('current_plan_competitors_tooltip', { 0: maxCompetitorLimit })}`}
            onBuyClick={() => showPurchaseModal(ADDON_TYPES.ADDON_COMPETITOR)}
            noButton={isSubUser || projectCount === 0}
          ></AddonCard>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <AddonCard
            title={t('site_audit_crawls')}
            subTitle={t('n_pages', { 0: maxCrawlPageLimit })}
            tooltip={t('current_plan_crawls_tooltip', { 0: maxCrawlPageLimit })}
            noButton
          ></AddonCard>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <AddonCard
            title={t('kw_metrics_credits', { 0: '' }).trim()}
            infoText={`${keywordMetricsUsed}/${keywordMetricsLimit}`}
            progress={
              !keywordMetricsUsed || !keywordMetricsLimit ? 0 : (keywordMetricsUsed / keywordMetricsLimit) * 100
            }
            onBuyClick={() => showPurchaseModal(ADDON_TYPES.ADDON_KEYWORD_METRICS_UPDATES)}
            noButton={isSubUser}
          ></AddonCard>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <AddonCard
            title={t('aiw_word_count')}
            tooltip={t('aiw_word_count_tooltip')}
            infoText={`${aiwWordsUsed}/${aiwWordsLimit}`}
            progress={!aiwWordsUsed || !aiwWordsLimit ? 0 : (aiwWordsUsed / aiwWordsLimit) * 100}
            onBuyClick={() => showPurchaseModal(ADDON_TYPES.ADDON_AIW_BLOGGER)}
            noButton={isSubUser}
          ></AddonCard>
        </Grid>
      </Grid>

      {purchaseModalOpen && (
        <PurchaseAddonModal
          open={purchaseModalOpen}
          addonType={purchaseAddonType}
          onClose={(isPurchased) => {
            setPurchaseModalOpen(false)
            if (isPurchased && isAiwAddon && process.env.REACT_APP_AIWRITER_BASE_URL) {
              window.location.href = process.env.REACT_APP_AIWRITER_BASE_URL
            }
          }}
        />
      )}
    </>
  )
}
