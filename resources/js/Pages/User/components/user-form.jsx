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

export default function UserForm({ form, roles, schools }) {
    const {
        data,
        setData,
        post,
        transform,
        processing,
        errors,
        clearErrors,
        reset,
    } = useForm({
        name: "",
        school_id: "",
        email: "",
        phone: "",
        role_id: "",
        is_active: "1",
        avavtar: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (form.isOpen("edit") || form.isOpen("create")) {
            clearErrors();
            setData({
                name: form.isOpen("edit") ? (form.data?.name ?? "") : "",
                school_id: form.isOpen("edit")
                    ? (form.data?.school_id ?? "")
                    : "",
                phone: form.isOpen("edit") ? (form.data?.phone ?? "") : "",
                email: form.isOpen("edit") ? (form.data?.email ?? "") : "",
                role_id: form.isOpen("edit") ? (form.data?.role_id ?? "") : "",
                is_active: form.isOpen("edit")
                    ? form.data?.is_active
                        ? "1"
                        : "0"
                    : "1",
            });
        }
    }, [form.isOpen("edit") || form.isOpen("create")]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.isOpen("edit")) {
            transform(() => ({
                ...data,
                _method: "PUT",
            }));

            post("/user/" + form.data.id, {
                onSuccess: () => {
                    form.closeModal();
                    reset();
                },
            });
        } else {
            post("/user/", {
                onSuccess: () => {
                    form.closeModal();
                    reset();
                },
            });
        }
    };

    const handleChange = (e) => {
        const { id, type, value, files } = e.target;

        setData({
            ...data,
            [id]: type == "file" ? (files && files[0] ? files[0] : "") : value,
        });
    };

    console.log(data);

    return (
        <AlertDialog
            open={form.isOpen("edit") || form.isOpen("create")}
            onOpenChange={() => form.closeModal()}
        >
            <AlertDialogContent className="!max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {form.isOpen("edit")
                                ? "Edit profil pengguna"
                                : "Tambah pengguna"}{" "}
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div>
                        <FieldSet className="py-6">
                            <FieldGroup className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <Field
                                    className="col-span-1 md:col-span-2"
                                    data-invalid={Boolean(errors.name)}
                                >
                                    <FieldLabel htmlFor="name">
                                        Nama
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.name)}
                                        id="name"
                                        placeholder="contoh: Michael alexandria"
                                        onChange={handleChange}
                                        value={data.name ?? ""}
                                    />
                                    {errors.name && (
                                        <FieldError>{errors.name}</FieldError>
                                    )}
                                </Field>

                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(errors.email)}
                                >
                                    <FieldLabel htmlFor="email">
                                        Email
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.email)}
                                        id="email"
                                        placeholder="contoh: emailmu@gmail.com"
                                        type="email"
                                        onChange={handleChange}
                                        value={data.email ?? ""}
                                    />
                                    {errors.email && (
                                        <FieldError>{errors.email}</FieldError>
                                    )}
                                </Field>

                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(errors.phone)}
                                >
                                    <FieldLabel htmlFor="phone">
                                        Nomor
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.phone)}
                                        id="phone"
                                        placeholder="contoh: 081234567890"
                                        type="text"
                                        onChange={handleChange}
                                        value={data.phone ?? ""}
                                    />
                                    {errors.phone && (
                                        <FieldError>{errors.phone}</FieldError>
                                    )}
                                </Field>

                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(errors.phone)}
                                >
                                    <FieldLabel htmlFor="phone">
                                        Peran
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>

                                    <NativeSelect
                                        value={data.role_id ?? ""}
                                        onChange={handleChange}
                                        id="role_id"
                                    >
                                        <NativeSelectOption value="">
                                            Pilih peran
                                        </NativeSelectOption>
                                        {roles.map((role) => (
                                            <NativeSelectOption
                                                key={role.id}
                                                value={role.id}
                                            >
                                                {role.name}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>

                                    {errors.role_id && (
                                        <FieldError>
                                            {errors.role_id}
                                        </FieldError>
                                    )}
                                </Field>

                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(errors.school_id)}
                                >
                                    <FieldLabel htmlFor="school_id">
                                        Sekolah
                                    </FieldLabel>
                                    <NativeSelect
                                        disabled={data.role_id != 3}
                                        id="school_id"
                                        onChange={handleChange}
                                        value={data.school_id ?? ""}
                                    >
                                        <NativeSelectOption value="">
                                            Pilih sekolah
                                        </NativeSelectOption>
                                        {schools.map((school) => (
                                            <NativeSelectOption
                                                key={school.id}
                                                value={school.id}
                                            >
                                                {school.name}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                    {errors.school_id ? (
                                        <FieldError>{errors.school_id}</FieldError>
                                    ) : (
                                        <FieldDescription>
                                            Khusus role intern
                                        </FieldDescription>
                                    )}
                                </Field>

                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(errors.is_active)}
                                >
                                    <FieldLabel htmlFor="is_active">
                                        Status Aktif
                                    </FieldLabel>

                                    <RadioGroup
                                        value={String(data.is_active)}
                                        onValueChange={(val) =>
                                            setData("is_active", val)
                                        }
                                        className="flex items-center gap-6 pt-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem
                                                value="1"
                                                id="active_1"
                                            />
                                            <Label
                                                htmlFor="active_1"
                                                className="cursor-pointer"
                                            >
                                                Aktif
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem
                                                value="0"
                                                id="active_0"
                                            />
                                            <Label
                                                htmlFor="active_0"
                                                className="cursor-pointer"
                                            >
                                                Tidak Aktif
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                    {errors.is_active && (
                                        <FieldError>
                                            {errors.is_active}
                                        </FieldError>
                                    )}
                                </Field>

                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(errors.avatar)}
                                >
                                    <FieldLabel htmlFor="avatar">
                                        Ganti Foto Profil
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.avatar)}
                                        id="avatar"
                                        placeholder="contoh: 081234567890"
                                        type="file"
                                        onChange={handleChange}
                                    />
                                    {errors.avatar ? (
                                        <FieldError>{errors.avatar}</FieldError>
                                    ) : (
                                        <FieldDescription>
                                            Pilih gambar untuk diunggah.
                                        </FieldDescription>
                                    )}
                                </Field>
                                {!form.isOpen("edit") && (
                                    <>
                                        <Separator className="col-span-1 md:col-span-2" />
                                        <Field
                                            className="col-span-1"
                                            data-invalid={Boolean(
                                                errors.password,
                                            )}
                                        >
                                            <FieldLabel htmlFor="password">
                                                Password
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FieldLabel>
                                            <Input
                                                aria-invalid={Boolean(
                                                    errors.password,
                                                )}
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
                                            className="col-span-1"
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
                                                value={
                                                    data.password_confirmation ??
                                                    ""
                                                }
                                            />
                                            {errors.password_confirmation && (
                                                <FieldError>
                                                    {
                                                        errors.password_confirmation
                                                    }
                                                </FieldError>
                                            )}
                                        </Field>
                                    </>
                                )}
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
