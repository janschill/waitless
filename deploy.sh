#!/bin/bash

USER=pi
IPADDRESS=192.168.188.35

echo 'Deployment'
echo '=========='
echo ''
echo 'Connecting to server'
echo 'Server:' $IPADDRESS
echo 'User:' $USER
ssh -q -o ConnectTimeout=5 $USER@$IPADDRESS exit
if [[ $? == 255 ]]; then
  echo 'Connection error'
  exit
else
  echo 'Connection established'
  echo 'Begin upload'
  echo '============'
  echo '1/5 Uploading composer files'
  rsync -av -e "ssh" composer.json composer.lock $USER@$IPADDRESS:/var/www/
fi

# ssh $USER@$IPADDRESS << EOF
#   cd /var/www/
# EOF
echo 'Running gulp…'
echo 'Deployment finished'
echo ''