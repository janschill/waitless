#!/bin/bash

echo 'Installing …'
# git clone
echo 'Installing composer packages …'
composer install
echo 'Installing node packages …'
npm install