import { useTranslation } from 'react-i18next'

import { SeoTipLoader } from '@ubersuggest/common-ui'

export const UberLoader = () => {
  const { t } = useTranslation()

  // TODO: Update SeoTipLoader common-ui component to have translation support.
  const tipTexts = {
    seo_tip1: t('seo_tip1'),
    seo_tip2: t('seo_tip2'),
    seo_tip3: t('seo_tip3'),
    seo_tip4: t('seo_tip4'),
    seo_tip5: t('seo_tip5'),
    seo_tip6: t('seo_tip6'),
    seo_tip7: t('seo_tip7'),
    seo_tip8: t('seo_tip8'),
    seo_tip9: t('seo_tip9'),
    seo_tip10: t('seo_tip10'),
    seo_tip11: t('seo_tip11'),
    seo_tip12: t('seo_tip12'),
    seo_tip13: t('seo_tip13'),
    seo_tip14: t('seo_tip14'),
    seo_tip15: t('seo_tip15'),
    seo_tip16: t('seo_tip16'),
    seo_tip17: t('seo_tip17'),
    seo_tip18: t('seo_tip18'),
    seo_tip19: t('seo_tip19'),
    seo_tip20: t('seo_tip20'),
    seo_tip21: t('seo_tip21'),
    seo_tip22: t('seo_tip22'),
    seo_tip23: t('seo_tip23'),
    seo_tip24: t('seo_tip24'),
    seo_tip25: t('seo_tip25'),
    seo_tip26: t('seo_tip26'),
    seo_tip27: t('seo_tip27'),
    seo_tip28: t('seo_tip28'),
    seo_tip29: t('seo_tip29'),
    seo_tip30: t('seo_tip30'),
  }
  return <SeoTipLoader title={t('seo_tip_of_the_day')} tips={tipTexts} />
}
