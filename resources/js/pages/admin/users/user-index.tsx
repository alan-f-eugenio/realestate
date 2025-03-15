import { Head, Link, usePage } from '@inertiajs/react';

import type { BreadcrumbItem, PaginatedResponse, SharedData, User } from '@/types';

import { ButtonGroup } from '@/components/button-group';
import Heading from '@/components/heading';
import { TableFooterPagination } from '@/components/table-footer-pagination';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { can } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Appearance({ paginatedResponse }: { paginatedResponse: PaginatedResponse<User> }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users - List" />

            <div className="px-4 py-6">
                <Heading title="Users" description="List all users" />

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-center">Created At</TableHead>
                                <TableHead className="text-center">Updated At</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedResponse.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="text-center whitespace-pre-wrap">{user.created_at.replace(' ', '\n')}</TableCell>
                                    <TableCell className="text-center whitespace-pre-wrap">
                                        {user.updated_at !== user.created_at ? user.updated_at.replace(' ', '\n') : 'Never'}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <ButtonGroup size="sm" className="rounded-md border">
                                            <Button size="sm" variant="ghost" asChild>
                                                <Link href={auth.user.id == user.id ? route('profile.edit') : route('users.edit', user.id)}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Separator orientation="vertical" />
                                            {can(auth.permissions, 'users.destroy') && (
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button size="sm" variant="ghost">
                                                            Delete
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction asChild>
                                                                <Link method="delete" href={route('users.destroy', user.id)} as="button">
                                                                    Confirm
                                                                </Link>
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            )}
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableFooterPagination paginatedResponse={paginatedResponse} />
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
