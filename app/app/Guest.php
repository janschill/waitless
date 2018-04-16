<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    protected $fillable = ['waitid_id', 'state_id', 'group_size', 'comment', 'preordered', 'arrival_time', 'last_state_change'];

    protected $dates = ['arrival_time', 'last_state_change'];

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

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function waitid()
    {
        return $this->belongsTo(Waitid::class);
    }
}
