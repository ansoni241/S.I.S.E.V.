// // import { Link } from '@inertiajs/react';
// // import {
// //     SidebarGroup,
// //     SidebarGroupLabel,
// //     SidebarMenu,
// //     SidebarMenuButton,
// //     SidebarMenuItem,
// // } from '@/components/ui/sidebar';
// // import { useCurrentUrl } from '@/hooks/use-current-url';
// // import type { NavItem } from '@/types';

// // export function NavMain({ items = [] }: { items: NavItem[] }) {
// //     const { isCurrentUrl } = useCurrentUrl();

// //     return (
// //         <SidebarGroup className="px-2 py-0">
// //             <SidebarGroupLabel>Platform</SidebarGroupLabel>
// //             <SidebarMenu>
// //                 {items.map((item) => (
// //                     <SidebarMenuItem key={item.title}>
// //                         <SidebarMenuButton
// //                             asChild
// //                             isActive={isCurrentUrl(item.href)}
// //                             tooltip={{ children: item.title }}
// //                         >
// //                             <Link href={item.href} prefetch>
// //                                 {item.icon && <item.icon />}
// //                                 <span>{item.title}</span>
// //                             </Link>
// //                         </SidebarMenuButton>
// //                     </SidebarMenuItem>
// //                 ))}
// //             </SidebarMenu>
// //         </SidebarGroup>
// //     );
// // }
// import { Link } from '@inertiajs/react';
// import { ChevronDown } from 'lucide-react';
// import { useEffect, useState } from 'react';

// import {
//     SidebarGroup,
//     SidebarGroupLabel,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//     SidebarMenuSub,
//     SidebarMenuSubButton,
//     SidebarMenuSubItem,
// } from '@/components/ui/sidebar';

// import { useCurrentUrl } from '@/hooks/use-current-url';

// import type { NavItem } from '@/types';

// export function NavMain({
//     items = [],
// }: {
//     items: NavItem[];
// }) {
//     const { isCurrentUrl } = useCurrentUrl();

//     /**
//      * Determina si un elemento o alguno de sus hijos
//      * corresponde a la URL actual.
//      */
//     const hasActiveChild = (item: NavItem): boolean => {
//         if (item.children?.length) {
//             return item.children.some((child) =>
//                 isCurrentUrl(child.href),
//             );
//         }

//         return isCurrentUrl(item.href);
//     };

//     /**
//      * Menús abiertos.
//      */
//     const [openMenus, setOpenMenus] = useState<
//         Record<string, boolean>
//     >({});

//     /**
//      * Abrir automáticamente el menú que contiene
//      * la página actual.
//      */
//     useEffect(() => {
//         const activeMenus: Record<string, boolean> = {};

//         items.forEach((item) => {
//             if (item.children?.length) {
//                 activeMenus[item.title] = hasActiveChild(item);
//             }
//         });

//         setOpenMenus(activeMenus);
//     }, [items]);

//     /**
//      * Abrir / cerrar menú.
//      */
//     const toggleMenu = (title: string) => {
//         setOpenMenus((current) => ({
//             ...current,
//             [title]: !current[title],
//         }));
//     };

//     return (
//         <SidebarGroup className="px-2 py-0">
//             <SidebarGroupLabel>
//                 Platform
//             </SidebarGroupLabel>

//             <SidebarMenu>
//                 {items.map((item) => {
//                     const hasChildren =
//                         !!item.children?.length;

//                     const isChildActive =
//                         hasChildren &&
//                         hasActiveChild(item);

//                     const isOpen =
//                         openMenus[item.title] ?? false;

//                     /**
//                      * ==================================================
//                      * ELEMENTO CON SUBMENÚ
//                      * ==================================================
//                      */
//                     if (hasChildren) {
//                         return (
//                             <SidebarMenuItem
//                                 key={item.title}
//                             >
//                                 <SidebarMenuButton
//                                     type="button"
//                                     isActive={isChildActive}
//                                     tooltip={{
//                                         children:
//                                             item.title,
//                                     }}
//                                     onClick={() =>
//                                         toggleMenu(
//                                             item.title,
//                                         )
//                                     }
//                                 >
//                                     {item.icon && (
//                                         <item.icon />
//                                     )}

//                                     <span>
//                                         {item.title}
//                                     </span>

//                                     <ChevronDown
//                                         className={`ml-auto h-4 w-4 transition-transform ${
//                                             isOpen
//                                                 ? 'rotate-180'
//                                                 : ''
//                                         }`}
//                                     />
//                                 </SidebarMenuButton>

//                                 {isOpen && (
//                                     <SidebarMenuSub>
//                                         {item.children?.map(
//                                             (child) => {
//                                                 const childActive =
//                                                     isCurrentUrl(
//                                                         child.href,
//                                                     );

