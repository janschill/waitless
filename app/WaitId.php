<?php

namespace App;

use App\Guest;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
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

    public function scopeUnoccupied($query)
    {
        $activeGuests = Guest::filter(1)
            ->filter(2)
            ->get();

        $activeGuestsIndexed = [];

        foreach ($activeGuests as $activeGuest) {
            array_push($activeGuestsIndexed, $activeGuest->waitid_id);
        }
        return $query->select('waitids.*')
            ->where('disabled', 0)
            ->whereNotIn('id', $activeGuestsIndexed)
            ->orderBy('number', 'asc');
    }
}
