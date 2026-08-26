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
import { Save } from "lucide-react";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function WeeklyReportReviewForm({ modal }) {
    const { data, setData, put, processing, errors, clearErrors, reset } =
        useForm({
            mentor_feedback: "",
        });

    useEffect(() => {
        clearErrors();
        reset();
    }, [modal.isOpen("revision"), modal.isOpen("approve")]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (modal.isOpen("revision")) {
            put("/weekly-report/" + modal.data?.id + "/revision", {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else if (modal.isOpen("approve")) {
            put("/weekly-report/" + modal.data?.id + "/approve", {
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
            label: "Masukan mentor",
            name: "mentor_feedback",
            error: errors.mentor_feedback,
            value: data.mentor_feedback,
            onChange: handleChange,
            type: "textarea",
            placeholder: "contoh : Tidak memenuhi kriteria",
            required: modal.isOpen("revision"),
        },
    ];

    console.log(modal)

    return (
        <AlertDialog
            open={modal.isOpen("revision") || modal.isOpen("approve")}
            onOpenChange={() => modal.closeModal()}
        >
            <AlertDialogContent className="max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {modal.isOpen("revision") ? "Revisi" : "Setujui"}{" "}
                            Laporan
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk{" "}
                            {modal.isOpen("revision")
                                ? "meminta revisi"
                                : "menyetujui"}{" "}
                            laporan.
                        </FieldDescription>
                    </AlertDialogHeader>

                    <div>
                        <FieldSet className="py-6">
                            <FormSection col={1}>
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
