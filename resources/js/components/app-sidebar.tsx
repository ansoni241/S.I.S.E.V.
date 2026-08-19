// // import { Link } from '@inertiajs/react';
// // import { BookOpen, FolderGit2, LayoutGrid, Users } from 'lucide-react';
// // import AppLogo from '@/components/app-logo';
// // import { NavFooter } from '@/components/nav-footer';
// // import { NavMain } from '@/components/nav-main';
// // import { NavUser } from '@/components/nav-user';
// // import {
// //     Sidebar,
// //     SidebarContent,
// //     SidebarFooter,
// //     SidebarHeader,
// //     SidebarMenu,
// //     SidebarMenuButton,
// //     SidebarMenuItem,
// // } from '@/components/ui/sidebar';
// // import { dashboard } from '@/routes';

// // import { index as usersIndex } from '@/routes/users';

// // import type { NavItem } from '@/types';

// // const mainNavItems: NavItem[] = [
// //     {
// //         title: 'Dashboard',
// //         href: dashboard(),
// //         icon: LayoutGrid,
// //     },
// //     {
// //         title: 'Usuarios',
// //         href: usersIndex(),
// //         icon: Users,
// //     },
// // ];

// // const footerNavItems: NavItem[] = [
// //     {
// //         title: 'Repository',
// //         href: 'https://github.com/laravel/react-starter-kit',
// //         icon: FolderGit2,
// //     },
// //     {
// //         title: 'Documentation',
// //         href: 'https://laravel.com/docs/starter-kits#react',
// //         icon: BookOpen,
// //     },
// // ];

// // export function AppSidebar() {
// //     return (
// //         <Sidebar collapsible="icon" variant="inset">
// //             <SidebarHeader>
// //                 <SidebarMenu>
// //                     <SidebarMenuItem>
// //                         <SidebarMenuButton size="lg" asChild>
// //                             <Link href={dashboard()} prefetch>
// //                                 <AppLogo />
// //                             </Link>
// //                         </SidebarMenuButton>
// //                     </SidebarMenuItem>
// //                 </SidebarMenu>
// //             </SidebarHeader>

// //             <SidebarContent>
// //                 <NavMain items={mainNavItems} />
// //             </SidebarContent>

// //             <SidebarFooter>
// //                 <NavFooter items={footerNavItems} className="mt-auto" />
// //                 <NavUser />
// //             </SidebarFooter>
// //         </Sidebar>
// //     );
// // }
// // ///////HOLA COMO ESTAS ES NUEVO
// // import { Link } from '@inertiajs/react';

// // import {
// //     BookOpen,
// //     FolderGit2,
// //     LayoutGrid,
// //     Settings,
// //     ShieldCheck,
// //     Users,
// // } from 'lucide-react';

// // import AppLogo from '@/components/app-logo';
// // import { NavFooter } from '@/components/nav-footer';
// // import { NavMain } from '@/components/nav-main';
// // import { NavUser } from '@/components/nav-user';

// // import {
// //     Sidebar,
// //     SidebarContent,
// //     SidebarFooter,
// //     SidebarHeader,
// //     SidebarMenu,
// //     SidebarMenuButton,
// //     SidebarMenuItem,
// // } from '@/components/ui/sidebar';

// // import { dashboard } from '@/routes';
// // import { index as rolesIndex } from '@/routes/roles';
// // import { index as usersIndex } from '@/routes/users';

// // import type { NavItem } from '@/types';

// // const mainNavItems: NavItem[] = [
// //     {
// //         title: 'Dashboard',
// //         href: dashboard(),
// //         icon: LayoutGrid,
// //     },

// //     {
// //         title: 'Configuración',
// //         href: '#',
// //         icon: Settings,

// //         children: [
// //             {
// //                 title: 'Usuarios',
// //                 href: usersIndex(),
// //                 icon: Users,
// //             },

// //             {
// //                 title: 'Roles',
// //                 href: rolesIndex(),
// //                 icon: ShieldCheck,
// //             },
// //         ],
// //     },
// // ];

// // const footerNavItems: NavItem[] = [
// //     {
// //         title: 'Repository',
// //         href: 'https://github.com/laravel/react-starter-kit',
// //         icon: FolderGit2,
// //     },

// //     {
// //         title: 'Documentation',
// //         href: 'https://laravel.com/docs/starter-kits#react',
// //         icon: BookOpen,
// //     },
// // ];

