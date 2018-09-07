<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StateToIdTest extends TestCase
{
    public function testExample()
    {
        $states = [
            'warten' => 1,
            'zuweisen' => 2,
            'platziert' => 3,
            'weg' => 4
        ];

        $this->assertDatabaseHas('states', ['state' => $states['warten']]);

        $this->assertTrue(true);
    }
}
