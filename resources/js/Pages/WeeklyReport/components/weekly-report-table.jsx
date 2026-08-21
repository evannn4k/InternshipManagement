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

export default function WeeklyReportTable({ weeklyReports, modal }) {
    const { can } = useCan();

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Mulai</TableHead>
                        <TableHead>Selesai</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pada</TableHead>
                        <TableHead>Direview oleh</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {weeklyReports?.length > 0 ? (
                        weeklyReports.map((weeklyReport, i) => (
                            <TableRow key={weeklyReport.id}>
                                {console.log(weeklyReport)}
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell>
                                    {weeklyReport.placement.intern.name ?? "-"}
                                </TableCell>
                                <TableCell>
                                    {weeklyReport.week_start_date ?? "-"}
                                </TableCell>
                                <TableCell>
                                    {weeklyReport.week_end_date ?? "-"}
                                </TableCell>
                                <TableCell>
                                    {weeklyReport.status ?? "-"}
                                </TableCell>
                                <TableCell>
                                    {weeklyReport.submitted_at ?? "-"}
                                </TableCell>
                                <TableCell>
                                    {weeklyReport.reviewed_by?.name ?? "-"}
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
                                            
                                            {can("weekly-report:update") &&
                                                weeklyReport.status !==
                                                    "completed" && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            modal.openEdit(
                                                                weeklyReport,
                                                            )
                                                        }
                                                    >
                                                        <SquarePen /> Edit
                                                    </DropdownMenuItem>
                                                )}
                                            <DropdownMenuItem
                                                render={
                                                    <Link
                                                        href={
                                                            "/weekly-report/" +
                                                            weeklyReport.id
                                                        }
                                                    />
                                                }
                                            >
                                                <FileText /> Detail
                                            </DropdownMenuItem>
                                            {can("weekly-report:delete") && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            modal.openDelete(
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
