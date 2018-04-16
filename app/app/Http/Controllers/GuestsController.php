<?php

namespace App\Http\Controllers;

use App\Guest;

class GuestsController extends Controller
{
    // GET /guests
    public function index()
    {
        $guests = Guest::all();

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
        Guest::create([
            'waitid_id' => request('waitid_id'),
            'state_id' => request('state_id'),
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
}
