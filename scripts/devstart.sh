#!/bin/bash

# Add a new stage by setting a new var named "devstage_<stage_name> with it's API URL"
devstage_prod="https://app.neilpatel.com"
devstage_white="https://white.neilpatelapi.com"
devstage_staging="https://staging.neilpatelapi.com"
devstage_nikitakdev="https://zgbdza9073.execute-api.us-east-1.amazonaws.com/nikitak-dev"
devstage_alexandrsdev="https://idht2le5l6.execute-api.us-east-1.amazonaws.com/alexandrsdev"
devstage_andreypdev="https://0i02m5zxc5.execute-api.us-east-1.amazonaws.com/andreyp-dev"
devstage_brunodev="https://djsz8bg5qj.execute-api.us-east-1.amazonaws.com/brunodev"
devstage_eduardkdev="https://5seqtn862b.execute-api.us-east-1.amazonaws.com/eduardk-dev"
devstage_guzdev="https://xxxv7kofr4.execute-api.us-east-1.amazonaws.com/guzdev"
devstage_iandev="https://7duzpumuv3.execute-api.us-east-1.amazonaws.com/iandev"
devstage_juliusdev="https://jzmlufi3q6.execute-api.us-east-1.amazonaws.com/juliusdev"
devstage_ludev="https://pae892ag6l.execute-api.us-east-1.amazonaws.com/ludev"
devstage_nikitasdev="https://qo891zq2uj.execute-api.us-east-1.amazonaws.com/nikitas-dev"
devstage_walterdev="https://a3cvnhz61i.execute-api.us-east-1.amazonaws.com/walterdev"
devstage_alphadev="https://18ayv3iz22.execute-api.us-east-1.amazonaws.com/alphadev"
devstage_bravodev="https://6o262pggnj.execute-api.us-east-1.amazonaws.com/bravodev"
devstage_charliedev="https://m9zkofr5gg.execute-api.us-east-1.amazonaws.com/charliedev"
devstage_deltadev="https://kyreygdyrg.execute-api.us-east-1.amazonaws.com/deltadev"
devstage_echodev="https://e0ktdy72c0.execute-api.us-east-1.amazonaws.com/echodev"
devstage_foxtrotdev="https://erhbxuudvf.execute-api.us-east-1.amazonaws.com/foxtrotdev"
devstage_golfdev="https://j1tyrd9fz2.execute-api.us-east-1.amazonaws.com/golfdev"
devstage_yankeedev="https://p0q5a00ajh.execute-api.us-east-1.amazonaws.com/yankeedev"

STAGE=$1
DISABLE_RECAPTCHA="${2:-false}"
if [ "$STAGE" == "" ]; then
    echo "Usage: #bash scripts/devstart.sh <stage>"
    exit
fi

URL_KEY=devstage_${STAGE}
URL=${!URL_KEY}

if [ "$URL" == "" ]; then
    echo "Woops, seems like ${STAGE} is invalid"
    exit
fi

echo "DEVSTART: Setting REACT_APP_API_URL for stage ${STAGE}"
export GENERATE_SOURCEMAP=false
export REACT_APP_RECAPTCHA_SITE_KEY=6Lf3knkUAAAAADePIrLQJgVU2j4yv1w3YZ6n-pMB
export REACT_APP_API_URL=${URL}/api
export REACT_APP_OPA_API_URL=https://ha5q9rt9w8.execute-api.us-east-1.amazonaws.com/Dev
export REACT_APP_KW_RELEVANCY_API_URL=https://kwrelevancy-dev-api.neilpatelapi.com
export REACT_APP_AMPLITUDE_API_KEY=53d49a8ddad461186d349e85d9197338
export REACT_APP_KISSMETRICS_KEY=e1cfa7afc6347058fabed23b4ff566b6a2da0953
export REACT_APP_IP_API_KEY=chjtnjQB8SbJ67z
export REACT_APP_RECURLY_PUBLIC_KEY=ewr1-Yq7tkEPWTzyxSB3vz5JPV2
export REACT_APP_DISABLE_LIMIT_FEATURE=false
export REACT_APP_DISABLE_RECAPTCHA=${DISABLE_RECAPTCHA}
export REACT_APP_MOZ_BACKLINKS_HISTORY_FLAG=true
export REACT_APP_ENABLE_SD_ACCURACY_FEATURE=false

# check if location/languages assets exist
if [ ! -e src/constants/languages.json ] || [ ! -e src/constants/locations.json ] || [ ! -e src/constants/configLocLangs.json ]; then
    bash scripts/get-assets-from-s3.sh
fi

echo "API: ${URL}"
echo "DEVSTART: Starting server"

npm start
