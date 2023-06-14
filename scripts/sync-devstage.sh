export DEVSTAGE=$1

GREEN="\033[1;32m"
WHITE="\033[1;37m"
NC="\033[0m"

DEVSTAGE_VALID_NAMES="alpha \
bravo \
charlie \
delta \
echo \
foxtrot \
golf \
hotel \
india \
juliett \
kilo \
lima \
mike \
november \
oscar \
papa \
quebec \
romeo \
sierra \
tango \
uniform \
victor \
whiskey \
xray \
yankee \
zulu \
staging"


if [ "x$DEVSTAGE" = "x" ]; then
  printf "Need devstage argument.\nChoose one of: ${WHITE}${DEVSTAGE_VALID_NAMES}${NC}\n\n"
  exit 1
fi

is_old_deploy=0
if [[ ! $DEVSTAGE_VALID_NAMES =~ (^|[[:space:]])$DEVSTAGE($|[[:space:]])  ]]; then
  is_old_deploy=1
fi

printf "${GREEN}>>>${NC} Deploying Ubersuggest FE app to: ${WHITE}${DEVSTAGE}${NC}\n"

DEPLOY_START=`date +%s`

printf "${GREEN}>>>${NC} Fetching application parameters...\n"
if [[ $is_old_deploy == 0 ]]; then
  ROOT_URL="https://${DEVSTAGE}.neilpatelapi.com"
  S3_BUCKET="s3://ubersuggest-frontend-devstage-${DEVSTAGE}"
  export REACT_APP_API_URL="${ROOT_URL}/api"
else
  DEVSTAGE_INFO="$(aws dynamodb get-item --table-name devstages-info --key '{"devstage_name": {"S": "'"$DEVSTAGE"'"}}')"
  if [ "x$DEVSTAGE_INFO" = "x" ]; then
    printf "Devstage ${WHITE}$DEVSTAGE${NC} has no info, exiting\n"
    exit 1
  fi
  ROOT_URL="http://new-ubersuggest-devstage-${DEVSTAGE}.s3-website-us-east-1.amazonaws.com"
  S3_BUCKET="s3://new-ubersuggest-devstage-${DEVSTAGE}"
  export REACT_APP_API_URL=$(echo $DEVSTAGE_INFO | jq .Item.api_url.S | sed s/\"//g)/api
fi

export REACT_APP_AIWRITER_BASE_URL="/aiwriter/"
export REACT_APP_AMPLITUDE_API_KEY=53d49a8ddad461186d349e85d9197338

export REACT_APP_DISABLE_LIMIT_FEATURE="$(aws ssm get-parameter --name /ubersuggest-constants/dev/DISABLE_LIMITS | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_DISABLE_RECAPTCHA="$(aws ssm get-parameter --name /ubersuggest-constants/dev/DISABLE_RECAPTCHA | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_KISSMETRICS_KEY="$(aws ssm get-parameter --name /ubersuggest-constants/dev/KISSMETRICS_API_KEY --with-decryption | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_KW_RELEVANCY_API_URL="$(aws ssm get-parameter --name /new-ubersuggest/dev/KW_RELEVANCY_API_URL --with-decryption | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_MOZ_BACKLINKS_HISTORY_FLAG="$(aws ssm get-parameter --name /ubersuggest-constants/dev/MOZ_BACKLINKS_HISTORY_FLAG | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_RECAPTCHA_SITE_KEY="$(aws ssm get-parameter --name /new-ubersuggest/dev/RECAPTCHA_SITE_KEY --with-decryption | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_RECURLY_PUBLIC_KEY="$(aws ssm get-parameter --name /new-ubersuggest/dev/REACT_APP_RECURLY_PUBLIC_KEY --with-decryption | jq .Parameter.Value | sed s/\"//g)"

printf "${GREEN}>>>${NC} Dowloading assets...\n"
bash scripts/get-assets-from-s3.sh

printf "${GREEN}>>>${NC} Starting application build...\n"
BUILD_START=`date +%s`

npm run build

BUILD_END=`date +%s`
BUILD_TIME=$((BUILD_END-BUILD_START))

printf "${GREEN}>>>${NC} Deploying the build to S3...\n "
aws s3 sync build "${S3_BUCKET}" --delete

DEPLOY_END=`date +%s`
DEPLOY_TIME=$((DEPLOY_END-DEPLOY_START))

printf "${GREEN}>>>${NC} Build took ${WHITE}${BUILD_TIME}${NC} seconds\n"
printf "${GREEN}>>>${NC} The whole deploy took ${WHITE}${DEPLOY_TIME}${NC} seconds\n\n"
printf "${GREEN}>>>${NC} Devstage URL: ${WHITE}${ROOT_URL}${NC}\n\n"
