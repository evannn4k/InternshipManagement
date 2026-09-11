import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "@inertiajs/react";
import { PackageOpen } from "lucide-react";

export default function ActivityTable({ activities }) {
    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Subjek</TableHead>
                        <TableHead>Value lama</TableHead>
                        <TableHead>Value baru</TableHead>
                        <TableHead>Alamant IP</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activities.length > 0 ? (
                        activities.map((activity, i) => (
                            <TableRow key={activity.id}>
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell>
                                    <Link
                                        className="hover:underline underline-offset-1 decoration-blue-600 text-blue-600"
                                        href={`/user/${activity.user_id}`}
                                    >
                                        {activity.user.name ?? "-"}
                                    </Link>
                                </TableCell>
                                <TableCell>{activity.action ?? "-"}</TableCell>
                                <TableCell>
                                    {activity.subject_id ? (
                                        <Link
                                            className="hover:underline underline-offset-1 decoration-blue-600 text-blue-600"
                                            href={`/${activity.subject}/${activity.subject_id}`}
                                        >
                                            {activity.subject ?? "-"}
                                        </Link>
                                    ) : (
                                        activity.subject
                                    )}
                                </TableCell>
                                <TableCell>
                                    {activity.old_value ?? "-"}
                                </TableCell>
                                <TableCell>
                                    {activity.new_value ?? "-"}
                                </TableCell>
                                <TableCell>
                                    {activity.ip_address ?? "-"}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="p-8">
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
