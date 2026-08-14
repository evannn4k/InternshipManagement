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

export default function SubmitForm({ modal }) {
    const { data, setData, put, processing, errors, clearErrors, reset } =
        useForm({
            repository_url: "",
            demo_url: "",
            submission_notes: "",
        });
    
    useEffect(() => {
        clearErrors();
        reset()
    }, [modal.isOpen("submit")]);

    const handleSubmit = (e) => {
        e.preventDefault();

        put("/task/" + modal.data?.id + "/submit", {
            onSuccess: () => { 
                modal.closeModal();
                reset();
            },
        });
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

    const fields = [
        {
            label: "URL repository",
            name: "repository_url",
            error: errors.repository_url,
            value: data.repository_url,
            onChange: handleChange,
            placeholder: "contoh : https://github.com/tugas-praktek",
        },
        {
            label: "URL demo",
            name: "demo_url",
            error: errors.demo_url,
            value: data.demo_url,
            onChange: handleChange,
            placeholder: "contoh : https://demo.com",
        },
        {
            label: "Catatan",
            name: "submission_notes",
            type: "textarea",
            error: errors.submission_notes,
            value: data.submission_notes,
            onChange: handleChange,
            placeholder: "contoh : Saya menggunakan Laravel dan React",
        },
    ];

    return (
        <AlertDialog
            open={modal.isOpen("submit")}
            onOpenChange={() => modal.closeModal()}
        >
            <AlertDialogContent className="max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Kumpulkan Tugas </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk menambahkan atau
                            memperbarui tugas.
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
