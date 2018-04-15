<?php

use App\Guest;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin', function () {
    return view('admin');
});

Route::get('/front', function () {
    return view('front');
});

Route::get('/back', function () {
    return view('back');
});


Route::get('/guests', function () {
    $guests = Guest::all();

    return view('guests.index', compact('guests'));
});

Route::get('/guests/{guest}', function ($id) {
    $guest = Guest::find($id);
    return view('guests.show', compact('guest'));
});


Route::get('/guests/waiting', function () {
    $guests = Guest::waiting()->get();
    return view('guests.index', compact('guests'));
});

Route::get('/guests/assigned', function () {
    $guests = Guest::assigned()->get();
    dd($guests);

    return view('guests.index', compact('guests'));
});

Route::get('/guests/gone', function () {
    $guests = Guest::gone()->get();

    return view('guests.index', compact('guests'));
});

