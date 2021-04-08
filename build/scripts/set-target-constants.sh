#!/bin/bash
set -e # stops on first error

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "SET TARGET CONSTANTS & SECRETS..."

do_replace() {
  sed -i "/$find/c\ $replace_with" $target_file
  echo "$target_file contents:"
  cat $target_file
}

echo "replacing app insight key"
target_file=/install/package.json
find="node src\/index.js |"
replace_with="\"start\": \"node src\/index.js | pino-applicationinsights --key $APP_INSIGHT_KEY\","

do_replace $target_file $find $replace_with


echo "replacing api secret"
target_file=/install/src/application/config.js
find="secretValue: 'SECRET',"
replace_with="secretValue: '$SECRET',"

do_replace $target_file $find $replace_with

echo "replacing elastic uri"
target_file=/install/src/application/config.js
find="elasticUri: 'https:\/\/localhost:9200',"
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