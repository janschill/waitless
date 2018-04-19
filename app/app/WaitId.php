<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Waitid extends Model
{
    protected $fillable = ['number'];

    public function guests()
    {
        return $this->hasMany(Guest::class);
    }

    public static function unoccupiedWaitids()
    {
        $waitingWaitids = DB::table('waitids')
            ->join('guests', 'waitids.id', '=', 'guests.waitid_id')
            ->join('states', 'states.id', '=', 'guests.state_id')
            ->select('waitids.number')
            ->where('state', '=', 'wartend')
            ->get()
            ->all();

        $waitingWaitidsIndexed = [];

        foreach ($waitingWaitids as $waitingWaitid) {
            array_push($waitingWaitidsIndexed, $waitingWaitid->number);
        }

        $avaiblabeWaitidsID = DB::table('waitids')
            ->select('waitids.*')
            ->whereNotIn('number', $waitingWaitidsIndexed)
            ->value('id');

        return $avaiblabeWaitidsID;
    }
}
