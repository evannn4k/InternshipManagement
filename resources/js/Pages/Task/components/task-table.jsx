import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import {
    FiCheckCircle,
    FiXCircle,
    FiMoreVertical,
    FiPackage,
    FiFileText,
    FiEdit,
    FiTrash2,
} from "react-icons/fi";
import { useCan } from "@/hooks/use-can";

export default function TaskTable({ tasks, modal }) {
    const { can } = useCan();

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length > 0 ? (
                        tasks.map((task, i) => (
                            <TableRow key={task.id}>
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            render={
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8"
                                                >
                                                    <FiMoreVertical />
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            }
                                        />
                                        <DropdownMenuContent align="end">
                                            {can("task:update") && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        modal.openEdit(task)
                                                    }
                                                >
                                                    <FiEdit />
                                                    Edit
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                                render={
                                                    <Link
                                                        href={
                                                            "/task/" + task.id
                                                        }
                                                    />
                                                }
                                            >
                                                <FiFileText />
                                                Detail
                                            </DropdownMenuItem>
                                            {can("task:delete") && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            form.openDelete(
                                                                task.id,
                                                            )
                                                        }
                                                    >
                                                        <FiTrash2 />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="p-8">
                                <div className="flex items-center flex-col gap-2">
                                    <FiPackage className="size-8 text-muted-foreground" />
                                    <span>Tidak ada data</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
