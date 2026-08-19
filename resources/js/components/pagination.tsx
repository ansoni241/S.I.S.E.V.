import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import type { PaginationLink } from '@/types';

type PaginationProps = {
    links: PaginationLink[];
};

export function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center gap-1">
            {links.map((link, index) => {
                if (!link.url) {
                    return (
                        <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            disabled
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        </Button>
                    );
                }

                return (
                    <Button
                        key={index}
                        variant={link.active ? 'default' : 'outline'}
                        size="sm"
                        asChild
                    >
                        <Link
                            href={link.url}
                            preserveState
                            preserveScroll
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        </Link>
                    </Button>
                );
            })}
        </div>
    );
}
