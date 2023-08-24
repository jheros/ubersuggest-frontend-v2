import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import {
  Box,
  Collapse,
  Link,
  List,
  ListItem,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableRow,
  Tooltip,
  useTheme,
} from '@mui/material'
import { Typography, fonts } from '@ubersuggest/common-ui'
import checkIcon from 'assets/svg/icons/check-orange.svg'
import crossIcon from 'assets/svg/icons/cross.svg'
import { ReactComponent as InfoIcon } from 'assets/svg/icons/info-gray.svg'
import { ReactComponent as QuestionIcon } from 'assets/svg/icons/question-clear.svg'
import arrow from 'assets/svg/pricing/arrow.svg'
import bgBestValue from 'assets/svg/pricing/bg-best-value.svg'
import { CheckoutButton } from 'components'
import { IPlanInterval, ITier, PLAN_INTERVALS, PLAN_PRICE_BY_INTERVAL, TIERS } from 'configs'
import { useFormatNumber } from 'hooks/useFormatNumber'
import { IRootState } from 'store'
import { isSignedInSelector } from 'store/reducers/auth'
import { planByTierAndIntervalSelector } from 'store/reducers/plan'
import { userDailyReportLimitSelector, userTierSelector } from 'store/reducers/user'
import { getLanguageCode } from 'utils/translation'

interface ICell extends TableCellProps {
  children?: React.ReactNode
  noPadding?: boolean
  noBorderBottom?: boolean
  noBorder?: boolean
  sx?: any
}

const Cell = ({ children, noPadding, noBorderBottom, noBorder, sx, ...tableCellProps }: ICell) => {
  const theme = useTheme()

  return (
    <TableCell
      {...tableCellProps}
      sx={{
        width: '25%',
        padding: noPadding ? '0' : '24px 10px',
        boxSizing: 'border-box',
        borderBottom: noBorderBottom ? 'none' : `1px solid ${theme.palette.common.neutral['20']}`,
        borderTop: 'none',
        textAlign: 'center',
        verticalAlign: 'top',
        '&:first-child': {
          textAlign: 'left',
          paddingLeft: 0,
          borderLeft: 'none',
        },
        '&:nth-child(1n+2)': {
          borderRight: noBorder ? 'none' : `1px solid ${theme.palette.common.neutral['20']}`,
          background: theme.palette.common.white,
        },
        '&:last-child': {
          borderRight: 'none',
        },
        ...sx,
      }}
    >
      {children}
    </TableCell>
  )
}

const PopularBadge = () => {
  const languageCode = getLanguageCode()
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      width='200px'
      height='30px'
      position='absolute'
      top='-55px'
      left='50%'
      sx={{ transform: 'translateX(-50%)', background: `url(${bgBestValue}) no-repeat`, backgroundSize: 'cover' }}
    >
      <Typography
        variant={
          languageCode === 'es' || languageCode === 'fr' || languageCode === 'pt' || languageCode === 'de'
            ? 'text12Medium'
            : 'text16Medium'
        }
        color={theme.palette.common.white}
        lineHeight='1.1em'
        maxWidth='70%'
      >
        {' '}
        {t('best_value')}
      </Typography>
    </Stack>
  )
}

interface ITierOption {
  title: string
  tier: ITier
  websiteNumber: string
  planInterval: IPlanInterval
}

