<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\DB;
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

        foreach ($states as $state => $value)
        {
            $this->assertEquals($value, DB::table('states')->select('id')->where('state', $state)->first()->id);
        }
    }

}
