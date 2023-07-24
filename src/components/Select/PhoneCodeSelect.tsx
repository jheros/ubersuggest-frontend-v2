import { useEffect, useMemo } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useTranslation } from 'react-i18next'

import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { getPhoneCodes } from 'utils/phoneNumber'

interface IPhoneCodeSelect {
  value?: string
  displayEmpty?: boolean
  fullWidth?: boolean
  onChange?: (id: string) => void
}

// * return countryCode because dialCode is duplicated for some countries
export const PhoneCodeSelect = ({ value, displayEmpty = false, fullWidth = false, onChange }: IPhoneCodeSelect) => {
  const { t } = useTranslation()
  const phoneCodes = getPhoneCodes()
  const memoizedOptions = useMemo(
    () =>
      phoneCodes.map(({ dialCode, countryName, countryCode }) => (
        <MenuItem value={countryCode} key={`phone-code-option-${countryCode}`} disableGutters sx={{ p: 0 }}>
          <Box width='100%' display='flex' alignItems='center' p='0 20px'>
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{
                marginTop: '-3px',
                marginRight: '20px',
                width: '1.3333em',
                height: '1em',
              }}
            />
            <Typography fontSize='15px' lineHeight='48px' className='country-name'>
              {countryName}
            </Typography>
            <Typography fontSize='15px' lineHeight='48px'>
              &nbsp;{dialCode}
            </Typography>
          </Box>
        </MenuItem>
      )),
    [phoneCodes],
  )

  useEffect(() => {
    if (!value && phoneCodes.length && !displayEmpty) {
      onChange && onChange(phoneCodes[0].countryCode)
    }
  }, [])

  return (
    <Select
      value={value || (!displayEmpty ? phoneCodes[0]?.countryCode : undefined)}
      onChange={(event: SelectChangeEvent) => onChange && onChange(event.target.value as string)}
      displayEmpty={displayEmpty}
      fullWidth={fullWidth}
      sx={{ '.MuiSelect-select': { p: 0 }, '.country-name': { display: 'none' } }}
    >
      {displayEmpty && (
        <MenuItem value={undefined} disableGutters sx={{ p: 0 }}>
          <Box width='100%' display='flex' alignItems='center' p='13px 20px'>
            <Typography fontSize='15px' whiteSpace='nowrap' lineHeight={1.2}>
              {t('country_code')}
            </Typography>
          </Box>
        </MenuItem>
      )}
      {memoizedOptions}
    </Select>
  )
}
