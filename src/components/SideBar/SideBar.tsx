import { useState, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import { ProjectSelector, Typography } from 'components';
import { SIDEBAR_MENUS, ISidebarMenuItem, ISidebarMenu } from './constants';
import { SideBarMenu, SideBarMenuSummary, SideBarMenuContent } from './SideBarMenu';
import { SideBarMenuItemWrapper, SideBarMenuItem } from './SideBarMenuItem';
import { SideBarWrapper } from './SideBarWrapper';
import { TrialNotification } from './TrialNotification';
import { BottomMenu } from './BottomMenu';

export const SideBar = () => {
  const { t } = useTranslation();
  const {
    palette: {
      primary: { main: activeColor },
    },
  } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [activeMenuItem, selectMenuItem] = useState('');

  const handleChange = (panel: string, shouldToggle: boolean) => (_: SyntheticEvent, newExpanded: boolean) => {
    const newPanel = shouldToggle && !newExpanded ? false : panel;
    setExpanded(newPanel);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickMenuItem = (index: string) => () => {
    selectMenuItem(index);
  };

  return (
    <SideBarWrapper open={mobileOpen} toggle={handleDrawerToggle}>
      <Box sx={{ flex: 1 }}>
        <ProjectSelector />
        {SIDEBAR_MENUS.map((menu: ISidebarMenu) => (
          <SideBarMenu
            expanded={menu.name ? expanded === menu.name : true}
            onChange={handleChange(menu.name, !!menu.children)}
            key={menu.name}
          >
            {menu.name && (
              <SideBarMenuSummary hasChildren={!!menu.children}>
                <Typography variant='body1' font='medium' color={expanded === menu.name ? activeColor : ''}>
                  {t(menu.name)}
                </Typography>
                {menu.isNew && (
                  <Typography
                    variant='body3'
                    color={activeColor}
                    sx={{ mt: 0, textTransform: 'uppercase', marginLeft: 0.75 }}
                  >
                    {t('tab_new')}!
                  </Typography>
                )}
              </SideBarMenuSummary>
            )}
            <SideBarMenuContent>
              {menu.children?.map((content: ISidebarMenuItem[], contentIndex: number) => (
                <SideBarMenuItemWrapper key={contentIndex}>
                  {content.map((item: ISidebarMenuItem) => {
                    return (
                      <SideBarMenuItem
                        active={activeMenuItem === menu.name}
                        key={item.name}
                        disablePadding
                        onClick={handleClickMenuItem(menu.name)}
                      >
                        <Typography variant='body2'>{t(item.name!)}</Typography>
                        {item.isNew && (
                          <Typography
                            variant='body3'
                            color={activeColor}
                            sx={{ textTransform: 'uppercase', marginLeft: 0.75 }}
                          >
                            {t('tab_new')}!
                          </Typography>
                        )}
                      </SideBarMenuItem>
                    );
                  })}
                </SideBarMenuItemWrapper>
              ))}
            </SideBarMenuContent>
          </SideBarMenu>
        ))}
      </Box>
      <TrialNotification />
      <BottomMenu />
    </SideBarWrapper>
  );
};
