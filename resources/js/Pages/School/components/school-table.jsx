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
} from "react-icons/fi";
import { useCan } from "@/hooks/use-can";
import { EllipsisVertical, FileText, SquarePen, Trash2 } from "lucide-react";

export default function SchoolTable({ schools, form }) {
    const { can } = useCan();

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>NPSN</TableHead>
                        <TableHead>Kota/Kabupaten</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {schools.length > 0 ? (
                        schools.map((school, i) => (
                            <TableRow key={school.id}>
                                <TableCell className="font-medium">
                                    {i + 1}.
                                </TableCell>
                                <TableCell>{school.name}</TableCell>
                                <TableCell>{school.npsn ?? "-"}</TableCell>
                                <TableCell>{school.city ?? "-"}</TableCell>
                                <TableCell>
                                    {school.is_active ? (
                                        <Badge
                                            variant="success"
                                            className="font-semibold"
                                        >
                                            <FiCheckCircle /> Aktif
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="destructive"
                                            className="font-semibold"
                                        >
                                            <FiXCircle />
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
                                                    <EllipsisVertical />
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            }
                                        />
                                        <DropdownMenuContent align="end">
                                            {can("school:update") && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        form.openEdit(school)
                                                    }
                                                >
                                                    <SquarePen />                                                  Edit
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                                render={
                                                    <Link
                                                        href={
                                                            "/school/" +
                                                            school.id
                                                        }
                                                    />
                                                }
                                            >
                                                <FileText />  
                                                Detail
                                            </DropdownMenuItem>
                                            {can("school:delete") && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            form.openDelete(
                                                                school.id,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 />
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
