DEVSTAGE=$1
DISABLE_RECAPTCHA="${2:-false}"

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

if [ "$DEVSTAGE" == "" ]; then
    printf "Usage: ${WHITE}bash scripts/devstart.sh <devstage>${NC}\n"
    printf "Choose one of: ${WHITE}${DEVSTAGE_VALID_NAMES}${NC}\n"
    exit
fi

if [[ ! $DEVSTAGE_VALID_NAMES =~ (^|[[:space:]])$DEVSTAGE($|[[:space:]])  ]]; then
  printf "Need a correct devstage argument.\nChoose one of: ${WHITE}${DEVSTAGE_VALID_NAMES}${NC}\n\n"
  exit 2
fi
 
printf "${GREEN}>>>${NC} Initializing local development serverver, API: ${WHITE}${DEVSTAGE}${NC}\n"
printf "${GREEN}>>>${NC} Fetching application parameters...\n\n"

ROOT_URL="https://${DEVSTAGE}.neilpatelapi.com"

export GENERATE_SOURCEMAP=false

export REACT_APP_API_URL="${ROOT_URL}/api"
export REACT_APP_AIWRITER_BASE_URL="${ROOT_URL}/aiwriter/"
export REACT_APP_DISABLE_RECAPTCHA=${DISABLE_RECAPTCHA}

export REACT_APP_RECAPTCHA_SITE_KEY="$(aws ssm get-parameter --name /new-ubersuggest/dev/RECAPTCHA_SITE_KEY --with-decryption | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_AMPLITUDE_API_KEY="$(aws ssm get-parameter --name /ubersuggest-constants/frontend/dev/AMPLITUDE_API_KEY | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_KW_RELEVANCY_API_URL="$(aws ssm get-parameter --name /new-ubersuggest/dev/KW_RELEVANCY_API_URL --with-decryption | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_IP_API_KEY="$(aws ssm get-parameter --name /ubersuggest-constants/frontend/dev/IP_API_KEY --with-decryption | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_DISABLE_LIMIT_FEATURE="$(aws ssm get-parameter --name /ubersuggest-constants/dev/DISABLE_LIMITS | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_KISSMETRICS_KEY="$(aws ssm get-parameter --name /ubersuggest-constants/dev/KISSMETRICS_API_KEY --with-decryption | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_MOZ_BACKLINKS_HISTORY_FLAG="$(aws ssm get-parameter --name /ubersuggest-constants/dev/MOZ_BACKLINKS_HISTORY_FLAG | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_RECURLY_PUBLIC_KEY="$(aws ssm get-parameter --name /new-ubersuggest/dev/REACT_APP_RECURLY_PUBLIC_KEY --with-decryption | jq .Parameter.Value | sed s/\"//g)"

printf "                       GENERATE_SOURCEMAP: ${WHITE}${GENERATE_SOURCEMAP}${NC}\n\n"
printf "                        REACT_APP_API_URL: ${WHITE}${REACT_APP_API_URL}${NC}\n"
printf "              REACT_APP_AIWRITER_BASE_URL: ${WHITE}${REACT_APP_AIWRITER_BASE_URL}${NC}\n"
printf "           REACT_APP_KW_RELEVANCY_API_URL: ${WHITE}${REACT_APP_KW_RELEVANCY_API_URL}${NC}\n\n"

printf "              REACT_APP_DISABLE_RECAPTCHA: ${WHITE}${REACT_APP_DISABLE_RECAPTCHA}${NC}\n"
printf "             REACT_APP_RECAPTCHA_SITE_KEY: ${WHITE}${REACT_APP_RECAPTCHA_SITE_KEY}${NC}\n"
printf "              REACT_APP_AMPLITUDE_API_KEY: ${WHITE}${REACT_APP_AMPLITUDE_API_KEY}${NC}\n"
printf "                     REACT_APP_IP_API_KEY: ${WHITE}${REACT_APP_IP_API_KEY}${NC}\n"
printf "          REACT_APP_DISABLE_LIMIT_FEATURE: ${WHITE}${REACT_APP_DISABLE_LIMIT_FEATURE}${NC}\n"
printf "                REACT_APP_KISSMETRICS_KEY: ${WHITE}${REACT_APP_KISSMETRICS_KEY}${NC}\n"
printf "     REACT_APP_MOZ_BACKLINKS_HISTORY_FLAG: ${WHITE}${REACT_APP_MOZ_BACKLINKS_HISTORY_FLAG}${NC}\n"
printf "             REACT_APP_RECURLY_PUBLIC_KEY: ${WHITE}${REACT_APP_RECURLY_PUBLIC_KEY}${NC}\n\n"

if [ ! -e src/utils/languages.json ] || [ ! -e src/utils/locations.json ] || [ ! -e src/utils/configLocLangs.json ]; then
    printf "${GREEN}>>>${NC} Dowloading assets...\n"
    bash scripts/get-assets-from-s3.sh
fi

printf "${GREEN}>>>${NC} Starting server...\n"

COLOR=1 npm start | cat
