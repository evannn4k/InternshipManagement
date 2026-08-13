import Layout from "@/layouts/layout";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SchoolTable from "./components/school-table";
import SchoolForm from "./components/school-form";
import { useModal } from "@/hooks/use-modal";
import { DeleteAlert } from "@/components/delete-alert";
import { Link, router, Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { useCan } from "@/hooks/use-can";

export default function SchoolIndex({ data }) {
    const [search, setSearch] = useState("");
    const { can } = useCan();

    const modal = useModal();

    const handleDelete = () => {
        router.delete("/school/" + modal.data);
        modal.closeModal();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/school/", { search: search }, { preserveState: true });
    };

    const handleFilter = (filter) => {
        router.get("/school/", { filter: filter }, { preserveState: true });
    };

    return (
        <>
            <Head>
                <title>Sekolah</title>
                <meta name="description" content="Mengelola data sekolah" />
            </Head>
            <Layout header="Sekolah">
                <DeleteAlert
                    form={modal}
                    title="Hapus data sekolah"
                    description="Ini akan menghapus data sekolah secara permanen"
                    onDelete={handleDelete}
                />
                <SchoolForm form={modal} />
                <div className="typeset typeset-docs flex flex-col gap-4">
                    <div className="">
                        <h1>Sekolah</h1>
                        <p className="m-0">Mengelola data sekolah</p>
                    </div>
                    <div className="flex justify-between gap-2">
                        <form onSubmit={handleSearch}>
                            <InputGroup className="max-w-xs">
                                <InputGroupInput
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <InputGroupAddon align="end">
                                    <Button
                                        type="submit"
                                        variant="ghost"
                                        className="px-2 cursor-pointer"
                                    >
                                        <Search />
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </form>
                        <div className="flex gap-2 items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={<Button variant="outline" />}
                                >
                                    Filter
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>
                                            Filter
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleFilter("aktif")
                                            }
                                        >
                                            Aktif
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleFilter("tidak-aktif")
                                            }
                                        >
                                            Tidak Aktif
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {can("school:create") && (
                                <Button onClick={() => modal.openCreate()}>
                                    <Plus /> Tambah
                                </Button>
                            )}
                        </div>
                    </div>
                    <SchoolTable schools={data.data} form={modal} />
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="">
                            <p>
                                Menampilkan {data.from} hingga {data.to} dari{" "}
                                {data.total} hasil
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
                                            variant={
                                                link.active
                                                    ? "secondary"
                                                    : "ghost"
                                            }
                                            className="px-3 font-medium"
                                        >
                                            <Link
                                                href={link.url}
                                                className="no-underline"
                                            >
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
                </div>
            </Layout>
        </>
    );
}
