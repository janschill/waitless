<?php

namespace App\Http\Controllers;

use App\Guest;
use App\State;
use App\Waitid;
use Illuminate\Support\Facades\DB;

class GuestsController extends Controller
{
    // GET /guests
    public function index()
    {
        $guests = Guest::latest()->get();
        $states = State::all();
        return view('guests.index', compact('guests', 'states'));
    }

    // GET /guests/{guest}
    public function show(Guest $guest)
    {
        return view('guests.show', compact('guest'));
    }

    // GET /guests/create
    public function create()
    {
        return view('guests.create');
    }

    // POST /guests
    public function store()
    {
        $this->validate(request(), [
            'group_size' => 'required|max:12',
        ]);

        $unoccupiedWaitid = Waitid::unoccupiedWaitids();

        Guest::create([
            'waitid_id' => $waitid,
            'state_id' => 1,
            'group_size' => request('group_size'),
            'comment' => request('comment'),
            'preordered' => request('preordered'),
            'arrival_time' => now(),
            'last_state_change' => now(),
        ]);

        return redirect('/guests');
    }

    // GET /guests/{guest}/edit
    public function edit()
    {

    }

    // PUT/PATCH /guests/{guest}
    public function update()
    {

    }

    // DELETE /guests/{guest}
    public function destroy()
    {

    }

    private function unoccupiedWaitids()
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
