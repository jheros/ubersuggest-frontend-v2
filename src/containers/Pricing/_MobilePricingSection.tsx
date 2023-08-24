import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, Divider, Stack, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material'
import { Typography, fonts } from '@ubersuggest/common-ui'
import lifetimeArrow from 'assets/svg/pricing/lifetime-arrow.svg'
import neilPatel from 'assets/svg/pricing/neil_patel.png'
import { MobilePlanPricingCard } from 'components'
import { IPlanInterval, PLAN_INTERVALS, TIERS } from 'configs'
import moment from 'moment'
import {
  userDailyReportLimitSelector,
  userLifetimeOfferTimeLeft,
  userTierSelector,
} from 'store/reducers/user'
import { formatNumber } from 'utils/numbro'

const SubscriptionDescription: React.FC<{ countDown: number }> = ({ countDown }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const timeLeft = moment.utc(countDown)
  const timeLeftDetails = [
    {
      time: timeLeft.format('HH'),
      unit: t('countdown_hours'),
    },
    {
      time: ':',
      unit: ':',
    },
    {
      time: timeLeft.format('mm'),
      unit: t('countdown_minutes'),
    },
    {
      time: ':',
      unit: ':',
    },
    {
      time: timeLeft.format('ss'),
      unit: t('countdown_seconds'),
    },
  ]

  return (
    <Box
      mb='15px'
      pt='20px'
      width='100%'
      position='relative'
      boxShadow='0px 12px 80px rgba(0, 0, 0, 0.05)'
      sx={{ backgroundColor: theme.palette.common.lightGray[20] }}
    >
      <img
        src={neilPatel}
        style={{
          width: '50%',
          maxWidth: '200px',
          position: 'absolute',
          zIndex: 10,
          minWidth: '160px',
          left: '-30px',
        }}
        alt='neil patel'
      />

      <img
        src={lifetimeArrow}
        style={{
          width: '60px',
          height: '90px',
          position: 'absolute',
          left: 'calc(50% + 90px)',
          bottom: '-60px',
          zIndex: 100,
          transform: 'rotate(25deg)',
        }}
        alt='arrow'
      />

      <Box
        mt={18.75}
        p='30px 20px'
        position='relative'
        zIndex={20}
        sx={{ backgroundColor: theme.palette.common.white }}
      >
        <Typography paragraph variant='text10' mb={0} letterSpacing={1} color={theme.palette.common.darkGray[50]}>
          {t('special_offer')}
        </Typography>

        <Typography paragraph color={theme.palette.primary.main} variant='text24Medium' m='10px 0 0 0'>
          {t('hate_subscription')}
        </Typography>

        {countDown > 0 && (
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            position='absolute'
            top='-56px'
            right='0'
            height='56px'
            sx={{ backgroundColor: theme.palette.common.darkGray[70] }}
          >
            {timeLeftDetails.map((timeLeft, index) => (
              <Stack
                key={`time-left-${index}`}
                direction='column'
                justifyContent='space-between'
                alignItems='center'
                sx={{
                  '&:nth-child(2n)': { padding: '0' },
                  '&:nth-child(2n+1)': { padding: '0 10px' },
                  '&:first-of-type': { padding: '0 13px 0 10px' },
                }}
              >
                <Typography color={theme.palette.common.white} variant='text24Medium' lineHeight='1'>
                  {timeLeft.time}
                </Typography>

                <Typography
                  color={index === 1 || index === 3 ? theme.palette.common.darkGray.main : theme.palette.common.white}
                  variant='text11Light'
                  lineHeight='1'
                >
                  {timeLeft.unit}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}

        <Typography
          paragraph
          m='20px 0 0'
          variant='text14Light'
          color={theme.palette.common.darkGray[70]}
          lineHeight='1.7'
          sx={{
            '& b': {
              fontSize: '18px',
              color: theme.palette.common.darkGray.main,
              fontFamily: fonts.primary.medium,
              fontWeight: 'normal',
            },
          }}
          dangerouslySetInnerHTML={{
            __html: t('hate_subscription_description'),
          }}
        />
      </Box>
    </Box>
  )
}

export const MobilePricingSection = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const { reportUsed, reportLimit } = useSelector(userDailyReportLimitSelector)
  const currentTier = useSelector(userTierSelector)
  const lifetimeOfferTimeLeft = useSelector(userLifetimeOfferTimeLeft)

  const [countDown, setCountDown] = useState<number>(lifetimeOfferTimeLeft)
  const [planInterval, setPlanInterval] = useState<IPlanInterval>(PLAN_INTERVALS.MONTHLY)

  const allTiers = [TIERS.TIER1, TIERS.TIER2, TIERS.TIER3]
  const tierDetails = {
    [TIERS.TIER1]: {
      tier: TIERS.TIER1,
      title: t('plans_individual'),
      description: t('for_individuals'),
      listItems: [
        {
          name: t('reports_per_day'),
          value:
            currentTier === TIERS.TIER1 ? (
              <Typography
                variant='text14'
                sx={{ '& b': { color: theme.palette.common.darkGray.main, fontFamily: fonts.primary.medium } }}
                dangerouslySetInnerHTML={{
                  __html: t('reports_per_day_counter', { 0: reportUsed, 1: reportLimit }),
                }}
              />
            ) : (
              150
            ),
        },
        { name: t('projects'), value: 1 },
        { name: t('extension_search_limits'), value: 150 },
        { name: t('tracked_keywords'), value: t('kw_per_project', { 0: formatNumber(125) }) },
        { name: t('reports_per_day'), value: formatNumber(1000) },
      ],
    },
    [TIERS.TIER2]: {
      tier: TIERS.TIER2,
      title: t('plans_business'),
      description: t('for_businesses'),
      listItems: [
        {
          name: t('reports_per_day'),
          value:
            currentTier === TIERS.TIER1 ? (
              <Typography
                variant='text14'
                sx={{ '& b': { color: theme.palette.common.darkGray.main, fontFamily: fonts.primary.medium } }}
                dangerouslySetInnerHTML={{
                  __html: t('reports_per_day_counter', { 0: reportUsed, 1: reportLimit }),
                }}
              />
            ) : (
              300
            ),
        },
        { name: t('projects'), value: 7 },
        { name: t('extension_search_limits'), value: 300 },
        { name: t('tracked_keywords'), value: t('kw_per_project', { 0: formatNumber(150) }) },
        { name: t('reports_per_day'), value: formatNumber(5000) },
      ],
    },
    [TIERS.TIER3]: {
      tier: TIERS.TIER3,
      title: t('plans_enterprise'),
      description: t('for_enterprise'),
      listItems: [
        {
          name: t('reports_per_day'),
          value:
            currentTier === TIERS.TIER1 ? (
              <Typography
                variant='text14'
                sx={{ '& b': { color: theme.palette.common.darkGray.main, fontFamily: fonts.primary.medium } }}
                dangerouslySetInnerHTML={{
                  __html: t('reports_per_day_counter', { 0: reportUsed, 1: reportLimit }),
                }}
              />
            ) : (
              900
            ),
        },
        { name: t('projects'), value: 15 },
        { name: t('extension_search_limits'), value: 900 },
        { name: t('tracked_keywords'), value: t('kw_per_project', { 0: formatNumber(300) }) },
        { name: t('reports_per_day'), value: formatNumber(10000) },
      ],
    },
  }
  let timerInterval: NodeJS.Timeout | string | number

  useEffect(() => {
    timerInterval = setInterval(() => {
      setCountDown((time) => Math.max(time - 1000, 0))
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [])

  const handleChange = (event: React.MouseEvent<HTMLElement>, newInterval: IPlanInterval) => {
    if (newInterval !== null) {
      setPlanInterval(newInterval)
    }
  }

  return (
    <Stack
      px='10px'
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: theme.palette.common.white }}
    >
      <Typography
        mt={5}
        variant='text28Medium'
        fontSize='1.8em'
        lineHeight='1'
        textAlign='center'
        color={theme.palette.common.darkGray.main}
        sx={{
          '& b': {
            color: theme.palette.primary.main,
            fontWeight: 'normal',
            fontSize: '1.8em',
          },
        }}
        dangerouslySetInnerHTML={{
          __html: t('pricing_modal_title'),
        }}
      ></Typography>

      <Divider sx={{ borderColor: theme.palette.primary.main, mt: '20px', width: '33px' }} />

      <Typography m='20px 0 20px 0' variant='text18Light' textAlign='center'>
        {t('pick_a_plan_and')}
      </Typography>

      <Typography
        variant='text25Medium'
        textAlign='center'
        color={theme.palette.common.darkGray.main}
        lineHeight='normal'
        mb='30px'
        sx={{
          whiteSpace: 'pre-wrap',
          '& b': {
            color: theme.palette.primary.main,
            fontWeight: 'normal',
          },
        }}
        dangerouslySetInnerHTML={{
          __html: t('grow_your_seo'),
        }}
      />

      <SubscriptionDescription countDown={countDown} />

      <ToggleButtonGroup
        value={planInterval}
        onChange={handleChange}
        color='primary'
        sx={{ m: '40px 0 10px 0' }}
        exclusive={true}
      >
        {[PLAN_INTERVALS.MONTHLY, PLAN_INTERVALS.LIFETIME].map((planInterval, key) => (
          <ToggleButton
            key={`toggle-btn-${planInterval}`}
            value={planInterval}
            sx={{
              height: '50px',
              p: '19px 24px',
              width: '140px',
              color: theme.palette.common.darkGray.main,
              backgroundColor: 'transparent',
              borderColor: theme.palette.common.lightGray.main,
              '&.Mui-selected, &.Mui-selected:hover': {
                color: theme.palette.common.white,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <Typography textTransform='capitalize' variant='text16'>
              {planInterval === PLAN_INTERVALS.MONTHLY ? t('monthly') : t('toggle_button_lifetime')}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Stack direction='row' m='10px 0 30px'>
        {[70, 90].map((value, index) => (
          <Typography
            key={`value-${index}`}
            paragraph
            width='140px'
            textAlign='center'
            color={theme.palette.primary.main}
            variant='text15Medium'
            m={0}
          >
            {t('save_percent', { 0: value })}
          </Typography>
        ))}
      </Stack>

      <Box pb='15px' width='100%'>
        {allTiers.map((tier, index) => (
          <MobilePlanPricingCard
            key={`tier-${index}`}
            {...tierDetails[tier as keyof typeof tierDetails]}
            planInterval={planInterval}
          />
        ))}
      </Box>
    </Stack>
  )
}
