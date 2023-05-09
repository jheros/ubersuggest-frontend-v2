import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MenuItem, Box, Stack, MenuList, Typography, useTheme } from '@mui/material';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import { usePopupState, bindHover, bindPopover } from 'material-ui-popup-state/hooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import textCrop from 'utils/textCrop';
import { pathWithLang } from 'utils/translation';

type IlanguageCodeList = {
  code: string;
  label: string;
};

const languageCodeList: IlanguageCodeList[] = [
  {
    code: 'en',
    label: 'English (EN)',
  },
  {
    code: 'pt',
    label: 'Português (BR)',
  },
  {
    code: 'de',
    label: 'Deutsch (DE)',
  },
  {
    code: 'es',
    label: 'Español (ES)',
  },
  {
    code: 'it',
    label: 'Italiano (IT)',
  },
  {
    code: 'fr',
    label: 'French (FR)',
  },
  {
    code: 'nl',
    label: 'Dutch (NL)',
  },
  {
    code: 'ja',
    label: '日本語 (JP)',
  },
  {
    code: 'zh',
    label: '简体中文 (CN)',
  },
];

interface ILanguageSelector {
  languageCode?: string;
}

export const LanguageSelector: React.FC<ILanguageSelector> = ({ languageCode = 'en' }) => {
  const {
    palette: {
      common: { gray, darkGray },
    },
  } = useTheme();
  const navigate = useNavigate();
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });
  const { i18n } = useTranslation();

  const handleChangeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    popupState.close();
    navigate(pathWithLang(newLang));
  };

  return (
    <Box>
      <Stack
        direction='row'
        alignItems='center'
        spacing={0.25}
        sx={{
          color: darkGray,
          cursor: 'pointer',
          height: '58px',
        }}
        {...bindHover(popupState)}
      >
        <Typography
          variant='text15Book'
          sx={{
            textTransform: 'uppercase',
            ...textCrop(1, 0, 0.2),
          }}
        >
          {languageCode}
        </Typography>
        <ExpandMoreIcon />
      </Stack>
      <HoverPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 48,
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuList id='composition-menu' aria-labelledby='composition-button'>
          {languageCodeList.map((language: IlanguageCodeList) => (
            <MenuItem
              key={language.code}
              sx={{
                px: 3,
                py: 1.5,
                color: language.code === languageCode ? gray : darkGray,
              }}
              onClick={() => handleChangeLanguage(language.code)}
            >
              <Typography variant='text12'>{language.label}</Typography>
            </MenuItem>
          ))}
        </MenuList>
      </HoverPopover>
    </Box>
  );
};
