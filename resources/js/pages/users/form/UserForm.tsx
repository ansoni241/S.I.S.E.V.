import { useEffect, useMemo, useState } from 'react';

import {
    Check,
    Eye,
    EyeOff,
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
    UserFormData,
    UserFormProps,
} from '@/types';

export function UserForm({
    roles,
    mode,
    user,
    errors = {},
    processing = false,
    onSubmit,
    onCancel,
}: UserFormProps) {
    const [form, setForm] = useState<UserFormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        status: 'active',
        role: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    /**
     * Cargar los datos del usuario
     * cuando estamos en modo edición.
     */
    useEffect(() => {
        if (!user) {
            return;
        }

        setForm({
            name: user.name ?? '',
            email: user.email ?? '',
            password: '',
            password_confirmation: '',
            status: user.status,
            role: user.roles?.[0]?.name ?? '',
        });
    }, [user]);

    /**
     * Actualizar un campo del formulario.
     */
    const updateField = <K extends keyof UserFormData>(
        field: K,
        value: UserFormData[K],
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    /**
     * Fortaleza de la contraseña.
     */
    const passwordStrength = useMemo(() => {
        const password = form.password;

        if (!password) {
            return {
                score: 0,
                label: '',
                percentage: 0,
            };
        }

        let score = 0;

        if (password.length >= 8) {
            score++;
        }

        if (/[a-z]/.test(password)) {
            score++;
        }

        if (/[A-Z]/.test(password)) {
            score++;
        }

        if (/[0-9]/.test(password)) {
            score++;
        }

        if (/[^A-Za-z0-9]/.test(password)) {
            score++;
        }

        const levels = {
            1: {
                label: 'Muy débil',
                percentage: 20,
            },
            2: {
                label: 'Débil',
                percentage: 40,
            },
            3: {
                label: 'Media',
                percentage: 60,
            },
            4: {
                label: 'Fuerte',
                percentage: 80,
            },
            5: {
                label: 'Muy fuerte',
                percentage: 100,
            },
        } as const;

        if (score === 0) {
            return {
                score: 0,
                label: 'Muy débil',
                percentage: 0,
            };
        }

        return {
            score,
            ...levels[score as keyof typeof levels],
        };
    }, [form.password]);

    /**
     * Verificar coincidencia de contraseñas.
     */
    const passwordsMatch =
        form.password.length > 0 &&
        form.password_confirmation.length > 0 &&
        form.password === form.password_confirmation;

    const passwordsDoNotMatch =
        form.password_confirmation.length > 0 &&
        form.password !== form.password_confirmation;

    /**
     * Enviar formulario.
     */
    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        onSubmit(form);
    };

    const isEdit = mode === 'edit';

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* Información básica */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Información del usuario
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Nombre */}
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Nombre
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(event) =>
                                updateField(
                                    'name',
                                    event.target.value,
                                )
                            }
                            placeholder="Nombre completo"
                            autoComplete="name"
                            disabled={processing}
                        />

                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Correo */}
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Correo electrónico
                        </Label>

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                                updateField(
                                    'email',
                                    event.target.value,
                                )
                            }
                            placeholder="usuario@ejemplo.com"
                            autoComplete="email"
                            disabled={processing}
                        />

                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Estado y Rol */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Estado */}
                        <div className="space-y-2">
                            <Label htmlFor="status">
                                Estado
                            </Label>

                            <select
                                id="status"
                                name="status"
                                value={form.status}
                                onChange={(event) =>
                                    updateField(
                                        'status',
                                        event.target
                                            .value as UserFormData['status'],
                                    )
                                }
                                disabled={processing}
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="active">
                                    Activo
                                </option>

                                <option value="inactive">
                                    Inactivo
                                </option>

                                <option value="blocked">
                                    Bloqueado
                                </option>
                            </select>

                            {errors.status && (
                                <p className="text-sm text-destructive">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        {/* Rol */}
                        <div className="space-y-2">
                            <Label htmlFor="role">
                                Rol
                            </Label>

                            <select
                                id="role"
                                name="role"
                                value={form.role}
                                onChange={(event) =>
                                    updateField(
                                        'role',
                                        event.target.value,
                                    )
                                }
                                disabled={processing}
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="">
                                    Sin rol
                                </option>

                                {roles.map((role) => (
                                    <option
                                        key={role.id}
                                        value={role.name}
                                    >
                                        {role.name}
                                    </option>
                                ))}
                            </select>

                            {errors.role && (
                                <p className="text-sm text-destructive">
                                    {errors.role}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Contraseña */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {isEdit
                            ? 'Cambiar contraseña'
                            : 'Contraseña'}
                    </CardTitle>

                    {isEdit && (
                        <p className="text-sm text-muted-foreground">
                            Deja estos campos vacíos si no
                            deseas cambiar la contraseña.
                        </p>
                    )}
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Contraseña */}
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Contraseña
                            </Label>

                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={form.password}
                                    onChange={(event) =>
                                        updateField(
                                            'password',
                                            event.target
                                                .value,
                                        )
                                    }
                                    autoComplete="new-password"
                                    disabled={processing}
                                    placeholder={
                                        isEdit
                                            ? 'Nueva contraseña'
                                            : 'Contraseña'
                                    }
                                    className="pr-10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (current) =>
                                                !current,
                                        )
                                    }
                                    disabled={processing}
                                    className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                                    aria-label={
                                        showPassword
                                            ? 'Ocultar contraseña'
                                            : 'Mostrar contraseña'
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>

                            {/* Fortaleza */}
                            {form.password && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">
                                            Fortaleza
                                        </span>

                                        <span className="font-medium">
                                            {
                                                passwordStrength.label
                                            }
                                        </span>
                                    </div>

                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-primary transition-all duration-300"
                                            style={{
                                                width: `${passwordStrength.percentage}%`,
                                            }}
                                        />
                                    </div>

                                    <div className="grid gap-1 text-xs text-muted-foreground">
                                        <PasswordRequirement
                                            valid={
                                                form.password
                                                    .length >= 8
                                            }
                                            text="Mínimo 8 caracteres"
                                        />

                                        <PasswordRequirement
                                            valid={
                                                /[a-z]/.test(
                                                    form.password,
                                                )
                                            }
                                            text="Una letra minúscula"
                                        />

                                        <PasswordRequirement
                                            valid={
                                                /[A-Z]/.test(
                                                    form.password,
                                                )
                                            }
                                            text="Una letra mayúscula"
                                        />

                                        <PasswordRequirement
                                            valid={
                                                /[0-9]/.test(
                                                    form.password,
                                                )
                                            }
                                            text="Un número"
                                        />

                                        <PasswordRequirement
                                            valid={
                                                /[^A-Za-z0-9]/.test(
                                                    form.password,
                                                )
                                            }
                                            text="Un carácter especial"
                                        />
                                    </div>
                                </div>
                            )}

                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirmación */}
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">
                                Confirmar contraseña
                            </Label>

                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type={
                                        showPasswordConfirmation
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={
                                        form.password_confirmation
                                    }
                                    onChange={(event) =>
                                        updateField(
                                            'password_confirmation',
                                            event.target
                                                .value,
                                        )
                                    }
                                    autoComplete="new-password"
                                    disabled={processing}
                                    placeholder="Repetir contraseña"
                                    className={`pr-10 ${
                                        passwordsDoNotMatch
                                            ? 'border-destructive focus-visible:ring-destructive'
                                            : passwordsMatch
                                              ? 'border-green-500'
                                              : ''
                                    }`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPasswordConfirmation(
                                            (current) =>
                                                !current,
                                        )
                                    }
                                    disabled={processing}
                                    className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                                    aria-label={
                                        showPasswordConfirmation
                                            ? 'Ocultar contraseña'
                                            : 'Mostrar contraseña'
                                    }
                                >
                                    {showPasswordConfirmation ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>

                            {/* Coincidencia */}
                            {passwordsMatch && (
                                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                    <Check className="h-3.5 w-3.5" />
                                    Las contraseñas coinciden
                                </div>
                            )}

                            {passwordsDoNotMatch && (
                                <div className="flex items-center gap-1 text-xs text-destructive">
                                    <X className="h-3.5 w-3.5" />
                                    Las contraseñas no coinciden
                                </div>
                            )}

                            {errors.password_confirmation && (
                                <p className="text-sm text-destructive">
                                    {
                                        errors.password_confirmation
                                    }
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Acciones */}
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
                    disabled={processing}
                >
                    {processing
                        ? 'Guardando...'
                        : isEdit
                          ? 'Actualizar usuario'
                          : 'Crear usuario'}
                </Button>
            </div>
        </form>
    );
}

/**
 * Requisito individual de contraseña.
 */
function PasswordRequirement({
    valid,
    text,
}: {
    valid: boolean;
    text: string;
}) {
    return (
        <div className="flex items-center gap-2">
            {valid ? (
                <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            ) : (
                <X className="h-3.5 w-3.5 text-muted-foreground" />
            )}

            <span
                className={
                    valid
                        ? 'text-green-600 dark:text-green-400'
                        : ''
                }
            >
                {text}
            </span>
        </div>
    );
}
