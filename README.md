# waitless
Eine Client-Server Struktur für die Verwaltung von Tischen und Plätzen in einem Restaurant, durch Ziehen von Nummern und einer darauf folgenden Tisch-/ Platzzuweisung

## Homestead

### Setup
After cloning the repository open `Homestead.yaml`, change `map` to absolute directory.
When a vagrant environment existed, run `vagrant reload` in a terminal window.
To start the VM, run `vagrant up`.
To connect to the database, find the ip of the VM with `ifconfig` when connected through ssh.

#### Vagrant Terminal 
composer install
vendor/bin/homestead make
vagrant up
vagrant ssh
cd code
mv /home/vagrant/code/.env.example /home/vagrant/code/.env
evtl. env manuell erstellen
php artisan key:generate

php artisan migrate


## Laravel Valet local development setup

`valet park` in the current directory to make all folders accessible under `foldername.test`

`valet link app-name` to serve a single app in the current directory under `app-name.test`




