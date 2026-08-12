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
import {
    FiMoreVertical,
    FiPackage,
    FiFileText,
    FiEdit,
    FiTrash2,
} from "react-icons/fi";
import { useCan } from "@/hooks/use-can";
import { CircleCheck, LogOut } from "lucide-react";

export default function PlacementTable({ placements, form }) {
    const { can } = useCan();

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Sekolah</TableHead>
                        <TableHead>Mentor</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {placements.length > 0 ? (
                        placements.map((placement, i) => (
                            <TableRow key={placement.id}>
                                <TableCell className="font-medium">
                                    {i + 1}.
                                </TableCell>
                                <TableCell>{placement.intern.name}</TableCell>
                                <TableCell>
                                    {placement.intern.school.name}
                                </TableCell>
                                <TableCell>{placement.mentor.name}</TableCell>
                                <TableCell>{placement.program.name}</TableCell>
                                <TableCell>{placement.status}</TableCell>
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
                                            {can("placement:update") && (
                                                <>
                                                    <DropdownMenuItem>
                                                        <CircleCheck />
                                                        Complete
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            form.openModal(
                                                                "terminate",
                                                                {
                                                                    id: placement.id,
                                                                },
                                                            )
                                                        }
                                                    >
                                                        <LogOut /> Terminate
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                </>
                                            )}
                                            {can("placement:update") && (
                                                <>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            form.openEdit(
                                                                placement,
                                                            )
                                                        }
                                                    >
                                                        <FiEdit />
                                                        Edit
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            <DropdownMenuItem
                                                render={
                                                    <Link
                                                        href={
                                                            "/placement/" +
                                                            placement.id
                                                        }
                                                    />
                                                }
                                            >
                                                <FiFileText />
                                                Detail
                                            </DropdownMenuItem>
                                            {can("placement:delete") && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            form.openDelete(
                                                                placement.id,
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
