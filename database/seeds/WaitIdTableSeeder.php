<?php

use Illuminate\Database\Seeder;

class WaitIdTableSeeder extends Seeder {

  public function run ()
  {
    factory('App\WaitId', 10)->create();
  }
}
