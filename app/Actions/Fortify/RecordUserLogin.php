<?php

namespace App\Actions\Fortify;

use App\Events\UserPresenceUpdated;
use App\Models\User;
use Illuminate\Http\Request;

class RecordUserLogin
{
    /**
     * Create a new class instance.
     */
    public function __invoke(User $user, Request $request): void
    {
        $user->update([
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
        ]);
        event(new UserPresenceUpdated(
            userId: $user->id,
            status: 'online',
            lastActivity: now()->toDateTimeString(),
            ipAddress: $request->ip(),
        ));
    }
}
