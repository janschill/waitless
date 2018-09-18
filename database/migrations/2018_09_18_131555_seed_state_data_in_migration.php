<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedStateDataInMigration extends Migration
{
    public function up()
    {
        Artisan::call('db:seed', [
            '--class' => 'StatesTableSeeder',
            '--force' => true
        ]);
    }

    public function down()
    {
        Artisan::call('db:seed', [
            '--class' => 'ReverseStatesTableSeeder',
            '--force' => true
        ]);
    }
}
