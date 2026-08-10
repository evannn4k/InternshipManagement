import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FaRegTrashCan } from "react-icons/fa6";

export function DeleteAlert({ title, description, onDelete, form }) {
    return (
        <AlertDialog open={form.isOpen("delete")} onOpenChange={form.closeModal}>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <FaRegTrashCan />
                    </AlertDialogMedia>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={onDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
