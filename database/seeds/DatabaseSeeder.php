<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    protected $toTruncate = ['guests', 'waitids'];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        foreach ($this->toTruncate as $table) {
            DB::table($table)->truncate();
        }

        $this->call('WaitIdTableSeeder');
        $this->call('GuestTableSeeder');
    }
}
