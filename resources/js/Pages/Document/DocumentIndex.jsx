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

export default function TaskIndex({ data, placements }) {
    const { can } = useCan();
    const [search, setSearch] = useState("");
    const modal = useModal();

    placements = placements?.map((placement) => ({
        value: placement.id,
        label: placement.intern.name + " - " + placement.program.name,
    }));

    const handleDelete = () => {
        router.delete("/task/" + modal.data);
        modal.closeModal();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/task/", { search: search }, { preserveState: true });
    };

    const handleFilter = (filter, key = null) => {
        router.get(
            "/task/",
            { filter: filter, key: key },
            { preserveState: true },
        );
    };

    // const handleChangeStatus = (id, status) => {
    //     router.patch(
    //         "/task/" + id + "/change-status",
    //         { status: status },
    //         {
    //             onError: (e) => {
    //                 console.log(e);
    //                 toast.error("Gagal mengubah status tugas.");
    //             },
    //         },
    //     );
    // };

    const filterStatus = [
        {
            label: "Semua",
            value: "",
        },
        {
            label: "Draft",
            value: "draft",
        },
        {
            label: "Assigned",
            value: "assigned",
        },
        {
            label: "In Progress",
            value: "in_progress",
        },
        {
            label: "Submitted",
            value: "submitted",
        },
        {
            label: "Revision Requested",
            value: "revision_requested",
        },
        {
            label: "Completed",
            value: "completed",
        },
        {
            label: "Cancelled",
            value: "cancelled",
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
                {/* {can("task:delete") && (
                    <DeleteAlert
                        form={modal}
                        title="Hapus data tugas"
                        description="Ini akan menghapus data tugas secara permanen"
                        onDelete={handleDelete}
                    />
                )} */}
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
                                handleFilter={handleFilter}
                                options={filterStatus}
                                keyFilter="status"
                            />
                            {can("task:create") && (
                                <Button onClick={() => modal.openCreate()}>
                                    <Plus /> Tambah
                                </Button>
                            )}
                        </div>
                    }
                />
                <DocumentTable
                    documents={data.data}
                    modal={modal}
                    // handleChangeStatus={handleChangeStatus}
                />
                <ListPagination data={data} />
            </Layout>
        </>
    );
}
