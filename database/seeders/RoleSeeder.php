<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Developer
        |--------------------------------------------------------------------------
        */

        $developer = Role::firstOrCreate([
            'name' => 'Developer',
            'guard_name' => 'web',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Administrador
        |--------------------------------------------------------------------------
        */

        $administrator = Role::firstOrCreate([
            'name' => 'Administrador',
            'guard_name' => 'web',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Todos los permisos existentes
        |--------------------------------------------------------------------------
        */

        $permissions = Permission::where(
            'guard_name',
            'web'
        )->get();

        /*
        |--------------------------------------------------------------------------
        | Developer → todos los permisos
        |--------------------------------------------------------------------------
        */

        $developer->syncPermissions($permissions);

        /*
        |--------------------------------------------------------------------------
        | Administrador → todos los permisos
        |--------------------------------------------------------------------------
        */

        $administrator->syncPermissions($permissions);
    }
}
