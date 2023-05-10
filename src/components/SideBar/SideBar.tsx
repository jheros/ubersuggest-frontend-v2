import { useState } from 'react';
import { Toolbar, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import type { ITheme } from 'theme';

import { SIDEBAR_MENUS } from './constants';

const drawerWidth = 240;

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }: { theme: ITheme }) => {
  console.log('palette >>', theme);
  return {
    backgroundColor: theme.palette.grey[500],
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  };
});

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const SideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(true);
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const drawer = (
  //   <div>
  //     <List>
  //       {SIDEBAR_MENUS.map((sidebarMenu, index) => (
  //         <ListItem key={index} disablePadding>
  //           <ListItemButton>{sidebarMenu.name && <ListItemText primary={sidebarMenu.name} />}</ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>

  //     <Divider />
  //   </div>
  // );

  const drawer = (
    <div>
      {SIDEBAR_MENUS.map((sidebarMenu, index) => (
        <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index}>
          <AccordionSummary>
            <Typography>{sidebarMenu.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Lorem ipsum dolor sit amet, consectetur</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );

  return (
    <>
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },

          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>

      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },

          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <Toolbar />
        {drawer}
      </Drawer>
    </>
  );
};
