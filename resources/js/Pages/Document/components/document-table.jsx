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
    EllipsisVertical,
    Eye,
    FileText,
    PackageOpen,
    SquarePen,
    Trash2,
} from "lucide-react";

export default function DocumentTable({
    documents,
    modal,
}) {
    const { can } = useCan();

    const actions = [
        {
            enabled: (document) =>
                can("document:review") &&
                document.status === "pending",
            label: "Tinjau",
            icon: <Eye />,
            onClick: (document) =>
                router.get(`/document/${document.id}`),
        },
    ];

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>File</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Diunggah oleh</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.length > 0 ? (
                        documents.map((document, i) => (
                            <TableRow key={document.id}>
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell>
                                    <a
                                        className="text-blue-600 hover:text-blue-700 hover:underline"
                                        href={"storage/" + document.file_path}
                                    >
                                        {document.original_filename}
                                    </a>
                                </TableCell>
                                <TableCell>{document.title}</TableCell>
                                <TableCell>{document.category}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            document.status === "rejected"
                                                ? "destructive"
                                                : document.status === "accepted"
                                                  ? "success"
                                                  : "outline"
                                        }
                                    >
                                        {document.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {document.uploaded_by.name}
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
                                            <DropdownMenuGroup>
                                                <DropdownMenuLabel>
                                                    Action
                                                </DropdownMenuLabel>
                                                {actions.map((action) => {
                                                    return action.enabled(
                                                        document,
                                                    ) ? (
                                                        <DropdownMenuItem
                                                            key={action.label}
                                                            onClick={() =>
                                                                action.onClick(
                                                                    document,
                                                                )
                                                            }
                                                        >
                                                            {action.icon}
                                                            {action.label}
                                                        </DropdownMenuItem>
                                                    ) : null;
                                                })}
                                                <DropdownMenuSeparator />
                                            </DropdownMenuGroup>

                                            {can("document:update") &&
                                                document.status !==
                                                    "completed" && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            modal.openEdit(
                                                                document,
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
                                                            "/document/" +
                                                            document.id
                                                        }
                                                    />
                                                }
                                            >
                                                <FileText /> Detail
                                            </DropdownMenuItem>
                                            {can("document:delete") && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            modal.openDelete(
                                                                document.id,
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
