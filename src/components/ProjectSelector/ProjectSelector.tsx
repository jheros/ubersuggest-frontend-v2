import { useTranslation } from 'react-i18next';
import { Divider, ListItemButton, ListItemIcon, Stack, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Typography } from 'components';

export const ProjectSelector = () => {
  const { t } = useTranslation();
  const {
    palette: {
      primary: { main: mainColor },
    },
  } = useTheme();

  return (
    <>
      <ListItemButton sx={{ px: 2.5 }} onClick={() => {}}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' flexGrow={1} sx={{ py: 1 }}>
          <Typography variant='body1' font='medium'>
            {t('add_project_button')}
          </Typography>
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <AddCircleOutlineIcon sx={{ color: mainColor, fontSize: 18 }} />
          </ListItemIcon>
        </Stack>
      </ListItemButton>

      <Divider />
    </>
  );
};
