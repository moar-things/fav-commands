#!/usr/bin/env bash

# get directory of this script
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
SCRIPT_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

# create a temp file, arrange to delete it when we're done
TMP_FILE=$(mktemp /tmp/fav-commands-output.XXXXXX)

# run the node program that displays the menu
node $SCRIPT_DIR/fav-commands.js $* 2> $TMP_FILE
STATUS_CODE=$?

# if we got a 0 status code, execute content of temp file
if [ $STATUS_CODE -eq 0 ]
then
  source $TMP_FILE
fi

# remove temp file
rm -f $TMP_FILE
