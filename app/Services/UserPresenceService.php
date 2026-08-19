<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserPresenceService
{
    /**
     * Tiempo máximo, en segundos, para considerar
     * que un usuario está conectado.
     */
    private const ONLINE_THRESHOLD = 300; // 5 minutos

    /**
     * Determina el estado actual de un usuario.
     */
    public function getStatus(User $user): string
    {
        if ($user->status !== 'active') {
            return 'blocked';
        }

        $session = DB::table('sessions')
            ->where('user_id', $user->id)
            ->orderByDesc('last_activity')
            ->first();

        if (!$session) {
            return 'offline';
        }

        $lastActivity = (int) $session->last_activity;
        $now = now()->timestamp;

        if (($now - $lastActivity) <= self::ONLINE_THRESHOLD) {
            return 'online';
        }

        return 'away';
    }

    /**
     * Obtiene la información de presencia de un usuario.
     */
    public function getPresence(User $user): array
    {
        $session = DB::table('sessions')
            ->where('user_id', $user->id)
            ->orderByDesc('last_activity')
            ->first();

        $status = $this->getStatus($user);

        return [
            'status' => $status,
            'last_login_at' => $user->last_login_at,
            'last_login_ip' => $user->last_login_ip,
            'last_activity' => $session
                ? date('Y-m-d H:i:s', $session->last_activity)
                : null,
            'ip_address' => $session->ip_address ?? null,
            'user_agent' => $session->user_agent ?? null,
        ];
    }

    /**
     * Obtiene todos los usuarios con su estado actual.
     */
    public function getUsersWithPresence()
    {
        return User::query()
            ->with('roles')
            ->get()
            ->map(function (User $user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'status' => $user->status,
                    'roles' => $user->roles->pluck('name')->values(),
                    'presence' => $this->getPresence($user),
                ];
            });
    }

    /**
     * Determina si el usuario está conectado.
     */
    public function isOnline(User $user): bool
    {
        return $this->getStatus($user) === 'online';
    }

    /**
     * Determina si el usuario está ausente.
     */
    public function isAway(User $user): bool
    {
        return $this->getStatus($user) === 'away';
    }

    /**
     * Determina si el usuario está desconectado.
     */
    public function isOffline(User $user): bool
    {
        return $this->getStatus($user) === 'offline';
    }
}
