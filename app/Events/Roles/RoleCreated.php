<?php

namespace App\Events\Roles;

use Spatie\Permission\Models\Role;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RoleCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Role $role,
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('roles'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'role.created';
    }

    public function broadcastWith(): array
    {
        return [
            'role' => $this->role->load('permissions'),
        ];
    }
}