const TierOption = ({ planInterval, title, websiteNumber, tier }: ITierOption) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { formatCurrency } = useFormatNumber()

  const { planPrice } = useSelector((state: IRootState) => planByTierAndIntervalSelector(state, tier, planInterval))
  const isSignedIn = useSelector(isSignedInSelector)

  const isIndividual = title === t('individual')
  const currencyAtSymbol = t('currency_at_symbol', {
    0: formatCurrency(planPrice),
    1: '', // * from v1: As we are determined to hide currency code, put empty string instead of `currency` variable.
  })
  const planPriceContent = t(PLAN_PRICE_BY_INTERVAL[planInterval], {
    0: currencyAtSymbol,
  })

  return (
    <Cell sx={{ padding: '40px 32px' }}>
      <Stack
        direction='column'
        height='auto'
        position='relative'
        alignItems='center'
        justifyContent='start'
        width='100%'
      >
        {isIndividual && <PopularBadge />}
        <Typography
          variant='text24Medium'
          lineHeight='32px'
          color={!isIndividual ? theme.palette.primary.main : theme.palette.secondary.main}
        >
          {title}
        </Typography>

        <Box
          color={theme.palette.common.gray.dark}
          sx={{
            display: 'flex',
            fontSize: '24px',
            fontFamily: fonts.primary.light,
            m: '12px 0 0',
            lineHeight: '36px',
            '& b': {
              color: theme.palette.common.gray.dark,
              fontFamily: fonts.primary.medium,
              fontWeight: 'normal',
              marginRight: '5px',
            },
            '& span': {
              fontFamily: fonts.primary.light,
              fontSize: '18px',
              lineHeight: '36px',
              display: 'flex',
              marginLeft: '5px',
            },
            '& small': {
              fontSize: '14px',
              lineHeight: '18px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: '5px',
              textAlign: 'left',
              fontFamily: fonts.primary.regular,
              color: theme.palette.common.neutral['50'],
              '& > b': {
                fontFamily: fonts.primary.medium,
                fontWeight: 'normal',
                color: theme.palette.common.neutral.main,
              },
            },
          }}
          dangerouslySetInnerHTML={{
            __html: planPriceContent,
          }}
        />

        <Typography variant='text14' lineHeight='20px' color={theme.palette.common.neutral['50']} mt='12px'>
          {websiteNumber}
        </Typography>

        <Box mt='20px' width='100%'>
          {!isSignedIn && planInterval == PLAN_INTERVALS.MONTHLY && (
            <Stack direction='row' alignItems='flex-start' justifyContent='center' pb='10px'>
              <Typography paragraph color={theme.palette.common.darkGray.main} height='30px' variant='text14' m='0'>
                {t('get_a_7_day_free_trial')}
              </Typography>

              <img style={{ marginLeft: 5, marginTop: 3 }} src={arrow} />
            </Stack>
          )}

          {!isSignedIn && planInterval == PLAN_INTERVALS.LIFETIME && (
            <Stack direction='row' alignItems='flex-start' justifyContent='center' pb='10px'>
              <Typography paragraph color={theme.palette.common.darkGray.main} height='30px' variant='text14' m='0'>
                {t('money_guarantee')}
              </Typography>

              <img style={{ marginLeft: 5, marginTop: 3 }} src={arrow} />
            </Stack>
          )}

          <CheckoutButton
            planInterval={planInterval}
            tier={tier}
            size='xlarge'
            variant='contained'
            color={tier === TIERS.TIER1 ? 'secondary' : 'primary'}
            fullWidth
          />
        </Box>
      </Stack>
    </Cell>
  )
}

const Row = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <TableRow
      id={id}
      sx={{
        scrollMarginTop: '64px',
        width: '100%',
        '&:first-child': {
          '& td:nth-child(2)': {
            boxShadow: '-5px -5px 10px 5px #eeeeee66',
          },
          '& td:nth-child(1n+3)': {
            boxShadow: '7px -5px 10px 5px #eeeeee66',
          },
          '& td:last-child': {
            boxShadow: '7px -5px 10px 5px #eeeeee66',
          },
        },
        '&:nth-child(1n+2)': {
          '& td:nth-child(2)': {
            boxShadow: '-5px 10px 10px 5px #eeeeee66',
          },
          '& td:last-child': {
            boxShadow: '5px 10px 10px 5px #eeeeee66',
          },
        },
        '&:last-child': {
          '& td:nth-child(2)': {
            boxShadow: '-5px 10px 10px 5px #eeeeee66',
          },
          '& td:nth-child(1n+3)': {
            boxShadow: '10px 10px 10px 5px #eeeeee66',
          },
          '& td:last-child': {
            boxShadow: '5px 10px 10px 5px #eeeeee66',
          },
        },
      }}
    >
      {children}
    </TableRow>
  )
}

const SecondaryUl = ({ children }: { children: React.ReactNode }) => {
  return <List style={{ padding: '0', margin: '0' }}>{children}</List>
}

interface IItemLiText {
  children: React.ReactNode
  bold?: boolean
  color?: string
  sx?: any
}