// // export function AppSidebar() {
// //     return (
// //         <Sidebar collapsible="icon" variant="inset">
// //             <SidebarHeader>
// //                 <SidebarMenu>
// //                     <SidebarMenuItem>
// //                         <SidebarMenuButton
// //                             size="lg"
// //                             asChild
// //                         >
// //                             <Link
// //                                 href={dashboard()}
// //                                 prefetch
// //                             >
// //                                 <AppLogo />
// //                             </Link>
// //                         </SidebarMenuButton>
// //                     </SidebarMenuItem>
// //                 </SidebarMenu>
// //             </SidebarHeader>

// //             <SidebarContent>
// //                 <NavMain items={mainNavItems} />
// //             </SidebarContent>

// //             <SidebarFooter>
// //                 <NavFooter
// //                     items={footerNavItems}
// //                     className="mt-auto"
// //                 />

// //                 <NavUser />
// //             </SidebarFooter>
// //         </Sidebar>
// //     );
// // }
// import { Link } from '@inertiajs/react';

// import {
//     BookOpen,
//     FolderGit2,
//     LayoutGrid,
//     Settings,
//     ShieldCheck,
//     Users,
// } from 'lucide-react';

// import AppLogo from '@/components/app-logo';
// import { NavFooter } from '@/components/nav-footer';
// import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';

// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from '@/components/ui/sidebar';

// import { usePermissions } from '@/hooks/use-permissions';

// import { dashboard } from '@/routes';
// import { index as rolesIndex } from '@/routes/roles';
// import { index as usersIndex } from '@/routes/users';

// import type { NavItem } from '@/types';

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: FolderGit2,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

// export function AppSidebar() {
//     const { can } = usePermissions();

//     /**
//      * Elementos principales del menú.
//      */
//     const mainNavItems: NavItem[] = [
//         {
//             title: 'Dashboard',
//             href: dashboard(),
//             icon: LayoutGrid,
//         },
//         {
//             title: 'Configuración',
//             href: '#',
//             icon: Settings,

//             children: [
//                 ...(can('users.view')
//                     ? [
//                           {
//                               title: 'Usuarios',
//                               href: usersIndex(),
//                               icon: Users,
//                           },
//                       ]
//                     : []),

//                 ...(can('roles.view')
//                     ? [
//                           {
//                               title: 'Roles',
//                               href: rolesIndex(),
//                               icon: ShieldCheck,
//                           },
//                       ]
//                     : []),
//             ],
//         },
//     ];

//     /**
//      * Si el usuario no tiene acceso a ningún módulo
//      * de configuración, eliminamos el menú completo.
//      */
//     const filteredNavItems = mainNavItems.filter(
//         (item) =>
//             !item.children ||
//             item.children.length > 0,
//     );

//     return (
//         <Sidebar
//             collapsible="icon"
//             variant="inset"
//         >
//             <SidebarHeader>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton
//                             size="lg"
//                             asChild
//                         >
//                             <Link
//                                 href={dashboard()}
//                                 prefetch
//                             >
//                                 <AppLogo />
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarHeader>

//             <SidebarContent>
//                 <NavMain
//                     items={filteredNavItems}
//                 />
//             </SidebarContent>

//             <SidebarFooter>
//                 <NavFooter
//                     items={footerNavItems}
//                     className="mt-auto"
//                 />

//                 <NavUser />
//             </SidebarFooter>
//         </Sidebar>
//     );
// }
import { Link } from '@inertiajs/react';

import {
    BookOpen,
    LayoutGrid,
    Settings,
    ShieldCheck,
    Users,
} from 'lucide-react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { usePermissions } from '@/hooks/use-permissions';

import { dashboard } from '@/routes';
import { index as rolesIndex } from '@/routes/roles';
import { index as usersIndex } from '@/routes/users';

import type { NavItem } from '@/types';

