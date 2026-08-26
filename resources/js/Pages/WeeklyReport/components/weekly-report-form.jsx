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

export default function WeeklyReportForm({ modal, defaultDates }) {
    const isEdit = modal.isOpen("edit");
    const isModalOpen = isEdit || modal.isOpen("create");

    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm({
            placement_id: "",
            week_start_date: "",
            week_end_date: "",
            completed_work: "",
            challenges: "",
            solutions: "",
            lessons_learned: "",
            next_week_plan: "",
            support_needed: "",
            status: "draft",
        });

    useEffect(() => {
        if (isModalOpen) {
            clearErrors();
            const item = modal.data;

            setData({
                placement_id: isEdit ? (item?.placement_id ?? "") : "",
                week_start_date: isEdit
                    ? (item?.week_start_date ?? defaultDates.start)
                    : defaultDates.start,
                week_end_date: isEdit
                    ? (item?.week_end_date ?? defaultDates.end)
                    : defaultDates.end,
                completed_work: isEdit ? (item?.completed_work ?? "") : "",
                challenges: isEdit ? (item?.challenges ?? "") : "",
                solutions: isEdit ? (item?.solutions ?? "") : "",
                lessons_learned: isEdit ? (item?.lessons_learned ?? "") : "",
                next_week_plan: isEdit ? (item?.next_week_plan ?? "") : "",
                support_needed: isEdit ? (item?.support_needed ?? "") : "",
                status: isEdit ? (item?.status ?? "draft") : "draft",
            });
        }
    }, [isModalOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (modal.isOpen("edit")) {
            console.log("berhasil edit")
            put("/weekly-report/" + modal.data.id, {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else {
            post("/weekly-report", {
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

    const fields = [
        {
            label: "Tanggal Mulai",
            name: "week_start_date",
            error: errors.week_start_date,
            value: data.week_start_date,
            type: "date",
            col: 1,
            onChange: handleChange,
            required: true,
            disabled: true,
        },
        {
            label: "Tanggal Selesai",
            name: "week_end_date",
            error: errors.week_end_date,
            value: data.week_end_date,
            type: "date",
            col: 1,
            onChange: handleChange,
            required: true,
            disabled: true,
        },
        {
            label: "Pekerjaan Selesai",
            name: "completed_work",
            error: errors.completed_work,
            value: data.completed_work,
            type: "textarea",
            placeholder:
                "Jelaskan pekerjaan atau fitur yang telah diselesaikan...",
            col: 2,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Tantangan",
            name: "challenges",
            error: errors.challenges,
            value: data.challenges,
            type: "textarea",
            placeholder: "Kendala atau masalah yang dihadapi...",
            col: 1,
            onChange: handleChange,
        },
        {
            label: "Solusi",
            name: "solutions",
            error: errors.solutions,
            value: data.solutions,
            type: "textarea",
            placeholder: "Langkah atau solusi yang sudah dicoba...",
            col: 1,
            onChange: handleChange,
        },
        {
            label: "Pelajaran yang didapatkan",
            name: "lessons_learned",
            error: errors.lessons_learned,
            value: data.lessons_learned,
            type: "textarea",
            placeholder: "Hal baru atau pengetahuan yang dipelajari...",
            col: 2,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Rencana minggu depan",
            name: "next_week_plan",
            error: errors.next_week_plan,
            value: data.next_week_plan,
            type: "textarea",
            placeholder: "Rencana tugas atau target untuk minggu depan...",
            col: 2,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Butuh Bantuan",
            name: "support_needed",
            error: errors.support_needed,
            value: data.support_needed,
            type: "textarea",
            placeholder: "Bantuan yang dibutuhkan dari pembimbing atau tim...",
            col: 2,
            onChange: handleChange,
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
                                ? "Edit Laporan Mingguan"
                                : "Tambah Laporan Mingguan"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk membuatlaporan minggu ini.
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
