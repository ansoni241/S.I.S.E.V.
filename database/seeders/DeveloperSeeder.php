<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;
use Spatie\Permission\Models\Role;

class DeveloperSeeder extends Seeder
{
    public function run(): void
    {
        $password = config('app.developer.password');

        if (empty($password)) {
            throw new RuntimeException(
                'DEVELOPER_PASSWORD no está configurada en el archivo .env.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Obtener rol Developer
        |--------------------------------------------------------------------------
        */

        $role = Role::where([
            'name' => 'Developer',
            'guard_name' => 'web',
        ])->firstOrFail();

        /*
        |--------------------------------------------------------------------------
        | Crear usuario Developer
        |--------------------------------------------------------------------------
        */

        $user = User::firstOrCreate(
            [
                'email' => config('app.developer.email'),
            ],
            [
                'name' => config('app.developer.name'),
                'password' => Hash::make($password),
                'status' => 'active',
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | Asignar rol
        |--------------------------------------------------------------------------
        */

        $user->syncRoles([$role]);
    }
}