const footerNavItems: NavItem[] = [
    {
        title: 'Documentación',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { can } = usePermissions();

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },

        {
            title: 'Configuración',
            href: '#',
            icon: Settings,

            children: [
                ...(can('users.view')
                    ? [
                          {
                              title: 'Usuarios',
                              href: usersIndex(),
                              icon: Users,
                          },
                      ]
                    : []),

                ...(can('roles.view')
                    ? [
                          {
                              title: 'Roles',
                              href: rolesIndex(),
                              icon: ShieldCheck,
                          },
                      ]
                    : []),
            ],
        },
    ];

    const filteredNavItems = mainNavItems.filter(
        (item) =>
            !item.children ||
            item.children.length > 0,
    );

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="border-r border-slate-200/80 dark:border-slate-800"
        >
            {/* =====================================================
                CABECERA
            ====================================================== */}

            <SidebarHeader
                className="
                    border-b border-slate-200/80
                    px-3 py-4
                    dark:border-slate-800

                    group-data-[collapsible=icon]:px-2
                "
            >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="
                                h-12
                                hover:bg-transparent
                                data-[state=open]:bg-transparent

                                group-data-[collapsible=icon]:justify-center
                                group-data-[collapsible=icon]:px-0
                            "
                        >
                            <Link
                                href={dashboard()}
                                prefetch
                                className="group"
                            >
                                {/* Logo */}
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-xl
                                        bg-white
                                        shadow-sm
                                        transition-all
                                        duration-200

                                        group-hover:shadow-md

                                        dark:bg-slate-900
                                    "
                                >
                                    <img
                                        src="/images/logo-sisev.webp"
                                        alt="SISEV"
                                        className="
                                            h-full
                                            w-full
                                            object-contain
                                            p-1
                                        "
                                    />
                                </div>

                                {/* Información institucional */}
                                <div
                                    className="
                                        grid
                                        flex-1
                                        text-left
                                        leading-tight

                                        group-data-[collapsible=icon]:hidden
                                    "
                                >
                                    <span className="text-base font-bold tracking-wide text-slate-900 dark:text-white">
                                        SISEV
                                    </span>

                                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                        GAM Viacha
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* =================================================
                    IDENTIFICADOR DEL SISTEMA
                ================================================== */}

                <div
                    className="
                        mt-3
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-slate-200
                        bg-slate-50
                        px-3
                        py-2.5

                        dark:border-slate-800
                        dark:bg-slate-900/60

                        group-data-[collapsible=icon]:justify-center
                        group-data-[collapsible=icon]:border-0
                        group-data-[collapsible=icon]:bg-transparent
                        group-data-[collapsible=icon]:px-0
                    "
                >
                    <span
                        className="
                            h-1.5
                            w-1.5
                            shrink-0
                            rounded-full
                            bg-emerald-500
                            shadow-[0_0_8px_rgba(16,185,129,0.5)]
                        "
                    />

                    <span
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-500
                            dark:text-slate-400

                            group-data-[collapsible=icon]:hidden
                        "
                    >
                        Sistema institucional
                    </span>
                </div>
            </SidebarHeader>

            {/* =====================================================
                CONTENIDO
            ====================================================== */}

            <SidebarContent
                className="
                    px-2
                    py-5

                    group-data-[collapsible=icon]:px-2
                "
            >
                {/* Encabezado de navegación */}

                <div
                    className="
                        mb-3
                        flex
                        items-center
                        gap-2
                        px-2

                        group-data-[collapsible=icon]:hidden
                    "
                >
                    <span className="h-px w-4 bg-slate-300 dark:bg-slate-700" />

                    <span
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-slate-400
                            dark:text-slate-500
                        "
                    >
                        Navegación
                    </span>

                    <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Menú */}

                <NavMain items={filteredNavItems} />
            </SidebarContent>

            {/* =====================================================
                FOOTER
            ====================================================== */}

            <SidebarFooter
                className="
                    border-t
                    border-slate-200/80
                    p-2
                    dark:border-slate-800
                "
            >
                {/* Estado */}

                <div
                    className="
                        mb-2
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        px-3
                        py-2

                        group-data-[collapsible=icon]:justify-center
                        group-data-[collapsible=icon]:px-0
                    "
                >
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span
                            className="
                                absolute
                                inline-flex
                                h-full
                                w-full
                                animate-ping
                                rounded-full
                                bg-emerald-400
                                opacity-60
                            "
                        />

                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>

                    <span
                        className="
                            text-xs
                            text-slate-500
                            dark:text-slate-400

                            group-data-[collapsible=icon]:hidden
                        "
                    >
                        Sistema operativo
                    </span>
                </div>

                {/* Documentación */}

                <NavFooter
                    items={footerNavItems}
                    className="
                        mb-1

                        group-data-[collapsible=icon]:items-center
                    "
                />

                {/* Usuario */}

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
