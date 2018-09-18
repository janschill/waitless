#!/bin/bash

# Give chmod +x install.sh

# git clone
echo -e "\n\033[33mPreparing database …\033[0m"
echo -e "\n\033[33mCreating sqlite database …\033[0m"
touch ./database/database.sqlite
mv .env.sample .env
echo -e "\n\033[33mInstalling …\033[0m"
echo -e "\n\033[33mInstalling composer packages …\033[0m"
composer install --optimize-autoloader
echo -e "\n\033[33mInstalling node packages …\033[0m"
npm install
gulp
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

# read -p "Do you want me to take out the trash (remove node_modules etc.)? [y/N]: " -n 1 -r
# echo
# if ! [[ $REPLY =~ ^[Yy]$ ]]; then
#   echo -e "\n\033[33mRemoving node_modules …\033[0m"
#   rm -rf node_modules

# fi