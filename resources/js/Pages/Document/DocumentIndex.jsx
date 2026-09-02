import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useCan } from "@/hooks/use-can";
import { useModal } from "@/hooks/use-modal";
import ListSearch from "@/components/app/ListSearch";
import ListFilter from "@/components/app/ListFilter";
import ListPagination from "@/components/app/ListPagination";
import DocumentForm from "./components/document-form";
import DocumentTable from "./components/document-table";
import { DeleteAlert } from "@/components/delete-alert";

export default function DocumentIndex({ data, placements }) {
    const { can } = useCan();
    const [search, setSearch] = useState("");
    const modal = useModal();

    placements = placements?.map((placement) => ({
        value: placement.id,
        label: placement.intern.name + " - " + placement.program.name,
    }));

    const handleDelete = () => {
        router.delete("/document/" + modal.data);
        modal.closeModal();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/document/", { search: search }, { preserveState: true });
    };

    const handleFilter = (filter, key = null) => {
        router.get(
            "/document/",
            { filter: filter, key: key },
            { preserveState: true },
        );
    };

    const filterStatus = [
        {
            label: "Semua",
            value: "",
        },
        {
            label: "Pending",
            value: "pending",
        },
        {
            label: "Accepted",
            value: "accepted",
        },
        {
            label: "Rejected",
            value: "rejected",
        },
    ];

    return (
        <>
            <Head>
                <title>Dokumen</title>
                <meta name="description" content="Mengelola data dokumen" />
            </Head>
            <Layout header="Dokumen">
                {(can("document:create") || can("document:update")) && (
                    <DocumentForm modal={modal} placements={placements} />
                )}
                {can("document:delete") && (
                    <DeleteAlert
                        form={modal}
                        title="Hapus dokumen"
                        description="Ini akan menghapus dokumen secara permanen"
                        onDelete={handleDelete}
                    />
                )}
                <PageHeader
                    title="Dokumen"
                    description="Mengelola data dokumen"
                    leftActions={
                        <ListSearch
                            handleSearch={handleSearch}
                            search={search}
                            setSearch={setSearch}
                        />
                    }
                    rightActions={
                        <div className="flex gap-2 items-center">
                            <ListFilter
                                name="Status"
                                variant="success"
                                handleFilter={handleFilter}
                                options={filterStatus}
                                keyFilter="status"
                            />
                            {can("document:create") && (
                                <Button
                                    variant="success"
                                    onClick={() => modal.openCreate()}
                                >
                                    <Plus /> Tambah
                                </Button>
                            )}
                        </div>
                    }
                />
                <DocumentTable documents={data.data} modal={modal} />
                <ListPagination data={data} />
            </Layout>
        </>
    );
}
