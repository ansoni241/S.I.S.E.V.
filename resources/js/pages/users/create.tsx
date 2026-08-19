import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
    Card,
    CardContent,
} from '@/components/ui/card';

import type {
    Role,
    UserFormData,
} from '@/types';

import { UserForm } from './form/UserForm';

type Props = {
    roles: Role[];
    errors?: Record<string, string>;
};

export default function Create({
    roles,
    errors = {},
}: Props) {
    const [processing, setProcessing] = useState(false);

    /**
     * Enviar formulario.
     */
    const handleSubmit = (data: UserFormData) => {
        // Evitar múltiples envíos
        if (processing) {
            return;
        }

        setProcessing(true);

        router.post('/users', data, {
            preserveScroll: true,

            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    /**
     * Cancelar creación.
     */
    const handleCancel = () => {
        if (processing) {
            return;
        }

        router.visit('/users');
    };

    return (
        <>
            <Head title="Nuevo usuario" />

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
                            Nuevo usuario
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Crea un nuevo usuario y configura su
                            acceso al sistema.
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <Card>
                    <CardContent className="p-6">
                        <UserForm
                            roles={roles}
                            mode="create"
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
