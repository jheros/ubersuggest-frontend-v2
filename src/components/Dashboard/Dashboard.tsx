import { useTranslation } from 'react-i18next'

import { Typography } from '@ubersuggest/common-ui'
import { UberLoader } from 'components/UberLoader'

export const Dashboard = () => {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant='h1'>{t('dashboard')}</Typography>
      <UberLoader />
    </>
  )
}
