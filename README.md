# waitless

## Projektdokumentation
## Einleitung
### Problem
In Gaststätten mit begrenzten Sitzplätzen kommt es oft zu Problemen bei der Zuweisung der wartenden Gäste auf verfügbare Plätze. Diese Situation ist für die Mitarbeiter unübersichtliich, da nicht klar ist, wie viele Gäste auf freie Plätze warten und welche Personen zuerst erschienen sind. Auch die Gäste können nicht direkt ersehen, ob Plätze frei sind. Oft müssen Gäste weggeshickt werden, wenn keine freien Plätze verfügbar sind. Es ist keine effiziente und faire Platzzuweisung möglich. Außerdem wäre es wünschenswert, dass gesammelten Information analysiert werden, wie zum Beispiel, zu welcher Zeit kommen die meisten Gäste, bzw. wann wird das System benötigt. Wie lange müssen die Gäste warten, hier auch die durchschnittliche Wartezeit in Abhängigkeit zur Gruppengröße.
### Lösungsansatz
Um diese Problematik zu beheben, soll eine Webanwendung zur Verwaltung von Gästen erstellt werden. Mit Tablets können Mitarbeitern von Restaurants darauf zugreifen.
#### Ablauf
* Gäste kommen an
...

Da die Anwendung für dei Mitarbeiter drinnen und draußen identisch ist, können alle Aktionen sowohl von Mitarbeitern draußen als auch drinnen vorgenommen werden. Dies erlaubt flexible Abläufe.
### Anforderungen
Mehrere Geräte müssen gleichzeitig auf die Anwendung zugreifen können und Änderungen auf beiden aktualisiert werden.
Gäste müssen angelegt werden können und ihnen Personenanzahl, eine Wartenummer
Damit Gäste die ihnen zugewiesene Wartenummer nicht vergessen, 


### Iterationen
Nach der Festlegung der Anforderungen an das Projekt wurden erste Skizzen angefertigt. Das Konzept war zu Beginn allerdings noch etwas anders: Der Plan war zuerst, dass Gäste sich selbstständig an einem Tochscreen anmelden. Es sollte drei Clients geben: Einen Touchscreen, der im Eingangsbereich steht, auf dem sich die Gäste anmelden können:
<img src="https://imgur.com/M68zmDg.jpg" width="50%"><img src="https://imgur.com/6O6MO2y.jpg" width="50%">
<img src="https://imgur.com/U4WzmIU.jpg" width="50%">
Einen großen Bildschirm, der die Liste aller wartender Gäste anzeigt:
<img src="https://imgur.com/ubnRs4F.jpg" width="40%"><img src="https://imgur.com/4i8lAXO.jpg" width="60%">
...



Dieses Konzept wurde jedoch nicht weiter verfolgt, da wir bemerkt haben, dass in der Praxis besser nur Mitarebeoiter.
Um dieses Konzept zu testen, haben wir einen neuen Papierprototypen angefertigt:

XD-Skizzen??


### Endergebnis

### Umsetzung
Laravel...


### Installationsanleitung


## Feedback 27.08.
* evtl. Backup-Funktion?
* Bearbeiten-Button ist bei Personenanzahl oder Nummer verwirrend -> Umbenennen, vllt Speichern
* Buttons optisch buttoniger machen
* Bei Bearbeiten Autofokus in Textfeld
* größter Kritikpunkt: Plus-Button ungünstig, blockiert Elemente. Anders darstellen, vllt in der Nähe von Aktuelles, da die Nummer dort hinzugefügt wird?
* Hinweise-Edit in Historie crashed
* Lieber ... bei langen Kommentaren, abgeschnittener Text wirkt unruhig
* Statistik an Stil anpassen, Schrift schwarz
* Wichtig bei Doku: Warum? Irrwege
* Kleine Designsachen: Abstände von Karten zu allen Seiten gleich, Waitless größer, waitless, Zeit und Menu auf einer Höhe, Einträge links rechts Abstand gleich

waitless is a client-server application using Laravel to manage the waiting guests in a restaraunt.

It uses two clients, where one is used to welcome new guests and register them into the system and the other is used inside the restaurant by the service to allocate the guests to a table.

## Getting started

### Installation

* Clone repository

### Usage

Happy coding

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

### Tinker

Laravel's tinker is a `read-eval-print-loop`, which takes user input and returns the result to command line. Tinker allows direct interaction with the application. For example if we want to restor a soft delted record, we do as follows:

```shell
php artisan tinker
# Tinker shell gets opened
App\Model::withTrashed()->where('id', 1)->restore();
```

### WebSocket

Our application had to have at least two active clients, where one would create records, which get added dynamically to the frontend, without a page reload and immediately the other client should retrieve this new entry as well. To achieve this the WebSocket protocoll had to be used.

Laravel has a built-in support for Pusher, which we then chose, based on the great integration. Signing up with Pusher and creating an application on its dashboard, we were able to implement the needed keys to our front- and backend.

With Laravel's events and broadcasting we created a channel on which the clients listened for the change, which then triggered JavaScript, which updated the DOM accordingly.


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
