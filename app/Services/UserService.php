<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Hash;

use App\Events\Users\UserCreated;
use App\Events\Users\UserUpdated;
use App\Events\Users\UserDeleted;

class UserService
{
    /**
     * Crear un usuario.
     */
    public function create(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $role = $data['role'] ?? null;

            unset($data['role']);

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                // 'password' => Hash::make($data['password']),
                'password' => $data['password'],
                'status' => $data['status'],
            ]);

            if ($role) {
                $user->assignRole($role);
            }
            $user->load('roles');
            event(new UserCreated($user));
            return $user;
        });
    }

    /**
     * Actualizar un usuario.
     */
    // public function update(User $user, array $data): User
    // {
    //     return DB::transaction(function () use ($user, $data) {
    //         $role = $data['role'] ?? null;

    //         unset($data['role']);

    //         if (empty($data['password'])) {
    //             unset($data['password']);
    //         } else {
    //             // $data['password'] = Hash::make($data['password']);
    //             $data['password'] = $data['password'];
    //         }

    //         $user->update($data);

    //         // if ($role !== null) {
    //         //     $user->syncRoles([$role]);
    //         // }
    //         if (!empty($role)) {
    //             $user->syncRoles([$role]);
    //         } else {
    //             $user->syncRoles([]);
    //         }
    //         return $user->fresh();
    //     });
    // }
    public function update(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {
            $role = $data['role'] ?? null;

            unset($data['role']);

            if (empty($data['password'])) {
                unset($data['password']);
            } else {
                $data['password'] = $data['password'];
            }

            $user->update($data);

            if ($role !== null) {
                $user->syncRoles([$role]);
            }

            $user = $user->fresh()->load('roles');

            event(new UserUpdated($user));

            return $user;
        });
    }
    /**
     * Cambiar el estado de un usuario.
     */
    public function changeStatus(User $user, string $status): User
    {
        $user->update([
            'status' => $status,
        ]);

        return $user->fresh();
    }

    /**
     * Eliminar un usuario.
     */
    // public function delete(User $user): void
    // {
    //     DB::transaction(function () use ($user) {
    //         $user->syncRoles([]);

    //         $user->delete();
    //     });
    // }
    public function delete(User $user): void
    {
        DB::transaction(function () use ($user) {
            $userId = $user->id;

            $user->syncRoles([]);

            $user->delete();

            event(new UserDeleted($userId));
        });
    }
}
