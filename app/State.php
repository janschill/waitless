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

    public function scopeAssign($query)
    {
        return $query->where('id', 2);
    }

    public function scopeSeated($query)
    {
        return $query->where('id', 3);
    }

    public function scopeCurrent($query)
    {
        return $query->where('id', '!=', 1)->where('id', '!=', 2);
    }

    public static function scopeHistory($query)
    {
        return $query->where('id','=', 1);
    }
}
