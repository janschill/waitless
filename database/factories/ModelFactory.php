<?php

use Carbon\Carbon;
use Faker\Generator as Faker;

function randomState()
{
    $number = rand(0, 100);

    if ($number < 6) {
        return 1;
    } elseif ($number < 16) {
        return 2;
    } elseif ($number < 90) {
        return 3;
    } else {
        return 4;
    }
}

$factory->define(App\WaitId::class, function (Faker $faker) {
    return [
        'number' => rand(1, 500),
    ];
});

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});

// Create random guests with arrival_time from now to -5 months
$factory->define(App\Guest::class, function (Faker $faker) {
    $dateTime = Carbon::createFromTimestamp($faker->dateTimeBetween($startDate = '-5 months', $endDate = 'now')->getTimeStamp());

    return [
        'waitid_id' => rand(1, 10),
        'state_id' => randomState(),
        'group_size' => rand(1, 12),
        'comment' => $faker->sentence,
        'preordered' => rand(0, 1),
        'arrival_time' => $dateTime,
        'last_state_change' => $faker->dateTimeBetween($startDate = '-1 day', $endDate = 'tomorrow'),
    ];
});
