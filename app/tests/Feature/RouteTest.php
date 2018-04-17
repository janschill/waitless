<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RouteTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testRoutes()
    {
        $routesGet = ['/', '/guests', 'guests/create'];
        $routesPost = ['/guests'];

        array_walk($routesGet, function ($element) {
            $this->get($element)->assertStatus(200);
        });

        array_walk($routesPost, function ($element) {
            $this->post($element)->assertStatus(302);
        });
    }
}
