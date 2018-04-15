<?php

Route::get('/', function () {
    return view('welcome');
});

Route::get('/guests', 'GuestsController@index');

Route::get('/guests/create', 'GuestsController@create');

Route::get('/guests/{guest}', 'GuestsController@show');

Route::post('/guests', 'GuestsController@store');

// Route::get('/guests/waiting', function () {
//     $guests = Guest::waiting()->get();
//     return view('guests.index', compact('guests'));
// });

// Route::get('/guests/assigned', function () {
//     $guests = Guest::assigned()->get();
//     dd($guests);

//     return view('guests.index', compact('guests'));
// });

// Route::get('/guests/gone', function () {
//     $guests = Guest::gone()->get();

//     return view('guests.index', compact('guests'));
// });
