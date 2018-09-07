<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CheckStateSeedDatabaseTest extends TestCase
{
    public function testExample()
    {
        $toBeTestedStates = ['warten', 'zuweisen', 'platziert', 'weg'];

        foreach ($toBeTestedStates as $state)
        {
            $this->assertDatabaseHas('states', ['state' => $state]);
        }
    }
}
