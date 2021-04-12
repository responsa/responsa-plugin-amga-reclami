#!/usr/bin/env awk

{DEFAULT = 1}

/^[[:space:][:alpha:]]+/ { 
    if ($0 == "  zoho: {") {
        flag = 1
        print $0
    }
    else if (flag == 1) {
        if ($0 == "  },") {
            flag = 0
        }
        else {
            if ($0 ~ /.*account: .*,/) {
              print "    account: \"" ZOHO_ACCOUNT "\","
            } else if ($0 ~ /.*account: .*/) {
              print "    account: \"" ZOHO_ACCOUNT "\""
            } else if ($0 ~ /.*project: .*,/) {
              print "    project: \"" ZOHO_PROJECT "\","
            } else if ($0 ~ /.*project: .*/) {
              print "    project: \"" ZOHO_PROJECT "\""
            } else {
              print $0
            }
        }
    }
    else if (flag == 0) {
        print $0
        DEFAULT = 0
    }
}

DEFAULT {
    if (flag == 0) {
        print $0
    }
}