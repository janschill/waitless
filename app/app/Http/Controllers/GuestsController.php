<?php

namespace App\Http\Controllers;

use App\Guest;

class GuestsController extends Controller
{
    public function index()
    {
        $guests = Guest::all();

        return view('guests.index', compact('guests'));
    }

    public function show(Guest $guest)
    {
        return view('guests.show', compact('guest'));
    }
}
