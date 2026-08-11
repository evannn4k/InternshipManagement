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
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { FaRegFloppyDisk } from "react-icons/fa6";

export default function SchoolForm({ form }) {
    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm({
            name: "",
            npsn: "",
            address: "",
            city: "",
            province: "",
            contact_person_name: "",
            contact_person_phone: "",
            contact_person_email: "",
            notes: "",
            is_active: "1",
        });

    useEffect(() => {
        if (form.isOpen("edit") || form.isOpen("create")) {
            clearErrors();
            setData({
                name: form.isOpen("edit") ? (form.data?.name ?? "") : "",
                npsn: form.isOpen("edit") ? (form.data?.npsn ?? "") : "",
                address: form.isOpen("edit") ? (form.data?.address ?? "") : "",
                city: form.isOpen("edit") ? (form.data?.city ?? "") : "",
                province: form.isOpen("edit")
                    ? (form.data?.province ?? "")
                    : "",
                contact_person_name: form.isOpen("edit")
                    ? (form.data?.contact_person_name ?? "")
                    : "",
                contact_person_phone: form.isOpen("edit")
                    ? (form.data?.contact_person_phone ?? "")
                    : "",
                contact_person_email: form.isOpen("edit")
                    ? (form.data?.contact_person_email ?? "")
                    : "",
                notes: form.isOpen("edit") ? (form.data?.notes ?? "") : "",
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
            put("/school/" + form.data.id, {
                onSuccess: () => {
                    form.closeModal();
                    reset();
                },
            });
        } else {
            post("/school", {
                onSuccess: () => {
                    form.closeModal();
                    reset();
                },
            });
        }
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <AlertDialog
            open={form.isOpen("create") || form.isOpen("edit")}
            onOpenChange={() => form.closeModal()}
        >
            <AlertDialogContent className="!max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {form.isOpen("edit")
                                ? "Edit Data Sekolah"
                                : "Tambah Data Sekolah"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk menambahkan atau
                            memperbarui profil sekolah.
                        </FieldDescription>
                    </AlertDialogHeader>

                    <div>
                        <FieldSet className="py-6">
                            <FieldGroup className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(errors.name)}
                                >
                                    <FieldLabel htmlFor="name">
                                        Nama Sekolah
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.name)}
                                        id="name"
                                        placeholder="contoh: SMA Negeri 1"
                                        onChange={handleChange}
                                        value={data.name}
                                    />
                                    {errors.name && (
                                        <FieldError>{errors.name}</FieldError>
                                    )}
                                </Field>

                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(errors.npsn)}
                                >
                                    <FieldLabel htmlFor="npsn">NPSN</FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.npsn)}
                                        id="npsn"
                                        placeholder="contoh: 20101234"
                                        type="text"
                                        onChange={handleChange}
                                        value={data.npsn}
                                    />
                                    {errors.npsn && (
                                        <FieldError>{errors.npsn}</FieldError>
                                    )}
                                </Field>
                            </FieldGroup>

                            <FieldGroup className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(errors.city)}
                                >
                                    <FieldLabel htmlFor="city">
                                        Kota / Kabupaten
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.city)}
                                        id="city"
                                        placeholder="contoh: Batang"
                                        onChange={handleChange}
                                        value={data.city}
                                    />
                                    {errors.city && (
                                        <FieldError>{errors.city}</FieldError>
                                    )}
                                </Field>

                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(errors.province)}
                                >
                                    <FieldLabel htmlFor="province">
                                        Provinsi
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.province)}
                                        id="province"
                                        placeholder="contoh: Jawa Tengah"
                                        onChange={handleChange}
                                        value={data.province}
                                    />
                                    {errors.province && (
                                        <FieldError>
                                            {errors.province}
                                        </FieldError>
                                    )}
                                </Field>
                            </FieldGroup>

                            <FieldGroup className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(
                                        errors.contact_person_name,
                                    )}
                                >
                                    <FieldLabel htmlFor="contact_person_name">
                                        Nama Narahubung
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.contact_person_name,
                                        )}
                                        id="contact_person_name"
                                        placeholder="contoh: Budi Santoso"
                                        onChange={handleChange}
                                        value={data.contact_person_name}
                                    />
                                    {errors.contact_person_name && (
                                        <FieldError>
                                            {errors.contact_person_name}
                                        </FieldError>
                                    )}
                                </Field>

                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(
                                        errors.contact_person_phone,
                                    )}
                                >
                                    <FieldLabel htmlFor="contact_person_phone">
                                        Nomor Telepon
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.contact_person_phone,
                                        )}
                                        id="contact_person_phone"
                                        placeholder="contoh: 081234567890"
                                        type="tel"
                                        onChange={handleChange}
                                        value={data.contact_person_phone}
                                    />
                                    {errors.contact_person_phone && (
                                        <FieldError>
                                            {errors.contact_person_phone}
                                        </FieldError>
                                    )}
                                </Field>
                            </FieldGroup>

                            <FieldGroup className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(
                                        errors.contact_person_email,
                                    )}
                                >
                                    <FieldLabel htmlFor="contact_person_email">
                                        Email Narahubung
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.contact_person_email,
                                        )}
                                        id="contact_person_email"
                                        placeholder="contoh: sekolah@email.com"
                                        type="email"
                                        onChange={handleChange}
                                        value={data.contact_person_email}
                                    />
                                    {errors.contact_person_email && (
                                        <FieldError>
                                            {errors.contact_person_email}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="flex-1"
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
                            </FieldGroup>

                            <FieldGroup className="grid grid-cols-1 gap-4">
                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(errors.address)}
                                >
                                    <FieldLabel htmlFor="address">
                                        Alamat
                                    </FieldLabel>
                                    <Textarea
                                        aria-invalid={Boolean(errors.address)}
                                        id="address"
                                        placeholder="contoh: Jl. Merdeka No. 123"
                                        onChange={handleChange}
                                        value={data.address}
                                    />
                                    {errors.address && (
                                        <FieldError>
                                            {errors.address}
                                        </FieldError>
                                    )}
                                </Field>

                                <Field
                                    className="flex-1"
                                    data-invalid={Boolean(errors.notes)}
                                >
                                    <FieldLabel htmlFor="notes">
                                        Catatan Tambahan
                                    </FieldLabel>
                                    <Textarea
                                        className="min-h-32"
                                        rows={6}
                                        aria-invalid={Boolean(errors.notes)}
                                        id="notes"
                                        placeholder="Tambahkan catatan jika diperlukan..."
                                        onChange={handleChange}
                                        value={data.notes}
                                    />
                                    {errors.notes && (
                                        <FieldError>{errors.notes}</FieldError>
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
