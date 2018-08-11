<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\SoftDeletes;

class Waitid extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $fillable = ['number'];

    public function scopeEnabled($query)
    {
        return $query->where('disabled', 0);
    }

    public function scopeDisabled($query)
    {
        return $query->where('disabled', 1);
    }

    public static function getNumberOfWaitid($id)
    {
        $waitidNumber = DB::table('waitids')
            ->select('number')
            ->where('id', $id)
            ->get();

        return $waitidNumber->toArray()[0];
    }

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
            ->where('state', '=', 'warten')
            ->get()
            ->all();

        $waitingWaitidsIndexed = [];

        foreach ($waitingWaitids as $waitingWaitid) {
            array_push($waitingWaitidsIndexed, $waitingWaitid->number);
        }

        $avaiblabeWaitidsID = DB::table('waitids')
            ->select('waitids.*')
            ->where('disabled', '=', 0)
            ->whereNotIn('number', $waitingWaitidsIndexed)
            ->orderBy('number', 'asc')
            ->get();

        return $avaiblabeWaitidsID->toArray();
    }

    public static function randomUnoccupiedWaitid()
    {
        return array_rand(Waitid::unoccupiedWaitids());
    }
}
