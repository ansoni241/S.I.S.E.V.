<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed de configuración inicial del sistema.
     */
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Permisos
        |--------------------------------------------------------------------------
        */

        $this->call([
            PermissionSeeder::class,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Roles
        |--------------------------------------------------------------------------
        */

        $this->call([
            RoleSeeder::class,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Usuario Developer
        |--------------------------------------------------------------------------
        */

        $this->call([
            DeveloperSeeder::class,
        ]);
    }
}
