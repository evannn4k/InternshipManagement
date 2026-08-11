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
    FiFileText,
    FiEdit,
    FiTrash2,
} from "react-icons/fi";
import { useCan } from "@/hooks/use-can";

export default function ProgramTable({ programs, form }) {
    const { can } = useCan();

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Tanggal Mulai</TableHead>
                        <TableHead>Tanggal Selesai</TableHead>
                        <TableHead>Dibuat Oleh</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {programs.length > 0 ? (
                        programs.map((program, i) => (
                            <TableRow key={program.id}>
                                <TableCell className="font-medium">
                                    {i + 1}.
                                </TableCell>
                                <TableCell>{program.name}</TableCell>
                                <TableCell>{program.start_date}</TableCell>
                                <TableCell>{program.end_date}</TableCell>
                                <TableCell>{program.user.name}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            program.status == "draft"
                                                ? "outline"
                                                : program.status == "active"
                                                  ? "success"
                                                  : program.status == "inactive"
                                                    ? "destructive"
                                                    : "default"
                                        }
                                    >
                                        {program.status}
                                    </Badge>
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
                                                    <FiMoreVertical />
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            }
                                        />
                                        <DropdownMenuContent align="end">
                                            {can("program:update") && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        form.openEdit(program)
                                                    }
                                                >
                                                    <FiEdit />
                                                    Edit
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                                render={
                                                    <Link
                                                        href={
                                                            "/program/" +
                                                            program.id
                                                        }
                                                    />
                                                }
                                            >
                                                <FiFileText />
                                                Detail
                                            </DropdownMenuItem>
                                            {can("program:delete") && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            form.openDelete(
                                                                program.id,
                                                            )
                                                        }
                                                    >
                                                        <FiTrash2 />
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
