<?php

namespace App\Http\Controllers;

use App\Guest;
use App\State;
use App\Waitid;

class GuestsController extends Controller
{
    // GET /guests
    public function index()
    {
        $guests = Guest::waiting()->get();
        $states = State::all();
        $mode = 'guests';
        return view('guests.index', compact('guests', 'states', 'mode'));
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

    public static function switchPreorder($id){
        $guest = Guest::find(1);
        $guest->preordered = 2;
        $guest->save();
        return "test!";
    }

    // POST /guests
    public function store()
    {
        $this->validate(request(), [
            'group_size' => 'required|max:12',
            'comment' => 'max:12',
        ]);

        $unoccupiedWaitid = Waitid::unoccupiedWaitids();

        if (is_null($unoccupiedWaitid)) {
            return \Redirect::back()->withErrors([
                'no_waitid_available' => 'Alle Wartenummern sind besetzt.'
            ]);
        } else {
            Guest::create([
                'waitid_id' => $unoccupiedWaitid,
                'state_id' => 1,
                'group_size' => request('group_size'),
                'comment' => request('comment'),
                'preordered' => request('preordered'),
                'arrival_time' => now(),
                'last_state_change' => now(),
            ]);
        }

        return redirect('/guests');
    }

    // GET /guests/{guest}/edit
    public function edit(Guest $guest)
    {
        $states = State::all();

        return view('guests.edit', compact('guest', 'states'));
    }

    // PUT/PATCH /guests/{guest}
    public function update(Guest $guest)
    {
        return 'MOIN';
        dd(request());

        $this->validate(request(), [
            'group_size' => 'required|max:12',
            'comment' => 'max:12',
        ]);

        $editGuest = Guest::findOrFail($guest);

        $editGuest::update([
            'waitid_id' => $ediGguest->wait_id,
            'state_id' => request('state'),
            'group_size' => request('group_size'),
            'comment' => request('comment'),
            'preordered' => request('preordered'),
            'arrival_time' => now(),
            'last_state_change' => now(),
        ]);
        dd(request());
    }

    // DELETE /guests/{guest}
    public function destroy()
    {
        dd(request());
    }
}
