<?php

namespace App\Services;

use App\Events\Roles\RoleCreated;
use App\Events\Roles\RoleDeleted;
use RuntimeException;
use App\Events\Roles\RoleUpdated;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class RoleService
{
    /**
     * Crear un rol.
     */
    public function create(array $data): Role
    {
        $role = DB::transaction(function () use ($data) {
            $role = Role::create([
                'name' => $data['name'],
                'guard_name' => 'web',
            ]);

            if (!empty($data['permissions'])) {
                $role->syncPermissions($data['permissions']);
            }

            return $role;
        });

        /**
         * Cargar permisos antes de transmitir.
         */
        $role->load('permissions');

        /**
         * Notificar en tiempo real.
         */
        event(new RoleCreated($role));

        return $role;
    }

    /**
     * Actualizar un rol.
     */
    // public function update(Role $role, array $data): Role
    // {
    //     $role = DB::transaction(function () use ($role, $data) {
    //         $role->update([
    //             'name' => $data['name'],
    //         ]);

    //         $role->syncPermissions(
    //             $data['permissions'] ?? []
    //         );

    //         return $role;
    //     });

    //     /**
    //      * Recargar permisos actualizados.
    //      */
    //     $role->load('permissions');

    //     /**
    //      * Notificar en tiempo real.
    //      */
    //     event(new RoleUpdated($role));

    //     return $role;
    // }

    public function update(Role $role, array $data): Role
    {
        /*
        |--------------------------------------------------------------------------
        | Developer
        |--------------------------------------------------------------------------
        |
        | El rol Developer es un rol protegido.
        | No se puede modificar ni su nombre ni sus permisos.
        |
        */

        if ($role->name === 'Developer') {
            throw new RuntimeException(
                'El rol Developer no puede ser modificado.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Administrador
        |--------------------------------------------------------------------------
        |
        | Solamente un usuario con el rol Developer puede
        | modificar el rol Administrador.
        |
        */

        if (
            $role->name === 'Administrador'
            && ! auth()->user()?->hasRole('Developer')
        ) {
            throw new RuntimeException(
                'El rol Administrador solamente puede ser modificado por un Developer.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Actualización
        |--------------------------------------------------------------------------
        */

        $role = DB::transaction(function () use ($role, $data) {

            /*
            | El nombre de Administrador tampoco se puede cambiar.
            */

            if ($role->name !== 'Administrador') {
                $role->update([
                    'name' => $data['name'],
                ]);
            }

            /*
            | Actualizar permisos.
            */

            $role->syncPermissions(
                $data['permissions'] ?? []
            );

            return $role;
        });

        /*
        |--------------------------------------------------------------------------
        | Recargar permisos
        |--------------------------------------------------------------------------
        */

        $role->load('permissions');

        /*
        |--------------------------------------------------------------------------
        | Tiempo real
        |--------------------------------------------------------------------------
        */

        event(new RoleUpdated($role));

        return $role;
    }

    /**
     * Eliminar un rol.
     */
    public function delete(Role $role): void
    {
        /*
        |--------------------------------------------------------------------------
        | Roles protegidos del sistema
        |--------------------------------------------------------------------------
        */

        $protectedRoles = [
            'Developer',
            'Administrador',
        ];

        if (in_array($role->name, $protectedRoles, true)) {
            throw new \RuntimeException(
                "El rol {$role->name} es un rol protegido del sistema y no puede eliminarse."
            );
        }

        $roleId = $role->id;

        DB::transaction(function () use ($role) {
            $role->syncPermissions([]);

            $role->delete();
        });

        /*
        |--------------------------------------------------------------------------
        | Notificar en tiempo real
        |--------------------------------------------------------------------------
        */

        event(new RoleDeleted($roleId));
    }
}
