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

export default function DocumentForm({ modal, placements }) {
    const { can } = useCan();

    const isEdit = modal.isOpen("edit");

    const {
        data,
        transform,
        setData,
        post,
        processing,
        errors,
        clearErrors,
        reset,
    } = useForm({
        placement_id: "",
        title: "",
        category: "",
        file: "",
        description: "",
    });

    const isOpenModal = isEdit || modal.isOpen("create");

    useEffect(() => {
        if (isOpenModal) {
            clearErrors();
            setData({
                placement_id: isEdit ? (modal.data?.placement_id ?? "") : "",
                title: isEdit ? (modal.data?.title ?? "") : "",
                category: isEdit ? (modal.data?.category ?? "") : "",
                file: isEdit ? (modal.data?.file ?? "") : "",
                description: isEdit ? (modal.data?.description ?? "") : "",
            });
        }
    }, [isOpenModal]);

    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            transform(() => ({
                ...data,
                _method: "PUT",
            }));

            post("/document/" + modal.data.id, {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        } else {
            post("/document", {
                onSuccess: () => {
                    modal.closeModal();
                    reset();
                },
            });
        }
    };

    const handleChange = (e) => {
        const { id, type, value, files } = e.target;

        setData({
            ...data,
            [id]: type == "file" ? (files && files[0] ? files[0] : "") : value,
        });
    };

    const options = can("document:review")
        ? [{ value: "", label: "Pilih peserta" }, ...placements]
        : placements;

    const fields = [
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
            disabled: !can("document:review"),
        },
        {
            label: "Judul Dokumen",
            name: "title",
            error: errors.title,
            value: data.title,
            onChange: handleChange,
            placeholder: "contoh : Portofolio",
            required: true,
        },
        {
            label: "Kategori",
            name: "category",
            error: errors.category,
            value: data.category,
            onChange: handleChange,
            placeholder: "contoh : Portofolio",
            required: true,
        },
        {
            label: isEdit ? "Ganti File" : "Upload File",
            name: "file",
            error: errors.file,
            onChange: handleChange,
            required: true,
            type: "file",
            col: 2,
            description:
                "Hanya jepg, jpg, png, webp, jfif, json dan docx, Maksimal 5 MB",
        },
        {
            label: "Deskripsi",
            name: "description",
            error: errors.description,
            value: data.description,
            onChange: handleChange,
            placeholder: "contoh : Portofolio saya pribadi",
            type: "textarea",
            col: 2,
        },
    ];

    return (
        <AlertDialog open={isOpenModal} onOpenChange={() => modal.closeModal()}>
            <AlertDialogContent className="!max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {isEdit ? "Edit Dokumen" : "Tambah Dokumen"}
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk menambahkan atau
                            memperbarui dokumen.
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
                        <AlertDialogAction
                            variant="success"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? <Spinner /> : <Save />}
                            Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
