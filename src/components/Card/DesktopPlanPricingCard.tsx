import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, Divider, Link, Stack, SvgIcon, useTheme } from '@mui/material'
import { Typography, fonts } from '@ubersuggest/common-ui'
import { ReactComponent as ArrowRightIcon } from 'assets/svg/icons/arrow-right-transparent.svg'
import { ReactComponent as CheckBlueIcon } from 'assets/svg/icons/check-light-blue.svg'
import { ReactComponent as CheckIcon } from 'assets/svg/icons/check-light.svg'
import neilPhoto from 'assets/svg/pricing/neil-photo.png'
import { CheckoutButton } from 'components'
import { IPlanInterval, ITier, PLAN_INTERVALS, PLAN_PRICE_BY_INTERVAL, TIERS } from 'configs'
import { useFormatNumber } from 'hooks/useFormatNumber'
import { IRootState } from 'store'
import { planByTierAndIntervalSelector } from 'store/reducers/plan'
import { getLanguageCode } from 'utils/translation'

const BestValueBadge = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  const languageCode = getLanguageCode()

  return (
    <Box
      position='absolute'
      top='22px'
      right='-37px'
      width='167px'
      height='40px'
      sx={{
        boxShadow: 4,
        backgroundColor: theme.palette.common.white,
        transform: 'rotate(43deg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Typography
        variant={
          languageCode === 'es' || languageCode === 'fr' || languageCode === 'pt' || languageCode === 'de'
            ? 'text12Medium'
            : 'text16Medium'
        }
        color={theme.palette.secondary.main}
        maxWidth='70%'
      >
        {t('best_value')}
      </Typography>
    </Box>
  )
}

const PlanBenefitLi = ({ benefit, isIndividual }: { benefit: string; isIndividual: boolean }) => {
  const theme = useTheme()

  return (
    <Stack direction='row' justifyContent='flex-start' mb={0.5} spacing={1}>
      <SvgIcon
        component={!isIndividual ? CheckIcon : CheckBlueIcon}
        sx={{
          fontSize: '24px',
        }}
      />

      <Typography variant='text16' sx={{ lineHeight: '26px', color: theme.palette.common.neutral['50'] }}>
        {benefit}
      </Typography>
    </Stack>
  )
}

export const DesktopPlanPricingCard: React.FC<{
  tier: ITier
  title: string
  websitesLimit: string
  listItems: Array<string>
  planInterval: IPlanInterval
}> = ({ tier, title, websitesLimit, listItems, planInterval }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { formatCurrency } = useFormatNumber()
  const { planPrice } = useSelector((state: IRootState) => planByTierAndIntervalSelector(state, tier, planInterval))

  const currencyAtSymbol = t('currency_at_symbol', {
    0: formatCurrency(planPrice),
    1: '', // * from v1: As we are determined to hide currency code, put empty string instead of `currency` variable.
  })
  const planPriceContent = t(PLAN_PRICE_BY_INTERVAL[planInterval], {
    0: currencyAtSymbol,
  })
  const isIndividual = tier === TIERS.TIER1
  const isEnterprise = tier === TIERS.TIER3
  const color = !isIndividual ? theme.palette.common.orange.main : theme.palette.common.blue.main

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: isIndividual ? 'hidden' : '',
        backgroundColor: theme.palette.common.white,
        flex: 1 / 3,
        boxShadow: isIndividual ? 4 : 0,
        maxWidth: '380px',
      }}
      mx='10px'
    >
      {isIndividual && <BestValueBadge />}
      {isEnterprise && (
        <img
          src={neilPhoto}
          style={{
            position: 'absolute',
            left: '-22px',
            top: '-207px',
            maxWidth: '340px',
            padding: 0,
          }}
          alt='neil-photo'
        />
      )}

      <Box height={!isIndividual ? 16 : 24} sx={{ backgroundColor: color }} />

      <Stack direction='column' alignItems='center' p={!isIndividual ? '32px 32px 24px' : '32px'}>
        <Typography variant='text32Medium' color={color} mb={1}>
          {title}
        </Typography>

        <Typography variant='text16'>{websitesLimit}</Typography>

        <Typography
          variant={!isIndividual ? 'text20Light' : 'text24Light'}
          sx={{
            width: '100%',
            color: theme.palette.common.neutral['50'],
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& span': {
              marginLeft: '1px',
            },
            '& > b': {
              width: '100%',
              fontFamily: fonts.primary.medium,
              fontSize: !isIndividual ? '40px' : '48px',
              fontWeight: 'bold',
              lineHeight: !isIndividual ? '48px' : '56px',
              marginBottom: !isIndividual ? '0' : '4px',
              color: theme.palette.common.neutral.main,
              textAlign: 'center',
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
                fontWeight: 'bold',
                color: theme.palette.common.neutral.main,
              },
            },
          }}
          mt={4}
          dangerouslySetInnerHTML={{
            __html: planPriceContent,
          }}
        />
      </Stack>

      <Divider sx={{ borderColor: theme.palette.common.neutral['10'] }} />

      <Stack direction='column' justifyContent='flex-start' p={4}>
        {listItems.map((item, index) => (
          <PlanBenefitLi key={`plan-benefit-li-${index}`} benefit={item} isIndividual={isIndividual} />
        ))}

        <Link underline='hover' href='#compare-plans' color={theme.palette.common.neutral['50']} m='15px 0 28px'>
          {t('see_more')}
        </Link>

        <CheckoutButton
          planInterval={planInterval}
          tier={tier}
          size='xxlarge'
          variant='contained'
          color={tier === TIERS.TIER1 ? 'secondary' : 'primary'}
          fullWidth
          icon={ArrowRightIcon}
        />
      </Stack>
    </Box>
  )
}
