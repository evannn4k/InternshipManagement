import { Badge } from "@/components/ui/badge";
import { CardDescription } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { PackageOpen } from "lucide-react";

export function DashboardTask({ tasks }) {
    return (
        <div className="flex flex-col gap-2">
            <CardDescription>Tugas terbaru</CardDescription>
            <div className="overflow-hidden rounded-lg border">
                <Table className="m-0">
                    <TableHeader className="bg-gradient-to-t from-emerald-50 to-white">
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Judul Tugas</TableHead>
                            <TableHead>Peserta Magang</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.length > 0 ? (
                            tasks.map((task, i) => (
                                <TableRow
                                    className="cursor-pointer"
                                    onClick={() =>
                                        router.get("/task/" + task.id)
                                    }
                                    key={task.id}
                                >
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
                                                    : task.status ===
                                                            "assigned" ||
                                                        task.status ===
                                                            "submitted" ||
                                                        task.status ===
                                                            "completed"
                                                      ? "success"
                                                      : task.status ===
                                                          "cancelled"
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
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="p-8">
                                    <div className="flex items-center flex-col gap-2">
                                        <PackageOpen className="size-8 text-muted-foreground" />
                                        <span>Tidak ada data</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
