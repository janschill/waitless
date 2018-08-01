<?php

use App\Events\GuestUpdated;

Route::get('/info', function () {
    phpinfo();
});

Route::get('/pusher', function () {
    GuestUpdated::dispatch();
});

// Guests
Route::get('/guests', 'GuestsController@index');

Route::get('/guests/create', 'GuestsController@create');

Route::get('/guests/{guest}', 'GuestsController@show');

Route::get('/guests/{guest}/edit', 'GuestsController@edit');

Route::post('/guests', 'GuestsController@store');

Route::patch('/guests/{guest}', 'GuestsController@update');

Route::delete('/guests/{guest}', 'GuestsController@destroy');

// Waitids

Route::get('/waitids', 'WaitidsController@index');

Route::get('/waitids/create', 'WaitidsController@create');

Route::post('/waitids', 'WaitidsController@store');

Route::delete('/waitids/{waitd}', 'WaitidsController@destroy');
