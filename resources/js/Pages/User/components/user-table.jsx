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
    CheckCircle2,
    XCircle,
    MoreVertical,
    Package,
    FileText,
    SquarePen,
    Trash2,
} from "lucide-react";
import { useCan } from "@/hooks/use-can";

export default function UserTable({ users, form }) {
    const { can } = useCan();

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Peran</TableHead>
                        <TableHead>Nomor</TableHead>
                        <TableHead>Terakhir Login</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.length > 0 ? (
                        users.map((user, i) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    {i + 1}.
                                </TableCell>
                                <TableCell>{user.name ?? "-"}</TableCell>
                                <TableCell>{user.role.name ?? "-"}</TableCell>
                                <TableCell>{user.phone ?? "-"}</TableCell>
                                <TableCell>
                                    {user.last_login_at ?? "-"}
                                </TableCell>
                                <TableCell>
                                    {user.is_active ? (
                                        <Badge
                                            variant="success"
                                            className="font-semibold"
                                        >
                                            <CheckCircle2 className="mr-1 size-4" />{" "}
                                            Aktif
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="destructive"
                                            className="font-semibold"
                                        >
                                            <XCircle className="mr-1 size-4" />
                                            Tidak Aktif
                                        </Badge>
                                    )}
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
                                                    <MoreVertical className="size-4" />
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            }
                                        />
                                        <DropdownMenuContent align="end">
                                            {can("user:update") && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        form.openEdit(user)
                                                    }
                                                >
                                                    <SquarePen className="mr-2 size-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                                render={
                                                    <Link
                                                        href={
                                                            "/user/" + user.id
                                                        }
                                                    />
                                                }
                                            >
                                                <FileText className="mr-2 size-4" />
                                                Detail
                                            </DropdownMenuItem>
                                            {can("user:delete") && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            form.openDelete(
                                                                user.id,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="mr-2 size-4" />
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
                                    <Package className="size-8 text-muted-foreground" />
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
