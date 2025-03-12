import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';

type FlashType = 'success' | 'info' | 'warning' | 'error';

export function Notification() {
    const {
        flash: { admin: adminFlash },
    } = usePage<SharedData>().props;

    const toastTypes: Record<FlashType, (message: string) => void> = {
        success: toast.success,
        info: toast.info,
        warning: toast.warning,
        error: toast.error,
    };

    if (adminFlash?.type && toastTypes[adminFlash.type as FlashType]) {
        toastTypes[adminFlash.type as FlashType](adminFlash.text);
    }

    return <Toaster richColors />;
}
