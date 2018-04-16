<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Waitid extends Model
{
    public function guests()
    {
        return $this->hasMany(Guest::class);
    }
}
