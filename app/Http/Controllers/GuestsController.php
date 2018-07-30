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
        // GuestUpdated::dispatch('1');

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
            'guest_waitidId' => 'required',
            'guest_groupSize' => 'required|max:12',
        ]);

        $guest = [
            'waitid_id' => request('guest_waitidId'),
            'groupSize' => request('guest_groupSize'),
            'comment' => request('guest_comment', ''),
            'preordered' => request('guest_preordered')
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
        $newGuest = [
            'id' => request('guest_id'),
            'waitid_id' => request('guest_waitid_id'),
            'group_size' => request('guest_group_size'),
            'preordered' => request('guest_preordered'),
            'comment' => request('guest_comment', ''),
            'state_id' => request('guest_state_id'),
        ];

        if (is_null($newGuest['state_id'])) {
            $newGuest['state_id'] = $guestFromRequest->state_id;
        }
        if (is_null($newGuest['group_size'])) {
            $newGuest['group_size'] = $guestFromRequest->group_size;
        }
        if (is_null($newGuest['comment'])) {
            $newGuest['comment'] = $guestFromRequest->comment;
        }
        if (is_null($newGuest['preordered'])) {
            $newGuest['preordered'] = $guestFromRequest->preordered;
        }

        $guest = Guest::find($newGuest['id']);
        $guest->waitid_id = $newGuest['waitid_id'];
        $guest->group_size = $newGuest['group_size'];
        $guest->preordered = $newGuest['preordered'];
        $guest->comment = $newGuest['comment'];
        $guest->state_id = $newGuest['state_id'];
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
