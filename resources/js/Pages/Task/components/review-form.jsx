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

export default function ReviewForm({ modal }) {
    const { data, setData, put, processing, errors, clearErrors, reset } =
        useForm({
            review_notes: "",
        });

    useEffect(() => {
        clearErrors();
        reset();
    }, [modal.isOpen("revision"), modal.isOpen("completed")]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(modal.isOpen("revision")) {
            put("/task/" + modal.data?.id + "/revision", {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else if(modal.isOpen("completed")) {
            put("/task/" + modal.data?.id + "/completed", {
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
            label: "Catatan",
            name: "review_notes",
            error: errors.review_notes,
            value: data.review_notes,
            onChange: handleChange,
            type: "textarea",
            placeholder: "contoh : Tidak memenuhi kriteria",
            required:true,
        },
    ];

    return (
        <AlertDialog
            open={modal.isOpen("revision") || modal.isOpen("completed")}
            onOpenChange={() => modal.closeModal()}
        >
            <AlertDialogContent className="max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Revisi Tugas</AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk meminta revisi tugas.
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
