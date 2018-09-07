<?php

namespace Tests\Feature;

use Tests\TestCase;

class WebsiteIsRunningTest extends TestCase
{
    public function testWebsiteIsRunningTest()
    {
        $response = $this->get('/guests');

        $response->assertSee('<title>');
        $response->assertStatus(200);
    }
}
