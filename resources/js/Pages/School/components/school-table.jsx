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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faCircleCheck,
    faCircleInfo,
    faCircleXmark,
    faEllipsisVertical,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";

export default function SchoolTable({ schools, form }) {
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
                                        <Badge variant="success" className="font-semibold">
                                            <FontAwesomeIcon
                                                className="text-green-600"
                                                icon={faCircleCheck}
                                            />
                                            Aktif
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive" className="font-semibold">
                                            <FontAwesomeIcon
                                                className="text-red-600"
                                                icon={faCircleXmark}
                                            />
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
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faEllipsisVertical
                                                        }
                                                    />
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            }
                                        />
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    form.openEdit(school)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}
                                                />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                render={
                                                    <Link
                                                        href={
                                                            "school/" +
                                                            school.id
                                                        }
                                                    />
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCircleInfo}
                                                />
                                                Detail
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                variant="destructive"
                                                onClick={() =>
                                                    form.openDelete(school.id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="p-8">
                                <div className="flex items-center flex-col gap-2">
                                    <FontAwesomeIcon
                                        icon={faBoxOpen}
                                        size="xl"
                                    />
                                    Tidak ada data
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
