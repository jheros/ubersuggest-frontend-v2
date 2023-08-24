import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import reactStringReplace from 'react-string-replace'

import { Box, Link, Stack, SvgIcon, useTheme } from '@mui/material'
import { Typography, fonts, Switch } from '@ubersuggest/common-ui'
import arrowDownIcon from 'assets/svg/icons/arrow-down.png'
import { ReactComponent as ArrowRightIcon } from 'assets/svg/icons/arrow-right-transparent.svg'
import freeTrialBadge from 'assets/svg/pricing/eclipse.png'
import lifeplanArrow from 'assets/svg/pricing/lifeplan-arrow.svg'
import { DesktopPlanPricingCard } from 'components'
import { IPlanInterval, PLAN_INTERVALS, TIERS } from 'configs'
import { useFormatNumber } from 'hooks/useFormatNumber'
import { userInfoSelector } from 'store/reducers/user'
import textCrop from 'utils/textCrop'
import { getLanguageCode } from 'utils/translation'

const PlanBadge: React.FC<{
  size?: 'small' | 'medium' | 'large'
  planInterval: IPlanInterval
  trialDays?: number
}> = ({ size = 'large', planInterval, trialDays = 7 }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Box
      sx={{
        background: `url(${freeTrialBadge}) no-repeat`,
        color: theme.palette.common.white,
        whiteSpace: 'pre-wrap',
        width: '142px',
        height: '142px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: size === 'large' ? '14px' : '11px',
        lineHeight: '11px',
        transform: 'rotate(-20deg)',
        padding: '0 0 8px 17px',
        flexShrink: 0,
        '& b': {
          fontFamily: fonts.primary.medium,
          fontSize: size === 'small' ? '13px' : size === 'medium' ? '18px' : '22px',
          fontWeight: 300,
          lineHeight: '30px',
        },
      }}
      dangerouslySetInnerHTML={{
        __html: planInterval === 'lifetime' ? t('money_back_badge') : t('7_day_free_trial', { 0: trialDays }),
      }}
    ></Box>
  )
}

const PlanOption: React.FC<{ type: 'monthly' | 'lifetime' }> = ({ type }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const isMonthly = type === 'monthly'
  const savePercents = isMonthly ? 70 : 90

  return (
    <Stack direction='column' alignItems='center' position='relative'>
      <Typography variant='text20Medium' sx={{ lineHeight: '30px' }}>
        {isMonthly ? t('monthly') : t('toggle_button_lifetime')}
      </Typography>

      <Typography variant='text14'>
        {reactStringReplace(t('save_x_percent', { 0: savePercents }), `${savePercents}%`, (match, index) => (
          <Typography
            key={`saving-percent-${index}`}
            component='span'
            variant='text14'
            color={theme.palette.common.orange.main}
          >
            {match}
          </Typography>
        ))}
      </Typography>

      {!isMonthly && (
        <img
          src={lifeplanArrow}
          style={{
            position: 'absolute',
            top: 'calc(100% - 10px)',
            left: '-17px',
          }}
          alt='lifeplan-arrow'
        />
      )}
    </Stack>
  )
}

