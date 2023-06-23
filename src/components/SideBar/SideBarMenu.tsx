import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import { styled } from '@mui/material/styles'

export const SideBarMenu = styled((props: AccordionProps) => <MuiAccordion elevation={0} {...props} />)(() => ({
  marginTop: 8,

  '&.Mui-expanded': {
    marginTop: 8,
    marginBottom: 8,
  },
  '&:not(:last-child)': {
    marginBottom: 8,
  },
  '&:before': {
    display: 'none',
  },
}))

export const SideBarMenuSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  paddingLeft: 20,
  paddingRight: 20,
  height: 45,
  minHeight: 45,
  backgroundColor: theme.palette.common.gray[10],

  '&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded': {
    minHeight: 45,
  },
  '& .MuiAccordionSummary-content.Mui-expanded': {
    marginTop: 0,
    marginBottom: 0,
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
}))

export const SideBarMenuContent = styled(MuiAccordionDetails)(() => ({ padding: 0 }))
