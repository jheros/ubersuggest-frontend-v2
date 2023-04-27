# get assets from s3
aws s3 cp s3://ubersuggest-assets/languagesV5.json src/constants/languages.json
aws s3 cp s3://ubersuggest-assets/countriesLocations.json src/constants/locations.json
aws s3 cp s3://ubersuggest-assets/configLocLangsV2.json src/constants/configLocLangs.json
aws s3 cp s3://ubersuggest-assets/countriesConfigV2.json src/constants/countriesConfig.json
