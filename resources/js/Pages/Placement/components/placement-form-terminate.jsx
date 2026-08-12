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
import { Spinner } from "@/components/ui/spinner";
import { FaRegFloppyDisk } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

export default function PlacementFormTerminate({ form }) {
    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        termination_date: "",
        termination_reason: "",
    });

    useEffect(() => {
        if (form.isOpen("terminate")) {
            reset();
            clearErrors();
        }
    }, [form.isOpen("terminate")])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put("/placement/" + form.data.id + "/terminate", {
            onSuccess: () => form.closeModal(),
        });
    };

    console.log(data);
    return (
        <AlertDialog
            open={form.isOpen("terminate")}
            onOpenChange={() => form.closeModal()}
        >
            <AlertDialogContent className="max-h-[90vh] overflow-y-auto no-scrollbar">
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Akhiri masa penempatan
                        </AlertDialogTitle>
                        <FieldDescription>
                            Isi detail di bawah ini untuk memberhentikan masa
                            penempatan.
                        </FieldDescription>
                    </AlertDialogHeader>

                    <div>
                        <FieldSet className="py-6">
                            <FieldGroup className="grid grid-cols-1 gap-4">
                                <Field
                                    className="col-span-1"
                                    data-invalid={Boolean(
                                        errors.termination_date,
                                    )}
                                >
                                    <FieldLabel htmlFor="termination_date">
                                        Tanggal pengakhiran
                                    </FieldLabel>
                                    <Input
                                        aria-invalid={Boolean(
                                            errors.termination_date,
                                        )}
                                        id="termination_date"
                                        type="date"
                                        onChange={handleChange}
                                        value={data.termination_date}
                                    />
                                    {errors.termination_date && (
                                        <FieldError>
                                            {errors.termination_date}
                                        </FieldError>
                                    )}
                                </Field>

                                <Field
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
                                </Field>
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
