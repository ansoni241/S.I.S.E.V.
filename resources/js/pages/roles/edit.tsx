// import { Head, router, useForm } from '@inertiajs/react';

// import { RoleForm } from './form/RoleForm';

// import type {
//     Role,
//     RoleFormData,
//     RolePermission,
// } from '@/types';

// type Props = {
//     role: Role;
//     permissions: RolePermission[];
// };

// export default function Edit({
//     role,
//     permissions,
// }: Props) {
//     const form = useForm<RoleFormData>({
//         name: role.name ?? '',
//         permissions:
//             role.permissions?.map(
//                 (permission) => permission.id,
//             ) ?? [],
//     });

//     const handleSubmit = (data: RoleFormData) => {
//         form.setData(data);

//         form.put(`/roles/${role.id}`, {
//             preserveScroll: true,
//         });
//     };

//     const handleCancel = () => {
//         if (form.processing) {
//             return;
//         }

//         router.visit('/roles');
//     };

//     return (
//         <>
//             <Head title={`Editar rol: ${role.name}`} />

//             <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
//                 <div>
//                     <h1 className="text-2xl font-semibold tracking-tight">
//                         Editar rol
//                     </h1>

//                     <p className="text-sm text-muted-foreground">
//                         Modifica el nombre y los permisos
//                         asignados al rol.
//                     </p>
//                 </div>

//                 <RoleForm
//                     mode="edit"
//                     role={role}
//                     permissions={permissions}
//                     errors={form.errors}
//                     processing={form.processing}
//                     onSubmit={handleSubmit}
//                     onCancel={handleCancel}
//                 />
//             </div>
//         </>
//     );
// }
import { Head, router, useForm } from '@inertiajs/react';

import { RoleForm } from './form/RoleForm';

import { usePermissions } from '@/hooks/use-permissions';

import type {
    Role,
    RoleFormData,
    RolePermission,
} from '@/types';

type Props = {
    role: Role;
    permissions: RolePermission[];
};

export default function Edit({
    role,
    permissions,
}: Props) {
    const {
        can,
        hasRole,
    } = usePermissions();

    /*
     * Roles protegidos del sistema.
     */
    const isDeveloperRole =
        role.name === 'Developer';

    const isAdministratorRole =
        role.name === 'Administrador';

    /*
     * Developer nunca puede ser editado.
     */
    const canEditDeveloper =
        !isDeveloperRole;

    /*
     * Administrador solamente puede ser
     * editado por un Developer.
     */
    const canEditAdministrator =
        !isAdministratorRole ||
        hasRole('Developer');

    /*
     * El usuario debe tener el permiso
     * general para editar roles.
     */
    const hasEditPermission =
        can('roles.edit');

    /*
     * Regla final.
     */
    const canEdit =
        hasEditPermission &&
        canEditDeveloper &&
        canEditAdministrator;

    const form = useForm<RoleFormData>({
        name: role.name ?? '',
        permissions:
            role.permissions?.map(
                (permission) => permission.id,
            ) ?? [],
    });

    const handleSubmit = (data: RoleFormData) => {
        /*
         * Protección adicional en el frontend.
         */
        if (!canEdit || form.processing) {
            return;
        }

        form.setData(data);

        form.put(`/roles/${role.id}`, {
            preserveScroll: true,
        });
    };

    const handleCancel = () => {
        if (form.processing) {
            return;
        }

        router.visit('/roles');
    };

    const lockName =
        isDeveloperRole ||
        isAdministratorRole;

    const lockPermissions =
        isDeveloperRole ||
        (
            isAdministratorRole &&
            !hasRole('Developer')
        );

    /*
     * Si no puede editar el rol,
     * no mostramos el formulario.
     */
    if (!canEdit) {
        return (
            <>
                <Head title={`Editar rol: ${role.name}`} />

                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Editar rol
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            No tienes permiso para modificar este rol.
                        </p>
                    </div>

                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                        <p className="text-sm text-destructive">
                            {isDeveloperRole
                                ? 'El rol Developer es un rol protegido y no puede ser editado.'
                                : isAdministratorRole &&
                                    !hasRole('Developer')
                                    ? 'El rol Administrador solamente puede ser editado por un Developer.'
                                    : 'No tienes el permiso necesario para editar roles.'}
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={`Editar rol: ${role.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Editar rol
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Modifica el nombre y los permisos
                        asignados al rol.
                    </p>
                </div>

                <RoleForm
                    mode="edit"
                    role={role}
                    permissions={permissions}
                    errors={form.errors}
                    processing={form.processing}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    lockName={lockName}
                    lockPermissions={lockPermissions}
                />
            </div>
        </>
    );
}
