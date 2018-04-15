<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    public function scopeWaiting($query)
    {
        return $query->where('state_id', 0);
    }

    public function scopeAssigned($query)
    {
        return $query->where('state_id', 1);
    }

    public function scopeGone($query)
    {
        return $query->where('state_id', 2);
    }
}