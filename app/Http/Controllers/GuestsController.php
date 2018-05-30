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
        $guests = Guest::waiting()->orderBy('last_state_change', 'desc')->get();
        $states = State::all();

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
                'no_waitid_available' => 'Alle Wartenummern sind besetzt.',
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
    public function update(Guest $guestFromRequest)
    {
        $guestStateId = request('guestStateId');
        $guestPreordered = request('guestPreordered');
        $guestId = request('guestId');

        if (is_null($guestStateId)) {
            $guestStateId = $guestFromRequest->state_id;
        }

        if (is_null($guestPreordered)) {
            $guestPreordered = $guestFromRequest->preordered;
        }

        $guest = Guest::find($guestId);

        $guest->state_id = $guestStateId;
        $guest->preordered = $guestPreordered;

        $guest->save();

        return 'Guest:' . $guestId . ' State:' . $guest->state_id . ' Preordered:' . $guestPreordered;
    }

    // DELETE /guests/{guest}
    public function destroy()
    {
        dd(request());
    }
}
