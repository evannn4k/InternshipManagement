import { usePage } from "@inertiajs/react";

export function useCan() {
    const { auth } = usePage().props;

    const can = (permissionName) => {
        return auth.permission.includes(permissionName);
    };

    return {
        can,
    };
}
