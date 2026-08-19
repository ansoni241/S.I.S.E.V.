// // Components
// import { Form, Head } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';
// import InputError from '@/components/input-error';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { login } from '@/routes';
// import { email } from '@/routes/password';

// export default function ForgotPassword({ status }: { status?: string }) {
//     return (
//         <>
//             <Head title="Forgot password" />

//             {status && (
//                 <div className="mb-4 text-center text-sm font-medium text-green-600">
//                     {status}
//                 </div>
//             )}

//             <div className="space-y-6">
//                 <Form {...email.form()}>
//                     {({ processing, errors }) => (
//                         <>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="email">Email address</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     name="email"
//                                     autoComplete="off"
//                                     autoFocus
//                                     placeholder="email@example.com"
//                                 />

//                                 <InputError message={errors.email} />
//                             </div>

//                             <div className="my-6 flex items-center justify-start">
//                                 <Button
//                                     className="w-full"
//                                     disabled={processing}
//                                     data-test="email-password-reset-link-button"
//                                 >
//                                     {processing && (
//                                         <LoaderCircle className="h-4 w-4 animate-spin" />
//                                     )}
//                                     Email password reset link
//                                 </Button>
//                             </div>
//                         </>
//                     )}
//                 </Form>

//                 <div className="space-x-1 text-center text-sm text-muted-foreground">
//                     <span>Or, return to</span>
//                     <TextLink href={login()}>log in</TextLink>
//                 </div>
//             </div>
//         </>
//     );
// }

// ForgotPassword.layout = {
//     title: 'Forgot password',
//     description: 'Enter your email to receive a password reset link',
// };
import { Form, Head } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    KeyRound,
    Mail,
    ShieldCheck,
} from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Recuperar contraseña" />

            <div className="relative flex min-h-svh w-full overflow-hidden bg-slate-950">
                {/* =========================================================
                    PANEL INSTITUCIONAL
                ========================================================= */}

                <div className="relative hidden min-h-svh w-1/2 overflow-hidden lg:flex">
                    {/* Fondo */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />

                    {/* Elementos decorativos */}
                    <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

                    <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                    <div className="absolute right-20 top-20 h-40 w-40 rounded-full border border-white/5" />

                    <div className="absolute bottom-24 left-24 h-64 w-64 rounded-full border border-white/5" />

                    {/* Líneas decorativas */}
                    <div className="absolute inset-0 opacity-[0.035]">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                                backgroundSize: '60px 60px',
                            }}
                        />
                    </div>

                    {/* Contenido */}
                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
                        {/* Logo / identidad */}
                        <div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-lg backdrop-blur-sm">
                                    <KeyRound className="h-6 w-6 text-white" />
                                </div>

                                <div>
                                    <div className="text-2xl font-bold tracking-wide text-white">
                                        SISEV
                                    </div>

                                    <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                                        GAM Viacha
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mensaje central */}
                        <div className="max-w-xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-sm">
                                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                                Acceso seguro
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                                Recupera el acceso a tu cuenta.
                            </h1>

                            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                                Ingresa el correo electrónico asociado a tu
                                cuenta y te enviaremos un enlace para
                                restablecer tu contraseña.
                            </p>

                            <div className="mt-10 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <ShieldCheck className="mb-3 h-5 w-5 text-emerald-400" />

                                    <p className="text-sm font-medium text-white">
                                        Protección de acceso
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Protegemos tus credenciales y datos de
                                        acceso.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <Mail className="mb-3 h-5 w-5 text-blue-400" />

                                    <p className="text-sm font-medium text-white">
                                        Recuperación por correo
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Recibirás un enlace seguro para
                                        recuperar tu cuenta.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer institucional */}
                        <div>
                            <p className="text-xs text-slate-500">
                                Sistema Institucional de Seguimiento y
                                Verificación
                            </p>

                            <p className="mt-1 text-xs text-slate-600">
                                Gobierno Autónomo Municipal de Viacha
                            </p>
                        </div>
                    </div>
                </div>

                {/* =========================================================
                    PANEL DE RECUPERACIÓN
                ========================================================= */}

                <div className="relative flex min-h-svh w-full items-center justify-center bg-slate-50 px-6 py-12 lg:w-1/2 lg:px-12 dark:bg-slate-950">
                    {/* Decoración móvil */}
                    <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

                    <div className="relative z-10 w-full max-w-md">
                        {/* Logo móvil */}
                        <div className="mb-10 flex items-center justify-center lg:hidden">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900">
                                    <KeyRound className="h-5 w-5" />
                                </div>

                                <div>
                                    <div className="text-xl font-bold tracking-wide text-slate-900 dark:text-white">
                                        SISEV
                                    </div>

                                    <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                                        GAM Viacha
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Encabezado */}
                        <div className="mb-8">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <KeyRound className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Recuperar contraseña
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                No te preocupes. Ingresa tu correo electrónico
                                y te enviaremos las instrucciones para
                                restablecer tu contraseña.
                            </p>
                        </div>

                        {/* Mensaje de estado */}
                        {status && (
                            <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />

                                <p className="leading-5">{status}</p>
                            </div>
                        )}

                        {/* Formulario */}
                        <Form {...email.form()}>
                            {({ processing, errors }) => (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            Correo electrónico
                                        </Label>

                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                autoFocus
                                                placeholder="nombre@institucion.gob.bo"
                                                className="h-12 pl-10"
                                            />
                                        </div>

                                        <InputError
                                            message={errors.email}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="group h-12 w-full"
                                        disabled={processing}
                                        data-test="email-password-reset-link-button"
                                    >
                                        {processing ? (
                                            <>
                                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                Enviando instrucciones...
                                            </>
                                        ) : (
                                            <>
                                                Enviar enlace de recuperación
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </Form>

                        {/* Volver al Login */}
                        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
                            <TextLink
                                href={login()}
                                className="group flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Volver al inicio de sesión
                            </TextLink>
                        </div>

                        {/* Seguridad */}
                        <div className="mt-8 flex items-start gap-3">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                            <p className="text-xs leading-5 text-slate-500 dark:text-slate-500">
                                Por seguridad, el enlace de recuperación será
                                enviado únicamente al correo registrado en el
                                sistema.
                            </p>
                        </div>

                        {/* Footer */}
                        <p className="mt-8 text-center text-xs text-slate-400">
                            Acceso exclusivo para usuarios autorizados.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Recuperar contraseña',
    description:
        'Recupera el acceso a tu cuenta de forma segura',
};
