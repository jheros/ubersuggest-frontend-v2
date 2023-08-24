import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, Stack, useTheme } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import adobe from 'assets/svg/pricing/adobe.png'
import dell from 'assets/svg/pricing/dell.png'
import ebay from 'assets/svg/pricing/ebay.png'
import microsoft from 'assets/svg/pricing/microsoft.png'
import nike from 'assets/svg/pricing/nike.png'
import seoTools from 'assets/svg/pricing/seo-tools.png'
import twitter from 'assets/svg/pricing/twitter.png'
import { useMediaHelper } from 'hooks'
import { userTrialDaysSelector } from 'store/reducers/user'

export const AllInOneSolutionSection = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { isDesktop } = useMediaHelper()

  const trialDays = useSelector(userTrialDaysSelector)

  const companies = [nike, twitter, microsoft, dell, adobe, ebay]

  return (
    <>
      <Stack direction='column' alignItems='center' px='5vw' sx={{ backgroundColor: theme.palette.common.neutral['10'] }}>
        <Typography
          paragraph
          textAlign='center'
          m={isDesktop ? '77px 0 17px' : '70px 0 15px'}
          variant={isDesktop ? 'text40Medium' : 'text25Medium'}
          bold={theme.palette.primary.main}
          color={theme.palette.common.neutral.main}
          sx={{ '& b': { fontSize: '40px' }, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{
            __html: t('save_90_percent'),
          }}
        ></Typography>

        <Typography
          lineHeight='1.5rem'
          variant={isDesktop ? 'text20Light' : 'text15Light'}
          color={theme.palette.common.neutral['70']}
        >
          {t('plus_get_free_trial', { 0: trialDays })}
        </Typography>

        <Stack
          direction={isDesktop ? 'row' : 'column'}
          m={isDesktop ? '20px 0 54px' : '10px 0 20px'}
          justifyContent={isDesktop ? 'space-between' : 'center'}
          alignItems='center'
        >
          <Box maxWidth='540px' sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            <Typography
              paragraph
              variant={isDesktop ? 'text24Medium' : 'text20Medium'}
              m='38px 0 0'
              pl={isDesktop ? '40px' : '20px'}
              lineHeight='1.4em'
              color={theme.palette.common.neutral.main}
            >
              {t('train_support_save')}
            </Typography>

            <Typography
              paragraph
              variant={isDesktop ? 'text16Light' : 'text15Light'}
              m={isDesktop ? '17px 0 22px 0' : '17px 0 40px 0'}
              pl={isDesktop ? '40px' : '20px'}
              lineHeight='1.6em'
              color={theme.palette.common.neutral['70']}
            >
              {t('save_courses')}
            </Typography>

            <Typography
              paragraph
              pl={isDesktop ? '40px' : '20px'}
              variant='text24Medium'
              lineHeight='1.4em'
              color={theme.palette.common.neutral.main}
            >
              {t('seo_tools_save')}
            </Typography>

            <Typography
              paragraph
              m='0'
              pl={isDesktop ? '40px' : '20px'}
              pb={isDesktop ? '22px' : '25px'}
              variant={isDesktop ? 'text16Light' : 'text15Light'}
              lineHeight='1.4em'
              color={theme.palette.common.neutral['70']}
            >
              {t('other_plans')}
            </Typography>
          </Box>

          <Box width='100%' maxWidth='679px' textAlign='center'>
            <img src={seoTools} style={{ width: '100%' }} alt='seo-tools' />

            <Typography
              paragraph
              m='24px 0 0'
              lineHeight='1.5em'
              color={theme.palette.common.darkGray[70]}
              variant={isDesktop ? 'text18' : 'text15'}
            >
              {t('comparable_tools')}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Box textAlign='center' width='100%' sx={{ backgroundColor: theme.palette.common.white }} p='56px'>
        <Typography
          color={theme.palette.common.neutral.main}
          paragraph
          m='0 0 40px 0'
          variant={isDesktop ? 'text24Medium' : 'text20Medium'}
          lineHeight='34px'
          dangerouslySetInnerHTML={{
            __html: t('over_fifty_users'),
          }}
        ></Typography>

        <Stack
          mx={isDesktop ? '63px' : '0'}
          py={isDesktop ? '0' : '15px'}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          flexWrap='wrap'
        >
          {companies.map((company, index) => (
            <img
              src={company}
              key={`company-${index}`}
              alt={`company-${index}`}
              style={{ margin: isDesktop ? '0 3%' : '20px 10px', height: 'auto' }}
            />
          ))}
        </Stack>
      </Box>
    </>
  )
}
