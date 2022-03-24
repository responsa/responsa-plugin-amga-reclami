#!/bin/bash
set -e # stops on first error

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "SET TARGET CONSTANTS & SECRETS..."

do_replace() {
  sed -i "/$find/c\ $replace_with" $target_file
  echo "$target_file contents:"
  cat $target_file
}

echo "replacing api secret"
target_file=/install/src/application/config.js
find="secretValue: 'SECRET',"
replace_with="secretValue: '$SECRET',"

do_replace $target_file $find $replace_with

echo "replacing elastic uri"
target_file=/install/src/application/config.js
find="elasticUri: 'Ciccio:',"
replace_with="elasticUri: '$ELASTIC_URI',"

do_replace $target_file $find $replace_with

echo "replacing elastic user"
target_file=/install/src/application/config.js
find="elasticUser: 'newboss',"
replace_with="elasticUser: '$ELASTIC_USER',"

do_replace $target_file $find $replace_with

echo "replacing elastic password"
target_file=/install/src/application/config.js
find="elasticPassword: 'newboss',"
replace_with="elasticPassword: '$ELASTIC_PASSWORD',"

do_replace $target_file $find $replace_with

echo "replacing elastic index"
target_file=/install/src/application/config.js
find="elasticIndex: 'some-index',"
replace_with="elasticIndex: '$ELASTIC_INDEX',"

do_replace $target_file $find $replace_with

echo "replacing zoho infos"
ZOHO_ACCOUNT=${ZOHO_ACCOUNT%\"}
ZOHO_ACCOUNT=${ZOHO_ACCOUNT#\"}
ZOHO_PROJECT=${ZOHO_PROJECT%\"}
ZOHO_PROJECT=${ZOHO_PROJECT#\"}
awk -v ZOHO_ACCOUNT="${ZOHO_ACCOUNT}" -v ZOHO_PROJECT="${ZOHO_PROJECT}" -f /_/build/scripts/zoho.awk /install/src/application/config.js > tmp-config.js && mv tmp-config.js /install/src/application/config.js
cat /install/src/application/config.js

echo "replacing servers"
SERVERS=${SERVERS%\"}
SERVERS=${SERVERS#\"}
awk -v SERVERS="${SERVERS}" -f /_/build/scripts/servers.awk /install/src/application/config.js > tmp-config.js && mv tmp-config.js /install/src/application/config.js
cat /install/src/application/config.js