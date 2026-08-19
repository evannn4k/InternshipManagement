import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FieldDescription, FieldSet } from "@/components/ui/field";
import { useForm } from "@inertiajs/react";
import FormSection from "@/components/app/FormSection";
import FormField from "../../../components/app/FormField";
import { useEffect } from "react";
import { Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function AttendanceForm({ modal, placements }) {
    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm({
            placement_id: "",
            status: "",
            attendance_date: "",
            check_in_at: "",
            check_out_at: "",
            mentor_notes: "",
            correction_reason: "",
        });

    useEffect(() => {
        if (modal.isOpen("edit") || modal.isOpen("create")) {
            clearErrors();
            setData({
                placement_id: modal.isOpen("edit")
                    ? (modal.data?.placement_id ?? "")
                    : "",
                attendance_date: modal.isOpen("edit")
                    ? (modal.data?.attendance_date ?? "")
                    : "",
                status: modal.isOpen("edit")
                    ? (modal.data?.status ?? "")
                    : "",
                check_in_at: modal.isOpen("edit")
                    ? (modal.data?.check_in_at ?? "")
                    : "",
                check_out_at: modal.isOpen("edit")
                    ? (modal.data?.check_out_at ?? "")
                    : "",
                mentor_notes: modal.isOpen("edit")
                    ? (modal.data?.mentor_notes ?? "")
                    : "",
                correction_reason: modal.isOpen("edit")
                    ? (modal.data?.correction_reason ?? "")
                    : "",
            });
        }
    }, [modal.isOpen("edit") || modal.isOpen("create")]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (modal.isOpen("edit")) {
            put("/attendance/" + modal.data.id, {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else {
            post("/attendance", {
                onSuccess: () => {
                    modal.closeModal();
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

    placements = placements.map((placement) => ({
        value: placement.id,
        label: placement.intern.name + " - " + placement.program.name,
    }));

    const fields = [
        {
            label: "Masukan peserta magang",
            name: "placement_id",
            error: errors.placement_id,
            value: data.placement_id,
            type: "select",
            options: [{ value: "", label: "Pilih peserta" }, ...placements],
            onChange: handleChange,
            col: 2,
            required: true,
            hidden: modal.isOpen("edit"),
        },
        {
            label: "Status",
            name: "status",
            error: errors.status,
            value: data.status,
            type: "select",
            options: [
                { value: "", label: "Pilih status" },
                { value: "present", label: "Present" },
                { value: "absent", label: "Absent" },
                { value: "late", label: "Late" },
                { value: "sick", label: "Sick" },
                { value: "permitted", label: "Permitted" },
            ],
            onChange: handleChange,
            required: true,
        },
        {
            label: "Tanggal",
            name: "attendance_date",
            error: errors.attendance_date,
            value: data.attendance_date,
            type: "date",
            onChange: handleChange,
            required: true,
        },
        {
            label: "Masuk pada (jika memungkinkan)",
            name: "check_in_at",
            error: errors.check_in_at,
            value: data.check_in_at,
            type: "datetime-local",
            onChange: handleChange,
        },
        {
            label: "Keluar pada (jika memungkinkan)",
            name: "check_out_at",
            error: errors.check_out_at,
            value: data.check_out_at,
            type: "datetime-local",
            onChange: handleChange,
        },
        {
            label: "Catatan Mentor",
            name: "mentor_notes",
            error: errors.mentor_notes,
            value: data.mentor_notes,
            type: "textarea",
            onChange: handleChange,
            placeholder: "contoh : Semoga cepat sembuh",
        },
        {
            label: "Alasan Koreksi",
            name: "correction_reason",
            error: errors.correction_reason,
            value: data.correction_reason,
            type: "textarea",
            onChange: handleChange,
            placeholder: "contoh : Intern sakit",
        },
    ];

    return (
        <AlertDialog
            open={modal.isOpen("create") || modal.isOpen("edit")}
            onOpenChange={() => modal.closeModal()}
        >
            <AlertDialogContent className="!max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {modal.isOpen("edit")
                                ? "Edit Data Absensi"
                                : "Tambah Data Absensi"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk menambahkan atau
                            memperbarui Absensi.
                        </FieldDescription>
                    </AlertDialogHeader>

                    <div>
                        <FieldSet className="py-6">
                            <FormSection col={2}>
                                {fields.map((field) => (
                                    <FormField key={field.name} {...field} />
                                ))}
                            </FormSection>
                        </FieldSet>
                    </div>

                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction type="submit" disabled={processing}>
                            {processing ? <Spinner /> : <Save />}
                            Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
