import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Eye,
    Pencil,
    Plus,
    Search,
    Trash2,
    UserRound,
} from 'lucide-react';
import type {
    PaginatedResponse,
    AdminUser,
    UserFilters,
    UserPresence,
} from '@/types';
import { Pagination } from '@/components/pagination';

import { usePermissions } from '@/hooks/use-permissions';


type Props = {
    users: PaginatedResponse<AdminUser>;
    filters: UserFilters;
};

export default function Index({ users, filters }: Props) {
    const { can } = usePermissions();

    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const [presenceUpdates, setPresenceUpdates] = useState<
        Record<number, UserPresence>
    >({});
    const [userRows, setUserRows] = useState(users.data);

    useEffect(() => {
        setUserRows(users.data);
    }, [users.data]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/users',
                {
                    search: search || undefined,
                    status: status || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, status]);

    useEffect(() => {
        // console.log('🔌 Suscribiendo al canal private-users...');

        const channel = window.Echo.private('users');

        channel.subscribed(() => {
            // console.log('✅ Suscripción exitosa al canal private-users',);
        });

        channel.error((error: unknown) => {
            console.error(
                '❌ Error al suscribirse a private-users:',
                error,
            );
        });

        channel.listen(
            '.user.presence.updated',

            (event: {
                user_id: number;
                status: UserPresence['status'];
                last_activity: string | null;
                ip_address: string | null;
            }) => {

                setPresenceUpdates((current) => ({
                    ...current,
                    [event.user_id]: {
                        status: event.status,
                        last_activity: event.last_activity,
                        ip_address: event.ip_address,
                    },
                }));
            },
        );

        channel.listen('.user.created', (event: {
            user: AdminUser;
        }) => {

            setUserRows((current) => {
                const exists = current.some(
                    (user) => user.id === event.user.id,
                );

                if (exists) {
                    return current;
                }

                return [event.user, ...current];
            });
        });

        channel.listen('.user.updated', (event: {
            user: AdminUser;
        }) => {

            setUserRows((current) =>
                current.map((user) =>
                    user.id === event.user.id
                        ? event.user
                        : user,
                ),
            );
        });

        channel.listen('.user.deleted', (event: {
            user_id: number;
        }) => {

            setUserRows((current) =>
                current.filter(
                    (user) => user.id !== event.user_id,
                ),
            );
        });

        return () => {

            window.Echo.leave('users');
        };
    }, []);
    const deleteUser = (user: AdminUser) => {
        if (
            !confirm(
                `¿Está seguro de eliminar al usuario "${user.name}"?`,
            )
        ) {
            return;
        }

        router.delete(`/users/${user.id}`, {
            preserveScroll: true,
        });
    };

    const getPresenceLabel = (presence: UserPresence) => {
        switch (presence.status) {
            case 'online':
                return 'Online';

            case 'away':
                return 'Ausente';

            case 'offline':
                return 'Offline';

            default:
                return presence.status;
        }
    };

    const getPresenceClass = (presence: UserPresence) => {
        switch (presence.status) {
            case 'online':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';

            case 'away':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';

            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    const getStatusClass = (status: string) => {
        return status === 'active'
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    };

    const getStatusLabel = (status: string) => {
        return status === 'active' ? 'Activo' : 'Inactivo';
    };

    const formatDate = (date: string | null) => {
        if (!date) {
            return 'Nunca';
        }

        const value = new Date(date);

        if (Number.isNaN(value.getTime())) {
            return 'Fecha inválida';
        }

        const day = String(value.getDate()).padStart(2, '0');
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const year = value.getFullYear();

        const hours = String(value.getHours()).padStart(2, '0');
        const minutes = String(value.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (

        <>
            <Head title="Usuarios" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Encabezado */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Usuarios
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Administración de usuarios, acceso y presencia.
                        </p>
                    </div>

                    {can('users.create') && (
                        <Button asChild>
                            <Link href="/users/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Nuevo usuario
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Filtros */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Buscar por nombre o correo..."
                                    className="pl-9"
                                />
                            </div>

                            <select
                                value={status}
                                onChange={(event) =>
                                    setStatus(event.target.value)
                                }
                                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="">Todos los estados</option>
                                <option value="active">Activos</option>
                                <option value="inactive">Inactivos</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Resumen */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total de usuarios
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center gap-3">
                                <UserRound className="h-5 w-5 text-muted-foreground" />

                                <span className="text-2xl font-bold">
                                    {users.total}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Mostrando
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <span className="text-2xl font-bold">
                                {users.from ?? 0} - {users.to ?? 0}
                            </span>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Página
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <span className="text-2xl font-bold">
                                {users.current_page} / {users.last_page}
                            </span>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabla */}
                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardTitle>Listado de usuarios</CardTitle>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full min-w-[1000px] text-sm">
                                <thead className="border-b bg-muted/40">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">
                                            Usuario
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Roles
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Acceso
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Presencia
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Última actividad
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            IP
                                        </th>

                                        <th className="px-4 py-3 text-right font-medium">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-4 py-10 text-center text-muted-foreground"
                                            >
                                                No se encontraron usuarios.
                                            </td>
                                        </tr>
                                    ) : (
                                        // users.data.map((user) => {
                                        userRows.map((user) => {
                                            const presence: UserPresence =
                                                presenceUpdates[user.id] ?? user.presence ?? {
                                                    status: 'offline',
                                                    last_activity: null,
                                                    ip_address: null,
                                                };

                                            return (
                                                <tr
                                                    key={user.id}
                                                    className="border-b last:border-0 hover:bg-muted/30"
                                                >
                                                    <td className="px-4 py-4">
                                                        <div className="font-medium">
                                                            {user.name}
                                                        </div>

                                                        <div className="text-xs text-muted-foreground">
                                                            {user.email}
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <div className="flex flex-wrap gap-1">
                                                            {user.roles.length > 0 ? (
                                                                user.roles.map((role) => (
                                                                    <Badge
                                                                        key={role.id}
                                                                        variant="secondary"
                                                                    >
                                                                        {role.name}
                                                                    </Badge>
                                                                ))
                                                            ) : (
                                                                <span className="text-xs text-muted-foreground">
                                                                    Sin rol
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <Badge
                                                            className={getStatusClass(
                                                                user.status,
                                                            )}
                                                        >
                                                            {getStatusLabel(user.status)}
                                                        </Badge>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <Badge
                                                            className={getPresenceClass(
                                                                presence,
                                                            )}
                                                        >
                                                            <span className="mr-1">
                                                                ●
                                                            </span>

                                                            {getPresenceLabel(
                                                                presence,
                                                            )}
                                                        </Badge>
                                                    </td>

                                                    <td className="px-4 py-4 text-xs">
                                                        {formatDate(
                                                            presence.last_activity ??
                                                            user.last_login_at,
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-4 font-mono text-xs">
                                                        {presence.ip_address ??
                                                            user.last_login_ip ??
                                                            '—'}
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <div className="flex justify-end gap-1">
                                                            {can('users.view') && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    asChild
                                                                    title="Ver usuario"
                                                                >
                                                                    <Link
                                                                        href={`/users/${user.id}`}
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                    </Link>
                                                                </Button>
                                                            )}
                                                            {can('users.edit') && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    asChild
                                                                    title="Editar usuario"
                                                                >
                                                                    <Link
                                                                        href={`/users/${user.id}/edit`}
                                                                    >
                                                                        <Pencil className="h-4 w-4" />
                                                                    </Link>
                                                                </Button>
                                                            )}
                                                            {can('users.delete') && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    title="Eliminar usuario"
                                                                    onClick={() =>
                                                                        deleteUser(user)
                                                                    }
                                                                >
                                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Paginación */}
                <Pagination links={users.links} />
            </div>
        </>
    );
}
