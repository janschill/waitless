<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(WaitIdTableSeeder::class);
    }
}

class WaitIdTableSeeder extends Seeder {

    public function run()
    {
        DB::table('waitid')->delete();

        WaitId::create(['created_at' => date('Y-m-d H:i:s')]);
        WaitId::create(['updated_at' => date('Y-m-d H:i:s')]);
        WaitId::create(['number' => rand(33, 6666)]);
    }
}