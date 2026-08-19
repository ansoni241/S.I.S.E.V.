<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets as BroadcastingInteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
// use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
// use Illuminate\InteractsWithSockets;
use Illuminate\Queue\SerializesModels;

// class UserPresenceUpdated implements ShouldBroadcast
class UserPresenceUpdated implements ShouldBroadcastNow
{
    use Dispatchable, BroadcastingInteractsWithSockets, SerializesModels;

    public function __construct(
        public int $userId,
        public string $status,
        public ?string $lastActivity = null,
        public ?string $ipAddress = null,
    ) {
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('users'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'user.presence.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'user_id' => $this->userId,
            'status' => $this->status,
            'last_activity' => $this->lastActivity,
            'ip_address' => $this->ipAddress,
        ];
    }
}
