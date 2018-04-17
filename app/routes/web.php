<?php

Route::get('/', function () {
    return view('welcome');
});

Route::get('/guests', 'GuestsController@index');

Route::get('/guests/create', 'GuestsController@create');

Route::get('/guests/{guest}', 'GuestsController@show');

Route::post('/guests', 'GuestsController@store');
