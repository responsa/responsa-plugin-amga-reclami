#!/bin/sh
# =============================================================================
#  Author: Chu-Siang Lai / chusiang (at) drx.tw
#  Filename: teams-chat-post.sh
#  Modified: 2018-03-28 15:04
#  Description: Post a message to Microsoft Teams.
#  Reference:
#
#   - https://gist.github.com/chusiang/895f6406fbf9285c58ad0a3ace13d025
#
# =============================================================================

# Help.
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
  echo 'Usage: teams-chat-post.sh "<webhook_url>" "<title>" "<image_url>" "<message>"'
  exit 0
fi

# Webhook or Token.
TEAMS_WEBHOOK_URL=$1
if [[ "${TEAMS_WEBHOOK_URL}" == "" ]]
then
  echo "No webhook."
  exit 1
fi
shift

# Title .
TITLE=$1
if [[ "${TITLE}" == "" ]]
then
  echo "No title specified."
  exit 1
fi
shift

# IMAGE.
IMAGE=$1
if [[ "${IMAGE}" == "" ]]
then
  echo "No image specified."
  exit 1
fi
shift

# Text.
TEXT=$*
if [[ "${TEXT}" == "" ]]
then
  echo "No text specified."
  exit 1
fi

# Convert formating.
MESSAGE=$( echo ${TEXT} | sed 's/"/\"/g' | sed "s/'/\'/g" )
JSON="{ \"@type\": \"MessageCard\", \"@context\": \"http://schema.org/extensions\", \"summary\": \"${TITLE}\", \"sections\": [{ \"activityTitle\": \"${TITLE}\", \"activitySubtitle\": \"${MESSAGE}\", \"images\": [{ \"image\": \"${IMAGE}\", \"title\": \"IMG\"}], \"markdown\": true}] }"


# Post to Microsoft Teams.
echo "sending message to teams: "
echo $JSON

curl -H "Content-Type: application/json" -d "${JSON}" "${TEAMS_WEBHOOK_URL}"