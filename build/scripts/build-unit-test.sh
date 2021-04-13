#!/bin/bash
set -e # stops on first error

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "GENERATING BUILD FINGERPRINT"

sed -i "s|CI_PUTS_HERE_LAST_GIT_COMMIT|$LAST_COMMIT|g" /_/app/src/routes/status/statusRoute.js
today=$(date)
sed -i "s|CI_PUTS_HERE_DEPLOY_DATE|$today|g" /_/app/src/routes/status/statusRoute.js

cat /_/app/src/routes/status/statusRoute.js

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "CLEANING TEST FOLDER"

# creates output directory if not exists (locally it will be created on bamboo it will not create cause a docker volume is mounted under /test-reports)
mkdir -p /test-reports 

cd /test-reports && rm -rf ./* && cd ..

echo "test folder recreated"
cd /test-reports && ls -l && cd .. # count content of /test-reports folder

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "RESTORING PACKAGES SOURCES"

cd /_/app/
npm config set store-dir /test-reports/.pnpm-store
npm set progress=false
npm i --prefer-offline
npm update responsa-plugin-core-js

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "WRITE .ENV FILE"
rm -rf .env
echo "ZOHO_CLIENT_ID=${ZOHO_CLIENT_ID}" > .env
echo "ZOHO_CLIENT_SECRET=${ZOHO_CLIENT_SECRET}" >> .env
echo "ZOHO_REFRESH_TOKEN=${ZOHO_REFRESH_TOKEN}" >> .env
echo "OTP_GATEWAY_URL=${OTP_GATEWAY_URL}" >> .env
echo "OTP_API_KEY=${OTP_API_KEY}" >> .env
echo "OTP_FROM_FIELD=${OTP_FROM_FIELD}" >> .env
cat .env

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "LINTING"
npm run lint

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "RUNNING UNIT TEST"
npm run jest:ci

echo "copying unit test result to /test-result folder"
cp test-report.xml /test-reports/TestResult.xml

echo "copying coverage reports to /test-result folder"
rsync -a coverage/lcov-report/ /test-reports