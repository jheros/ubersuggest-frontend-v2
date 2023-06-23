export const getConsultingLink = (code: string) => {
  let url = 'https://neilpatel.com/consulting/'

  switch (code) {
    case 'pt':
      url = 'https://neilpatel.com/br/consultoria/'
      break
    case 'es':
      url = 'https://neilpatel.com/es/consultoria/'
      break
    case 'it':
      url = 'https://neilpatel.com/lets-grow-your-traffic/'
      break
    case 'de':
    case 'fr':
    case 'nl':
    case 'ja':
    case 'zh':
    case 'en':
    default:
      break
  }
  url +=
    '?utm_source=ubersuggest-app&utm_medium=ubersuggest&utm_term=consulting-menu&utm_content=menu&utm_campaign=us-mkt-campaign-sql-ubersuggest-consulting'
  return url
}

export const languageOptions = [
  {
    code: 'en',
    label: 'English (EN)',
    shortLabel: 'EN',
  },
  {
    code: 'pt',
    label: 'Português (BR)',
    shortLabel: 'BR',
  },
  {
    code: 'de',
    label: 'Deutsch (DE)',
    shortLabel: 'DE',
  },
  {
    code: 'es',
    label: 'Español (ES)',
    shortLabel: 'ES',
  },
  {
    code: 'it',
    label: 'Italiano (IT)',
    shortLabel: 'IT',
  },
  {
    code: 'fr',
    label: 'French (FR)',
    shortLabel: 'FR',
  },
  {
    code: 'nl',
    label: 'Dutch (NL)',
    shortLabel: 'NL',
  },
  {
    code: 'ja',
    label: '日本語 (JP)',
    shortLabel: 'JP',
  },
  {
    code: 'zh',
    label: '简体中文 (CN)',
    shortLabel: 'CN',
  },
]
