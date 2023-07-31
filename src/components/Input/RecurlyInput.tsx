import React, { forwardRef } from 'react'

import { styled } from '@mui/material'
import { IndividualElementProps, CardNumberElementChangeEvent } from '@recurly/react-recurly'
import { theme } from '@ubersuggest/common-ui'

const RecurlyElementWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error: boolean }>(({ theme, error }) => ({
  '.recurly-element': {
    height: '50px',
    borderRadius: '2px',
    borderColor: error ? theme.palette.error.main : theme.palette.common.lightGray.main,
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '10px 20px',
    '&:hover': {
      borderColor: error ? theme.palette.error.main : theme.palette.common.darkGray.main,
    },
  },
}))

export const RecurlyInput = forwardRef<
  HTMLDivElement,
  {
    component: React.FC<IndividualElementProps<CardNumberElementChangeEvent>> | React.FC<IndividualElementProps>
    placeholder?: string
    onChange: (valid: boolean) => void
    onBlur: () => void
    error: boolean
  }
>(({ component: Component, placeholder, onChange, error = false, ...otherProps }, ref) => {
  return (
    <RecurlyElementWrapper ref={ref} error={error}>
      <Component
        {...otherProps}
        onChange={(event) => onChange(event.valid)}
        style={{
          fontColor: theme.palette.common.darkGray.main,
          fontFamily: 'Roboto',
          fontSize: '15px',
          fontWeight: '400',
          placeholder: {
            color: theme.palette.common.lightGray.main,
            content: placeholder,
          },
        }}
      />
    </RecurlyElementWrapper>
  )
})