//                                                 return (
//                                                     <SidebarMenuSubItem
//                                                         key={
//                                                             child.title
//                                                         }
//                                                     >
//                                                         <SidebarMenuSubButton
//                                                             asChild
//                                                             isActive={
//                                                                 childActive
//                                                             }
//                                                         >
//                                                             <Link
//                                                                 href={
//                                                                     child.href
//                                                                 }
//                                                                 prefetch
//                                                             >
//                                                                 {child.icon && (
//                                                                     <child.icon />
//                                                                 )}

//                                                                 <span>
//                                                                     {
//                                                                         child.title
//                                                                     }
//                                                                 </span>
//                                                             </Link>
//                                                         </SidebarMenuSubButton>
//                                                     </SidebarMenuSubItem>
//                                                 );
//                                             },
//                                         )}
//                                     </SidebarMenuSub>
//                                 )}
//                             </SidebarMenuItem>
//                         );
//                     }

//                     /**
//                      * ==================================================
//                      * ELEMENTO NORMAL
//                      * ==================================================
//                      */
//                     return (
//                         <SidebarMenuItem
//                             key={item.title}
//                         >
//                             <SidebarMenuButton
//                                 asChild
//                                 isActive={isCurrentUrl(
//                                     item.href,
//                                 )}
//                                 tooltip={{
//                                     children:
//                                         item.title,
//                                 }}
//                             >
//                                 <Link
//                                     href={item.href}
//                                     prefetch
//                                 >
//                                     {item.icon && (
//                                         <item.icon />
//                                     )}

//                                     <span>
//                                         {item.title}
//                                     </span>
//                                 </Link>
//                             </SidebarMenuButton>
//                         </SidebarMenuItem>
//                     );
//                 })}
//             </SidebarMenu>
//         </SidebarGroup>
//     );
// }
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { useCurrentUrl } from '@/hooks/use-current-url';

import type { NavItem } from '@/types';

