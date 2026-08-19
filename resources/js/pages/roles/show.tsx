import { Head, Link, router } from '@inertiajs/react';

import {
    ArrowLeft,
    Pencil,
    ShieldCheck,
    Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { usePermissions } from '@/hooks/use-permissions';

import type { Role } from '@/types';

type Props = {
    role: Role;
};

export default function Show({ role }: Props) {
    const {
        can,
        hasRole,
    } = usePermissions();

    /*
     * =========================================================
     * REGLAS DE LOS ROLES PROTEGIDOS
     * =========================================================
     */

    /**
     * Developer:
     *
     * No puede ser editado ni eliminado.
     */
    const isDeveloperRole =
        role.name === 'Developer';

    /**
     * Administrador:
     *
     * Solamente Developer puede modificarlo.
     */
    const isAdministratorRole =
        role.name === 'Administrador';

    /**
     * El usuario actual es Developer.
     */
    const isCurrentUserDeveloper =
        hasRole('Developer');

    /*
     * =========================================================
     * PERMISOS
     * =========================================================
     */

    /**
     * Puede editar este rol.
     *
     * Developer -> NO
     *
     * Administrador -> solamente Developer
     *
     * Otros -> roles.edit
     */
    const canEditRole =
        !isDeveloperRole &&
        (
            isAdministratorRole
                ? isCurrentUserDeveloper
                : can('roles.edit')
        );

    /**
     * Puede eliminar este rol.
     *
     * Developer -> NO
     *
     * Administrador -> NO
     *
     * Otros -> roles.delete
     */
    const canDeleteRole =
        !isDeveloperRole &&
        !isAdministratorRole &&
        can('roles.delete');

    /**
     * =========================================================
     * ELIMINAR ROL
     * =========================================================
     */
    const deleteRole = () => {
        /*
         * Protección adicional en frontend.
         */
        if (!canDeleteRole) {
            return;
        }

        if (
            !confirm(
                `¿Está seguro de eliminar el rol "${role.name}"?`,
            )
        ) {
            return;
        }

        router.delete(`/roles/${role.id}`);
    };

    /**
     * =========================================================
     * NOMBRE LEGIBLE DEL PERMISO
     * =========================================================
     */
    const getPermissionLabel = (
        permission: string,
    ) => {
        const action =
            permission.split('.').pop();

        const labels: Record<string, string> = {
            view: 'Ver',
            create: 'Crear',
            edit: 'Editar',
            delete: 'Eliminar',
            status: 'Cambiar estado',
        };

        return (
            labels[action ?? ''] ??
            action ??
            permission
        );
    };

    /**
     * =========================================================
     * NOMBRE LEGIBLE DEL MÓDULO
     * =========================================================
     */
    const getModuleLabel = (
        module: string,
    ) => {
        const labels: Record<string, string> = {
            users: 'Usuarios',
            roles: 'Roles',
            permissions: 'Permisos',
        };

        return (
            labels[module] ??
            module.charAt(0).toUpperCase() +
            module.slice(1)
        );
    };

    /**
     * =========================================================
     * AGRUPAR PERMISOS POR MÓDULO
     * =========================================================
     */
    const groupedPermissions = (
        role.permissions ?? []
    ).reduce(
        (
            groups: Record<
                string,
                typeof role.permissions
            >,
            permission,
        ) => {
            const [module] =
                permission.name.split('.');

            if (!groups[module]) {
                groups[module] = [];
            }

            groups[module].push(permission);

            return groups;
        },
        {},
    );

    const sortedModules = Object.keys(
        groupedPermissions,
    ).sort((a, b) =>
        a.localeCompare(b),
    );

    return (
        <>
            <Head title={`Rol: ${role.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* =====================================================
                    ENCABEZADO
                ====================================================== */}

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                    <div className="flex items-center gap-3">

                        <Button
                            variant="outline"
                            size="icon"
                            asChild
                            title="Volver"
                        >
                            <Link href="/roles">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>

                        <div>

                            <h1 className="text-2xl font-semibold tracking-tight">
                                {role.name}
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Información y permisos
                                asignados al rol.
                            </p>

                        </div>

                    </div>

                    {/* =================================================
                        ACCIONES PRINCIPALES
                    ================================================== */}

                    <div className="flex gap-2">

                        {/* Editar */}

                        {canEditRole && (
                            <Button
                                variant="outline"
                                asChild
                            >
                                <Link
                                    href={`/roles/${role.id}/edit`}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </Link>
                            </Button>
                        )}

                        {/* Eliminar */}

                        {canDeleteRole && (
                            <Button
                                variant="destructive"
                                onClick={deleteRole}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                            </Button>
                        )}

                    </div>

                </div>

                {/* =====================================================
                    INFORMACIÓN GENERAL
                ====================================================== */}

                <div className="grid gap-4 md:grid-cols-3">

                    {/* Nombre */}

                    <Card>

                        <CardHeader className="pb-2">

                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Rol
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

                                    <ShieldCheck className="h-5 w-5" />

                                </div>

                                <div>

                                    <div className="font-semibold">
                                        {role.name}
                                    </div>

                                    <div className="text-xs text-muted-foreground">
                                        ID #{role.id}
                                    </div>

                                </div>

                            </div>

                        </CardContent>

                    </Card>

                    {/* Permisos */}

                    <Card>

                        <CardHeader className="pb-2">

                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Permisos
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <span className="text-2xl font-bold">
                                {role.permissions
                                    ?.length ?? 0}
                            </span>

                            <p className="text-xs text-muted-foreground">
                                permisos asignados
                            </p>

                        </CardContent>

                    </Card>

                    {/* Usuarios */}

                    <Card>

                        <CardHeader className="pb-2">

                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Usuarios
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <span className="text-2xl font-bold">
                                {role.users_count ?? 0}
                            </span>

                            <p className="text-xs text-muted-foreground">
                                usuarios con este rol
                            </p>

                        </CardContent>

                    </Card>

                </div>

                {/* =====================================================
                    PERMISOS
                ====================================================== */}

                <Card>

                    <CardHeader>

                        <CardTitle>
                            Permisos asignados
                        </CardTitle>

                        <p className="text-sm text-muted-foreground">
                            Permisos que actualmente tiene
                            asignados este rol.
                        </p>

                    </CardHeader>

                    <CardContent>

                        {role.permissions &&
                            role.permissions.length > 0 ? (

                            <div className="space-y-4">

                                {sortedModules.map(
                                    (module) => {

                                        const modulePermissions =
                                            groupedPermissions[
                                            module
                                            ] ?? [];

                                        return (
                                            <div
                                                key={module}
                                                className="rounded-lg border"
                                            >

                                                <div className="border-b bg-muted/30 px-4 py-3">

                                                    <div className="font-medium">
                                                        {getModuleLabel(
                                                            module,
                                                        )}
                                                    </div>

                                                    <div className="text-xs text-muted-foreground">

                                                        {
                                                            modulePermissions.length
                                                        }{' '}

                                                        {modulePermissions.length ===
                                                            1
                                                            ? 'permiso'
                                                            : 'permisos'}

                                                    </div>

                                                </div>

                                                <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">

                                                    {modulePermissions.map(
                                                        (
                                                            permission,
                                                        ) => (

                                                            <div
                                                                key={
                                                                    permission.id
                                                                }
                                                                className="flex items-center justify-between rounded-md border p-3"
                                                            >

                                                                <div className="min-w-0">

                                                                    <div className="font-medium">

                                                                        {getPermissionLabel(
                                                                            permission.name,
                                                                        )}

                                                                    </div>

                                                                    <div className="truncate text-xs text-muted-foreground">

                                                                        {
                                                                            permission.name
                                                                        }

                                                                    </div>

                                                                </div>

                                                                <Badge variant="secondary">
                                                                    Asignado
                                                                </Badge>

                                                            </div>

                                                        ),
                                                    )}

                                                </div>

                                            </div>
                                        );
                                    },
                                )}

                            </div>

                        ) : (

                            <div className="rounded-lg border border-dashed p-10 text-center">

                                <ShieldCheck className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

                                <p className="font-medium">
                                    Sin permisos
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Este rol no tiene permisos
                                    asignados actualmente.
                                </p>

                            </div>

                        )}

                    </CardContent>

                </Card>

                {/* =====================================================
                    ACCIONES INFERIORES
                ====================================================== */}

                <div className="flex justify-end gap-2">

                    <Button
                        variant="outline"
                        asChild
                    >
                        <Link href="/roles">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a roles
                        </Link>
                    </Button>

                    {/* Editar rol */}

                    {canEditRole && (
                        <Button asChild>
                            <Link
                                href={`/roles/${role.id}/edit`}
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Editar rol
                            </Link>
                        </Button>
                    )}

                </div>

            </div>
        </>
    );
}
