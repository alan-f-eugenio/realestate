import { Head, useForm, usePage } from '@inertiajs/react';

import type { BreadcrumbItem, SharedData, User } from '@/types';

import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { can } from '@/lib/utils';
import { FormEventHandler, useState } from 'react';

interface UserForm {
    name: string;
    email: string;
    role: string;
    password: string;
    confirm_password: string;
    [key: string]: string | undefined;
}

interface Role {
    name: string;
}

type Roles = Role[];

export default function Appearance({ item, roles }: { item: User; roles: Roles }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: item.id ? 'Edit' : 'Create',
            href: '/users/create',
        },
    ];

    const { auth } = usePage<SharedData>().props;

    const [changePassword, setChangePassword] = useState(!item.id);

    const { data, setData, submit, errors, processing } = useForm<UserForm>({
        name: item.name,
        email: item.email,
        role: item.role || '',
        password: '',
        confirm_password: '',
    });

    const formSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        submit(item.id ? 'patch' : 'post', route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Users > ${item.id ? 'Edit' : 'Create'}`} />

            <div className="px-4 py-6">
                <Heading title="Users" description={`${item.id ? 'Update' : 'Fill'} user informations`} />

                <form onSubmit={formSubmit} className="grid md:grid-cols-3 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="Full name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Email</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="email"
                            placeholder="Email@example.com"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {can(auth.permissions, 'users.assignRole.master') && (
                        <div className="grid gap-2">
                            <Label htmlFor="name">Role</Label>

                            <Select onValueChange={(value) => setData('role', value)} defaultValue={data.role} required>
                                <SelectTrigger className="mt-1 w-full capitalize">
                                    <SelectValue placeholder="Select the user role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role, index) => (
                                        <SelectItem key={index} value={role.name} className="capitalize">
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError className="mt-2" message={errors.role} />
                        </div>
                    )}
                    {item.id && (
                        <div className="col-span-full flex items-center gap-2">
                            <Switch id="change_password" checked={changePassword} onCheckedChange={(checked) => setChangePassword(checked)} />
                            <Label htmlFor="change_password">Change password</Label>
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder="Password"
                            disabled={!changePassword}
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>

                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder="Confirm password"
                            disabled={!changePassword}
                        />

                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="col-span-full">
                        <Button disabled={processing}>{item.id ? 'Save' : 'Create'}</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
