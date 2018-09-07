<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    protected $toTruncate = ['guests', 'waitids', 'states'];

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        foreach ($this->toTruncate as $table)
        {
            DB::table($table)->truncate();
        }

        if (App::Environment() === 'production')
        {
            $this->call('StatesTableSeeder');
        }

        if (App::Environment() === 'local')
        {
            $this->call('WaitIdTableSeeder');
            $this->call('GuestTableSeeder');
            $this->call('StatesTableSeeder');
        }
    }
}
