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
        $guests = Guest::where('state_id', 1)->orderBy('arrival_time', 'desc')->get();
        $historyGuests = Guest::where('state_id','!=', 1)->orderBy('last_state_change', 'desc')->get();
        $states = State::all();

        return view('guests.index', compact('guests', 'states', 'historyGuests'));
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

        $guest = [
            'unoccupiedWaitid' => Waitid::unoccupiedWaitids(),
            'groupSize' => request('group_size'),
            'comment' => request('comment'),
            'preordered' => request('preordered')
        ];

        if (is_null($guest['comment'])) {
            $guest['comment'] = '';
        }

        if (is_null($guest['unoccupiedWaitid'])) {
            return \Redirect::back()->withErrors([
                'no_waitid_available' => 'Alle Wartenummern sind besetzt.',
            ]);
        } else {
            Guest::create([
                'waitid_id' => $guest['unoccupiedWaitid'],
                'state_id' => 1,
                'group_size' => $guest['groupSize'],
                'comment' => $guest['comment'],
                'preordered' => $guest['preordered'],
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
        $guestId = request('guestId');
        $guestStateId = request('guestState');
        $guestGroupSize = request('guestGroupSize');
        $guestComment = request('guestComment');
        $guestPreordered = request('guestPreorder');

        if (is_null($guestStateId)) {
            $guestStateId = $guestFromRequest->state_id;
        }
        if (is_null($guestGroupSize)) {
            $guestGroupSize = $guestFromRequest->group_size;
        }
        if (is_null($guestComment)) {
            $guestComment = $guestFromRequest->comment;
        }
        if (is_null($guestPreordered)) {
            $guestPreordered = $guestFromRequest->preordered;
        }

        $guest = Guest::find($guestId);
        $guest->state_id = $guestStateId;
        $guest->group_size = $guestGroupSize;
        $guest->comment = $guestComment;
        $guest->preordered = $guestPreordered;
        $guest->last_state_change = now();
        $guest->save();

        return redirect('/guests');
    }

    // DELETE /guests/{guest}
    public function destroy()
    {
        dd(request());
    }
}
