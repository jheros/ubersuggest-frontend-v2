export DEVSTAGE=$1
export BRANCH=$2

IS_CODEBUILD=false
if [[ $CODEBUILD_BUILD_ID ]]; then
    IS_CODEBUILD=true
fi

export DEVSTAGE_VALID_NAMES="dev \
alpha \
bravo \
charlie \
delta \
echo \
foxtrot \
golf \
qa-cow \
hotel \
india \
juliett \
kilo \
lima \
mike \
hotel \
oscar \
papa \
quebec \
romeo \
sierra \
tango \
uniform"

decode() {
    echo ${1} | base64 --decode | jq -r ${2}
}

get_aws_param() {
  PARAM=$(aws ssm get-parameter --name /ubersuggest-constants/frontend/${1}/${2} --with-decryption --query "Parameter.Value" --output text 2>/dev/null)
  if ! [[ $PARAM ]]; then
    PARAM=$(aws ssm get-parameter --name /ubersuggest-constants/frontend/dev/${2} --with-decryption --query "Parameter.Value" --output text 2>/dev/null)
  fi
  echo $PARAM
}

if [[ $DEVSTAGE_VALID_NAMES =~ (^|[[:space:]])$DEVSTAGE($|[[:space:]])  ]]; then

  DEVSTAGE_NAME=$DEVSTAGE

# Commented out until we will discuss the solution below
#   DEVSTAGES_LIST=`aws dynamodb scan --table-name devstages-info | jq '.'`

#     for DEVSTAGE_ITEM in $(echo "${DEVSTAGES_LIST}" | jq -r '.Items | .[] | @base64'); do

#         DEVSTAGE_NAME=$(decode $DEVSTAGE_ITEM '.devstage_name.S')

#         if [[ ( $DEVSTAGE_NAME =~ (^|[[:space:]])$DEVSTAGE($|[[:space:]]) ) ]]; then
#           DEVSTAGE_INFO=$DEVSTAGE_ITEM
#         fi

#     done

#     if ! [[ $DEVSTAGE_INFO ]]; then
#       printf "Devstage info not found\n"
#       exit 2
#     fi

else
  printf "Need a valid devstage name as an argument:\n $DEVSTAGE_VALID_NAMES\n\nExiting...\n"
  exit 1
fi

if [[ $BRANCH ]]; then
  echo "Staring AWS CodeBuil project to deploy $DEVSTAGE devstage based on $BRANCH branch"
  CODEBUILD_RUN=$(aws codebuild start-build --project-name "frontend_dev" --source-version $BRANCH --environment-variables-override="{\"name\": \"STAGE\", \"value\": \"$DEVSTAGE\"}" &)
  exit
fi

# Keep commented until we will decide should we track devstage config and specific properties in devstages-info table
# export DEVSTAGE_NAME=$(decode $DEVSTAGE_INFO '.devstage_name.S')
# export REACT_APP_API_URL=$(decode $DEVSTAGE_INFO '.api_url.S')/api

FRONTEND_URL="https://$DEVSTAGE_NAME.neilpatelapi.com"
export REACT_APP_API_URL="$FRONTEND_URL/api"

# TODO: check for OPA stuff status
#  export REACT_APP_OPA_API_URL=$(decode $DEVSTAGE_INFO '.api_opa_url.S')

if [[ $IS_CODEBUILD == true ]]; then
    GIT_BRANCH=$(git name-rev --name-only --exclude="tags/*" $CODEBUILD_RESOLVED_SOURCE_VERSION | tail -1)
    GIT_HASH=$CODEBUILD_RESOLVED_SOURCE_VERSION
    USER=$CODEBUILD_INITIATOR
    S3_BUCKET_DEST=$(echo $S3_BUCKET_NAME_TEMPLATE | sed s/%devstage_name%/$DEVSTAGE_NAME/g)

