<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGuestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guests', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('waitid_id');
            $table->unsignedInteger('state_id');
            $table->integer('group_size');
            $table->string('comment');
            $table->boolean('preordered')->default(0);
            $table->dateTime('arrival_time')->useCurrent();
            $table->dateTime('last_state_change')->useCurrent();
            $table->timestamps();
            $table->foreign('waitid_id')->references('id')->on('waitids');
            $table->foreign('state_id')->references('id')->on('state');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('guests');
    }
}
