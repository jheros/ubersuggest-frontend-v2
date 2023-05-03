/* eslint-disable no-nested-ternary */
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
  useTheme,
  Skeleton,
} from '@mui/material';

import useLocalStorageKeyObserver from 'hooks/useCustomEvent';
// Utils
import textCrop from 'utils/textCrop';
import { SELECTED_PROJECT } from 'utils/constants/local-storage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

export const ProjectSelector = () => {
  const {
    palette: {
      primary,
      common: { gray, osloGray, lightestGray },
    },
  } = useTheme();
  const { i18n, t } = useTranslation();

  const { value: userTier } = useLocalStorageKeyObserver('user');

  const [activeProjectSetting, setActiveProjectSetting] = useState(localStorage.getItem(SELECTED_PROJECT) || '');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const createProject = () => {
    window.location.href = `${process.env.REACT_APP_UBS_OAUTH_URL}/${i18n.language}/dashboard?action=add_project&next=${window.location.href}&from=ai_writer`;
  };

  const setActiveProject = (domain: string) => {
    setActiveProjectSetting(domain);
    localStorage.setItem(SELECTED_PROJECT, domain);
  };

  return userTier === 'unlogged' ? null : (
    <>
      <ListItemButton onClick={createProject}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' flexGrow={1} sx={{ py: 1 }}>
          <Typography variant='text18Medium' sx={{ ...textCrop(1, 0, 0.2) }}>
            {t('add_project_button')}
          </Typography>
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <AddCircleOutlineIcon sx={{ color: primary.main, mb: 0.5 }} />
          </ListItemIcon>
        </Stack>
      </ListItemButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={open}
        onClose={handleClose}
      >
        <Divider />
        <MenuItem onClick={createProject} sx={{ minWidth: 200 }}>
          <Stack direction='row' alignItems='center' justifyContent='space-between' flexGrow={1} sx={{ py: 1 }}>
            <Typography variant='text16Medium'>{t('add_project_button')}</Typography>
            <AddCircleOutlineIcon sx={{ color: primary.main, ml: 2, mb: 0.5 }} />
          </Stack>
        </MenuItem>
      </Menu>
      <Divider />
    </>
  );
};
