<?php

namespace App\Http\Controllers;

use App\Guest;
use App\State;
use App\Waitid;
use App\Events\GuestUpdated;
use App\Events\GuestCreated;
use Carbon\Carbon;

class GuestsController extends Controller
{
    // GET /guests
    public function index()
    {
        $allWaitids = Waitid::withTrashed()->get();
        $unoccupiedWaitids = Waitid::unoccupied()->get();

        $statesForCurrent = State::current()->get();
        $statesForHistory = State::history()->get();
        $stateSeated = State::seated()->first();
        $stateAssign = State::assign()->first();

        $guests = Guest::waiting()->whereDate('arrival_time', Carbon::today())->get();
        $historyGuests = Guest::history()->whereDate('arrival_time', Carbon::today())->get();
        $assignedGuests = Guest::assigned()->whereDate('arrival_time', Carbon::today())->get();

        return view('guests.index', compact('stateAssign', 'stateSeated', 'statesForCurrent', 'statesForHistory', 'guests', 'historyGuests', 'assignedGuests', 'unoccupiedWaitids'));
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

        $newGuest = [
            'waitid_id' => request('guest_waitidId'),
            'groupSize' => request('guest_groupSize'),
            'comment' => request('guest_comment', ''),
            'preordered' => request('guest_preordered')
        ];

        $guest = Guest::create([
            'waitid_id' => $newGuest['waitid_id'],
            'group_size' => $newGuest['groupSize'],
            'preordered' => $newGuest['preordered'],
            'comment' => $newGuest['comment'],
            'state_id' => 1,
            'arrival_time' => now('Europe/Berlin'),
            'last_state_change' => now('Europe/Berlin'),
        ]);

        $waitidNumber = Waitid::getNumberOfWaitid($guest['waitid_id'])->number;
        $unoccupiedWaitids = Waitid::unoccupied()->get();
        $statesForCurrent = State::current()->get();
        $statesForHistory = State::history()->get();
        $stateAssign = State::assign()->first();

        event((new GuestCreated($guest, $unoccupiedWaitids, $waitidNumber, $statesForCurrent, $statesForHistory, $stateAssign)));

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
        $newGuest = [
            'id' => $guest->id,
            'waitid_id' => request('guest_waitid_id'),
            'group_size' => request('guest_group_size'),
            'preordered' => request('guest_preordered'),
            'comment' => request('guest_comment', ''),
            'state_id' => request('guest_state_id'),
        ];

        if (is_null($newGuest['waitid_id'])) {
            $newGuest['waitid_id'] = $guest->waitid_id;
        }
        if (is_null($newGuest['group_size'])) {
            $newGuest['group_size'] = $guest->group_size;
        }
        if (is_null($newGuest['preordered'])) {
            $newGuest['preordered'] = $guest->preordered;
        }
        if (is_null($newGuest['comment'])) {
            $newGuest['comment'] = $guest->comment;
        }
        if (is_null($newGuest['state_id'])) {
            $newGuest['state_id'] = $guest->state_id;
        }

        $updatedGuest = Guest::find($guest->id);
        $updatedGuest->waitid_id = $newGuest['waitid_id'];
        $updatedGuest->group_size = $newGuest['group_size'];
        $updatedGuest->preordered = $newGuest['preordered'];
        $updatedGuest->comment = $newGuest['comment'];
        $updatedGuest->state_id = $newGuest['state_id'];
        $updatedGuest->last_state_change = now('Europe/Berlin');
        $updatedGuest->save();

        $waitidNumber = Waitid::getNumberOfWaitid($updatedGuest['waitid_id'])->number;
        $unoccupiedWaitids = Waitid::unoccupied()->get();
        $statesForCurrent = State::current()->get();
        $statesForHistory = State::history()->get();
        $stateAssign = State::assign()->first();

        event((new GuestUpdated($guest, $unoccupiedWaitids, $waitidNumber, $statesForCurrent, $statesForHistory, $stateAssign)));

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
