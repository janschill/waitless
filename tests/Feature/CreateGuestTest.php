<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CreateGuestTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }

    public function testGuestCreate()
    {
        $this->visit('/guests')
            ->click('.popup__toggle.popup__toggle--new-guest')
            ->click('.button-toggle--waitid')
            ->click('.button-toggle--group-size')
            ->type('CreateTest', 'guest_comment')
            ->press('hinzufügen')
            ->seePageIs('/guests');
    }
}
