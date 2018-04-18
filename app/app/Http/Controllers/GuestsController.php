<?php

namespace App\Http\Controllers;

use App\Guest;
use Illuminate\Support\Facades\DB;

class GuestsController extends Controller
{
    // GET /guests
    public function index()
    {
        $guests = Guest::latest()->get();

        return view('guests.index', compact('guests'));
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

        $stateid = 1;
        $waitid = $this->unoccupiedWaitids();

        Guest::create([
            'waitid_id' => $waitid,
            'state_id' => $stateid,
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
        $waitids = DB::select(DB::raw("SELECT * FROM waitids WHERE number NOT IN (SELECT number FROM waitids JOIN guests ON guests.waitid_id = waitids.id JOIN states ON guests.state_id = states.id WHERE states.state = 'wartend');"));

        $waitingWaitids = DB::table('waitids')
            ->join('guests', 'waitids.id', '=', 'guests.waitid_id')
            ->join('states', 'states.id', '=', 'guests.state_id')
            ->select('waitids.number')
            ->where('state', '=', 'wartend')
            ->get();

        $waitingWaitidsIndexed = [];

        foreach ($waitingWaitids as $waitingWaitid) {
            array_push($waitingWaitidsIndexed, $waitingWaitid->number);
        }

        $avaiblabeWaitids = DB::table('waitids')
            ->select('waitids.*')
            ->whereNotIn('number', $waitingWaitidsIndexed)
            ->value('id');

        return $avaiblabeWaitids;
    }
}
