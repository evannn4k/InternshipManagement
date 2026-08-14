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
import { Link, router } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { useCan } from "@/hooks/use-can";
import {
    CircleCheck,
    CirclePlay,
    CircleX,
    EllipsisVertical,
    Eye,
    FileText,
    Send,
    SquarePen,
    Trash2,
    UserRoundArrowLeft,
} from "lucide-react";

export default function TaskTable({ tasks, modal, handleChangeStatus }) {
    const { can } = useCan();

    const actions = [
        {
            enabled: (task) =>
                can("task:review") && task.status === "submitted",
            label: "Tinjau",
            icon: <Eye />,
            onClick: (task) => router.get(`/task/${task.id}`),
        },
        {
            enabled: (task) => can("task:update") && task.status === "draft",
            label: "Tetapkan",
            icon: <UserRoundArrowLeft />,
            onClick: (task) => handleChangeStatus(task.id, "assigned"),
        },
        {
            enabled: (task) => can("task:update") && task.status === "assigned",
            label: "Mulai",
            icon: <CirclePlay />,
            onClick: (task) => handleChangeStatus(task.id, "in_progress"),
        },
        {
            enabled: (task) =>
                can("task:update") &&
                (task.status === "assigned" || task.status === "in_progress"),
            label: "Batalkan",
            icon: <CircleX />,
            onClick: (task) => handleChangeStatus(task.id, "cancelled"),
        },
        {
            enabled: (task) =>
                can("task:submit") &&
                (task.status === "in_progress" ||
                    task.status === "revision_requested"),
            label: "Kumpulkan",
            icon: <Send />,
            onClick: (task) => modal.openModal("submit", task),
        },
    ];

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
                        <TableHead>Pengumpulan</TableHead>
                        <TableHead>Waktu pengumpulan</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length > 0 ? (
                        tasks.map((task, i) => (
                            <TableRow key={task.id}>
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>
                                    {task.placement.intern.name}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            task.status === "in_progress"
                                                ? "primary"
                                                : task.status === "assigned" ||
                                                    task.status ===
                                                        "submitted" ||
                                                    task.status === "completed"
                                                  ? "success"
                                                  : task.status === "cancelled"
                                                    ? "destructive"
                                                    : task.status ===
                                                        "revision_requested"
                                                      ? "default"
                                                      : "outline"
                                        }
                                    >
                                        {task.status === "completed" ? (
                                            <CircleCheck />
                                        ) : task.status === "cancelled" ? (
                                            <CircleX />
                                        ) : null}
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
                                            task.status === "submitted" || task.status === "completed"
                                                ? task.submitted_at >
                                                  task.due_date
                                                    ? "destructive"
                                                    : "success"
                                                : task.status === "cancelled"
                                                  ? "secondary"
                                                  : "outline"
                                        }
                                    >
                                        {task.status === "submitted" || task.status === "completed"
                                            ? task.submitted_at > task.due_date
                                                ? "Terlambat"
                                                : "Tepat Waktu"
                                            : task.status === "cancelled"
                                              ? "Dibatalkan"
                                              : "Belum Disubmit"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {task.submitted_at ?? "-"}
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
                                                <DropdownMenuLabel>
                                                    Action
                                                </DropdownMenuLabel>
                                                {actions.map((action) => {
                                                    return action.enabled(
                                                        task,
                                                    ) ? (
                                                        <DropdownMenuItem
                                                            key={action.label}
                                                            onClick={() =>
                                                                action.onClick(
                                                                    task,
                                                                )
                                                            }
                                                        >
                                                            {action.icon}
                                                            {action.label}
                                                        </DropdownMenuItem>
                                                    ) : null;
                                                })}
                                                <DropdownMenuSeparator />
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