export function NavMain({
    items = [],
}: {
    items: NavItem[];
}) {
    const { isCurrentUrl } = useCurrentUrl();

    /**
     * Determina si el elemento o alguno de sus
     * hijos corresponde a la URL actual.
     */
    const hasActiveChild = (item: NavItem): boolean => {
        if (item.children?.length) {
            return item.children.some((child) =>
                isCurrentUrl(child.href),
            );
        }

        return isCurrentUrl(item.href);
    };

    /**
     * Menús abiertos.
     */
    const [openMenus, setOpenMenus] = useState<
        Record<string, boolean>
    >({});

    /**
     * Abre automáticamente el menú que contiene
     * la página actual.
     */
    useEffect(() => {
        const activeMenus: Record<string, boolean> = {};

        items.forEach((item) => {
            if (item.children?.length) {
                activeMenus[item.title] =
                    hasActiveChild(item);
            }
        });

        setOpenMenus(activeMenus);
    }, [items]);

    /**
     * Abrir / cerrar menú.
     */
    const toggleMenu = (title: string) => {
        setOpenMenus((current) => ({
            ...current,
            [title]: !current[title],
        }));
    };

    return (
        <SidebarGroup className="px-0 py-0">
            <SidebarMenu className="gap-1">
                {items.map((item) => {
                    const hasChildren =
                        !!item.children?.length;

                    const isChildActive =
                        hasChildren &&
                        hasActiveChild(item);

                    const isOpen =
                        openMenus[item.title] ?? false;

                    /**
                     * ==================================================
                     * ELEMENTO CON SUBMENÚ
                     * ==================================================
                     */
                    if (hasChildren) {
                        return (
                            <SidebarMenuItem
                                key={item.title}
                            >
                                <SidebarMenuButton
                                    type="button"
                                    isActive={isChildActive}
                                    tooltip={{
                                        children: item.title,
                                    }}
                                    onClick={() =>
                                        toggleMenu(item.title)
                                    }
                                    className="
                                        relative
                                        h-11
                                        rounded-xl
                                        px-3

                                        text-slate-600
                                        transition-all
                                        duration-200

                                        hover:bg-slate-100
                                        hover:text-slate-900

                                        dark:text-slate-400
                                        dark:hover:bg-slate-900
                                        dark:hover:text-white

                                        data-[active=true]:bg-slate-100
                                        data-[active=true]:text-slate-950

                                        dark:data-[active=true]:bg-slate-900
                                        dark:data-[active=true]:text-white

                                        group-data-[collapsible=icon]:justify-center
                                        group-data-[collapsible=icon]:px-0
                                    "
                                >
                                    {/* Indicador activo */}

                                    {isChildActive && (
                                        <span
                                            className="
                                                absolute
                                                left-0
                                                top-1/2
                                                h-6
                                                w-0.5
                                                -translate-y-1/2
                                                rounded-full
                                                bg-slate-900

                                                dark:bg-white

                                                group-data-[collapsible=icon]:hidden
                                            "
                                        />
                                    )}

                                    {/* Icono */}

                                    {item.icon && (
                                        <item.icon
                                            className="
                                                h-[18px]
                                                w-[18px]
                                                shrink-0
                                            "
                                        />
                                    )}

                                    {/* Texto */}

                                    <span
                                        className="
                                            truncate
                                            font-medium
                                            group-data-[collapsible=icon]:hidden
                                        "
                                    >
                                        {item.title}
                                    </span>

                                    {/* Flecha */}

                                    <ChevronDown
                                        className={`
                                            ml-auto
                                            h-4
                                            w-4
                                            shrink-0
                                            text-slate-400
                                            transition-transform
                                            duration-200

                                            group-data-[collapsible=icon]:hidden

                                            ${
                                                isOpen
                                                    ? 'rotate-180'
                                                    : ''
                                            }
                                        `}
                                    />
                                </SidebarMenuButton>

                                {/* =================================================
                                    SUBMENÚ
                                ================================================== */}

                                {isOpen && (
                                    <SidebarMenuSub
                                        className="
                                            ml-5
                                            border-l
                                            border-slate-200
                                            pl-2

                                            dark:border-slate-800
                                        "
                                    >
                                        {item.children?.map(
                                            (child) => {
                                                const childActive =
                                                    isCurrentUrl(
                                                        child.href,
                                                    );

                                                return (
                                                    <SidebarMenuSubItem
                                                        key={
                                                            child.title
                                                        }
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={
                                                                childActive
                                                            }
                                                            className="
                                                                relative
                                                                h-9
                                                                rounded-lg
                                                                px-3

                                                                text-slate-500

                                                                transition-all
                                                                duration-200

                                                                hover:bg-slate-100
                                                                hover:text-slate-900

                                                                dark:text-slate-400
                                                                dark:hover:bg-slate-900
                                                                dark:hover:text-white

                                                                data-[active=true]:bg-slate-100
                                                                data-[active=true]:font-semibold
                                                                data-[active=true]:text-slate-950

                                                                dark:data-[active=true]:bg-slate-900
                                                                dark:data-[active=true]:text-white
                                                            "
                                                        >
                                                            <Link
                                                                href={
                                                                    child.href
                                                                }
                                                                prefetch
                                                                className="
                                                                    flex
                                                                    w-full
                                                                    items-center
                                                                    gap-3
                                                                "
                                                            >
                                                                {child.icon && (
                                                                    <child.icon
                                                                        className="
                                                                            h-4
                                                                            w-4
                                                                            shrink-0
                                                                        "
                                                                    />
                                                                )}

                                                                <span className="truncate">
                                                                    {
                                                                        child.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            },
                                        )}
                                    </SidebarMenuSub>
                                )}
                            </SidebarMenuItem>
                        );
                    }

                    /**
                     * ==================================================
                     * ELEMENTO NORMAL
                     * ==================================================
                     */

                    const isActive =
                        isCurrentUrl(item.href);

                    return (
                        <SidebarMenuItem
                            key={item.title}
                        >
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{
                                    children: item.title,
                                }}
                                className="
                                    relative
                                    h-11
                                    rounded-xl
                                    px-3

                                    text-slate-600
                                    transition-all
                                    duration-200

                                    hover:bg-slate-100
                                    hover:text-slate-900

                                    dark:text-slate-400
                                    dark:hover:bg-slate-900
                                    dark:hover:text-white

                                    data-[active=true]:bg-slate-100
                                    data-[active=true]:font-semibold
                                    data-[active=true]:text-slate-950

                                    dark:data-[active=true]:bg-slate-900
                                    dark:data-[active=true]:text-white

                                    group-data-[collapsible=icon]:justify-center
                                    group-data-[collapsible=icon]:px-0
                                "
                            >
                                {/*
                                 * IMPORTANTE:
                                 *
                                 * Como SidebarMenuButton utiliza
                                 * `asChild`, solamente puede tener
                                 * UN hijo.
                                 *
                                 * Por eso TODO está dentro de Link.
                                 */}

                                <Link
                                    href={item.href}
                                    prefetch
                                    className="
                                        relative
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                    "
                                >
                                    {/* Indicador activo */}

                                    {isActive && (
                                        <span
                                            className="
                                                absolute
                                                left-[-12px]
                                                top-1/2
                                                h-6
                                                w-0.5
                                                -translate-y-1/2
                                                rounded-full
                                                bg-slate-900

                                                dark:bg-white

                                                group-data-[collapsible=icon]:hidden
                                            "
                                        />
                                    )}

                                    {/* Icono */}

                                    {item.icon && (
                                        <item.icon
                                            className="
                                                h-[18px]
                                                w-[18px]
                                                shrink-0
                                            "
                                        />
                                    )}

                                    {/* Texto */}

                                    <span
                                        className="
                                            truncate
                                            font-medium
                                            group-data-[collapsible=icon]:hidden
                                        "
                                    >
                                        {item.title}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
