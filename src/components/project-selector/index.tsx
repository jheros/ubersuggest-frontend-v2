import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Menu, MenuItem, ListItemButton, ListItemIcon, Stack, Typography, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import useLocalStorageKeyObserver from 'hooks/useCustomEvent';
import textCrop from 'utils/textCrop';

export const ProjectSelector = () => {
  const {
    palette: {
      primary,
      common: { gray, osloGray, lightestGray },
    },
  } = useTheme();
  const { t } = useTranslation();

  const { value: userTier } = useLocalStorageKeyObserver('user');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const createProject = () => {};

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
