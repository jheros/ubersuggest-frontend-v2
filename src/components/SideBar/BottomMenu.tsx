import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Stack, Breakpoint } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Typography, fonts } from '@ubersuggest/common-ui'
import { ReactComponent as ConsultSvg } from 'assets/svg/consult.svg'
import { ReactComponent as KnowledgeBaseSvg } from 'assets/svg/knowledge-base.svg'
import { ReactComponent as PaymentSvg } from 'assets/svg/payment.svg'
import { ReactComponent as SupportSvg } from 'assets/svg/support.svg'

interface IBottomMenuItem {
  name: string
  baseUrl: string
  icon: ReactNode
}

const BOTTOM_MENUS: IBottomMenuItem[] = [
  {
    name: 'account_billing_tab',
    baseUrl: '/settings/account_billing',
    icon: <PaymentSvg />,
  },
  {
    name: 'menu_consulting',
    baseUrl:
      'https://neilpatel.com/consulting/?utm_source=ubersuggest-app&utm_medium=ubersuggest&utm_term=consulting-sidebar&utm_content=sidebar&utm_campaign=us-mkt-campaign-sql-ubersuggest-consulting',
    icon: <ConsultSvg />,
  },
  {
    name: 'support',
    baseUrl: 'https://ubersuggest.zendesk.com/hc/en-us/requests/new',
    icon: <SupportSvg />,
  },
  {
    name: 'knowledge_base',
    baseUrl: 'https://knowledgebase.neilpatel.com/',
    icon: <KnowledgeBaseSvg />,
  },
]

const BottomMenuWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('tb' as Breakpoint)]: {
    paddingBottom: 80,
    paddingLeft: 20,
    borderTop: `1px solid ${theme.palette.common.lightGray[50]}`,
    backgroundColor: theme.palette.common.gray[10],
  },
  [theme.breakpoints.down('tb' as Breakpoint)]: {
    marginBottom: 16,
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 16,
    borderTop: `1px solid ${theme.palette.common.lightGray[50]}`,
    borderBottom: `1px solid ${theme.palette.common.lightGray[50]}`,
  },
  paddingTop: 16,
}))

const BottomMenuItem = styled(Stack)(({ theme }) => ({
  minHeight: 32,
  cursor: 'pointer',

  '&:hover': {
    fontFamily: fonts.primary.medium,
  },
}))

export const BottomMenu = () => {
  const { t } = useTranslation()

  return (
    <BottomMenuWrapper>
      {BOTTOM_MENUS.map((subsection) => (
        <BottomMenuItem key={subsection.name} direction='row' alignItems='center' onClick={() => {}}>
          <Stack sx={{ width: 20, marginRight: 1.75 }}>{subsection.icon}</Stack>
          <Typography variant='text14'>{t(subsection.name)}</Typography>
        </BottomMenuItem>
      ))}
    </BottomMenuWrapper>
  )
}
