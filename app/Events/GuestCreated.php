<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class GuestCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $guest;
    public $unoccupiedWaitids;
    public $waitidNumber;
    public $states;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($guest, $unoccupiedWaitids, $waitidNumber, $states)
    {
        $this->guest = $guest;
        $this->unoccupiedWaitids = $unoccupiedWaitids;
        $this->waitidNumber = $waitidNumber;
        $this->states = $states;

        $this->dontBroadcastToCurrentUser();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('guests');
    }
}
