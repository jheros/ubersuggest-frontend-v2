export DEVSTAGE=$1
echo $DEVSTAGE
if [ "x$DEVSTAGE" = "x" ]; then
  echo "Need devstage argument."
  exit 1
fi
export DEVSTAGE_INFO="$(aws dynamodb get-item --table-name devstages-info --key '{"devstage_name": {"S": "'"$DEVSTAGE"'"}}')"
if [ "x$DEVSTAGE_INFO" = "x" ]; then
  echo "Devstage $DEVSTAGE has no info"
  exit 1
fi
export REACT_APP_API_URL=$(echo $DEVSTAGE_INFO | jq .Item.api_url.S | sed s/\"//g)/api
export REACT_APP_KW_RELEVANCY_API_URL=$(echo $DEVSTAGE_INFO | jq .Item.kw_relevancy_api_url.S | sed s/\"//g)
export RECAPTCHA_SITE_KEY_PARAM=$(echo $DEVSTAGE_INFO | jq .Item.recaptcha_site_key_param.S | sed s/\"//g)
export REACT_APP_RECAPTCHA_SITE_KEY="$(aws ssm get-parameter --name $RECAPTCHA_SITE_KEY_PARAM --with-decryption | jq .Parameter.Value | sed s/\"//g)"
export S3_BUCKET_DEST=$(echo $DEVSTAGE_INFO | jq .Item.s3_bucket.S)
export REACT_APP_AMPLITUDE_API_KEY=53d49a8ddad461186d349e85d9197338
export REACT_APP_RECURLY_PUBLIC_KEY="$(aws ssm get-parameter --name /new-ubersuggest/dev/REACT_APP_RECURLY_PUBLIC_KEY --with-decryption | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_DISABLE_LIMIT_FEATURE="$(aws ssm get-parameter --name /ubersuggest-constants/dev/DISABLE_LIMITS | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_DISABLE_RECAPTCHA="$(aws ssm get-parameter --name /ubersuggest-constants/dev/DISABLE_RECAPTCHA | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_KISSMETRICS_KEY="$(aws ssm get-parameter --name /ubersuggest-constants/dev/KISSMETRICS_API_KEY --with-decryption | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_MOZ_BACKLINKS_HISTORY_FLAG="$(aws ssm get-parameter --name /ubersuggest-constants/dev/MOZ_BACKLINKS_HISTORY_FLAG | jq .Parameter.Value | sed s/\"//g)"
export REACT_APP_ENABLE_SD_ACCURACY_FEATURE="$(aws ssm get-parameter --name /ubersuggest-constants/dev/ENABLE_SD_ACCURACY_FEATURE | jq .Parameter.Value | sed s/\"//g)"


# get assets from s3
bash scripts/get-assets-from-s3.sh
start=`date +%s`
npm run build
end=`date +%s`
buildtime=$((end-start))
# push files to s3
aws s3 sync build "s3://$(echo $S3_BUCKET_DEST | sed s/\"//g)" --delete
echo "Build took $buildtime seconds"
