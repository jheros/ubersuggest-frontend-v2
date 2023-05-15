import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { Typography } from 'components';
import { ReactComponent as PaymentSvg } from 'assets/svg/payment.svg';
import { ReactComponent as ConsultSvg } from 'assets/svg/consult.svg';
import { ReactComponent as SupportSvg } from 'assets/svg/support.svg';
import { ReactComponent as KnowledgeBaseSvg } from 'assets/svg/knowledge-base.svg';

interface IBottomMenuItem {
  name: string;
  baseUrl: string;
  icon: ReactNode;
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
];

const BottomMenuItem = styled(Stack)(({ theme }) => ({
  minHeight: 32,
  cursor: 'pointer',

  '&:hover': {
    fontFamily: theme?.palette.common.medium,
  },
}));

export const BottomMenu = () => {
  const { t } = useTranslation();
  const {
    palette: { gray, lightGray },
  } = useTheme();

  return (
    <Box pt={2} pb={10} sx={{ backgroundColor: gray[10], border: `1px solid ${lightGray[50]}` }}>
      {BOTTOM_MENUS.map((subsection) => (
        <BottomMenuItem key={subsection.name} direction='row' alignItems='center' onClick={() => {}} pl={2.5}>
          <Stack sx={{ width: 20, marginRight: 1.75 }}>{subsection.icon}</Stack>
          <Typography variant='body2'>{t(subsection.name)}</Typography>
        </BottomMenuItem>
      ))}
    </Box>
  );
};
