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
import { useCan } from "@/hooks/use-can";
import { Separator } from "@/components/ui/separator";

export default function EvaluationForm({ modal, placements }) {
    const { can } = useCan();

    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm({
            placement_id: "",
            evaluation_type: "",
            is_visible_to_intern: "",
            period_start_date: "",
            period_end_date: "",
            strengths: "",
            improvement_areas: "",
            action_plan: "",
            overall_comment: "",
            reliability_score: "",
            learning_score: "",
            code_quality_score: "",
            problem_solving_score: "",
            collaboration_score: "",
            communication_score: "",
            documentation_score: "",
        });

    const isEdit = modal.isOpen("edit");

    const isOpenModal = isEdit || modal.isOpen("create");

    useEffect(() => {
        if (isOpenModal) {
            clearErrors();
            setData({
                placement_id: modal.data?.placement_id ?? "",
                evaluation_type: modal.data?.evaluation_type ?? "",
                is_visible_to_intern: modal.data?.is_visible_to_intern ?? 0,
                period_start_date: modal.data?.period_start_date ?? "",
                period_end_date: modal.data?.period_end_date ?? "",
                strengths: modal.data?.strengths ?? "",
                improvement_areas: modal.data?.improvement_areas ?? "",
                action_plan: modal.data?.action_plan ?? "",
                overall_comment: modal.data?.overall_comment ?? "",
                reliability_score: modal.data?.reliability_score ?? "",
                learning_score: modal.data?.learning_score ?? "",
                code_quality_score: modal.data?.code_quality_score ?? "",
                problem_solving_score: modal.data?.problem_solving_score ?? "",
                collaboration_score: modal.data?.collaboration_score ?? "",
                communication_score: modal.data?.communication_score ?? "",
                documentation_score: modal.data?.documentation_score ?? "",
            });
        }
    }, [isOpenModal]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put("/evaluation/" + modal.data?.id, {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else {
            post("/evaluation", {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        }
    };

    const options = can("document:review")
        ? [{ value: "", label: "Pilih peserta" }, ...placements]
        : placements;

    const handleChange = (e) => {
        const { id, type, value, files } = e.target;

        setData({
            ...data,
            [id]: type == "file" ? (files && files[0] ? files[0] : "") : value,
        });
    };

    const scoreOptions = [
        { value: "", label: "Pilih skor" },
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
    ];

    const mainField = [
        {
            label: "Masukan peserta magang",
            name: "placement_id",
            error: errors.placement_id,
            value: data.placement_id,
            type: "select",
            options: options,
            onChange: handleChange,
            required: true,
            hidden: isEdit,
            col: 2,
        },
        {
            label: "Tipe evaluasi",
            name: "evaluation_type",
            error: errors.evaluation_type,
            value: data.evaluation_type,
            onChange: handleChange,
            required: true,
            placeholder: "contoh : Bulanan",
        },
        {
            label: "Dilihat oleh peserta magang",
            name: "is_visible_to_intern",
            error: errors.is_visible_to_intern,
            value: data.is_visible_to_intern ? 1 : 0,
            onChange: handleChange,
            required: true,
            orientation: "horizontal",
            type: "radio-group",
            options: [
                { label: "Terlihat", value: 1 },
                { label: "Tidak", value: 0 },
            ],
        },
        {
            label: "Periode mulai",
            name: "period_start_date",
            error: errors.period_start_date,
            value: data.period_start_date,
            onChange: handleChange,
            type: "date",
            required: true,
        },
        {
            label: "Periode selesai",
            name: "period_end_date",
            error: errors.period_end_date,
            value: data.period_end_date,
            onChange: handleChange,
            type: "date",
            required: true,
        },
        {
            label: "Kelebihan",
            name: "strengths",
            error: errors.strengths,
            value: data.strengths,
            value: data.strengths,
            onChange: handleChange,
            required: true,
            type: "textarea",
            placeholder: "contoh : Kelebihan yang dimiliki",
        },
        {
            label: "Yang harus diperbaiki",
            name: "improvement_areas",
            error: errors.improvement_areas,
            value: data.improvement_areas,
            onChange: handleChange,
            required: true,
            type: "textarea",
            placeholder: "contoh : Kelebihan yang dimiliki",
        },
        {
            label: "Rencana perbaikan",
            name: "action_plan",
            error: errors.action_plan,
            value: data.action_plan,
            onChange: handleChange,
            type: "textarea",
            placeholder: "contoh : Rencana perbaikan yang akan diambil",
        },
        {
            label: "Komentar",
            name: "overall_comment",
            error: errors.overall_comment,
            value: data.overall_comment,
            onChange: handleChange,
            required: true,
            type: "textarea",
            placeholder: "contoh : Komentar yang diberikan",
        },
    ];

    const scoreField = [
        {
            label: "Komunikasi",
            name: "communication_score",
            error: errors.communication_score,
            value: data.communication_score,
            type: "select",
            options: scoreOptions,
            onChange: handleChange,
            required: true,
            col: 2,
        },
        {
            label: "Keandalan",
            name: "reliability_score",
            error: errors.reliability_score,
            value: data.reliability_score,
            type: "select",
            options: scoreOptions,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Kemampuan Belajar",
            name: "learning_score",
            error: errors.learning_score,
            value: data.learning_score,
            type: "select",
            options: scoreOptions,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Kualitas Kode",
            name: "code_quality_score",
            error: errors.code_quality_score,
            value: data.code_quality_score,
            type: "select",
            options: scoreOptions,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Pemecahan Masalah",
            name: "problem_solving_score",
            error: errors.problem_solving_score,
            value: data.problem_solving_score,
            type: "select",
            options: scoreOptions,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Kolaborasi",
            name: "collaboration_score",
            error: errors.collaboration_score,
            value: data.collaboration_score,
            type: "select",
            options: scoreOptions,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Dokumentasi",
            name: "documentation_score",
            error: errors.documentation_score,
            value: data.documentation_score,
            type: "select",
            options: scoreOptions,
            onChange: handleChange,
            required: true,
        },
    ];

    console.log(data);

    return (
        <AlertDialog open={isOpenModal} onOpenChange={() => modal.closeModal()}>
            <AlertDialogContent className="!max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {isEdit ? "Edit Evaluasi" : "Tambah Evaluasi"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk menambahkan atau
                            memperbarui evaluasi.
                        </FieldDescription>
                    </AlertDialogHeader>

                    <div>
                        <FieldSet className="py-6">
                            <FormSection col={2}>
                                {mainField.map((field) => (
                                    <FormField
                                        key={field.name}
                                        {...field}
                                        setData={setData}
                                    />
                                ))}
                                <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                                    <Separator />
                                    <AlertDialogTitle>
                                        Penilaian
                                    </AlertDialogTitle>
                                </div>
                                {scoreField.map((field) => (
                                    <FormField key={field.name} {...field} />
                                ))}
                            </FormSection>
                        </FieldSet>
                    </div>

                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction variant="success" type="submit" disabled={processing}>
                            {processing ? <Spinner /> : <Save />}
                            Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
