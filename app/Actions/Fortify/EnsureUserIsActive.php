<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Validation\ValidationException;

class EnsureUserIsActive
{
    public function __invoke(User $user): void
    {
        if ($user->status !== 'active') {
            throw ValidationException::withMessages([
                'email' => match ($user->status) {
                    'inactive' => 'Tu cuenta se encuentra inactiva.',
                    'blocked' => 'Tu cuenta se encuentra bloqueada.',
                    default => 'No tienes autorización para ingresar al sistema.',
                },
            ]);
        }
    }
}
