import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';

import {
    Check,
    ChevronDown,
    ChevronRight,
    X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import type {
    RolePermission,
    RoleFormData,
    RoleFormProps,
} from '@/types';

export function RoleForm({
    permissions,
    role,
    mode,
    errors = {},
    processing = false,

    lockName = false,
    lockPermissions = false,

    onSubmit,
    onCancel,
}: RoleFormProps) {
    /**
     * Estado del formulario.
     */
    const [form, setForm] = useState<RoleFormData>({
        name: '',
        permissions: [],
    });

    /**
     * Estado de los módulos abiertos/cerrados.
     */
    const [openModules, setOpenModules] = useState<
        Record<string, boolean>
    >({});

    /**
     * Cargar los datos del rol cuando estamos editando.
     */
    useEffect(() => {
        if (mode === 'edit' && role) {
            setForm({
                name: role.name ?? '',
                permissions:
                    role.permissions?.map(
                        (permission) => permission.id,
                    ) ?? [],
            });

            return;
        }

        /**
         * Si estamos creando,
         * dejamos el formulario vacío.
         */
        setForm({
            name: '',
            permissions: [],
        });
    }, [role, mode]);

    /**
     * Agrupar permisos por módulo.
     *
     * Ejemplo:
     *
     * users.view
     * users.create
     * users.edit
     *
     * =>
     *
     * Usuarios
     * ├── Ver
     * ├── Crear
     * └── Editar
     */
    const groupedPermissions = useMemo(() => {
        const groups: Record<string, RolePermission[]> = {};

        permissions.forEach((permission) => {
            const [module] = permission.name.split('.');

            if (!groups[module]) {
                groups[module] = [];
            }

            groups[module].push(permission);
        });

        return groups;
    }, [permissions]);

    /**
     * Ordenar módulos alfabéticamente.
     */
    const sortedModules = useMemo(() => {
        return Object.keys(groupedPermissions).sort((a, b) =>
            a.localeCompare(b),
        );
    }, [groupedPermissions]);

    /**
     * Nombre legible del módulo.
     */
    const getModuleLabel = (module: string): string => {
        const labels: Record<string, string> = {
            users: 'Usuarios',
            roles: 'Roles',
            permissions: 'Permisos',
            dashboard: 'Dashboard',
            reports: 'Reportes',
            settings: 'Configuración',
            profile: 'Perfil',
        };

        return (
            labels[module] ??
            module.charAt(0).toUpperCase() +
            module.slice(1)
        );
    };

    /**
     * Nombre legible de la acción.
     */
    const getPermissionLabel = (
        permission: string,
    ): string => {
        const action = permission.split('.').pop();

        const labels: Record<string, string> = {
            view: 'Ver',
            create: 'Crear',
            edit: 'Editar',
            update: 'Actualizar',
            delete: 'Eliminar',
            status: 'Cambiar estado',
            manage: 'Administrar',
            show: 'Ver detalle',
            index: 'Listar',
        };

        return (
            labels[action ?? ''] ??
            action ??
            permission
        );
    };

    /**
     * Actualizar nombre del rol.
     */
    const updateName = (value: string) => {
        setForm((current) => ({
            ...current,
            name: value,
        }));
    };

    /**
     * Comprobar si un permiso está seleccionado.
     */
    const hasPermission = (
        permissionId: number,
    ): boolean => {
        return form.permissions.includes(permissionId);
    };

    /**
     * Activar/desactivar un permiso individual.
     */
    const togglePermission = (
        permissionId: number,
    ) => {

        if (processing || lockPermissions) {
            return;
        }

        setForm((current) => {
            const exists =
                current.permissions.includes(
                    permissionId,
                );

            if (exists) {
                return {
                    ...current,
                    permissions:
                        current.permissions.filter(
                            (id) =>
                                id !== permissionId,
                        ),
                };
            }

            return {
                ...current,
                permissions: [
                    ...current.permissions,
                    permissionId,
                ],
            };
        });
    };

    /**
     * Obtener los IDs de permisos de un módulo.
     */
    const getModulePermissionIds = (
        module: string,
    ): number[] => {
        return (
            groupedPermissions[module]?.map(
                (permission) => permission.id,
            ) ?? []
        );
    };

    /**
     * Comprobar si todos los permisos de un módulo
     * están seleccionados.
     */
    const isModuleFullySelected = (
        module: string,
    ): boolean => {
        const ids =
            getModulePermissionIds(module);

        return (
            ids.length > 0 &&
            ids.every((id) =>
                form.permissions.includes(id),
            )
        );
    };

    /**
     * Comprobar si el módulo está parcialmente seleccionado.
     */
    const isModulePartiallySelected = (
        module: string,
    ): boolean => {
        const ids =
            getModulePermissionIds(module);

        const selected = ids.filter((id) =>
            form.permissions.includes(id),
        ).length;

        return (
            selected > 0 &&
            selected < ids.length
        );
    };

    /**
     * Seleccionar/deseleccionar todos los permisos
     * de un módulo.
     */
    const toggleModule = (module: string) => {

        if (processing || lockPermissions) {
            return;
        }

        const ids =
            getModulePermissionIds(module);

        setForm((current) => {
            const allSelected =
                ids.length > 0 &&
                ids.every((id) =>
                    current.permissions.includes(
                        id,
                    ),
                );

            /**
             * Si todos están seleccionados,
             * los quitamos.
             */
            if (allSelected) {
                return {
                    ...current,
                    permissions:
                        current.permissions.filter(
                            (id) =>
                                !ids.includes(id),
                        ),
                };
            }

            /**
             * Si no están todos seleccionados,
             * agregamos los que falten.
             */
            const newPermissions = [
                ...current.permissions,
            ];

            ids.forEach((id) => {
                if (
                    !newPermissions.includes(id)
                ) {
                    newPermissions.push(id);
                }
            });

            return {
                ...current,
                permissions: newPermissions,
            };
        });
    };

    /**
     * Abrir/cerrar módulo.
     */
    const toggleModuleOpen = (
        module: string,
    ) => {
        if (processing) {
            return;
        }

        setOpenModules((current) => ({
            ...current,
            [module]:
                !current[module],
        }));
    };

    /**
     * Seleccionar todos los permisos.
     */
    const selectAll = () => {
        if (
            processing ||
            permissions.length === 0
        ) {
            return;
        }

        setForm((current) => ({
            ...current,
            permissions:
                permissions.map(
                    (permission) =>
                        permission.id,
                ),
        }));
    };

    /**
     * Quitar todos los permisos.
     */
    const clearAll = () => {
        if (processing) {
            return;
        }

        setForm((current) => ({
            ...current,
            permissions: [],
        }));
    };

    /**
     * Enviar formulario.
     */
    const handleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        /**
         * Evitar doble envío.
         */
        if (processing) {
            return;
        }

        onSubmit(form);
    };

    const isEdit = mode === 'edit';

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* =====================================================
                INFORMACIÓN DEL ROL
            ====================================================== */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Información del rol
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Nombre del rol
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(event) =>
                                updateName(
                                    event.target.value,
                                )
                            }

                            placeholder={
                                lockName
                                    ? 'Nombre protegido'
                                    : 'Ej. Administrador'
                            }

                            disabled={
                                processing ||
                                lockName
                            }
                            autoComplete="off"
                        />

                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* =====================================================
                PERMISOS
            ====================================================== */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>
                                Permisos
                            </CardTitle>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Selecciona los permisos
                                que tendrá este rol.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={selectAll}

                                disabled={
                                    processing ||
                                    lockPermissions ||
                                    permissions.length === 0
                                }
                            >
                                Seleccionar todos
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={clearAll}
                                disabled={
                                    processing ||
                                    lockPermissions ||
                                    form.permissions.length ===
                                    0
                                }
                            >
                                Quitar todos
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3">
                    {/* Error general de permisos */}
                    {errors.permissions && (
                        <p className="text-sm text-destructive">
                            {errors.permissions}
                        </p>
                    )}

                    {/* Sin permisos */}
                    {permissions.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                            No existen permisos
                            disponibles.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {sortedModules.map(
                                (module) => {
                                    const modulePermissions =
                                        groupedPermissions[
                                        module
                                        ] ?? [];

                                    const isOpen =
                                        openModules[
                                        module
                                        ] ?? true;

                                    const fullySelected =
                                        isModuleFullySelected(
                                            module,
                                        );

                                    const partiallySelected =
                                        isModulePartiallySelected(
                                            module,
                                        );

                                    return (
                                        <div
                                            key={module}
                                            className="overflow-hidden rounded-lg border"
                                        >
                                            {/* =================================================
                                                CABECERA DEL MÓDULO
                                            ================================================== */}
                                            <div className="flex items-center justify-between bg-muted/30 px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleModuleOpen(
                                                                module,
                                                            )
                                                        }
                                                        disabled={
                                                            processing
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                                                        aria-label={
                                                            isOpen
                                                                ? 'Contraer módulo'
                                                                : 'Expandir módulo'
                                                        }
                                                    >
                                                        {isOpen ? (
                                                            <ChevronDown className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4" />
                                                        )}
                                                    </button>

                                                    <div>
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
                                                </div>

                                                {/* =================================================
                                                    CHECKBOX DEL MÓDULO
                                                ================================================== */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleModule(
                                                            module,
                                                        )
                                                    }

                                                    disabled={
                                                        processing ||
                                                        lockPermissions
                                                    }
                                                    className={`flex h-5 w-5 items-center justify-center rounded border transition disabled:cursor-not-allowed disabled:opacity-50 ${fullySelected
                                                        ? 'border-primary bg-primary text-primary-foreground'
                                                        : partiallySelected
                                                            ? 'border-primary bg-primary/20'
                                                            : 'border-input bg-background'
                                                        }`}
                                                    aria-label={`Seleccionar permisos de ${getModuleLabel(module)}`}
                                                >
                                                    {fullySelected && (
                                                        <Check className="h-3.5 w-3.5" />
                                                    )}

                                                    {partiallySelected &&
                                                        !fullySelected && (
                                                            <span className="h-2 w-2 rounded-sm bg-primary" />
                                                        )}
                                                </button>
                                            </div>

                                            {/* =================================================
                                                PERMISOS DEL MÓDULO
                                            ================================================== */}
                                            {isOpen && (
                                                <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
                                                    {modulePermissions.map(
                                                        (
                                                            permission,
                                                        ) => {
                                                            const selected =
                                                                hasPermission(
                                                                    permission.id,
                                                                );

                                                            return (
                                                                <button
                                                                    key={
                                                                        permission.id
                                                                    }
                                                                    type="button"
                                                                    onClick={() =>
                                                                        togglePermission(
                                                                            permission.id,
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        processing ||
                                                                        lockPermissions
                                                                    }
                                                                    className={`flex items-center gap-3 rounded-md border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${selected
                                                                        ? 'border-primary bg-primary/5'
                                                                        : 'border-border hover:bg-muted/50'
                                                                        }`}
                                                                >
                                                                    {/* Checkbox visual */}
                                                                    <span
                                                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${selected
                                                                            ? 'border-primary bg-primary text-primary-foreground'
                                                                            : 'border-input bg-background'
                                                                            }`}
                                                                    >
                                                                        {selected ? (
                                                                            <Check className="h-3.5 w-3.5" />
                                                                        ) : (
                                                                            <X className="h-3.5 w-3.5 text-muted-foreground opacity-0" />
                                                                        )}
                                                                    </span>

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
                                                                </button>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    )}

                    {/* Error de permissions.* */}
                    {errors['permissions.0'] && (
                        <p className="text-sm text-destructive">
                            {
                                errors[
                                'permissions.0'
                                ]
                            }
                        </p>
                    )}

                    {/* Resumen */}
                    <div className="rounded-md bg-muted/40 px-4 py-3 text-sm">
                        <span className="font-medium">
                            {
                                form.permissions
                                    .length
                            }
                        </span>{' '}
                        de{' '}
                        <span className="font-medium">
                            {permissions.length}
                        </span>{' '}
                        permisos seleccionados
                    </div>
                </CardContent>
            </Card>

            {/* =====================================================
                ACCIONES
            ====================================================== */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Cancelar
                </Button>

                <Button
                    type="submit"
                    disabled={
                        processing ||
                        !form.name.trim()
                    }
                >
                    {processing
                        ? 'Guardando...'
                        : isEdit
                            ? 'Actualizar rol'
                            : 'Crear rol'}
                </Button>
            </div>
        </form>
    );
}
