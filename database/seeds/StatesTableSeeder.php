<?php

use App\State;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatesTableSeeder extends Seeder {

  public function run ()
  {
    State::create(['state' => 'warten']);
    State::create(['state' => 'platziert']);
    State::create(['state' => 'weg']);
    State::create(['state' => 'zugewiesen']);
  }
}
