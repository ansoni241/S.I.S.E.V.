// import { Form, Head } from '@inertiajs/react';
// import InputError from '@/components/input-error';
// import PasskeyVerify from '@/components/passkey-verify';
// import PasswordInput from '@/components/password-input';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Spinner } from '@/components/ui/spinner';
// import { store } from '@/routes/login';
// import { request } from '@/routes/password';

// type Props = {
//     status?: string;
//     canResetPassword: boolean;
// };

// export default function Login({ status, canResetPassword }: Props) {
//     return (
//         <>
//             <Head title="Log in" />

//             <PasskeyVerify />

//             <Form
//                 {...store.form()}
//                 resetOnSuccess={['password']}
//                 className="flex flex-col gap-6"
//             >
//                 {({ processing, errors }) => (
//                     <>
//                         <div className="grid gap-6">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="email">Email address</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     name="email"
//                                     required
//                                     autoFocus
//                                     tabIndex={1}
//                                     autoComplete="email"
//                                     placeholder="email@example.com"
//                                 />
//                                 <InputError message={errors.email} />
//                             </div>

//                             <div className="grid gap-2">
//                                 <div className="flex items-center">
//                                     <Label htmlFor="password">Password</Label>
//                                     {canResetPassword && (
//                                         <TextLink
//                                             href={request()}
//                                             className="ml-auto text-sm"
//                                             tabIndex={5}
//                                         >
//                                             Forgot your password?
//                                         </TextLink>
//                                     )}
//                                 </div>
//                                 <PasswordInput
//                                     id="password"
//                                     name="password"
//                                     required
//                                     tabIndex={2}
//                                     autoComplete="current-password"
//                                     placeholder="Password"
//                                 />
//                                 <InputError message={errors.password} />
//                             </div>

//                             <div className="flex items-center space-x-3">
//                                 <Checkbox
//                                     id="remember"
//                                     name="remember"
//                                     tabIndex={3}
//                                 />
//                                 <Label htmlFor="remember">Remember me</Label>
//                             </div>

//                             <Button
//                                 type="submit"
//                                 className="mt-4 w-full"
//                                 tabIndex={4}
//                                 disabled={processing}
//                                 data-test="login-button"
//                             >
//                                 {processing && <Spinner />}
//                                 Log in
//                             </Button>
//                         </div>

//                         <div className="text-center text-sm text-muted-foreground">
//                             Don't have an account?{' '}
//                             {/* <TextLink href={register()} tabIndex={5}>
//                                 Sign up
//                             </TextLink> */}
//                         </div>
//                     </>
//                 )}
//             </Form>

//             {status && (
//                 <div className="mb-4 text-center text-sm font-medium text-green-600">
//                     {status}
//                 </div>
//             )}
//         </>
//     );
// }

// Login.layout = {
//     title: 'Log in to your account',
//     description: 'Enter your email and password below to log in',
// };
import { Form, Head } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    LockKeyhole,
    ShieldCheck,
} from 'lucide-react';

