import React from 'react'
import { useTranslation } from 'react-i18next'

import logoOrange from 'assets/svg/logos/logo-orange.svg'

export const LogoOrange = (props: React.ComponentProps<'img'>) => {
  const { t } = useTranslation()

  return (
    <>
      <img width='210px' src={logoOrange} alt={t('logo_alt')} {...props} />
    </>
  )
}
