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
import { Link } from "@inertiajs/react";
import { useCan } from "@/hooks/use-can";
import {
    EllipsisVertical,
    FileText,
    PackageOpen,
    SquarePen,
    Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EvaluationTable({ evaluations, modal }) {
    const { can } = useCan();

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table className="m-0">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Anak Magang</TableHead>
                        <TableHead>Rata-rata</TableHead>
                        <TableHead>Periode Mulai</TableHead>
                        <TableHead>Periode Selesai</TableHead>
                        <TableHead>Diunggah oleh</TableHead>
                        <TableHead>Dilihat Magang</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {evaluations.length > 0 ? (
                        evaluations.map((evaluation, i) => (
                            <TableRow key={evaluation.id}>
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell>
                                    {evaluation.placement.intern.name}
                                </TableCell>
                                <TableCell>
                                    {evaluation.average_score}
                                </TableCell>
                                <TableCell>
                                    {evaluation.period_start_date}
                                </TableCell>
                                <TableCell>
                                    {evaluation.period_end_date}
                                </TableCell>
                                <TableCell>
                                    {evaluation.evaluator.name}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            evaluation.is_visible_to_intern
                                                ? "success"
                                                : "destructive"
                                        }
                                    >
                                        {evaluation.is_visible_to_intern
                                            ? "Terlihat"
                                            : "Tersembunyi"}
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
                                                    <EllipsisVertical />{" "}
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            }
                                        />
                                        <DropdownMenuContent align="end">
                                            {can("evaluation:update") && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        modal.openEdit(
                                                            evaluation,
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
                                                            "/evaluation/" +
                                                            evaluation.id
                                                        }
                                                    />
                                                }
                                            >
                                                <FileText /> Detail
                                            </DropdownMenuItem>
                                            {can("evaluation:delete") && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            modal.openDelete(
                                                                evaluation.id,
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
