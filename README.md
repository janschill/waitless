# waitless
Eine Client-Server Struktur für die Verwaltung von Tischen und Plätzen in einem Restaurant, durch Ziehen von Nummern und einer darauf folgenden Tisch-/ Platzzuweisung

## Setup

### Homestead
After cloning the repository open `Homestead.yaml`, change `map` to absolute directory.
When a vagrant environment existed, run `vagrant reload` in a terminal window.
To start the VM, run `vagrant up`.
To connect to the database, find the ip of the VM with `ifconfig` when connected through ssh.

If you encounter a problem like `The following SSH command responded with a non-zero exit status.
Vagrant assumes that this means the command failed!`:
vagrant ssh
sudo apt-get install ifupdown
exit
vagrant reload

Maybe a newer vagrant version than in apt might fix this?


#### Vagrant Terminal
```
composer install
vendor/bin/homestead make
(ssh-keygen -t rsa -C "test@waitless.com")
vagrant up
vagrant ssh
cd code
mv /home/vagrant/code/.env.example /home/vagrant/code/.env
```
evtl. env manuell erstellen
```
php artisan key:generate

php artisan migrate
```

#### Serving with Vagrant
Navigate to the root directory of your Vagrant project. With `vagrant up` the VM is started and now reachable in your browser at `192.168.10.10`. If not check your _Homestead.yml_ file and check the value of `ip`
It is also available at `homestead.test`. On Linux, you need to modify `your etc/hosts`-file to use that domain at `192.168.10.10`.

### Laravel Valet local development setup

`valet park` in the current directory to make all folders accessible under `foldername.test`

`valet link app-name` to serve a single app in the current directory under `app-name.test`

## Coding documentation
### Eloquent
We are following Laravel coding conventions like [_Eloquent_](https://laravel.com/docs/5.4/eloquent). Where every database table has a corresponding domain model in PHP. These are used to interact with the database.

Each model has a controller – when needed. These controllers control the data with functions like `index` (action to list all the data) or `show` (action to show single/specific data), these get called from the router and serve to the view, which render them in the browser.
