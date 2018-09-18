#!/bin/bash

# Give chmod +x install.sh

# git clone
echo -e "\n\033[33mPreparing database …\033[0m"
echo -e "\n\033[33mCreating sqlite database …\033[0m"
touch database/database.sqlite
mv .env.sample .env
echo -e "\n\033[33mInstalling …\033[0m"
echo -e "\n\033[33mInstalling composer packages …\033[0m"
composer install --optimize-autoloader
echo -e "\n\033[33mInstalling node packages …\033[0m"
npm install
gulp
npm run dev
echo -e "\n\033[33mConfigurating application …\033[0m"
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan queue:restart

echo -e "\n\033[33mSetting application environment to production …\033[0m"
sed -i '' 's/APP_ENV=local/APP_ENV=production/g' .env

echo -e "Installation finished. Thank you."

read -p "Do you want me to start a server on localhost:8080? [y/N]: " -n 1 -r
echo
if ! [[ $REPLY =~ ^[Yy]$ ]]; then
  echo -e "\n\033[33mStarting server on http://localhost:8080/ …\033[0m"
  echo -e "\n\033[33mClose Terminal tab or kill process with following ID to shutdown server:\033[0m"
  nohup php artisan serve --port=8080 > localhost.log 2>&1 &
fi

# read -p "Do you want me to take out the trash (remove node_modules etc.)? [y/N]: " -n 1 -r
# echo
# if ! [[ $REPLY =~ ^[Yy]$ ]]; then
#   echo -e "\n\033[33mRemoving node_modules …\033[0m"
#   rm -rf node_modules

# fi