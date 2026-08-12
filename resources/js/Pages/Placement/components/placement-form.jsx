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
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { FaRegFloppyDisk } from "react-icons/fa6";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

export default function PlacementForm({ form, users, programs }) {
    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm({
            program_id: "",
            intern_id: "",
            mentor_id: "",
            position_title: "",
            objective: "",
            start_date: "",
            end_date: "",
            program_id: "",
        });

    // useEffect(() => {
    //     if (form.isOpen("create")) {
    //         clearErrors();
    //         reset();
    //     }
    // }, [form.isOpen("create")]);

    useEffect(() => {
        if (form.isOpen("edit") || form.isOpen("create")) {
            clearErrors();
            setData({
                program_id: "",
                intern_id: "",
                program_id: "",
                mentor_id: form.isOpen("edit")
                    ? (form.data?.mentor_id ?? "")
                    : "",
                position_title: form.isOpen("edit")
                    ? (form.data?.position_title ?? "")
                    : "",
                objective: form.isOpen("edit")
                    ? (form.data?.objective ?? "")
                    : "",
                start_date: form.isOpen("edit")
                    ? (form.data?.start_date ?? "")
                    : "",
                end_date: form.isOpen("edit")
                    ? (form.data?.end_date ?? "")
                    : "",
            });
        }
    }, [form.isOpen("edit") || form.isOpen("create")]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // post("/placement", {
        //     onSuccess: () => {
        //         form.closeModal();
        //         reset();
        //     },
        // });

        if (form.isOpen("edit")) {
            put("/placement/" + form.data.id, {
                onSuccess: () => {
                    form.closeModal();
                    reset();
                },
            });
        } else {
            post("/placement", {
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
                                ? "Edit data penempatan"
                                : "Tambah data penempatan"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk menambahkan atau
                            memperbarui penempatan.
                        </FieldDescription>
                    </AlertDialogHeader>

                    <div>
                        <FieldSet className="py-6">
                            <FieldGroup className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                {form.isOpen("create") && (
                                    <>
                                        <Field
                                            className="col-span-1 md:col-span-2"
                                            data-invalid={Boolean(
                                                errors.program_id,
                                            )}
                                        >
                                            <FieldLabel htmlFor="program_id">
                                                Program Magang
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FieldLabel>
                                            <NativeSelect
                                                aria-invalid={Boolean(
                                                    errors.program_id,
                                                )}
                                                id="program_id"
                                                onChange={handleChange}
                                                value={data.program_id}
                                            >
                                                <NativeSelectOption value="">
                                                    Pilih program magang
                                                </NativeSelectOption>
                                                {programs.map((program) => (
                                                    <NativeSelectOption
                                                        key={program.id}
                                                        value={program.id}
                                                    >
                                                        {program.name}
                                                    </NativeSelectOption>
                                                ))}
                                            </NativeSelect>
                                            {errors.program_id && (
                                                <FieldError>
                                                    {errors.program_id}
                                                </FieldError>
                                            )}
                                        </Field>
                                        <Field
                                            className="col-span-1"
                                            data-invalid={Boolean(
                                                errors.intern_id,
                                            )}
                                        >
                                            <FieldLabel htmlFor="intern_id">
                                                Peserta Magang
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FieldLabel>
                                            <NativeSelect
                                                aria-invalid={Boolean(
                                                    errors.intern_id,
                                                )}
                                                id="intern_id"
                                                onChange={handleChange}
                                                value={data.intern_id}
                                            >
                                                <NativeSelectOption value="">
                                                    Pilih peserta magang
                                                </NativeSelectOption>
                                                {users
                                                    .filter(
                                                        (user) =>
                                                            user.role.name ==
                                                            "intern",
                                                    )
                                                    .map((user) => (
                                                        <NativeSelectOption
                                                            key={user.id}
                                                            value={user.id}
                                                        >
                                                            {user.name}
                                                        </NativeSelectOption>
                                                    ))}
                                            </NativeSelect>
                                            {errors.intern_id && (
                                                <FieldError>
                                                    {errors.intern_id}
                                                </FieldError>
                                            )}
                                        </Field>
                                    </>
                                )}
                                <Field
                                    className={form.isOpen("create") ? "col-span-1" : "col-span-1 md:col-span-2"}
                                    data-invalid={Boolean(errors.mentor_id)}
                                >
                                    <FieldLabel htmlFor="mentor_id">
                                        Mentor Magang
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FieldLabel>
                                    <NativeSelect
                                        aria-invalid={Boolean(errors.mentor_id)}
                                        id="mentor_id"
                                        onChange={handleChange}
                                        value={data.mentor_id}
                                    >
                                        <NativeSelectOption value="">
                                            Pilih mentor magang
                                        </NativeSelectOption>
                                        {users
                                            .filter(
                                                (user) =>
                                                    user.role.name == "mentor",
                                            )
                                            .map((user) => (
                                                <NativeSelectOption
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name}
                                                </NativeSelectOption>
                                            ))}
                                    </NativeSelect>
                                    {errors.mentor_id && (
                                        <FieldError>
                                            {errors.mentor_id}
                                        </FieldError>
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
                                        <NativeSelectOption value="planned">
                                            Planned
                                        </NativeSelectOption>
                                        <NativeSelectOption value="active">
                                            Active
                                        </NativeSelectOption>
                                        <NativeSelectOption value="completed">
                                            Completed
                                        </NativeSelectOption>
                                        <NativeSelectOption value="terminated">
                                            Terminated
                                        </NativeSelectOption>
                                    </NativeSelect>
                                    {errors.status && (
                                        <FieldError>{errors.status}</FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(
                                        errors.position_title,
                                    )}
                                >
                                    <FieldLabel htmlFor="position_title">
                                        Posisi
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.position_title,
                                        )}
                                        id="position_title"
                                        placeholder="contoh: Web developer"
                                        onChange={handleChange}
                                        value={data.position_title}
                                    />
                                    {errors.position_title && (
                                        <FieldError>
                                            {errors.position_title}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field
                                    className="col-span-1 md:col-span-2"
                                    data-invalid={Boolean(errors.objective)}
                                >
                                    <FieldLabel htmlFor="objective">
                                        Tujuan
                                    </FieldLabel>
                                    <Textarea
                                        aria-invalid={Boolean(errors.objective)}
                                        id="objective"
                                        placeholder="contoh: Belajar laravel"
                                        onChange={handleChange}
                                        value={data.objective}
                                    />
                                    {errors.objective && (
                                        <FieldError>
                                            {errors.objective}
                                        </FieldError>
                                    )}
                                </Field>
                                {/* <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(
                                        errors.termination_reason,
                                    )}
                                >
                                    <FieldLabel htmlFor="termination_reason">
                                        Alasan pengakhiran
                                    </FieldLabel>
                                    <Textarea
                                        aria-invalid={Boolean(
                                            errors.termination_reason,
                                        )}
                                        id="termination_reason"
                                        placeholder="contoh: Masa magang sudah selesai"
                                        onChange={handleChange}
                                        value={data.termination_reason}
                                    />
                                    {errors.termination_reason && (
                                        <FieldError>
                                            {errors.termination_reason}
                                        </FieldError>
                                    )}
                                </Field> */}
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
