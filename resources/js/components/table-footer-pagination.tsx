import { PaginatedResponse } from '@/types';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import { TableCell, TableRow } from './ui/table';

export function TableFooterPagination<T>({ paginatedResponse }: { paginatedResponse: PaginatedResponse<T> }) {
    return (
        paginatedResponse.links.length > 3 && (
            <TableRow>
                <TableCell colSpan={99}>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={paginatedResponse.prev_page_url || '#'}
                                    disabled={!paginatedResponse.prev_page_url}
                                    as={!paginatedResponse.prev_page_url ? 'button' : undefined}
                                />
                            </PaginationItem>
                            {paginatedResponse.links
                                .filter((link, index) => link.url && index > 0 && index < paginatedResponse.links.length - 1)
                                .map((link, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink href={link.url || '#'} isActive={link.active} disabled={link.active}>
                                            {link.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                            <PaginationItem>
                                <PaginationNext
                                    href={paginatedResponse.next_page_url || '#'}
                                    disabled={!paginatedResponse.next_page_url}
                                    as={!paginatedResponse.next_page_url ? 'button' : undefined}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </TableCell>
            </TableRow>
        )
    );
}
