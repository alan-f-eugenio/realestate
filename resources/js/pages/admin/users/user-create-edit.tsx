import { Head, usePage } from '@inertiajs/react';

import type { BreadcrumbItem, SharedData, User } from '@/types';

import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Appearance({ item }: { item: User }) {
    const { auth } = usePage<SharedData>().props;
    console.log(auth);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Users - ${item.id ? 'Edit' : 'Create'}`} />

            <div className="px-4 py-6">
                <Heading title="Users" description={`${item.id ? 'Update' : 'Fill'} User Informations`} />
                <Separator className="mb-8" />
                <div className="grid grid-cols-2"></div>
            </div>
        </AppLayout>
    );
}
