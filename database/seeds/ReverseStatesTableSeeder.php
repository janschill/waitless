<?php

use App\State;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReverseStatesTableSeeder extends Seeder {

  public function run ()
  {
    State::where('state', 'warten')->delete();
    State::where('state', 'zuweisen')->delete();
    State::where('state', 'platziert')->delete();
    State::where('state', 'weg')->delete();
  }
}
