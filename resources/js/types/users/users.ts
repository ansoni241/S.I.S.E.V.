// export type Role = {
//     id: number;
//     name: string;
// };
import type { Role } from '../roles/roles';
export type UserPresence = {
    status: 'online' | 'away' | 'offline' | string;
    last_login_at: string | null;
    last_login_ip: string | null;
    last_activity: string | null;
    ip_address: string | null;
    user_agent: string | null;
};

export type AdminUser = {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'inactive' | 'blocked';
    last_login_at: string | null;
    last_login_ip: string | null;
    created_at: string;
    updated_at: string;
    roles: Role[];
    presence: UserPresence;
};

export type UserFilters = {
    search: string;
    status: string;
};

/**
 * Datos enviados por el formulario
 * de creación y edición de usuarios.
 */
export type UserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    status: 'active' | 'inactive' | 'blocked';
    role: string;
};

/**
 * Props del formulario reutilizable.
 */
export type UserFormProps = {
    roles: Role[];
    mode: 'create' | 'edit';
    user?: AdminUser;
    errors?: Record<string, string>;
    processing?: boolean;
    onSubmit: (data: UserFormData) => void;
    onCancel: () => void;
};
