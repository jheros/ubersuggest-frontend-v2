import { forwardRef } from 'react'

import { InputBase, InputBaseProps } from '@mui/material'
import { Typography } from '@ubersuggest/common-ui'
import { t } from 'i18next'
import { cloneDeep, isNumber } from 'lodash'

export const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputBaseProps & { maxLength?: number; showLengthStatus?: boolean }
>(({ maxLength, showLengthStatus = false, value, onChange, ...props }, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (isNumber(maxLength)) {
      const newEvent = cloneDeep(event)
      newEvent.target.value = event.target.value.slice(0, maxLength)
      onChange && onChange(newEvent)
    } else {
      onChange && onChange(event)
    }
  }

  return (
    <>
      <InputBase {...props} ref={ref} value={value} onChange={handleChange}></InputBase>
      {showLengthStatus && (
        <Typography variant='text14Light' mt='5px' mb={0} textAlign='right' paragraph>
          {t('character_count', { 0: (value as string).length, 1: maxLength || 524288 })}
        </Typography>
      )}
    </>
  )
})
