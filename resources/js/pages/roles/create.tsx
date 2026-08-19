import { Head, router, useForm } from '@inertiajs/react';

import { RoleForm } from './form/RoleForm';

import type {
    RoleFormData,
    RolePermission,
} from '@/types';

type Props = {
    permissions: RolePermission[];
};

export default function Create({ permissions }: Props) {
    const form = useForm<RoleFormData>({
        name: '',
        permissions: [],
    });

    const handleSubmit = (data: RoleFormData) => {
        form.setData(data);

        form.post('/roles', {
            preserveScroll: true,
        });
    };

    const handleCancel = () => {
        if (form.processing) {
            return;
        }

        router.visit('/roles');
    };

    return (
        <>
            <Head title="Crear rol" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Crear rol
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Crea un nuevo rol y asigna los permisos
                        correspondientes.
                    </p>
                </div>

                <RoleForm
                    mode="create"
                    permissions={permissions}
                    errors={form.errors}
                    processing={form.processing}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        </>
    );
}
