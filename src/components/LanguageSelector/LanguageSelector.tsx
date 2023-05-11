import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { styled, MenuItem, Box, Stack, MenuList, useTheme } from '@mui/material';
import MuiMenu from '@mui/material/Menu';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Typography } from 'components';
import { pathWithLang } from 'utils/translation';
import { LANG_CODES, ILangCode } from './constants';

const LANGUAGE_SELECTOR_DROPDOWN_WIDTH = 145;

interface ILanguageSelector {
  language?: string;
}

const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    boxShadow: theme.palette.common.shadowC,
    width: LANGUAGE_SELECTOR_DROPDOWN_WIDTH,
  },
}));

export const LanguageSelector = ({ language = 'en' }: ILanguageSelector) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const {
    palette: {
      dark: { main: normalColor },
      grey: { '500': selectedColor },
    },
  } = useTheme();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  const handleChangeLanguage = (newLang: string) => () => {
    i18n.changeLanguage(newLang);
    popupState.close();
    navigate(pathWithLang(newLang));
  };

  return (
    <Box>
      <Stack direction='row' alignItems='center' spacing={0.25} sx={{ cursor: 'pointer' }} {...bindTrigger(popupState)}>
        <Typography variant='body2' font='book' sx={{ textTransform: 'uppercase' }}>
          {language}
        </Typography>
        <ExpandMoreIcon sx={{ fontSize: 14 }} />
      </Stack>
      <Menu
        anchorOrigin={{
          vertical: 36,
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        {...bindMenu(popupState)}
      >
        <MenuList>
          {LANG_CODES.map((lang: ILangCode) => (
            <MenuItem
              key={lang.code}
              sx={{
                px: 3.75,
                py: 1.25,
                color: lang.code === language ? selectedColor : normalColor,
              }}
              onClick={handleChangeLanguage(lang.code)}
            >
              <Typography variant='body3' fontWeight={300}>
                {lang.label}
              </Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
