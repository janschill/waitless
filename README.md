# waitless

waitless is a client-server application using Laravel to manage the waiting guests in a restaraunt.

It uses two clients, where one is used to welcome new guests and register them into the system and the other is used inside the restaurant by the service to allocate the guests to a table.

## Feedback Papierprotoyp

* Farbgestaltung an Corporate Design anpassen
* Historie-Unterpunkt
* Vorbestellung lieber Checkbox oder Schiebeschalter
* Gast löschen Position ändern
* Speichern und Abbrechen tauschen?
* Hamburger-Menü vllt rechts?
* Kommentar-Button wirkt wie Eingabe, ... reicht vllt
* wartend wirkt inaktiv wegen Grauton
  * vllt Abstand zwischen wartend, platziert
  * platziert-Icon misverständlich

## Setup

In the following we will introduce the technologies used in this project. We will give a brief introduction and explain: how it works, how we implemented it, error that may have occured and explain why we chose the service over others or at all.

### Vagrant

[Vagrant](https://www.vagrantup.com/) provides a simple, elegant way to manage and provision Virtual Machines.

### Homestead

[Homestead](https://laravel.com/docs/5.6/homestead) is an official, pre-packaged Vagrant box that provides a development environment without requiring to install PHP, a web server, and any other server software on the local machine.

#### Setting up

After cloning the repository open `Homestead.yaml`, change `map` to absolute directory.
When a vagrant environment existed, run `vagrant reload` in a terminal window.
To start the VM, run `vagrant up`.
To connect to the database, find the ip of the VM with `ifconfig` when connected through ssh.

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

In the vm:

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

### Seeding

In the next chapter we talk about testing, to successfully test an application, the database needs data, which we populate in Laravel using `Seeds` and Factories`.

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

Here we can use the instance faker to let the Faker-library let us generate dummy data or we use our own.

To prevent appending the generated data and just add the generated data to an empty table, we need to truncate the table. We do that in `database/seeds/DatabaseSeeder.php`. Here we also call our seeders.

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
Theses test will be written in the `tests/Unit` directory and are excuted with `phpunit` in the command line.

### WebSocket

