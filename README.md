# waitless

[![Build Status](https://travis-ci.com/janschill/weinstube_waitless.svg?token=kyy8x99kJVDJb9GoYEGS&branch=master)](https://travis-ci.com/janschill/weinstube_waitless)

waitless is a client-server application using Laravel to manage the waiting guests in a restaraunt.

It uses two clients, where one is used to welcome new guests and register them into the system and the other is used inside the restaurant by the service to allocate the guests to a table.

## Getting started

### Installation

1. Clone this repository: `git clone git@github.com:janschill/waitless.git`
1. Give installation script appropiate permissions: `chmod +x install.sh`
1. Finish

The installation script will instantiate an sqlite database and will – when prompted – start a localhost server on `localhost:8080`.
It will create an application key and migrate the database and populate it with needed data.

Pusher will have to be setup manually, due to the requirement of an account.

If you do not want to use the `install.sh` script you can get the application running as follow:

- Run `composer install` and `node install` to get all dependencies
- Get generated JavaScripts and Stylesheets. You might need gulp-cli (`npm install -g gulp-cli`)
- Bundle JavaScripts with `npm run dev` (only needed for Pusher)
- Setup a database and put in the connection information in `.env`
- Make sure you have an application key (`php artisan key:generate`)
- Migrate the database `php artisan migrate`
- Get needed data in database `php artisan db:seed`
- Happy coding :)

### Usage

At the moment `waitless` is programmed very specific to fullfill a clients desire, but it is planned to refactor the whole project, to use a modern JavaScript framework and make the whole project more generic.

### Server

To configure the server (Raspberry Pi) to have a static IP address follow this guide:
[Guide](https://raspberrypi.stackexchange.com/questions/37920/how-do-i-set-up-networking-wifi-static-ip-address/37921#37921)

Most important file:
`sudo vi /etc/dhcpcd.conf`

## Setup for development

In the following we will introduce the technologies used in this project. We will give a brief introduction and explain: how it works, how we implemented it, error that may have occured and explain why we chose the service over others or at all.

### Vagrant

[Vagrant](https://www.vagrantup.com/) provides a simple, elegant way to manage and provision Virtual Machines.

### Homestead

[Homestead](https://laravel.com/docs/5.6/homestead) is an official, pre-packaged Vagrant box that provides a development environment without requiring to install PHP, a web server, and any other server software on the local machine.

#### Problems

- After cloning the repository open `Homestead.yaml`, change `map` to absolute directory.
- When a Vagrant environment existed, run `vagrant reload` in a terminal window.
- To start the VM, run `vagrant up`.
- To connect to the database, find the IP address of the VM with `ifconfig` when connected through ssh.

If you encounter a problem like `The following SSH command responded with a non-zero exit status.
Vagrant assumes that this means the command failed!`:

```bash
vagrant ssh
sudo apt-get install ifupdown
exit
vagrant reload
```

Maybe a newer vagrant version than in apt might fix this?

#### Vagrant Terminal

```bash
composer install
vendor/bin/homestead make
(ssh-keygen -t rsa -C "test@waitless.com")
vagrant up
vagrant ssh
cd code
mv /home/vagrant/code/.env.example /home/vagrant/code/.env
```

If this fails, check if .env.example existst. If not: touch .env and past this into it: [Example env file](https://github.com/laravel/laravel/blob/master/.env.example)

In the VM:

```bash
php artisan key:generate
php artisan migrate
```

Now connect to the database and execute the SQL-file to initialize the table data.

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

### Migration

Migrations are used to progressively adapt the database as you develop your application. Whenever you want to change the structure within your database you write a migration, which can also rollback:

```php
function up()
{
    // Make database changes like addColumn
}

function down()
{
    // Rollback like dropColumn
}
```

### Seeding

In the next chapter we talk about testing, to successfully test an application, the database needs data, which we populate in Laravel using `Seeds` and `Factories`.

Create a `ExampleTableSeeder.php` file in `database/seeds`.

```php
use Illuminate\Database\Seeder;

class ExampleTableSeeder extends Seeder {
    public function run ()
    {
        factory('App\ExampleModel', 10)->create();
    }
}
```

Now in the `database/factories/ModelFactory.php` file we will, tell the seeder with what kind of data we want to create our __seeds__.

```php
$factory->define(App\ExampleModel::class, function (Faker $faker) {
    return [
        'row_name_1' => $faker->sentence,
        'row_name_2' => rand(0,10)
    ];
});
```

Here we can use the `fakeer` instance to let [Faker](https://github.com/fzaninotto/Faker) generate us dummy data or we use our own.

To prevent appending the generated data and just add the generated data to an empty table, we need to truncate the tables. We do that in `database/seeds/DatabaseSeeder.php`. Here we also call our seeders.

```php
protected $toTruncate = ['example_table_1', 'example_table_2'];

public function run()
{
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');

    foreach ($this->toTruncate as $table) {
        DB::table($table)->truncate();
    }

    $this->call('Example1TableSeeder');
    $this->call('Example2TableSeeder');
}
```

When working in database, we need to dump the composer autoload.
`composer dump-autoload`

To run seeds
`php artisan db:seed`

### Testing

#### Unit

Unit testing concetrates on the smallest portion of the program code – a single unit or function. It tests if a function returns an expected result.
Theses test will be written in the `tests/Unit` directory and are excuted with `phpunit` in the command line. We wrote a copule of tests, which are tested with Travis.

For example we always had to have four `states`, those had to be in the database on going live. So we wrote a Seeder, which populated the database table and after that a test would make sure thoses states were in the correct table with always same id.

### Tinker

Laravel's tinker is a `read-eval-print-loop`, which takes user input and returns the result to command line. Tinker allows direct interaction with the application. For example if we want to restore a soft deleted record, will be as follows:

```shell
php artisan tinker
# Tinker shell gets opened
App\Model::withTrashed()->where('id', 1)->restore();
```

### WebSocket/Pusher

Our application had to have at least two active clients, where one would create records, which get added dynamically to the frontend, without a page reload and immediately notifies the other client that it should get this new data. To achieve this the WebSocket protocol had to be used.

Laravel has a built-in support for Pusher, which we chose, based on the great integration. Signing up with Pusher and creating an application on its dashboard, we were able to implement the needed keys to our front- and backend.

With Laravel's events and broadcasting we created a channel on which the clients listened for the change, which then triggered JavaScript, which updated the DOM accordingly.

### Continous Integration

For Continous Integration we are using Travis CI, which allows private CIs for students. Setting up is pretty straight forward:

1. Sign up with GitHub.
1. Go to the to be integrated repository -> Settings -> Integrations & servives, add Travis CI.
1. Generate SSH keys and add one to the Travis (private) repository settings and one to GitHub (public).
1. Make sure a `.travis.yml` file is in the root of your repository.

For Laravel and this application in particular there are a few extra steps that have to be taken care of:

1. Add a `.env.travis` file which holds the environment settings for this Laravel application.
1. Add a database configuration to `app/config/database.php`.

After that Travis detects if the repository includes a `.travis.yml` file in the root directory and launches – if present – it.

### Deployment

For deployment we are using a single `deploy.sh` shell-script, because our application runs in production on a Raspberry Pi not directly connected to the outside (only Pusher). This deployment is not ideal, because we cannot deploy from Travis and we always have to be in the network (or VPN).

In the shell script we make sure the composer and node packages are installed and updated, run our bundlers and other tasks and then upload the files using `rsync`. After that we set all necessary production setting to true.

One way to automatically trigger the deployment script is to use `Git hooks`. These are located in `./.git/hooks/` there you can configure the desired hook to call a script or even be the script.

### Issue tracking

The GitHub Student Pack also includes some benefits to Sentry, so we included it in our project and we will try to see if is of any good use. So far in development it did not give any more insight, but I am sure, once the application is running in production (beta) we will be able to track down errors and find a solution quicker than just relying on descriptions of error occured during usage.