export const DesktopPricingSection: React.FC<{
  planInterval: IPlanInterval
  setPlanInterval: (selectedInterval: IPlanInterval) => void
}> = ({ planInterval, setPlanInterval }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { formatNumber } = useFormatNumber()

  const trialDays = useSelector(userInfoSelector).free_trial_days || 7

  const languageCode = getLanguageCode()
  const allTiers = [TIERS.TIER2, TIERS.TIER1, TIERS.TIER3]
  const tierDetails = {
    [TIERS.TIER1]: {
      tier: TIERS.TIER1,
      title: t('plans_individual'),
      websitesLimit: t('one_website'),
      listItems: [
        t('n_searches_day', { 0: formatNumber(150) }),
        t('n_domains', { 0: formatNumber(1) }),
        t('kw_per_domain', { 0: formatNumber(125) }),
        t('competitor_per_domain', { 0: formatNumber(5) }),
        t('scans_per_domain', { 0: formatNumber(1000) }),
        t('one_user'),
      ],
    },
    [TIERS.TIER2]: {
      tier: TIERS.TIER2,
      title: t('plans_business'),
      websitesLimit: t('up_to_seven_websites'),
      listItems: [
        t('n_searches_day', { 0: formatNumber(300) }),
        t('n_domains', { 0: formatNumber(7) }),
        t('kw_per_domain', { 0: formatNumber(150) }),
        t('competitor_per_domain', { 0: formatNumber(10) }),
        t('scans_per_domain', { 0: formatNumber(5000) }),
        t('n_users', { 0: formatNumber(2) }),
      ],
    },
    [TIERS.TIER3]: {
      tier: TIERS.TIER3,
      title: t('enterprise'),
      websitesLimit: t('up_to_fifteen_websites'),
      listItems: [
        t('n_searches_day', { 0: formatNumber(900) }),
        t('n_domains', { 0: formatNumber(15) }),
        t('kw_per_domain', { 0: formatNumber(300) }),
        t('competitor_per_domain', { 0: formatNumber(15) }),
        t('scans_per_domain', { 0: formatNumber(10000) }),
        t('n_users', { 0: formatNumber(5) }),
      ],
    },
  }

  return (
    <Stack direction='column' justifyContent='center' sx={{ backgroundColor: theme.palette.common.gray[10] }}>
      <Typography
        mt={5.5}
        variant='text32'
        fontFamily='tertiary'
        font='regular'
        textAlign='center'
        color={theme.palette.common.orange.main}
      >
        {t('win_at_seo')}
      </Typography>

      <Typography mt={3} variant='text56Medium' textAlign='center'>
        {t('pricing')}
      </Typography>

      <Stack direction='row' alignItems='center' justifyContent='center' mt={1} mx='auto' spacing={3} maxWidth='640px'>
        <PlanBadge
          planInterval={planInterval}
          trialDays={trialDays}
          size={
            languageCode === 'de' || languageCode === 'nl'
              ? 'small'
              : planInterval === PLAN_INTERVALS.LIFETIME
              ? 'medium'
              : 'large'
          }
        />

        <Typography
          variant='text20'
          sx={{ lineHeight: '30px' }}
          dangerouslySetInnerHTML={{
            __html: t('pricing_page_subheading'),
          }}
        />
      </Stack>

      <Stack direction='row' alignItems='center' justifyContent='center' spacing='30px'>
        <PlanOption type='monthly' />

        <Switch
          variant='secondary'
          checked={planInterval === PLAN_INTERVALS.LIFETIME}
          onChange={(event) => setPlanInterval(event.target.checked ? PLAN_INTERVALS.LIFETIME : PLAN_INTERVALS.MONTHLY)}
        />

        <PlanOption type='lifetime' />
      </Stack>

      <Stack direction='row' justifyContent='center' alignItems='center' mt='49px'>
        {allTiers.map((tier, index) => (
          <DesktopPlanPricingCard
            key={`tier-${index}`}
            {...tierDetails[tier as keyof typeof tierDetails]}
            planInterval={planInterval}
          />
        ))}
      </Stack>

      <Stack direction='row' justifyContent='center' alignItems='center' spacing='15px' mt='22px'>
        <Link href='#compare-plans' color={theme.palette.primary.main} underline='hover'>
          <Typography variant='text20Medium' letterSpacing='0.1rem' textTransform='uppercase'>
            {t('compare_plans')}
          </Typography>
        </Link>

        <img src={arrowDownIcon} alt='arrow-down-icon' />
      </Stack>

      <Stack direction='row' justifyContent='center' alignItems='center' spacing='6px' mt='20px'>
        <Link
          href='#add_ons'
          color={theme.palette.common.neutral['70']}
          underline='hover'
          onClick={() => window.scrollBy(0, 70)}
        >
          <Typography
            variant='text14Medium'
            letterSpacing='0.1rem'
            textTransform='uppercase'
            sx={{ ...textCrop(1, 0, 0.3) }}
          >
            {t('available_addons')}
          </Typography>
        </Link>

        <SvgIcon
          component={ArrowRightIcon}
          sx={{ fontSize: '20px', stroke: theme.palette.common.neutral['70'] }}
          inheritViewBox
        />
      </Stack>
    </Stack>
  )
}
