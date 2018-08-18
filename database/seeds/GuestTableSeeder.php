<?php

use Illuminate\Database\Seeder;

class GuestTableSeeder extends Seeder {

  public function run ()
  {
    factory('App\Guest', 50)->create();
  }
}
