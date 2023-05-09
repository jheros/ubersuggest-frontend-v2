import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';

import { text16Medium } from 'theme/typography';
import { ProjectSelector } from 'components';
import textCrop from 'utils/textCrop';

import { DrawerStyled } from './styled';

interface IMainSidebar {
  open: boolean;
  setOpen: (value: boolean) => void;
  navHeight: number;
  handleModalOpen: () => void;
}

interface IMainSidebarMenuList {
  title: string;
  label: string;
  url: string;
  Icon: any;
}

const menuList = [
  {
    title: 'landing_page',
    label: 'rank_tracking',
    url: '/',
  },
  {
    title: 'my_projects',
    label: 'seo_opportunities',
    url: '/',
  },
  {
    title: 'my_projects',
    label: 'menu_workspace',
    url: '/',
  },
  {
    title: 'my_projects',
    label: 'menu_extension',
    url: '/',
  },
] as IMainSidebarMenuList[];

export const MainSidebar: React.FC<IMainSidebar> = ({ open, setOpen, navHeight, handleModalOpen }) => {
  const {
    palette: {
      common: { white, darkGray, orange, shadowC, geomanistBook, geomanistMedium },
    },
  } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const activeMenu =
    menuList.find((menuItem) => menuItem.url.length > 1 && location.pathname.includes(menuItem.url)) || menuList[0];

  return (
    <>
      <DrawerStyled variant='permanent' anchor='left' open={open} navHeight={navHeight}>
        <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
          <ProjectSelector />
          <List>
            {menuList.map(({ title, url, label }) => (
              <ListItem key={label} disablePadding>
                <Link
                  to={url}
                  key={label}
                  style={{
                    color: darkGray,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '8px 10px 8px 15px',
                      borderRight: `3px solid ${activeMenu?.title === title ? orange : 'transparent'}`,
                      '&:hover .MuiTypography-root': {
                        ...text16Medium,
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant={activeMenu?.title === title ? 'text16Medium' : 'text16'}
                          sx={{ ...textCrop(1, 0, 0.2) }}
                        >
                          {t(label)}
                        </Typography>
                      }
                    />
                  </Box>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </DrawerStyled>
    </>
  );
};
