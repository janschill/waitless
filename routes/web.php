<?php

Route::get('/', function () {
    return redirect('/guests');
});

// Guests
Route::get('/guests', 'GuestsController@index');

Route::get('/guests/create', 'GuestsController@create');

Route::get('/guests/{guest}', 'GuestsController@show');

Route::get('/guests/{guest}/edit', 'GuestsController@edit');

Route::post('/guests', 'GuestsController@store');

Route::patch('/guests/{guest}', 'GuestsController@update');

// Waitids

Route::get('/waitids', 'WaitidsController@index');

Route::get('/waitids/create', 'WaitidsController@create');

Route::post('/waitids', 'WaitidsController@store');

Route::delete('/waitids/{waitd}', 'WaitidsController@destroy');

// App::bind('Pusher', function ($app) {
//     $keys = $app['config']->get('services.pusher');

//     return new Pusher($keys['public'], $keys['secret'], $keys['app_id']);
// });

// Route::any('/pusher', function () {
//     App::make('Pusher')->trigger('my-channel', 'my-event', []);

//     return 'Done';
// });

// Route::get('/getpusher', function () {
//     return View::make('pusher');
// });
