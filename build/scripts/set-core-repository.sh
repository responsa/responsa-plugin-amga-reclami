#!/bin/bash
set -e # stops on first error


echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "SET PLUGIN CORE SOURCE"

do_replace() {
    sed -i "/$find/c\ $replace_with" $target_file
    echo "$target_file contents:"
    cat $target_file
}

target_file=/_/app/package.json
find="\"responsa-plugin-core-js\": \"git+https:\/\/github.com\/responsaeuris\/responsa-plugin-core-js.git#develop\""
replace_with="\"responsa-plugin-core-js\": \"${PLUGIN_CORE_SOURCE_REF}\""

do_replace $target_file $find $replace_with