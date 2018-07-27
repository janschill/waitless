<?php

namespace App\Http\Controllers;

use App\Guest;
use App\State;
use App\Waitid;
use App\Events\GuestUpdated;

class GuestsController extends Controller
{
    // GET /guests
    public function index()
    {
        GuestUpdated::dispatch('1');

        $unoccupiedWaitids = Waitid::unoccupiedWaitids();
        $states = State::all();

        $guests = Guest::where('state_id', 1)
        ->orderBy('arrival_time', 'desc')
        ->get();

        $historyGuests = Guest::where('state_id','!=', 1)
        ->limit(10)
        ->orderBy('last_state_change', 'desc')
        ->get();

        return view('guests.index', compact('states', 'guests', 'historyGuests', 'unoccupiedWaitids'));
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
            'guest.waitidId' => 'required',
            'guest.groupSize' => 'required|max:12',
            'guest.comment' => 'max:12',
        ]);

        $guest = [
            'waitid_id' => request('guest')['waitidId'],
            'groupSize' => request('guest')['groupSize'],
            'comment' => request('guest.comment', ''),
            'preordered' => request('guest')['preordered']
        ];

        Guest::create([
            'waitid_id' => $guest['waitid_id'],
            'state_id' => 1,
            'group_size' => $guest['groupSize'],
            'comment' => $guest['comment'],
            'preordered' => $guest['preordered'],
            'arrival_time' => now(),
            'last_state_change' => now(),
        ]);

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
        $guestComment = request('guestComment', '');
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
    public function destroy(Guest $guestFromRequest)
    {
        $guest = Guest::find(request('guestId'));
        $guest->delete();

        return redirect('/guests');
    }
}
