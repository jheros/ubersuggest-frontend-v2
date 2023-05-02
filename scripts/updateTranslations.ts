import fs from 'fs';
import _ from 'lodash';
import Papa from 'papaparse';

const toLanguageCode = {
  English: 'en',
  Portuguese: 'pt',
  German: 'de',
  Spanish: 'es',
  Italian: 'it',
  French: 'fr',
  Dutch: 'nl',
  Japanese: 'ja',
  Chinese: 'zh',
};

const removedEscaped = (str: string) =>
  [
    [/\\n/g, '\n'],
    [/\\"/, `"`],
  ].reduce((acc, [regex, replacement]) => acc.replace(regex, String(replacement)), str);

if (process.argv.length < 3) {
  // eslint-disable-next-line no-console
  console.log('> Usage: npm run update-translations -- <path-to-csv>');
} else {
  const fileName = process.argv[2];
  // eslint-disable-next-line no-console
  console.log(`> Reading CSV file ${fileName}`);
  const rawCSV = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
  const csv = Papa.parse(rawCSV, {
    header: true,
  });

  const filesToOverwrite = Object.values(toLanguageCode);
  const [langTranslations, missingKeys] = [{}, {}];
  filesToOverwrite.forEach((langCode) => {
    _.set(langTranslations, langCode, {});
    _.set(missingKeys, langCode, 0);
  });
  csv.data.forEach((row: any) => {
    const translationKey = row.Key;
    if (translationKey) {
      Object.entries(toLanguageCode).forEach(([langName, langCode]) => {
        const text = row[langName];
        if (text) {
          _.set(langTranslations, `${langCode}.${translationKey}`, removedEscaped(row[langName]));
        } else {
          // eslint-disable-next-line no-console
          if (langCode === 'en') console.log(translationKey);
          _.set(missingKeys, langCode, _.get(missingKeys, langCode) + 1);
        }
      });
    }
  });
  Object.entries(langTranslations).forEach(([langCode, translations]) => {
    fs.writeFileSync(
      `src/lang/${langCode}.json`,
      JSON.stringify(translations, Object.keys(translations as Object).sort(), 2),
    );
  });

  // eslint-disable-next-line no-console
  console.log('> Finished translating');
  // eslint-disable-next-line no-console
  console.log(`> Missing keys for languages \n ${JSON.stringify(missingKeys, null, 2)}`);
}
