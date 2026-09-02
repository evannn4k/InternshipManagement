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
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { FaRegFloppyDisk } from "react-icons/fa6";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProgramForm({ form }) {
    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm({
            name: "",
            description: "",
            start_date: "",
            end_date: "",
            work_start_time: "",
            work_end_time: "",
            late_tolerance_minutes: "",
            working_days: [],
            status: "",
        });

    useEffect(() => {
        if (form.isOpen("edit") || form.isOpen("create")) {
            clearErrors();
            setData({
                name: form.isOpen("edit") ? (form.data?.name ?? "") : "",
                status: form.isOpen("edit") ? (form.data?.status ?? "") : "",
                description: form.isOpen("edit")
                    ? (form.data?.description ?? "")
                    : "",
                working_days: form.isOpen("edit")
                    ? (form.data?.working_days ?? [])
                    : [],
                start_date: form.isOpen("edit")
                    ? (form.data?.start_date ?? "")
                    : "",
                end_date: form.isOpen("edit")
                    ? (form.data?.end_date ?? "")
                    : "",
                work_start_time: form.isOpen("edit")
                    ? (form.data?.work_start_time ?? "")
                    : "",
                work_end_time: form.isOpen("edit")
                    ? (form.data?.work_end_time ?? "")
                    : "",
                late_tolerance_minutes: form.isOpen("edit")
                    ? (form.data?.late_tolerance_minutes ?? "")
                    : "",
            });
        }
    }, [form.isOpen("edit") || form.isOpen("create")]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.isOpen("edit")) {
            put("/program/" + form.data.id, {
                preserveState: true,
                onSuccess: () => {
                    form.closeModal();
                    reset();
                },
            });
        } else {
            post("/program", {
                preserveState: true,
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

    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    const handleCheckedChange = (day, checked) => {
        setData({
            ...data,
            working_days: checked
                ? [...data.working_days, day]
                : data.working_days.filter((d) => d !== day),
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
                                ? "Edit Data Program"
                                : "Tambah Data Program"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk menambahkan atau
                            memperbarui profil program.
                        </FieldDescription>
                    </AlertDialogHeader>

                    <div>
                        <FieldSet className="py-6">
                            <FieldGroup className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <Field
                                    className="col-span-1 md:col-span-2"
                                    data-invalid={Boolean(errors.name)}
                                >
                                    <FieldLabel htmlFor="name">
                                        Nama Program
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.name)}
                                        id="name"
                                        placeholder="contoh: Seles marketing"
                                        onChange={handleChange}
                                        value={data.name}
                                    />
                                    {errors.name && (
                                        <FieldError>{errors.name}</FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(
                                        errors.late_tolerance_minutes,
                                    )}
                                >
                                    <FieldLabel htmlFor="late_tolerance_minutes">
                                        Batas toleransi (menit)
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.late_tolerance_minutes,
                                        )}
                                        id="late_tolerance_minutes"
                                        placeholder="contoh: 5"
                                        type="number"
                                        onChange={handleChange}
                                        value={data.late_tolerance_minutes}
                                    />
                                    {errors.late_tolerance_minutes && (
                                        <FieldError>
                                            {errors.late_tolerance_minutes}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(errors.status)}
                                >
                                    <FieldLabel htmlFor="status">
                                        Status
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <NativeSelect
                                        id="status"
                                        aria-invalid={Boolean(errors.status)}
                                        onChange={handleChange}
                                        value={data.status}
                                    >
                                        <NativeSelectOption value="">
                                            Pilih status
                                        </NativeSelectOption>
                                        <NativeSelectOption value="draft">
                                            Draft
                                        </NativeSelectOption>
                                        <NativeSelectOption value="archived">
                                            Archived
                                        </NativeSelectOption>
                                        <NativeSelectOption value="active">
                                            Active
                                        </NativeSelectOption>
                                        <NativeSelectOption value="inactive">
                                            Inactive
                                        </NativeSelectOption>
                                    </NativeSelect>
                                    {errors.status && (
                                        <FieldError>{errors.status}</FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(errors.start_date)}
                                >
                                    <FieldLabel htmlFor="start_date">
                                        Tanggal mulai
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.start_date,
                                        )}
                                        id="start_date"
                                        type="date"
                                        onChange={handleChange}
                                        value={data.start_date}
                                    />
                                    {errors.start_date && (
                                        <FieldError>
                                            {errors.start_date}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(errors.end_date)}
                                >
                                    <FieldLabel htmlFor="end_date">
                                        Tanggal selesai
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(errors.end_date)}
                                        id="end_date"
                                        placeholder="contoh: 5"
                                        type="date"
                                        onChange={handleChange}
                                        value={data.end_date}
                                    />
                                    {errors.end_date && (
                                        <FieldError>
                                            {errors.end_date}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(
                                        errors.work_start_time,
                                    )}
                                >
                                    <FieldLabel htmlFor="work_start_time">
                                        Jam mulai kerja
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.work_start_time,
                                        )}
                                        id="work_start_time"
                                        type="time"
                                        onChange={handleChange}
                                        value={data.work_start_time}
                                    />
                                    {errors.work_start_time && (
                                        <FieldError>
                                            {errors.work_start_time}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(errors.work_end_time)}
                                >
                                    <FieldLabel htmlFor="work_end_time">
                                        Jam selesai kerja
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.work_end_time,
                                        )}
                                        id="work_end_time"
                                        placeholder="contoh: 5"
                                        type="time"
                                        onChange={handleChange}
                                        value={data.work_end_time}
                                    />
                                    {errors.work_end_time && (
                                        <FieldError>
                                            {errors.work_end_time}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="col-span-1 md:col-span-2"
                                    data-invalid={Boolean(errors.description)}
                                >
                                    <FieldLabel htmlFor="description">
                                        Deskripsi
                                    </FieldLabel>
                                    <Textarea
                                        aria-invalid={Boolean(
                                            errors.description,
                                        )}
                                        id="description"
                                        placeholder="contoh: Ini adalah contoh deskripsi"
                                        onChange={handleChange}
                                        value={data.description}
                                    />
                                    {errors.description && (
                                        <FieldError>
                                            {errors.description}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="col-span-1 md:col-span-2"
                                    data-invalid={Boolean(errors.working_days)}
                                >
                                    <FieldLabel htmlFor="working_days">
                                        Hari kerja
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <FieldGroup className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {days.map((day) => {
                                            return (
                                                <FieldLabel key={day}>
                                                    <Field orientation="horizontal">
                                                        <Checkbox
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                handleCheckedChange(
                                                                    day,
                                                                    checked,
                                                                )
                                                            }
                                                            id={day}
                                                            name={day}
                                                            checked={data.working_days.includes(
                                                                day,
                                                            )}
                                                        />
                                                        <FieldContent>
                                                            <FieldTitle>
                                                                {day}
                                                            </FieldTitle>
                                                        </FieldContent>
                                                    </Field>
                                                </FieldLabel>
                                            );
                                        })}
                                    </FieldGroup>
                                    {errors.working_days && (
                                        <FieldError>
                                            {errors.working_days}
                                        </FieldError>
                                    )}
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </div>

                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction variant="success" type="submit" disabled={processing}>
                            {processing ? <Spinner /> : <FaRegFloppyDisk />}
                            Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
