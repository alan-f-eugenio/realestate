import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function can(permissions: string[] | null, check: string | string[]) {
    if (!permissions) return false;

    const hasPermission = (permission: string, check: string) => {
        const permissionParts = permission.split('.');
        const checkParts = check.split('.');
        if (permissionParts.length !== checkParts.length) return false;

        return permissionParts.every((part, index) => part === '*' || part === checkParts[index]);
    };

    if (Array.isArray(check)) {
        return check.some((chk) => permissions.some((perm) => hasPermission(perm, chk)));
    } else {
        return permissions.some((perm) => hasPermission(perm, check));
    }
}
