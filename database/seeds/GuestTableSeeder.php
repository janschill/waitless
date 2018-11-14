<?php

use Illuminate\Database\Seeder;

class GuestTableSeeder extends Seeder
{
    public function run()
    {
        factory('App\Guest', 500)->create(); // Create 500 guests
    }
}
