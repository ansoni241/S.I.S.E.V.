import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
    Card,
    CardContent,
} from '@/components/ui/card';

import type {
    AdminUser,
    Role,
    UserFormData,
} from '@/types';

import { UserForm } from './form/UserForm';

type Props = {
    user: AdminUser;
    roles: Role[];
    errors?: Record<string, string>;
};

export default function Edit({
    user,
    roles,
    errors = {},
}: Props) {
    const [processing, setProcessing] = useState(false);

    /**
     * Actualizar usuario.
     */
    const handleSubmit = (data: UserFormData) => {
        // Evitar múltiples envíos
        if (processing) {
            return;
        }

        setProcessing(true);

        router.put(`/users/${user.id}`, data, {
            preserveScroll: true,

            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    /**
     * Cancelar edición.
     */
    const handleCancel = () => {
        if (processing) {
            return;
        }

        router.visit('/users');
    };

    return (
        <>
            <Head title={`Editar usuario - ${user.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Encabezado */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                disabled={processing}
                            >
                                <Link href="/users">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Volver a usuarios
                                </Link>
                            </Button>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Editar usuario
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Modifica la información y configuración
                            de acceso del usuario.
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <Card>
                    <CardContent className="p-6">
                        <UserForm
                            roles={roles}
                            mode="edit"
                            user={user}
                            errors={errors}
                            processing={processing}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
