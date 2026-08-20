import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    PackageOpen,
} from "lucide-react";

export default function AttendanceSummaryTabble({ users }) {
    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>Intern</TableHead>
                        <TableHead>Hari kerja</TableHead>
                        <TableHead>Masuk</TableHead>
                        <TableHead>Terlambat</TableHead>
                        <TableHead>Absen</TableHead>
                        <TableHead>Sakit</TableHead>
                        <TableHead>Permitted</TableHead>
                        <TableHead>Menit Terlambat</TableHead>
                        <TableHead>Kehadiran</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="flex flex-col">
                                    <span className="text-neutral-800 font-semibold">
                                        {user.name ?? "-"}
                                    </span> 
                                    <span className="text-light text-neutral-500 text-sm">
                                        {user.active_placement
                                            ?.position_title ?? "-"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {user.active_placement?.attendance?.length ?? 0}
                                </TableCell>
                                <TableCell>
                                    {user.active_placement?.attendance?.filter(a => a.status == "late" || a.status == "present").length ?? 0}
                                </TableCell>
                                <TableCell>
                                    {user.active_placement?.attendance?.filter(a => a.status == "late").length ?? 0}
                                </TableCell>
                                <TableCell>
                                    {user.active_placement?.attendance?.filter(a => a.status == "absent").length ?? 0}
                                </TableCell>
                                <TableCell>
                                    {user.active_placement?.attendance?.filter(a => a.status == "sick").length ?? 0}
                                </TableCell>
                                <TableCell>
                                    {user.active_placement?.attendance?.filter(a => a.status == "permitted").length ?? 0}
                                </TableCell>
                                <TableCell>
                                    {user.active_placement?.attendance?.reduce((total, a) => total + (a.late_minutes ?? ""), 0) ?? 0}
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
