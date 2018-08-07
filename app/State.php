<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class State extends Model
{
    public function guests()
    {
        return $this->hasMany(Guest::class);
    }

    public static function getDefiniteStates()
    {
        $states = DB::table('states')
            ->where('id', '!=', 4)
            ->get();
        return $states;
    }
}
