/**
 * Permiso del sistema.
 */
export type RolePermission = {
    id: number;
    name: string;
    guard_name?: string;
};

/**
 * Rol del sistema.
 */
export type Role = {
    id: number;
    name: string;
    guard_name?: string;

    /**
     * Permisos asignados al rol.
     */
    permissions?: RolePermission[];

    /**
     * Cantidad de usuarios que tienen este rol.
     */
    users_count?: number;

    created_at?: string;
    updated_at?: string;
};

/**
 * Filtros del listado de roles.
 */
export type RoleFilters = {
    search: string;
};

/**
 * Datos enviados por el formulario
 * de creación y edición de roles.
 */
export type RoleFormData = {
    name: string;
    permissions: number[];
};

/**
 * Props del formulario reutilizable
 * para crear y editar roles.
 */
export type RoleFormProps = {
    mode: 'create' | 'edit';

    role?: Role;

    permissions: RolePermission[];

    errors?: Record<string, string>;

    processing?: boolean;

    lockName?: boolean;
    lockPermissions?: boolean;

    onSubmit: (data: RoleFormData) => void;

    onCancel: () => void;
};
