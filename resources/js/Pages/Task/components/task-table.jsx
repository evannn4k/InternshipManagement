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
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { useCan } from "@/hooks/use-can";
import {
    CirclePlay,
    CircleX,
    EllipsisVertical,
    FileText,
    Info,
    SquarePen,
    Trash2,
} from "lucide-react";

export default function TaskTable({ tasks, modal, handleChangeStatus }) {
    const { can } = useCan();

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Prioritas</TableHead>
                        <TableHead>Telat</TableHead>
                        <TableHead>Tanggal pengumpulan</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length > 0 ? (
                        tasks.map((task, i) => (
                            <TableRow key={task.id}>
                                {console.log(task)}
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>
                                    {task.placement.intern.name}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {task.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            task.priority === "high"
                                                ? "destructive"
                                                : task.priority === "medium"
                                                  ? "primary"
                                                  : task.priority === "low"
                                                    ? "success"
                                                    : "default"
                                        }
                                    >
                                        {task.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            task.submission_at
                                                ? task.submission_at <
                                                  task.due_date
                                                    ? "destructive"
                                                    : "success"
                                                : "outline"
                                        }
                                    >
                                        {task.submission_at
                                            ? task.submission_at < task.due_date
                                                ? "Terlambat"
                                                : "Tepat Waktu"
                                            : "Belum"}{" "}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {task.submission_at ?? "-"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            render={
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8"
                                                >
                                                    <EllipsisVertical />{" "}
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            }
                                        />
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuGroup>
                                                {task.status !== "cancelled" &&
                                                    task.status !==
                                                        "completed" && (
                                                        <>
                                                            <DropdownMenuLabel>
                                                                Action
                                                            </DropdownMenuLabel>
                                                            {(task.status ===
                                                                "draft" ||
                                                                task.status ===
                                                                    "assigned") && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleChangeStatus(
                                                                            task.id,
                                                                            "in_progress",
                                                                        )
                                                                    }
                                                                >
                                                                    <CirclePlay />
                                                                    Start
                                                                </DropdownMenuItem>
                                                            )}

                                                            {(task.status ===
                                                                "in_progress" ||
                                                                task.status ===
                                                                    "assigned") && (
                                                                <>
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleChangeStatus(
                                                                                task.id,
                                                                                "cancelled",
                                                                            )
                                                                        }
                                                                    >
                                                                        <CircleX />
                                                                        Cancel
                                                                    </DropdownMenuItem>
                                                                </>
                                                            )}
                                                            <DropdownMenuSeparator />
                                                        </>
                                                    )}
                                            </DropdownMenuGroup>
                                            {can("task:update") && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        modal.openEdit(task)
                                                    }
                                                >
                                                    <SquarePen /> Edit
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
                                                <FileText /> Detail
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
                                                        <Trash2 /> Delete
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
