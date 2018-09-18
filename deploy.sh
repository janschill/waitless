#!/bin/bash

USER=pi
IPADDRESS=192.168.188.24
PATHTOAPPLICATION=/var/www/
PUSHERTEST=114acbe8c014f66e32ae
PUSHERLIVE=b969cc7c562cd5d3f890

echo '****************************************'
echo '*              Deployment              *'
echo '* ------------------------------------ *'
echo '*                                      *'
echo '* - Prepare pusher for production      *'
echo '* - Build pusher JavaScript            *'
echo '* - Build production JavaScript        *'
echo '* - Build production Stylesheets       *'
echo '****************************************'
sed -i '' 's/'"$PUSHERTEST"'/'"$PUSHERLIVE"'/g' resources/assets/javascripts/bootstrap/bootstrap.js
npm run dev
gulp
echo '**************************'
echo '* Connecting to server   *'
echo '* Server:' $IPADDRESS   '*'
echo '* User:' $USER '              *'
echo '**************************'
ssh -q -o ConnectTimeout=5 $USER@$IPADDRESS exit
if [[ $? == 255 ]]; then
  echo '**************************'
  echo '*    Connection error    *'
  echo '**************************'
  exit
else
  echo '********************************'
  echo '*          1/3 Upload          *'
  echo '* ---------------------------- *'
  echo '*                              *'
  echo '* - Composer                   *'
  echo '********************************'
  rsync -av -e "ssh" composer.json composer.lock $USER@$IPADDRESS:$PATHTOAPPLICATION
  echo '********************************'
  echo '*          2/3 Upload          *'
  echo '* ---------------------------- *'
  echo '*                              *'
  echo '* - Laravel                    *'
  echo '* - Resources                  *'
  echo '********************************'
  rsync -av -e "ssh" --delete --exclude="public/storage" --exclude="public/resources/assets/javascripts/bootstrap/bootstrap.js" app bootstrap config database public resources routes tests vendor artisan phpunit.xml $USER@$IPADDRESS:$PATHTOAPPLICATION
  echo '********************************'
  echo '*          3/3 Upload          *'
  echo '* ---------------------------- *'
  echo '*                              *'
  echo '* - .env.live                  *'
  echo '********************************'
  rsync -av -e "ssh" .env.live $USER@$IPADDRESS:$PATHTOAPPLICATION.env
  echo '****************************'
  echo '*    Begin installation    *'
  echo '* ------------------------ *'
  echo '*                          *'
  echo '* - Install composer       *'
  echo '* - Clear cache            *'
  echo '* - Restart queue          *'
  echo '* - Config/route cache     *'
  echo '****************************'
  ssh $USER@$IPADDRESS << EOF
  cd $PATHTOAPPLICATION &&
    yes | composer install --optimize-autoloader &&
    yes | php_cli artisan cache:clear &&
    yes | php_cli artisan view:clear &&
    yes | php_cli artisan queue:restart &&
    yes | php_cli artisan config:cache &&
    yes | php_cli artisan route:cache
EOF
  echo '*******************************************************'
  echo '*  Change .env.live application status to production  *'
  echo '*******************************************************'
  sed -i '' 's/APP_ENV=local/APP_ENV=production/g' .env
  ssh $USER@$IPADDRESS << EOF
  cd $PATHTOAPPLICATION &&
    yes | php artisan migrate &&
    yes | php artisan db:seed
EOF
echo '*********************************'
echo '* Reverting pusher key to local *'
echo '*********************************'
sed -i '' 's/'"$PUSHERLIVE"'/'"$PUSHERTEST"'/g' resources/assets/javascripts/bootstrap/bootstrap.js
npm run dev
fi
echo '*****************************'
echo '*    Deployment finished    *'
echo '*****************************'
