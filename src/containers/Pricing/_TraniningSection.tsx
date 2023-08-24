import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, Stack, useTheme } from '@mui/material'
import { Button, Typography } from '@ubersuggest/common-ui'
import courseVideos from 'assets/svg/pricing/course-videos.jpg'
import emailSupport from 'assets/svg/pricing/email-support.jpg'
import qaCalls from 'assets/svg/pricing/qa-calls.jpg'
import workSheets from 'assets/svg/pricing/worksheets-templates.jpg'
import { useMediaHelper } from 'hooks'
import { userTrialDaysSelector } from 'store/reducers/user'

export const TrainingSection = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { isDesktop } = useMediaHelper()

  const trialDays = useSelector(userTrialDaysSelector)

  const trainingDetails = [
    [
      { image: courseVideos, title: t('course_videos'), description: t('course_videos_description') },
      { image: workSheets, title: t('sheets_and_templates'), description: t('sheets_and_templates_descrip') },
    ],
    [
      { image: qaCalls, title: t('qa_calls'), description: t('qa_calls_descrip') },
      { image: emailSupport, title: t('new_feature_support'), description: t('mail_support_descrip') },
    ],
  ]

  return (
    <Box
      textAlign='center'
      sx={{ backgroundColor: theme.palette.common.neutral['10'] }}
      p={isDesktop ? '77px 5vw 0' : '20px 10px'}
    >
      <Typography
        color={theme.palette.common.neutral.main}
        variant={isDesktop ? 'text40Medium' : 'text25Medium'}
        sx={{ '& b': { fontSize: '40px' } }}
        dangerouslySetInnerHTML={{
          __html: t('train_support_banner'),
        }}
      />

      <Typography
        color={theme.palette.common.neutral['70']}
        paragraph
        lineHeight='1.5em'
        m={isDesktop ? '0 0 11px' : '20px 0'}
        variant={isDesktop ? 'text20Light' : 'text15Light'}
      >
        {t('train_support_subtext')}
      </Typography>

      {trainingDetails.map((detail, index) => (
        <Stack
          key={`training-detail-${index}`}
          direction='row'
          maxWidth='1148px'
          mx='auto'
          pt={isDesktop ? '79px' : '54px'}
          justifyContent='space-between'
        >
          {detail.map((part, index) => (
            <Stack
              direction={isDesktop ? 'row' : 'column'}
              alignItems={isDesktop ? '' : 'center'}
              key={`part-${index}`}
              flex={1}
            >
              <img
                alt={`img-${index}`}
                src={part.image}
                style={{ width: isDesktop ? '200px' : '90%', maxWidth: '220px', height: isDesktop ? '200px' : 'auto' }}
              />

              <Box p={isDesktop ? '32px' : '10px'} textAlign={isDesktop ? 'start' : 'center'} flex={1}>
                <Typography
                  variant={isDesktop ? 'text24Medium' : 'text20Medium'}
                  color={theme.palette.common.neutral.main}
                  lineHeight='1.4em'
                >
                  {part.title}
                </Typography>

                <Typography
                  paragraph
                  variant={isDesktop ? 'text16Light' : 'text14Light'}
                  m={isDesktop ? '15px 0 0' : '6px 0 0'}
                  color={theme.palette.common.neutral['70']}
                  lineHeight='1.6em'
                >
                  {part.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      ))}

      {isDesktop && (
        <Stack direction='column' justifyContent='center' alignItems='center' p='49px 0 66px'>
          <Button href='#compare-plans' variant='contained' size='xxlarge' sx={{ px: '30px' }}>
            <Typography
              sx={{ letterSpacing: '2px' }}
              textTransform='capitalize'
              lineHeight='1.5em'
              variant='text14Medium'
            >
              {t('see_plans_button')}
            </Typography>
          </Button>

          <Typography variant='text14' p='12px' lineHeight='24px' color={theme.palette.common.darkGray.main}>
            {t('seven_day_free', { 0: trialDays })}
          </Typography>
        </Stack>
      )}
    </Box>
  )
}
