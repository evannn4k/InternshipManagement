import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { FaRegFloppyDisk } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

export default function ResetPassword({ form }) {
    const { data, setData, post, transform, processing, errors, reset } =
        useForm({
            old_password: "",
            password: "",
            password_confirmation: "",
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        transform(() => ({
            ...data,
            _method: "PATCH",
        }));

        post("/user/reset-password/" + form.data.id, {
            onSuccess: () => {
                form.closeModal();
                reset();
            },
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        setData({
            ...data,
            [id]: value,
        });
    };

    return (
        <AlertDialog
            open={form.isOpen("reset-password")}
            onOpenChange={() => form.closeModal()}
        >
            <AlertDialogContent className="max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ganti Password</AlertDialogTitle>
                    </AlertDialogHeader>

                    <div>
                        <FieldSet className="py-6">
                            <FieldGroup className="grid grid-cols-1 gap-4">
                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(errors.old_password)}
                                >
                                    <FieldLabel htmlFor="old_password">
                                        Masukan Password Lama
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.old_password,
                                        )}
                                        id="old_password"
                                        placeholder="••••••••"
                                        type="password"
                                        onChange={handleChange}
                                        value={data.old_password ?? ""}
                                    />
                                    {errors.old_password && (
                                        <FieldError>
                                            {errors.old_password}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(errors.password)}
                                >
                                    <FieldLabel htmlFor="password">
                                        Password
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.password)}
                                        id="password"
                                        placeholder="••••••••"
                                        type="password"
                                        onChange={handleChange}
                                        value={data.password ?? ""}
                                    />
                                    {errors.password && (
                                        <FieldError>
                                            {errors.password}
                                        </FieldError>
                                    )}
                                </Field>

                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(
                                        errors.password_confirmation,
                                    )}
                                >
                                    <FieldLabel htmlFor="password_confirmation">
                                        Konfirmasi Password
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.password_confirmation,
                                        )}
                                        id="password_confirmation"
                                        placeholder="••••••••"
                                        type="password"
                                        onChange={handleChange}
                                        value={data.password_confirmation ?? ""}
                                    />
                                    {errors.password_confirmation && (
                                        <FieldError>
                                            {errors.password_confirmation}
                                        </FieldError>
                                    )}
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </div>

                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction type="submit" disabled={processing}>
                            {processing ? <Spinner /> : <FaRegFloppyDisk />}
                            Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
