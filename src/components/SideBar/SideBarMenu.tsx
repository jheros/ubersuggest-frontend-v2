import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

interface ISideBarMenuSummary extends AccordionSummaryProps {
  hasChildren: boolean;
}

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
}));

export const SideBarMenuSummary = styled((props: ISideBarMenuSummary) => (
  <MuiAccordionSummary
    expandIcon={props.hasChildren && <ArrowForwardIosSharpIcon sx={{ fontSize: 12 }} />}
    {...props}
  />
))(({ theme }) => ({
  paddingLeft: 20,
  paddingRight: 20,
  height: 45,
  minHeight: 45,
  backgroundColor: theme.palette.gray[10],

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
}));

export const SideBarMenuContent = styled(MuiAccordionDetails)(() => ({ padding: 0 }));
