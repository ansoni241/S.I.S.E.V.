// import { Form, Head } from '@inertiajs/react';
// import InputError from '@/components/input-error';
// import PasswordInput from '@/components/password-input';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Spinner } from '@/components/ui/spinner';
// import { update } from '@/routes/password';

// type Props = {
//     token: string;
//     email: string;
//     passwordRules: string;
// };

// export default function ResetPassword({ token, email, passwordRules }: Props) {
//     return (
//         <>
//             <Head title="Reset password" />

//             <Form
//                 {...update.form()}
//                 transform={(data) => ({ ...data, token, email })}
//                 resetOnSuccess={['password', 'password_confirmation']}
//             >
//                 {({ processing, errors }) => (
//                     <div className="grid gap-6">
//                         <div className="grid gap-2">
//                             <Label htmlFor="email">Email</Label>
//                             <Input
//                                 id="email"
//                                 type="email"
//                                 name="email"
//                                 autoComplete="email"
//                                 value={email}
//                                 className="mt-1 block w-full"
//                                 readOnly
//                             />
//                             <InputError
//                                 message={errors.email}
//                                 className="mt-2"
//                             />
//                         </div>

//                         <div className="grid gap-2">
//                             <Label htmlFor="password">Password</Label>
//                             <PasswordInput
//                                 id="password"
//                                 name="password"
//                                 autoComplete="new-password"
//                                 className="mt-1 block w-full"
//                                 autoFocus
//                                 placeholder="Password"
//                                 passwordrules={passwordRules}
//                             />
//                             <InputError message={errors.password} />
//                         </div>

//                         <div className="grid gap-2">
//                             <Label htmlFor="password_confirmation">
//                                 Confirm password
//                             </Label>
//                             <PasswordInput
//                                 id="password_confirmation"
//                                 name="password_confirmation"
//                                 autoComplete="new-password"
//                                 className="mt-1 block w-full"
//                                 placeholder="Confirm password"
//                                 passwordrules={passwordRules}
//                             />
//                             <InputError
//                                 message={errors.password_confirmation}
//                                 className="mt-2"
//                             />
//                         </div>

//                         <Button
//                             type="submit"
//                             className="mt-4 w-full"
//                             disabled={processing}
//                             data-test="reset-password-button"
//                         >
//                             {processing && <Spinner />}
//                             Reset password
//                         </Button>
//                     </div>
//                 )}
//             </Form>
//         </>
//     );
// }

// ResetPassword.layout = {
//     title: 'Reset password',
//     description: 'Please enter your new password below',
// };
import { Form, Head } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    KeyRound,
    LockKeyhole,
    Mail,
    ShieldCheck,
} from 'lucide-react';

import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
    passwordRules: string;
};

export default function ResetPassword({
    token,
    email,
    passwordRules,
}: Props) {
    return (
        <>
            <Head title="Nueva contraseña" />

            <div className="relative flex min-h-svh w-full overflow-hidden bg-slate-950">
                {/* =====================================================
                    PANEL INSTITUCIONAL
                ====================================================== */}

                <div className="relative hidden min-h-svh w-1/2 overflow-hidden lg:flex">
                    {/* Fondo */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />

                    {/* Efectos */}
                    <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

                    <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

                    <div className="absolute right-20 top-20 h-40 w-40 rounded-full border border-white/5" />

                    <div className="absolute bottom-24 left-24 h-64 w-64 rounded-full border border-white/5" />

                    {/* Grid */}
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
                        {/* Identidad */}
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

                        {/* Mensaje */}
                        <div className="max-w-xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-sm">
                                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                                Cuenta protegida
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                                Crea una nueva contraseña.
                            </h1>

                            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                                Establece una contraseña segura para proteger
                                tu cuenta y volver a acceder al sistema
                                institucional.
                            </p>

                            {/* Seguridad */}
                            <div className="mt-10 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                    Protege el acceso a tu cuenta.
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                    Utiliza una contraseña que no compartas
                                    con otras personas.
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                    Tu nueva contraseña reemplazará la
                                    anterior.
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
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

                {/* =====================================================
                    PANEL RESET
                ====================================================== */}

                <div className="relative flex min-h-svh w-full items-center justify-center bg-slate-50 px-6 py-12 lg:w-1/2 lg:px-12 dark:bg-slate-950">
                    {/* Decoración */}
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
                                <LockKeyhole className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Nueva contraseña
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Define una nueva contraseña para recuperar el
                                acceso a tu cuenta.
                            </p>
                        </div>

                        {/* Formulario */}
                        <Form
                            {...update.form()}
                            transform={(data) => ({
                                ...data,
                                token,
                                email,
                            })}
                            resetOnSuccess={[
                                'password',
                                'password_confirmation',
                            ]}
                        >
                            {({ processing, errors }) => (
                                <div className="space-y-6">
                                    {/* Correo */}
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
                                                value={email}
                                                className="h-12 bg-slate-100 pl-10 dark:bg-slate-900"
                                                readOnly
                                            />
                                        </div>

                                        <InputError
                                            message={errors.email}
                                        />
                                    </div>

                                    {/* Nueva contraseña */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            Nueva contraseña
                                        </Label>

                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            autoComplete="new-password"
                                            className="h-12"
                                            autoFocus
                                            placeholder="Ingresa tu nueva contraseña"
                                            passwordrules={passwordRules}
                                        />

                                        <InputError
                                            message={errors.password}
                                        />
                                    </div>

                                    {/* Confirmación */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="password_confirmation"
                                            className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            Confirmar contraseña
                                        </Label>

                                        <PasswordInput
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            autoComplete="new-password"
                                            className="h-12"
                                            placeholder="Repite tu nueva contraseña"
                                            passwordrules={passwordRules}
                                        />

                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>

                                    {/* Indicador de seguridad */}
                                    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-100/70 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

                                        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                                            Utiliza una contraseña segura y
                                            evita compartirla con otras
                                            personas.
                                        </p>
                                    </div>

                                    {/* Botón */}
                                    <Button
                                        type="submit"
                                        className="group h-12 w-full"
                                        disabled={processing}
                                        data-test="reset-password-button"
                                    >
                                        {processing ? (
                                            <>
                                                <Spinner />
                                                Actualizando contraseña...
                                            </>
                                        ) : (
                                            <>
                                                Establecer nueva contraseña
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </Form>

                        {/* Footer */}
                        <div className="mt-8 flex items-start gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                            <p className="text-xs leading-5 text-slate-500">
                                Una vez actualizada tu contraseña, podrás
                                utilizarla para iniciar sesión nuevamente en
                                SISEV.
                            </p>
                        </div>

                        <p className="mt-8 text-center text-xs text-slate-400">
                            Acceso exclusivo para usuarios autorizados.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

ResetPassword.layout = {
    title: 'Nueva contraseña',
    description: 'Establece una nueva contraseña para tu cuenta',
};
