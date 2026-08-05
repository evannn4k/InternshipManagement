import Layout from "@/layouts/layout";
import {
    faChevronLeft,
    faChevronRight,
    faMagnifyingGlass,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import useFormModal from "@/hooks/use-form-modal";
import { DeleteAlert } from "@/components/delete-alert";
import { Link, router, Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";

export default function SchoolIndex({ data }) {
    const [search, setSearch] = useState("");
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const form = useFormModal();

    const handleDelete = () => {
        router.delete("/school/" + form.data);
        form.closeDelete();
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
                    form={form}
                    title="Hapus data sekolah"
                    description="Ini akan menghapus data sekolah secara permanen"
                    onDelete={handleDelete}
                />
                <SchoolForm form={form} />
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
                                <Button
                                    type="submit"
                                    variant="ghost"
                                    className="px-2 cursor-pointer"
                                    nativeButton={false}
                                    render={
                                        <InputGroupAddon align="end">
                                            <FontAwesomeIcon
                                                icon={faMagnifyingGlass}
                                            />
                                        </InputGroupAddon>
                                    }
                                />
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
                            <Button onClick={() => form.openCreate()}>
                                <FontAwesomeIcon icon={faPlus} />
                                Tambah
                            </Button>
                        </div>
                    </div>
                    <SchoolTable schools={data.data} form={form} />
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
                                            nativeButton={false}
                                            variant="ghost"
                                            className="no-underline px-3 font-medium"
                                            render={
                                                <Link href={data.prev_page_url}>
                                                    <FontAwesomeIcon
                                                        size="sm"
                                                        icon={faChevronLeft}
                                                    />
                                                    Sebelumnya
                                                </Link>
                                            }
                                        />
                                    </PaginationItem>
                                )}
                                {data.links.slice(1, -1).map((link) => (
                                    <PaginationItem key={link.page}>
                                        <Button
                                            nativeButton={false}
                                            variant={
                                                link.active
                                                    ? "secondary"
                                                    : "ghost"
                                            }
                                            className="no-underline px-3 font-medium"
                                            render={
                                                <Link href={link.url}>
                                                    {link.label}
                                                </Link>
                                            }
                                        />
                                    </PaginationItem>
                                ))}
                                {data.next_page_url && (
                                    <PaginationItem>
                                        <Button
                                            variant="ghost"
                                            className="no-underline px-3 font-medium"
                                            nativeButton={false}
                                            render={
                                                <Link href={data.next_page_url}>
                                                    Selanjutnya
                                                    <FontAwesomeIcon
                                                        size="sm"
                                                        icon={faChevronRight}
                                                    />
                                                </Link>
                                            }
                                        />
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
