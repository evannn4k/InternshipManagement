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

export default function TaskForm({ modal }) {
    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm({
            title: "",
        });

    useEffect(() => {
        if (modal.isOpen("edit") || modal.isOpen("create")) {
            clearErrors();
            setData({
                title: modal.isOpen("edit") ? (modal.data?.title ?? "") : "",
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
                            <FieldGroup className="grid md:grid-cols-2 grid-cols-1 gap-4"></FieldGroup>
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
