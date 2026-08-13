import { Link } from "@inertiajs/react";
import { Pagination, PaginationContent, PaginationItem } from "../ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function ListPagination({data}) {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="">
                <p>
                    Menampilkan {data.from} hingga {data.to} dari {data.total}{" "}
                    hasil
                </p>
            </div>
            <Pagination>
                <PaginationContent className="list-none m-0">
                    {data.prev_page_url && (
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                className="no-underline px-3 font-medium"
                            >
                                <Link
                                    href={data.prev_page_url}
                                    className="no-underline flex items-center gap-1"
                                >
                                    <ChevronLeft />
                                    Sebelumnya
                                </Link>
                            </Button>
                        </PaginationItem>
                    )}
                    {data.links.slice(1, -1).map((link) => (
                        <PaginationItem key={link.page}>
                            <Button
                                variant={link.active ? "secondary" : "ghost"}
                                className="px-3 font-medium"
                            >
                                <Link href={link.url} className="no-underline">
                                    {link.label}
                                </Link>
                            </Button>
                        </PaginationItem>
                    ))}
                    {data.next_page_url && (
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                className="no-underline px-3 font-medium"
                            >
                                <Link
                                    href={data.next_page_url}
                                    className="no-underline flex items-center gap-1"
                                >
                                    Selanjutnya
                                    <ChevronRight />
                                </Link>
                            </Button>
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
