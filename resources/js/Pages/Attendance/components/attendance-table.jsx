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
    PackageOpen,
    Send,
    SquarePen,
    Trash2,
    UserRoundArrowLeft,
} from "lucide-react";

export default function AttendanceTable({ attendances, modal }) {
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
                        <TableHead>Pengumpulan</TableHead>
                        <TableHead>Waktu pengumpulan</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {attendances.length > 0 ? (
                        attendances.map((attendance, i) => (
                            <TableRow key={attendance.id}>
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell>{attendance.title}</TableCell>
                                <TableCell>
                                    {attendance.placement.intern.name}
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
                                            {can("attendance:update") &&
                                                attendance.status !== "completed" && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            modal.openEdit(attendance)
                                                        }
                                                    >
                                                        <SquarePen /> Edit
                                                    </DropdownMenuItem>
                                                )}
                                            <DropdownMenuItem
                                                render={
                                                    <Link
                                                        href={
                                                            "/attendance/" + attendance.id
                                                        }
                                                    />
                                                }
                                            >
                                                <FileText /> Detail
                                            </DropdownMenuItem>
                                            {can("attendance:delete") && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            modal.openDelete(
                                                                attendance.id,
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
                            <TableCell colSpan={8} className="p-8">
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
    );
}
