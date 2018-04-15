<?php

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


Route::get('/guests', 'GuestsController@index');
Route::get('/guests/{guest}', 'GuestsController@show');


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

