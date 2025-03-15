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

        for (let i = 0; i < permissionParts.length; i++) {
            if (permissionParts[i] === '*') {
                return true;
            }
            if (permissionParts[i] !== checkParts[i]) {
                return false;
            }
        }
        return permissionParts.length === checkParts.length;
    };

    if (Array.isArray(check)) {
        return check.some((chk) => permissions.some((perm) => hasPermission(perm, chk)));
    } else {
        return permissions.some((perm) => hasPermission(perm, check));
    }
}
