<?php

Route::get('/', function () {
    return view('welcome');
});

// Guests
Route::get('/guests', 'GuestsController@index');

Route::get('/guests/create', 'GuestsController@create');

Route::get('/guests/{guest}', 'GuestsController@show');

Route::post('/guests', 'GuestsController@store');

// Waitids
Route::get('/waitids', 'WaitidsController@index');

Route::get('/waitids/create', 'WaitidsController@create');

Route::post('/waitids', 'WaitidsController@store');
