import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Accordion, AccordionDetails, AccordionSummary, Box, Link, Stack, useTheme } from '@mui/material'
import { Typography, fonts } from '@ubersuggest/common-ui'
import { CheckoutButton } from 'components'
import { IPlanInterval, ITier, PLAN_PRICE_BY_INTERVAL } from 'configs'
import { useFormatNumber } from 'hooks/useFormatNumber'
import { IRootState } from 'store'
import { planByTierAndIntervalSelector } from 'store/reducers/plan'

interface IlistItem {
  name: string
  value: string | number | React.ReactNode
}

export const MobilePlanPricingCard: React.FC<{
  tier: ITier
  title: String
  description: String
  listItems: IlistItem[]
  planInterval: IPlanInterval
}> = ({ tier, title, description, listItems, planInterval }) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const theme = useTheme()
  const { t } = useTranslation()
  const { formatCurrency } = useFormatNumber()
  const { planPrice } = useSelector((state: IRootState) => planByTierAndIntervalSelector(state, tier, planInterval))

  const currencyAtSymbol = t('currency_at_symbol', {
    0: formatCurrency(planPrice),
    1: '', // * from v1: As we are determined to hide currency code, put empty string instead of `currency` variable.
  })

  const planPriceContent = t(PLAN_PRICE_BY_INTERVAL[planInterval], {
    0: currencyAtSymbol,
  })

  return (
    <>
      <Accordion
        disableGutters
        expanded={expanded}
        onChange={() => {}}
        sx={{ my: '10px', p: '8px 20px', boxShadow: 'none', border: `1px solid ${theme.palette.common.lightGray[50]}` }}
      >
        <AccordionSummary sx={{ p: '0', m: '0', cursor: 'default !important' }}>
          <Box width='100%'>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ cursor: 'pointer' }}
              onClick={() => setExpanded(!expanded)}
            >
              <Typography paragraph variant='text30Medium' color={theme.palette.primary.main}>
                {title}
              </Typography>

              <Typography
                paragraph
                sx={{
                  width: '7px',
                  height: '7px',
                  border: '0',
                  padding: '0',
                  marginLeft: '5px',
                  backgroundColor: 'transparent',
                  borderLeft: `1px solid ${theme.palette.primary.main}`,
                  borderBottom: `1px solid ${theme.palette.primary.main}`,
                  transform: expanded ? 'translate(6px, 1px) rotate(135deg)' : 'translate(6px, -3px) rotate(-45deg)',
                }}
              />
            </Stack>

            <Typography paragraph variant='text15Light' color={theme.palette.common.darkGray[70]} mb='10px'>
              {description}
            </Typography>

            <CheckoutButton
              planInterval={planInterval}
              tier={tier}
              variant='contained'
              color='secondary'
              size='large'
              textVariant='text14'
              fullWidth
            />

            <Typography
              paragraph
              m='20px 0'
              variant='text20'
              color={theme.palette.common.darkGray.main}
              sx={{
                whiteSpace: 'pre-wrap',
                '& b': {
                  fontFamily: fonts.primary.medium,
                  fontWeight: 'normal',
                  fontSize: '20px',
                  color: theme.palette.common.darkGray.main,
                },
              }}
              dangerouslySetInnerHTML={{
                __html: planPriceContent,
              }}
            />

            {!expanded && (
              <Box sx={{ cursor: 'pointer !important' }} onClick={() => setExpanded(true)}>
                <Typography
                  sx={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    border: '0',
                    padding: '0',
                    marginLeft: '-10px',
                    marginRight: '10px',
                    backgroundColor: 'transparent',
                    borderLeft: `1px solid ${theme.palette.primary.main}`,
                    borderTop: `1px solid ${theme.palette.primary.main}`,
                    transform: 'translate(5px, -2px) rotate(135deg)',
                  }}
                />

                <Link>
                  <Typography variant='text16Medium' color={theme.palette.primary.main}>
                    {t('see_details')}
                  </Typography>
                </Link>
              </Box>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: '0', pb: '10px' }}>
          {listItems.map((item, index) => (
            <Stack
              sx={{ '&:first-of-type': { mt: '-12px' } }}
              key={`listItem-${index}`}
              mt='20px'
              direction='row'
              justifyContent='space-between'
            >
              <Typography color={theme.palette.common.darkGray[50]} variant='text16Light'>
                {item.name}
              </Typography>
              <Typography color={theme.palette.common.darkGray.main} variant='text16Medium'>
                {item.value}
              </Typography>
            </Stack>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  )
}
