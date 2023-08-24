import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary, Box, useTheme, Divider } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { useMediaHelper } from 'hooks'

const Accordion: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const theme = useTheme()
  const { isDesktop } = useMediaHelper()
  const { t } = useTranslation()

  return (
    <MuiAccordion
      onClick={() => {
        setExpanded(!expanded)
      }}
      expanded={expanded}
      disableGutters
      sx={{
        maxWidth: '1180px',
        mx: 'auto',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: 'none',
        p: isDesktop ? '10px 0px 13px' : '18px 50px 18px 30px',
        '&::before': {
          content: `''`,
          backgroundColor: theme.palette.common.lightGray[50],
        },
        borderTop: `1px solid ${theme.palette.common.lightGray[50]}`,
        '&:last-child': { borderBottom: `1px solid ${theme.palette.common.lightGray[50]}` },
      }}
    >
      <AccordionSummary sx={{ p: '0', position: 'unset !important' }}>
        <Typography
          textAlign='start'
          lineHeight='1.5em'
          variant={isDesktop ? 'text20' : 'text16'}
          color={theme.palette.common.neutral.main}
        >
          {t(question)}
        </Typography>

        <Box position='absolute' right='11px' top='40px'>
          <Box position='relative'>
            {!expanded && (
              <Typography
                sx={{
                  height: '17px',
                  width: '1px',
                  background: theme.palette.common.neutral.main,
                  position: 'absolute',
                  transform: 'translateY(-50%)',
                }}
              />
            )}

            <Typography
              sx={{
                top: '-8px',
                height: '17px',
                width: '1px',
                background: theme.palette.common.neutral.main,
                position: 'absolute',
                transform: 'rotate(90deg)',
              }}
            />
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ p: '0', textAlign: 'start', m: '13px 0 13px' }}>
        <Typography
          paragraph
          mb='0'
          width='94%'
          lineHeight='1.5em '
          variant={isDesktop ? 'text18' : 'text15'}
          color={theme.palette.common.darkGray.main}
        >
          {t(answer)}
        </Typography>
      </AccordionDetails>
    </MuiAccordion>
  )
}

export const FaqsSection = () => {
  const { t } = useTranslation()
  const { isDesktop } = useMediaHelper()
  const theme = useTheme()

  const faqs = [
    {
      question: 'cancel_my_account',
      answer: 'cancel_my_account_description',
    },
    {
      question: 'question_type_of_payment',
      answer: 'question_type_of_payment_description',
    },
    {
      question: 'question_sign_in',
      answer: 'question_sign_in_description',
    },
    {
      question: 'question_fees',
      answer: 'question_fees_description',
    },
    {
      question: 'question_refund_policy',
      answer: 'question_refund_policy_description',
    },
    {
      question: 'question_discounts',
      answer: 'question_discounts_description',
    },
    {
      question: 'question_invoice',
      answer: 'question_invoice_description',
    },
    {
      question: 'question_api',
      answer: 'question_api_description',
    },
    {
      question: 'question_accuracy',
      answer: 'question_accuracy_description',
    },
  ]

  return (
    <Box mx={isDesktop ? '' : '-10px'} p={isDesktop ? `76px calc(10px + 5vw)` : '40px 5vw 50px'} textAlign='center'>
      <Typography
        paragraph
        m={isDesktop ? '0 0 43px' : '0 0 20px'}
        variant={isDesktop ? 'text40Medium' : 'text25Medium'}
        sx={{ '& b': { fontSize: '40px' } }}
        dangerouslySetInnerHTML={{
          __html: t('frequently_asked_questions'),
        }}
      />

      {!isDesktop && (
        <Divider sx={{ borderColor: theme.palette.primary.main, mx: 'auto', mb: '50px', width: '66px' }} />
      )}

      {faqs.map((faq, index) => (
        <Accordion key={`faq-${index}`} {...faq} />
      ))}
    </Box>
  )
}