const ItemLiText = ({ color, bold, children, sx }: IItemLiText) => {
  const theme = useTheme()
  return (
    <Typography
      color={color ? color : theme.palette.common.darkGray[70]}
      sx={{
        fontFamily: bold ? fonts.primary.medium : 'inherit',
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}

const ItemLi = ({ collapse, children }: { collapse?: boolean; children: React.ReactNode }) => {
  const theme = useTheme()
  return (
    <ListItem
      sx={{
        padding: 0,
        alignItems: collapse ? 'flex-start' : 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        listStyleType: 'none',
        textDecoration: 'none',
        fontSize: '16px',
        lineHeight: '20px',
        height: '44px',
        fontWeight: 'normal',
        color: theme.palette.common.darkGray[70],
      }}
    >
      {children}
    </ListItem>
  )
}

interface ITitleLi {
  children: React.ReactNode
  hidden?: boolean
  expanded?: boolean
  sx?: any
  onClick?: () => void
}

const TitleLi = ({ children, hidden, expanded, sx, onClick }: ITitleLi) => {
  const theme = useTheme()
  return (
    <List
      sx={{
        listStyleType: 'none',
        color: theme.palette.common.gray.dark,
        fontFamily: fonts.primary.medium,
        fontSize: '16px',
        lineHeight: '26px',
        minHeight: '26px',
        cursor: onClick ? 'pointer' : 'inherit',
        visibility: hidden ? 'hidden' : 'visible',
        '& ul': {
          display: expanded ? 'block' : 'none',
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </List>
  )
}

const featuresExpandedStatus = {
  left_new_feature: false,
  reports_per_day: false,
  projects: false,
  extension_search_limits: false,
  rank_tracking: false,
  site_audit: false,
  keyword_research: false,
  competitive_analysis: false,
  backlinks: false,
  add_ons: false,
}

type IFeaturesExpandedKey = keyof typeof featuresExpandedStatus

export const PlanDetailsSection: React.FC<{ planInterval: IPlanInterval }> = ({ planInterval }) => {
  const [featuresExpanded, setFeaturesExpanded] = useState({
    ...featuresExpandedStatus,
  })

  const { t } = useTranslation()
  const theme = useTheme()
  const { formatNumber } = useFormatNumber()

  const { reportUsed, reportLimit } = useSelector(userDailyReportLimitSelector)

  const tierOptions = [
    {
      tier: TIERS.TIER2,
      title: t('plans_business'),
      websiteNumber: t('managing_7'),
    },
    {
      tier: TIERS.TIER1,
      title: t('individual'),
      websiteNumber: t('managing_1'),
    },
    {
      tier: TIERS.TIER3,
      title: t('plans_enterprise'),
      websiteNumber: t('managing_8_plus'),
    },
  ]

  const userTier = useSelector(userTierSelector)

  const features = [
    {
      id: 'left_new_feature',
      name: t('left_new_feature'),
      tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
      tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
      tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
      subsections: [
        {
          name: t('new_feature_course'),
          description: t('new_feature_course_descrip'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
        {
          name: t('new_feature_templates'),
          description: t('new_feature_templates_descrip'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
        {
          name: t('new_feature_call'),
          description: t('new_feature_call_descrip'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
        {
          name: t('new_feature_support'),
          description: t('new_feature_support_descrip'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
      ],
    },
    {
      id: 'reports_per_day',
      name: t('reports_per_day'),
      free: 0,
      tier1:
        userTier === 'tier1' ? (
          <Typography
            fontSize='18px'
            lineHeight='20px'
            boldColor={theme.palette.common.darkGray.main}
            textAlign='center'
            dangerouslySetInnerHTML={{
              __html: t('reports_per_day_counter', { 0: reportUsed, 1: reportLimit }),
            }}
          />
        ) : (
          150
        ),
      tier2:
        userTier === 'tier2' ? (
          <Typography
            fontSize='18px'
            lineHeight='20px'
            boldColor={theme.palette.common.darkGray.main}
            textAlign='center'
            dangerouslySetInnerHTML={{
              __html: t('reports_per_day_counter', { 0: reportUsed, 1: reportLimit }),
            }}
          />
        ) : (
          300
        ),
      tier3:
        userTier === 'tier3' ? (
          <Typography
            fontSize='18px'
            lineHeight='20px'
            boldColor={theme.palette.common.darkGray.main}
            textAlign='center'
            dangerouslySetInnerHTML={{
              __html: t('reports_per_day_counter', { 0: reportUsed, 1: reportLimit }),
            }}
          />
        ) : (
          900
        ),
    },
    {
      id: 'projects',
      name: t('projects'),
      free: 1,
      tier1: 1,
      tier2: 7,
      tier3: 15,
    },
    {
      id: 'extension_search_limits',
      name: t('extension_search_limits'),
      tier1: formatNumber(150),
      tier2: formatNumber(300),
      tier3: formatNumber(900),
    },
    {
      id: 'rank_tracking',
      name: t('rank_tracking'),
      tier1: `${t('kw_per_project', { 0: formatNumber(125) })} / ${t('daily')}`,
      tier2: `${t('kw_per_project', { 0: formatNumber(150) })} / ${t('daily')}`,
      tier3: `${t('kw_per_project', { 0: formatNumber(300) })} / ${t('daily')}`,
      subsections: [
        {
          name: t('tracked_keywords'),
          description: t('tracked_keywords_description'),
          free: 25,
          tier1: t('kw_per_project', { 0: formatNumber(125) }),
          tier2: t('kw_per_project', { 0: formatNumber(150) }),
          tier3: t('kw_per_project', { 0: formatNumber(300) }),
        },
        {
          name: t('update_frequency'),
          description: t('update_frequency_description'),
          free: t('weekly'),
          tier1: t('daily'),
          tier2: t('daily'),
          tier3: t('daily'),
        },
        {
          name: t('mobile_rank_tracking'),
          description: t('mobile_rank_tracking_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
        {
          name: t('number_of_locations'),
          description: t('number_of_locations_description'),
          free: t('up_to_n', { 0: 20 }),
          tier1: 20,
          tier2: t('unlimited'),
          tier3: t('unlimited'),
        },
        {
          name: t('data_reporting'),
          description: t('data_reporting_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
      ],
    },
    {
      id: 'site_audit',
      name: t('site_audit'),
      tier1: `${formatNumber(1000)} ${t('pages_column').toLowerCase()} / ${t('weekly')}`,
      tier2: `${formatNumber(5000)} ${t('pages_column').toLowerCase()} / ${t('weekly')}`,
      tier3: `${formatNumber(10000)} ${t('pages_column').toLowerCase()} / ${t('weekly')}`,
      subsections: [
        {
          name: t('page_crawled_per_report'),
          description: t('page_crawled_per_report_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: formatNumber(1000),
          tier2: formatNumber(5000),
          tier3: formatNumber(10000),
        },
        {
          name: t('crawling_frequency'),
          description: t('crawling_frequency_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: t('weekly'),
          tier2: t('weekly'),
          tier3: t('weekly'),
        },
      ],
    },
    {
      id: 'keyword_research',
      name: t('keyword_research'),
      tier1: `${formatNumber(20000)} ${t('suggestions').toLowerCase()} / ${t('month_value')}`,
      tier2: `${formatNumber(50000)} ${t('suggestions').toLowerCase()} / ${t('month_value')}`,
      tier3: `${formatNumber(100000)} ${t('suggestions').toLowerCase()} / ${t('month_value')}`,
      subsections: [
        {
          name: t('historical_data'),
          description: t('keyword_historical_data_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
        {
          name: t('keyword_suggestions'),
          description: t('keyword_suggestions_description'),
          free: 100,
          tier1: formatNumber(20000),
          tier2: formatNumber(50000),
          tier3: formatNumber(100000),
        },
        {
          name: t('content_ideas'),
          description: t('keyword_content_ideas_description'),
          free: 10,
          tier1: formatNumber(2000),
          tier2: formatNumber(5000),
          tier3: formatNumber(10000),
        },
        {
          name: t('data_exporting_per_report'),
          description: t('data_exporting_per_exporting_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: t('n_rows', { 0: formatNumber(2000) }),
          tier2: t('n_rows', { 0: formatNumber(5000) }),
          tier3: t('n_rows', { 0: formatNumber(10000) }),
        },
        {
          name: t('filtering'),
          description: t('filtering_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
      ],
    },
    {
      id: 'competitive_analysis',
      name: t('competitive_analysis'),
      tier1: `${formatNumber(5)} ${t('competitors').toLowerCase()}`,
      tier2: `${formatNumber(10)} ${t('competitors').toLowerCase()}`,
      tier3: `${formatNumber(15)} ${t('competitors').toLowerCase()}`,
      subsections: [
        {
          name: t('menu_similar_websites'),
          description: t('competitor_similar_websites_description'),
          free: 5,
          tier1: 20,
          tier2: 20,
          tier3: 20,
        },
        {
          name: t('tracked_competitors'),
          description: t('competitor_tracked_competitors_description'),
          free: 3,
          tier1: 5,
          tier2: 10,
          tier3: 15,
        },
        {
          name: t('historical_data'),
          description: t('competitor_historical_data_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
        {
          name: t('top_pages'),
          description: t('competitor_top_pages_description'),
          free: 10,
          tier1: formatNumber(2000),
          tier2: formatNumber(5000),
          tier3: formatNumber(10000),
        },
        {
          name: t('top_keywords'),
          description: t('competitor_top_keywords_description'),
          free: 10,
          tier1: formatNumber(20000),
          tier2: formatNumber(50000),
          tier3: formatNumber(100000),
        },
        {
          name: t('data_exporting_per_report'),
          description: t('competitor_data_exporting_per_report_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: t('n_rows', { 0: formatNumber(2000) }),
          tier2: t('n_rows', { 0: formatNumber(5000) }),
          tier3: t('n_rows', { 0: formatNumber(10000) }),
        },
        {
          name: t('filtering'),
          description: t('filtering_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
      ],
    },
    {
      id: 'backlinks',
      name: t('backlinks'),
      tier1: `${formatNumber(2000)} ${t('for_backlinks')}`,
      tier2: `${formatNumber(5000)} ${t('for_backlinks')}`,
      tier3: `${formatNumber(10000)} ${t('for_backlinks')}`,
      subsections: [
        {
          name: t('link_history'),
          description: t('link_history_description'),
          free: t('n_months', { 0: 3 }),
          tier1: t('n_years', { 0: 3 }),
          tier2: t('n_years', { 0: 3 }),
          tier3: t('n_years', { 0: 3 }),
        },
        {
          name: t('backlinks_rows'),
          description: t('backlinks_rows_description'),
          free: 10,
          tier1: formatNumber(2000),
          tier2: formatNumber(5000),
          tier3: formatNumber(10000),
        },
        {
          name: t('new_and_lost_links'),
          description: t('new_and_lost_links_description'),
          free: t('n_days', { 0: 10 }),
          tier1: t('n_days', { 0: 30 }),
          tier2: t('n_days', { 0: 30 }),
          tier3: t('n_days', { 0: 30 }),
        },
        {
          name: t('data_exporting_per_report'),
          description: t('backlinks_data_exporting_per_report_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: t('n_rows', { 0: formatNumber(2000) }),
          tier2: t('n_rows', { 0: formatNumber(5000) }),
          tier3: t('n_rows', { 0: formatNumber(5000) }),
        },
        {
          name: t('filtering'),
          description: t('filtering_description'),
          free: <img src={crossIcon} style={{ width: '15px', height: '15px' }} alt='cross-icon' />,
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} alt='check-icon' />,
        },
      ],
    },
    {
      id: 'add_ons',
      name: (
        <Typography
          variant='text16Medium'
          lineHeight='26px'
          color={theme.palette.common.neutral.main}
          textAlign='left'
          sx={{
            '& b': {
              fontFamily: fonts.primary.medium,
              color: theme.palette.common.white,
              fontSize: '12px',
              lineHeight: '12px',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '19px',
              padding: '4px 8px',
              marginTop: '-4px',
            },
          }}
          dangerouslySetInnerHTML={{
            __html: t('add_on_new'),
          }}
        />
      ),
      tier1: (
        <>
          <SvgIcon
            component={InfoIcon}
            sx={{
              fontSize: '24px',
              mr: 1,
            }}
            inheritViewBox
          />
          <Typography
            variant='text16'
            lineHeight='26px'
            boldColor={theme.palette.common.neutral['70']}
            boldFontFamily={fonts.primary.medium}
            color={theme.palette.common.neutral['70']}
            dangerouslySetInnerHTML={{
              __html: t('choose_add_on'),
            }}
          />
        </>
      ),
      tier2: <>&nbsp;</>,
      tier3: <>&nbsp;</>,
      subsections: [
        {
          name: t('add_on_searches', { 0: formatNumber(500) }),
          description: t('add_on_searches_description'),
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
        },
        {
          name: t('add_on_domains'),
          subHeading: t('add_on_domains_subheading', { 0: formatNumber(125), 1: formatNumber(3) }),
          description: t('add_on_domains_description', { 0: formatNumber(125), 1: formatNumber(3) }),
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
        },
        {
          name: t('add_on_tracked_kw', { 0: formatNumber(250) }),
          description: t('add_on_tracked_kw_description', { 0: formatNumber(250) }),
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
        },
        {
          name: t('add_on_competitor'),
          description: t('add_on_competitor_description'),
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
        },
        {
          name: t('add_on_users'),
          description: t('add_on_users_description'),
          tier1: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
          tier2: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
          tier3: <img src={checkIcon} style={{ width: '15px', height: '15px' }} />,
        },
      ],
    },
  ]

  return (
    <Stack
      id='compare-plans'
      p='68px 25px 80px 58px'
      maxWidth='1273px'
      direction='row'
      mx='auto'
      justifyContent='center'
      alignItems='center'
      sx={{ scrollMarginTop: '64px' }}
    >
      <Table>
        <TableBody>
          <Row>
            <Cell noPadding noBorder sx={{ height: 'auto', width: '25%' }}>
              <Stack direction='column'>
                <Typography
                  variant='text28Light'
                  mb='12px'
                  lineHeight='36px'
                  color={theme.palette.common.darkGray.magenta}
                >
                  {t('pick_a_plan_and')}
                </Typography>

                <Typography
                  color={theme.palette.common.gray.dark}
                  boldColor={theme.palette.primary.main}
                  variant='text48Medium'
                  mb='14px'
                  lineHeight='56px'
                  sx={{ textTransform: 'capitalize' }}
                  dangerouslySetInnerHTML={{
                    __html: t('grow_your_seo'),
                  }}
                />

                <Typography variant='text20' mr='20px' lineHeight='30px' color={theme.palette.common.neutral['50']}>
                  {t('pricing_description')}
                </Typography>

                <Link href='#add_ons' color={theme.palette.common.neutral['50']} mb='24px'>
                  <Typography variant='text20' lineHeight='30px'>
                    {t('click_here_uppercase')}
                  </Typography>
                </Link>
              </Stack>
            </Cell>

            {tierOptions.map((tierOptionDetail, index) => (
              <TierOption planInterval={planInterval} key={`tierOption-${index}`} {...tierOptionDetail} />
            ))}
          </Row>

          {features.map((feature) => (
            <Row key={feature.id} id={feature.id}>
              <Cell noBorderBottom={feature.id === 'add_ons'}>
                <TitleLi
                  expanded={featuresExpanded[feature.id as IFeaturesExpandedKey]}
                  onClick={() => {
                    if (feature.subsections)
                      setFeaturesExpanded({
                        ...featuresExpanded,
                        [feature.id]: featuresExpanded[feature.id as IFeaturesExpandedKey] ? false : true,
                      })
                  }}
                  sx={{ position: 'relative' }}
                >
                  {feature.name}

                  {feature.subsections && (
                    <Box
                      width='17px'
                      height='24px'
                      position='absolute'
                      left='-32px'
                      top='7px'
                      sx={{
                        cursor: 'pointer',
                        '&::after': {
                          display: featuresExpanded[feature.id as IFeaturesExpandedKey] ? 'none' : 'block',
                          content: `''`,
                          height: '17px',
                          width: '1px',
                          background: theme.palette.primary.main,
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        },

                        '&::before': {
                          content: `''`,
                          height: '1px',
                          width: '17px',
                          background: featuresExpanded[feature.id as IFeaturesExpandedKey]
                            ? theme.palette.common.neutral['50']
                            : theme.palette.primary.main,
                          position: 'absolute',
                          top: '50%',
                          transform: 'translateY(-50%)',
                        },
                      }}
                    />
                  )}
                </TitleLi>

                <Collapse
                  in={feature.subsections && featuresExpanded[feature.id as IFeaturesExpandedKey]}
                  timeout='auto'
                  unmountOnExit
                >
                  <SecondaryUl>
                    {feature.subsections?.map((subsection: any) => (
                      <ItemLi key={subsection.name} collapse>
                        <ItemLiText color={theme.palette.common.neutral['70']}>
                          {subsection.name}
                          {subsection.description && (
                            <Tooltip id={`${feature.name}-${subsection.name}`} arrow title={subsection.description}>
                              <SvgIcon
                                component={QuestionIcon}
                                sx={{
                                  fontSize: '14px',
                                  ml: '15px',
                                  cursor: 'pointer',
                                  opacity: '0.5',
                                  '&:hover': { opacity: 1 },
                                }}
                                inheritViewBox
                              />
                            </Tooltip>
                          )}
                        </ItemLiText>
                        {subsection.subHeading && (
                          <Typography variant='text13' lineHeight='18px' color={theme.palette.common.neutral['70']}>
                            {subsection.subHeading}
                          </Typography>
                        )}
                      </ItemLi>
                    ))}
                  </SecondaryUl>
                </Collapse>
              </Cell>

              <Cell
                noBorder={feature.id === 'add_ons' && !featuresExpanded[feature.id as IFeaturesExpandedKey]}
                noBorderBottom={feature.id === 'add_ons'}
              >
                <TitleLi
                  hidden={featuresExpanded[feature.id as IFeaturesExpandedKey]}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {feature.tier2 || ''}
                </TitleLi>

                <Collapse
                  in={feature.subsections && featuresExpanded[feature.id as IFeaturesExpandedKey]}
                  timeout='auto'
                  unmountOnExit
                >
                  <SecondaryUl>
                    {feature.subsections?.map((subsection, index) => (
                      <ItemLi key={index}>
                        <ItemLiText
                          color={theme.palette.common.neutral.main}
                          bold
                          sx={{
                            justifyContent: 'center',
                          }}
                        >
                          {subsection.tier2}
                        </ItemLiText>
                      </ItemLi>
                    ))}
                  </SecondaryUl>
                </Collapse>
              </Cell>

              <Cell
                noBorder={feature.id === 'add_ons' && !featuresExpanded[feature.id as IFeaturesExpandedKey]}
                noBorderBottom={feature.id === 'add_ons'}
              >
                <TitleLi
                  hidden={featuresExpanded[feature.id as IFeaturesExpandedKey]}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: feature.id === 'add_ons' ? '300%' : 'auto',
                    marginLeft: feature.id === 'add_ons' ? '-100%' : 'auto',
                  }}
                >
                  {feature.tier1 || ''}
                </TitleLi>

                <Collapse
                  in={feature.subsections && featuresExpanded[feature.id as IFeaturesExpandedKey]}
                  timeout='auto'
                  unmountOnExit
                >
                  <SecondaryUl>
                    {feature.subsections?.map((subsection, index) => (
                      <ItemLi key={index}>
                        <ItemLiText
                          bold
                          color={theme.palette.common.neutral.main}
                          sx={{
                            justifyContent: 'center',
                          }}
                        >
                          {subsection.tier1}
                        </ItemLiText>
                      </ItemLi>
                    ))}
                  </SecondaryUl>
                </Collapse>
              </Cell>

              <Cell noBorderBottom={feature.id === 'add_ons'}>
                <TitleLi
                  hidden={featuresExpanded[feature.id as IFeaturesExpandedKey]}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {feature.tier3 || ''}
                </TitleLi>

                <Collapse
                  in={feature.subsections && featuresExpanded[feature.id as IFeaturesExpandedKey]}
                  timeout='auto'
                  unmountOnExit
                >
                  <SecondaryUl>
                    {feature.subsections?.map((subsection, index) => (
                      <ItemLi key={index}>
                        <ItemLiText
                          bold
                          color={theme.palette.common.neutral.main}
                          sx={{
                            justifyContent: 'center',
                          }}
                        >
                          {subsection.tier3}
                        </ItemLiText>
                      </ItemLi>
                    ))}
                  </SecondaryUl>
                </Collapse>
              </Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </Stack>
  )
}
