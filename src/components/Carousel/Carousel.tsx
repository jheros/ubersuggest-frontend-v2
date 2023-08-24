import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'

import { Box, Divider, Stack, useTheme } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import sliderLeftIcon from 'assets/svg/icons/slider-left.svg'
import sliderRightIcon from 'assets/svg/icons/slider-right.svg'
import trustpilotLogo from 'assets/svg/pricing/trustpilot-logo.png'
import trustpilotRatings from 'assets/svg/pricing/trustpilot-ratings.png'
import trustpilotRatings5 from 'assets/svg/pricing/trustpilot_ratings-5.png'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { formatDate } from 'utils/dateTime'
import { formatNumber } from 'utils/numbro'

interface ISliderArrowIcon {
  src: string
  className?: string
  onClick?: () => void
}

const SliderArrowIcon = ({ src, className, onClick }: ISliderArrowIcon) => {
  return (
    <Box
      className={className}
      onClick={onClick}
      width='32px'
      height='32px'
      sx={{
        '&::before': {
          display: 'none',
        },
        '&:hover': {
          opacity: '0.9',
        },
        '&.slick-next': {
          right: '-34px',
        },
        '&.slick-prev': {
          left: '-34px',
        },
      }}
    >
      <img src={src} style={{ width: '32px', height: '32px' }} alt='slider-arrow-icon' />
    </Box>
  )
}

const settings = {
  dots: false,
  adaptiveHeight: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],

  prevArrow: <SliderArrowIcon src={sliderLeftIcon} />,
  nextArrow: <SliderArrowIcon src={sliderRightIcon} />,
}

export const Carousel = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  const trustpilotReviews = [
    {
      date: t('n_days_ago', { 0: formatNumber(2) }),
      title: t('best_on_market'),
      review: t('review_one'),
      name: t('alan'),
    },
    {
      date: t('n_days_ago', { 0: formatNumber(2) }),
      title: t('best_on_market'),
      review: t('review_two'),
      name: t('borislav'),
    },
    {
      date: t('n_days_ago', { 0: formatNumber(5) }),
      title: t('best_on_market'),
      review: t('review_three'),
      name: t('gloria'),
    },
    {
      date: formatDate(new Date('2021-05-19'), 'YYYY-MM-DD', 'MMM DD, YYYY'),
      title: t('love_ubersuggest'),
      review: t('review_four'),
      name: t('jessica'),
    },
    {
      date: formatDate(new Date('2021-12-30'), 'YYYY-MM-DD', 'MMM DD, YYYY'),
      title: t('important_tool'),
      review: t('review_five'),
      name: t('vrinda'),
    },
  ]

  return (
    <Box width='100%' pb='60px' sx={{ backgroundColor: theme.palette.common.gray[10] }}>
      <Box maxWidth='1092px' mx='auto' pt='29px'>
        <Slider {...settings}>
          <Stack
            direction='column'
            alignItems='center'
            width='auto'
            maxWidth='249px'
            p='30px 29px'
            height='100%'
            minHeight='380px'
            m='20px 12px'
            sx={{
              display: 'flex !important',
              backgroundColor: theme.palette.common.white,
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 3px 5px',
            }}
          >
            <Typography variant='text24Medium' lineHeight='1.4em' color={theme.palette.common.gray.dark} m='0 0 18px'>
              {t('reviews_excellent')}
            </Typography>

            <img src={trustpilotRatings} style={{ width: '129px', height: '24px' }} alt='trust-pilot-ratings' />

            <Typography
              variant='text16'
              lineHeight='1.7em'
              color={theme.palette.common.gray.dark}
              boldColor={theme.palette.common.gray.dark}
              m='16px 0'
              dangerouslySetInnerHTML={{
                __html: t('based_on_reviews', { 0: formatNumber(90) }),
              }}
            />

            <img src={trustpilotLogo} style={{ width: '115px', height: '28px' }} alt='trust-pilot-logo' />
          </Stack>

          {trustpilotReviews.map((review, index) => (
            <Stack
              key={`review-${index}`}
              direction='column'
              width='auto'
              maxWidth='249px'
              p='23px 20px 20px'
              height='100%'
              minHeight='380px'
              m='20px 12px'
              sx={{
                display: 'flex !important',
                backgroundColor: theme.palette.common.white,
                boxShadow: 'rgba(0, 0, 0, 0.12) 0px 3px 5px',
              }}
            >
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <img src={trustpilotRatings5} style={{ width: '107px', height: '20px' }} alt='trust-pilot-ratings5' />

                <Typography variant='text13' color={theme.palette.common.gray.dim} lineHeight='1.5em'>
                  {review.date}
                </Typography>
              </Stack>

              <Typography
                variant='text16Medium'
                lineHeight='1.6em'
                m='10px 0 9px'
                color={theme.palette.common.gray.dark}
              >
                {review.title}
              </Typography>

              <Typography variant='text14' lineHeight='1.5em' color={theme.palette.common.darkGray.magenta}>
                {review.review}
              </Typography>

              <Divider sx={{ width: '60px', margin: '8px 0', borderColor: theme.palette.common.gray.magenta }} />

              <Typography variant='text14Medium' lineHeight='1.5em' color={theme.palette.common.gray.dark}>
                {review.name}
              </Typography>
            </Stack>
          ))}
        </Slider>
      </Box>
    </Box>
  )
}