else
    export REACT_APP_KW_RELEVANCY_API_URL=$(get_aws_param $DEVSTAGE_NAME "KW_RELEVANCY_API_URL")
    export REACT_APP_RECAPTCHA_SITE_KEY=$(get_aws_param $DEVSTAGE_NAME "RECAPTCHA_SITE_KEY")
    export REACT_APP_AMPLITUDE_API_KEY=$(get_aws_param $DEVSTAGE_NAME "AMPLITUDE_API_KEY")
    export REACT_APP_RECURLY_PUBLIC_KEY=$(get_aws_param $DEVSTAGE_NAME "RECURLY_PUBLIC_KEY")
    export REACT_APP_DISABLE_LIMIT_FEATURE=$(get_aws_param $DEVSTAGE_NAME "DISABLE_LIMITS")
    export REACT_APP_DISABLE_RECAPTCHA=$(get_aws_param $DEVSTAGE_NAME "DISABLE_RECAPTCHA")
    export REACT_APP_KISSMETRICS_KEY=$(get_aws_param $DEVSTAGE_NAME "KISSMETRICS_API_KEY")
    export REACT_APP_MOZ_BACKLINKS_HISTORY_FLAG=$(get_aws_param $DEVSTAGE_NAME "MOZ_BACKLINKS_HISTORY_FLAG")
    export REACT_APP_ENABLE_SD_ACCURACY_FEATURE=$(get_aws_param $DEVSTAGE_NAME "ENABLE_SD_ACCURACY_FEATURE")

    S3_BUCKET_DEST=$(get_aws_param $DEVSTAGE_NAME "S3_BUCKET_NAME_TEMPLATE" | sed s/%devstage_name%/$DEVSTAGE_NAME/g)
    GIT_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
    GIT_HASH=$(git rev-parse --verify HEAD)
    USER=$(git config --get user.name)
    USER_EMAIL=$(git config --get user.email)
fi

S3_FRONTEND_URL="http://$S3_BUCKET_DEST.s3-website-us-east-1.amazonaws.com"
DEPLOY_DATETIME=$(date +%s)

printf ">>> Deploying devstage: $DEVSTAGE_NAME...\n\n"

printf "    S3_BUCKET_DEST: $S3_BUCKET_DEST\n"
printf "    REACT_APP_API_URL: $REACT_APP_API_URL\n"
printf "    GIT_BRANCH: $GIT_BRANCH\n"

printf "\n>>> Getting assets from S3...\n"
bash scripts/get-assets-from-s3.sh

printf ">>> Build...\n"
npm run build

printf ">>> Pushing build files to S3...\n"
aws s3 sync build "s3://$(echo $S3_BUCKET_DEST | sed s/\"//g)" --delete

printf ">>> Updating devstage info...\n"

if [[ IS_CODEBUILD ]]; then
  RESULT=$(aws dynamodb update-item \
    --table-name devstages-info \
    --key "{\"devstage_name\":{\"S\":\"$DEVSTAGE_NAME\"}}" \
    --update-expression "SET frontend_codebuild_build_id=:fe_codebuild_id, frontend_url=:fe_url, frontend_git_user=:fe_user, frontend_git_branch=:fe_branch, frontend_git_hash=:fe_hash, frontend_deployed_at=:fe_deployed_at" \
    --expression-attribute-values "{ \":fe_codebuild_id\": {\"S\":\"$CODEBUILD_BUILD_ID\"}, \":fe_url\": {\"S\":\"$S3_FRONTEND_URL\"}, \":fe_user\": {\"S\":\"$USER\"}, \":fe_branch\": {\"S\":\"$GIT_BRANCH\"}, \":fe_hash\": {\"S\":\"$GIT_HASH\"}, \":fe_deployed_at\": {\"S\":\"$DEPLOY_DATETIME\"} }" &)
else
  RESULT=$(aws dynamodb update-item \
    --table-name devstages-info \
    --key "{\"devstage_name\":{\"S\":\"$DEVSTAGE_NAME\"}}" \
    --update-expression "SET frontend_url=:fe_url, frontend_git_user=:fe_user, frontend_git_branch=:fe_branch, frontend_git_hash=:fe_hash, frontend_deployed_at=:fe_deployed_at" \
    --expression-attribute-values "{ \":fe_url\": {\"S\":\"$S3_FRONTEND_URL\"}, \":fe_user\": {\"S\":\"$USER ($USER_EMAIL)\"}, \":fe_branch\": {\"S\":\"$GIT_BRANCH\"}, \":fe_hash\": {\"S\":\"$GIT_HASH\"}, \":fe_deployed_at\": {\"S\":\"$DEPLOY_DATETIME\"} }" &)
fi
printf ">>> AWS Dynamo update: "
if [[ RESULT ]]; then
  printf "Done\n"
else
  printf "Failed\n"
fi

printf ">>> Frontend URL: $FRONTEND_URL\n"
printf ">>> Done!\n"
