import { useState, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

import { ProjectSelector, Typography } from 'components';
import { SIDEBAR_MENUS, ISidebarMenuItem, ISidebarMenu } from './constants';
import { SideBarMenu, SideBarMenuSummary, SideBarMenuContent } from './SideBarMenu';
import { SideBarMenuItemWrapper, SideBarMenuItem } from './SideBarMenuItem';
import { SideBarWrapper } from './SideBarWrapper';
import { TrialNotification } from './TrialNotification';

export const SideBar = () => {
  const { t } = useTranslation();
  const {
    palette: {
      primary: { main: activeColor },
    },
  } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(true);
  const [expanded, setExpanded] = useState<number | false>(false);
  const [activeMenuItem, selectMenuItem] = useState('');

  const handleChange = (panel: number, shouldToggle: boolean) => (_: SyntheticEvent, newExpanded: boolean) => {
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
      <div>
        <ProjectSelector />
        {SIDEBAR_MENUS.map((menu: ISidebarMenu, menuIndex: number) => (
          <SideBarMenu
            expanded={menu.name ? expanded === menuIndex : true}
            onChange={handleChange(menuIndex, !!menu.children)}
            key={menuIndex}
          >
            {menu.name && (
              <SideBarMenuSummary hasChildren={!!menu.children}>
                <Typography variant='body1' font='medium' color={expanded === menuIndex ? activeColor : ''}>
                  {t(menu.name)}
                </Typography>
                {menu.isNew && (
                  <Typography variant='body3' color={activeColor} sx={{ mt: 0, textTransform: 'uppercase' }}>
                    &nbsp; {t('tab_new')}!
                  </Typography>
                )}
              </SideBarMenuSummary>
            )}
            <SideBarMenuContent>
              {menu.children?.map((content: ISidebarMenuItem[], contentIndex: number) => (
                <SideBarMenuItemWrapper key={contentIndex}>
                  {content.map((item: ISidebarMenuItem, itemIndex: number) => {
                    const menuItemKey = `${menuIndex}-${contentIndex}-${itemIndex}`;

                    return (
                      <SideBarMenuItem
                        active={activeMenuItem === menuItemKey}
                        key={itemIndex}
                        disablePadding
                        onClick={handleClickMenuItem(menuItemKey)}
                      >
                        <Typography variant='body2'>{t(item.name!)}</Typography>
                        {item.isNew && (
                          <Typography variant='body3' color={activeColor} sx={{ textTransform: 'uppercase' }}>
                            &nbsp; {t('tab_new')}!
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
      </div>
      <TrialNotification />
    </SideBarWrapper>
  );
};
