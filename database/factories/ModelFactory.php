<?php

use Faker\Generator as Faker;

function randomState () {
    $number = rand(0,100);

    if ($number < 6) {
        return 1;
    } else if ($number < 90) {
        return 2;
    } else {
        return 3;
    }
}

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Guest::class, function (Faker $faker) {
    return [
        'waitid_id' => rand(1, 10),
        'state_id' => randomState(),
        'group_size' => rand(1, 12),
        'comment' => $faker->sentence,
        'preordered' => rand(0, 1),
        'arrival_time' => $faker->dateTimeBetween($startDate = '-1 day', $endDate = 'now'),
        'last_state_change' => $faker->dateTimeBetween($startDate = '-1 day', $endDate = 'now'),
    ];
});

$factory->define(App\WaitId::class, function (Faker $faker) {
    return [
        'number' => rand(1, 500)
    ];
});
