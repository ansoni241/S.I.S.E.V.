// import { usePage } from '@inertiajs/react';

// type AuthUser = {
//     id: number;
//     name: string;
//     email: string;
// };

// type SharedProps = {
//     auth: {
//         user: AuthUser | null;
//     };

//     roles: string[];

//     permissions: string[];
// };

// export function usePermissions() {
//     const { auth, roles, permissions } =
//         usePage<SharedProps>().props;

//     /**
//      * Comprobar si el usuario tiene un permiso.
//      *
//      * Ejemplo:
//      *
//      * can('users.view')
//      * can('users.create')
//      * can('roles.edit')
//      */
//     const can = (permission: string): boolean => {
//         return permissions.includes(permission);
//     };

//     /**
//      * Comprobar si tiene al menos uno
//      * de los permisos indicados.
//      */
//     const canAny = (
//         requiredPermissions: string[],
//     ): boolean => {
//         return requiredPermissions.some((permission) =>
//             permissions.includes(permission),
//         );
//     };

//     /**
//      * Comprobar si tiene todos
//      * los permisos indicados.
//      */
//     const canAll = (
//         requiredPermissions: string[],
//     ): boolean => {
//         return requiredPermissions.every((permission) =>
//             permissions.includes(permission),
//         );
//     };

//     /**
//      * Comprobar si tiene un rol.
//      *
//      * Ejemplo:
//      *
//      * hasRole('Developer')
//      */
//     const hasRole = (role: string): boolean => {
//         return roles.includes(role);
//     };

//     /**
//      * Comprobar si tiene alguno
//      * de los roles indicados.
//      */
//     const hasAnyRole = (
//         requiredRoles: string[],
//     ): boolean => {
//         return requiredRoles.some((role) =>
//             roles.includes(role),
//         );
//     };

//     return {
//         user: auth.user,

//         permissions,
//         roles,

//         can,
//         canAny,
//         canAll,

//         hasRole,
//         hasAnyRole,
//     };
// }
import { usePage } from '@inertiajs/react';

type AuthUser = {
    id: number;
    name: string;
    email: string;
};

type AuthData = {
    user: AuthUser | null;
    roles: string[];
    permissions: string[];
};

type SharedProps = {
    auth: AuthData;
};

export function usePermissions() {
    const { auth } = usePage<SharedProps>().props;

    const roles = auth.roles ?? [];
    const permissions = auth.permissions ?? [];

    /**
     * =====================================================
     * PERMISOS
     * =====================================================
     */

    /**
     * Comprobar si el usuario tiene un permiso.
     *
     * Ejemplo:
     *
     * can('users.view')
     * can('users.create')
     * can('roles.edit')
     */
    const can = (permission: string): boolean => {
        return permissions.includes(permission);
    };

    /**
     * Comprobar si tiene al menos uno
     * de los permisos indicados.
     */
    const canAny = (
        requiredPermissions: string[],
    ): boolean => {
        return requiredPermissions.some((permission) =>
            permissions.includes(permission),
        );
    };

    /**
     * Comprobar si tiene todos
     * los permisos indicados.
     */
    const canAll = (
        requiredPermissions: string[],
    ): boolean => {
        return requiredPermissions.every((permission) =>
            permissions.includes(permission),
        );
    };

    /**
     * =====================================================
     * ROLES
     * =====================================================
     */

    /**
     * Comprobar si el usuario tiene un rol.
     *
     * Ejemplo:
     *
     * hasRole('Desarrollador')
     */
    const hasRole = (role: string): boolean => {
        return roles.includes(role);
    };

    /**
     * Comprobar si tiene alguno
     * de los roles indicados.
     */
    const hasAnyRole = (
        requiredRoles: string[],
    ): boolean => {
        return requiredRoles.some((role) =>
            roles.includes(role),
        );
    };

    return {
        user: auth.user,

        permissions,
        roles,

        can,
        canAny,
        canAll,

        hasRole,
        hasAnyRole,
    };
}
