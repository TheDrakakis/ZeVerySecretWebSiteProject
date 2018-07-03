#!/bin/bash
# travis_deploy.sh $TRAVIS_BUILD_DIR
TRAVIS_BUILD_DIR=$1
if [ -z "$TRAVIS_BUILD_DIR" ]; then
  echo "TRAVIS_BUILD_DIR is Empty $TRAVIS_BUILD_DIR"
  exit 1
else
  echo "Vars are OK, let's go"
fi
if rsync -ravz --delete-after --quiet $TRAVIS_BUILD_DIR/dist/ automate@back1.igotta.beer:/var/www/jesuisunconnard.com; then
  echo "rsync OK"
else
  echo "rsync failed"
  exit 1
fi