import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({
    status,
    canResetPassword,
}: Props) {
    return (
        <>
            <Head title="Iniciar sesión" />

            <PasskeyVerify />

            <div className="relative min-h-screen overflow-hidden bg-background">
                {/* =====================================================
                    FONDO DECORATIVO
                ====================================================== */}

                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

                    <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage:
                                'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />
                </div>

                <div className="relative flex min-h-screen">
                    {/* =================================================
                        PANEL INSTITUCIONAL
                    ================================================== */}

                    <div className="relative hidden w-[52%] overflow-hidden bg-slate-950 text-white lg:flex">
                        {/* Decoración */}

                        <div className="absolute inset-0">
                            <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />

                            <div className="absolute -bottom-40 -right-20 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />

                            <div
                                className="absolute inset-0 opacity-[0.04]"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
                                    backgroundSize:
                                        '48px 48px',
                                }}
                            />
                        </div>

                        <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
                            {/* Logo / identidad */}

                            <div>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <div className="text-lg font-semibold tracking-wide">
                                            SISEV
                                        </div>

                                        <div className="text-xs text-white/50">
                                            Sistema Institucional
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mensaje principal */}

                            <div className="max-w-xl">
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                                    Plataforma segura
                                </div>

                                <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
                                    Gestión institucional,
                                    <br />

                                    <span className="text-white/50">
                                        simple, segura y eficiente.
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-lg text-base leading-7 text-white/50">
                                    Accede al sistema para gestionar
                                    usuarios, roles, permisos y los
                                    diferentes procesos administrativos
                                    de la institución.
                                </p>

                                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                                            <LockKeyhole className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium">
                                                Acceso protegido
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-white/40">
                                                Control de acceso basado
                                                en permisos.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium">
                                                Gestión centralizada
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-white/40">
                                                Administración segura de
                                                usuarios y roles.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pie */}

                            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/35">
                                <span>
                                    Sistema Institucional
                                </span>

                                <span>
                                    © {new Date().getFullYear()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        PANEL LOGIN
                    ================================================== */}

                    <div className="flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-[48%]">
                        <div className="w-full max-w-md">
                            {/* Cabecera móvil */}

                            <div className="mb-10 lg:hidden">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="font-semibold">
                                            SISEV
                                        </div>

                                        <div className="text-xs text-muted-foreground">
                                            Sistema Institucional
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contenedor */}

                            <div className="rounded-2xl border bg-card p-7 shadow-sm sm:p-9">
                                {/* Encabezado */}

                                <div className="mb-8">
                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <LockKeyhole className="h-5 w-5" />
                                    </div>

                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        Bienvenido nuevamente
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        Ingresa tus credenciales para
                                        acceder al sistema.
                                    </p>
                                </div>

                                {/* Status */}

                                {status && (
                                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
                                        {status}
                                    </div>
                                )}

                                <Form
                                    {...store.form()}
                                    resetOnSuccess={[
                                        'password',
                                    ]}
                                    className="space-y-6"
                                >
                                    {({
                                        processing,
                                        errors,
                                    }) => (
                                        <>
                                            {/* Email */}

                                            <div className="space-y-2">
                                                <Label htmlFor="email">
                                                    Correo electrónico
                                                </Label>

                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    placeholder="nombre@institucion.gob.bo"
                                                    className="h-11"
                                                />

                                                <InputError
                                                    message={
                                                        errors.email
                                                    }
                                                />
                                            </div>

                                            {/* Password */}

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="password">
                                                        Contraseña
                                                    </Label>

                                                    {canResetPassword && (
                                                        <TextLink
                                                            href={request()}
                                                            className="text-xs"
                                                            tabIndex={5}
                                                        >
                                                            ¿Olvidaste tu
                                                            contraseña?
                                                        </TextLink>
                                                    )}
                                                </div>

                                                <PasswordInput
                                                    id="password"
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="Ingresa tu contraseña"
                                                    className="h-11"
                                                />

                                                <InputError
                                                    message={
                                                        errors.password
                                                    }
                                                />
                                            </div>

                                            {/* Remember */}

                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                    tabIndex={3}
                                                />

                                                <Label
                                                    htmlFor="remember"
                                                    className="cursor-pointer text-sm font-normal"
                                                >
                                                    Mantener mi sesión
                                                    iniciada
                                                </Label>
                                            </div>

                                            {/* Submit */}

                                            <Button
                                                type="submit"
                                                className="group h-11 w-full"
                                                tabIndex={4}
                                                disabled={
                                                    processing
                                                }
                                                data-test="login-button"
                                            >
                                                {processing ? (
                                                    <>
                                                        <Spinner />
                                                        Verificando...
                                                    </>
                                                ) : (
                                                    <>
                                                        Iniciar sesión

                                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </Button>
                                        </>
                                    )}
                                </Form>

                                {/* Seguridad */}

                                <div className="mt-8 flex items-start gap-3 border-t pt-6">
                                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                                    <p className="text-xs leading-5 text-muted-foreground">
                                        Tu acceso está protegido. No
                                        compartas tus credenciales con
                                        otras personas.
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}

                            <p className="mt-6 text-center text-xs text-muted-foreground">
                                Acceso exclusivo para usuarios
                                autorizados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Login.layout = {
    title: 'Acceso al sistema',
    description:
        'Ingresa tus credenciales para acceder al sistema',
};
