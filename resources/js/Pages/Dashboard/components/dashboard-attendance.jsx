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

export function DashboardAttendance({ attendances }) {
    return (
        <div className="flex flex-col gap-2">
            <CardDescription>Abssensi terbaru</CardDescription>
            <div className="overflow-hidden rounded-lg border">
                <Table className="m-0">
                    <TableHeader className="bg-gradient-to-t from-emerald-50 to-white">
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Peserta Magang</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendances.length > 0 ? (
                            attendances.map((attendance, i) => (
                                <TableRow className="cursor-pointer" onClick={() => router.get("/attendance/" + attendance.id)} key={attendance.id}>
                                    <TableCell>{i + 1}.</TableCell>
                                    <TableCell>
                                        {attendance.placement.intern.name}
                                    </TableCell>
                                    <TableCell>
                                        {attendance.attendance_date}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {attendance.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="p-8">
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
