import { useTranslation } from 'react-i18next';
import { Divider, ListItemButton, ListItemIcon, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Typography } from 'components';

export const ProjectSelector = () => {
  const { t } = useTranslation();

  return (
    <>
      <ListItemButton sx={{ px: 2.5 }} onClick={() => {}}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' flexGrow={1} sx={{ py: 1 }}>
          <Typography variant='body1' font='medium'>
            {t('add_project_button')}
          </Typography>
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <AddCircleOutlineIcon sx={{ color: (theme) => theme.palette.primary.main, fontSize: 18 }} />
          </ListItemIcon>
        </Stack>
      </ListItemButton>

      <Divider />
    </>
  );
};
