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

export default function TaskForm({ modal, placements }) {
    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm({
            placement_id: "",
            title: "",
            priority: "",
            start_date: "",
            due_date: "",
            status: "",
            estimation_hours: "",
            description: "",
            acceptance_criteria: "",
        });

    useEffect(() => {
        if (modal.isOpen("edit") || modal.isOpen("create")) {
            clearErrors();
            setData({
                placement_id: modal.isOpen("edit")
                    ? (modal.data?.placement_id ?? "")
                    : "",
                title: modal.isOpen("edit") ? (modal.data?.title ?? "") : "",
                priority: modal.isOpen("edit")
                    ? (modal.data?.priority ?? "")
                    : "",
                start_date: modal.isOpen("edit")
                    ? (modal.data?.start_date ?? "")
                    : "",
                due_date: modal.isOpen("edit")
                    ? (modal.data?.due_date ?? "")
                    : "",
                status: modal.isOpen("edit") ? (modal.data?.status ?? "") : "",
                estimation_hours: modal.isOpen("edit")
                    ? (modal.data?.estimation_hours ?? "")
                    : "",
                description: modal.isOpen("edit")
                    ? (modal.data?.description ?? "")
                    : "",
                acceptance_criteria: modal.isOpen("edit")
                    ? (modal.data?.acceptance_criteria ?? "")
                    : "",
            });
        }
    }, [modal.isOpen("edit") || modal.isOpen("create")]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (modal.isOpen("edit")) {
            put("/task/" + modal.data.id, {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else {
            post("/task", {
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
            label: "Masukan peserta magang",
            name: "placement_id",
            error: errors.placement_id,
            value: data.placement_id,
            type: "select",
            options: [{ value: "", label: "Pilih peserta" }, ...placements],
            col: 2,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Judul tugas",
            name: "title",
            error: errors.title,
            value: data.title,
            onChange: handleChange,
            placeholder: "contoh : Tugas Praktek",
            required: true,
        },
        {
            label: "Masukan prioritas tugas",
            name: "priority",
            error: errors.priority,
            value: data.priority,
            type: "select",
            options: [
                { value: "", label: "Pilih prioritas" },
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
                { value: "urgent", label: "Urgent" },
            ],
            onChange: handleChange,
            required: true,
        },
        {
            label: "Tanggal mulai",
            name: "start_date",
            error: errors.start_date,
            value: data.start_date,
            type: "date",
            onChange: handleChange,
        },
        {
            label: "Tanggal deadline",
            name: "due_date",
            error: errors.due_date,
            value: data.due_date,
            type: "date",
            onChange: handleChange,
        },
        {
            label: "Status",
            name: "status",
            error: errors.status,
            value: data.status,
            type: "select",
            options: [
                { value: "", label: "Pilih status" },
                { value: "draft", label: "Draft" },
                { value: "assigned", label: "Assigned" },
            ],
            onChange: handleChange,
            required: true,
        },
        {
            label: "Estimasi jam",
            name: "estimation_hours",
            error: errors.estimation_hours,
            value: data.estimation_hours,
            type: "number",
            step: 0.1,
            onChange: handleChange,
            placeholder: "contoh : 8",
        },
        {
            label: "Deskripsi",
            name: "description",
            error: errors.description,
            value: data.description,
            type: "textarea",
            onChange: handleChange,
            placeholder: "contoh : Tugas Praktek",
            required: true,
        },
        {
            label: "Kriteria pengumpulan",
            name: "acceptance_criteria",
            error: errors.acceptance_criteria,
            value: data.acceptance_criteria,
            type: "textarea",
            onChange: handleChange,
            placeholder: "contoh : Tugas Praktek",
            required: true,
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
                                ? "Edit Data Tugas"
                                : "Tambah Data Tugas"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk menambahkan atau
                            memperbarui tugas.
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
