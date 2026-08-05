import { usePage } from "@inertiajs/react";
import { LoginForm } from "./components/login-form";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Login() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a
                    href=""
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex size-6 items-center justify-center rounded-md">
                        <img src="storage/images/main/logo.png" alt="Logo" />
                    </div>
                    Internship Management
                </a>
                <LoginForm />
            </div>
        </div>
    );
}
