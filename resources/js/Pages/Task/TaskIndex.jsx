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
import TaskTable from "./components/task-table";
import ListPagination from "@/components/app/ListPagination";
import TaskForm from "./components/task-form";
import { toast } from "sonner";
import SubmitForm from "./components/submit-form";
import { DeleteAlert } from "@/components/delete-alert";

export default function TaskIndex({ data, placements }) {
    const { can } = useCan();
    const [search, setSearch] = useState("");
    const modal = useModal();

    placements = placements.map((placement) => ({
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

    const handleChangeStatus = (id, status) => {
        router.patch(
            "/task/" + id + "/change-status",
            { status: status },
            {
                onError: (e) => {
                    console.log(e);
                    toast.error("Gagal mengubah status tugas.");
                },
            },
        );
    };

    return (
        <>
            <Head>
                <title>Tugas</title>
                <meta name="description" content="Mengelola data tugas" />
            </Head>
            <Layout header="Tugas">
                {(can("task:create") || can("task:update")) && (
                    <TaskForm modal={modal} placements={placements} />
                )}
                {can("task:submit") && (
                    <SubmitForm modal={modal} placements={placements} />
                )}
                {can("task:delete") && (
                    <DeleteAlert
                        form={modal}
                        title="Hapus data tugas"
                        description="Ini akan menghapus data tugas secara permanen"
                        onDelete={handleDelete}
                    />
                )}
                <PageHeader
                    title="Tugas"
                    description="Mengelola data tugas"
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
                                name="Prioritas"
                                handleFilter={handleFilter}
                                options={[
                                    {
                                        label: "Semua",
                                        value: "",
                                        key: "status",
                                    },
                                    {
                                        label: "Low",
                                        value: "low",
                                        key: "priority",
                                    },
                                    {
                                        label: "Medium",
                                        value: "medium",
                                        key: "priority",
                                    },
                                    {
                                        label: "High",
                                        value: "high",
                                        key: "priority",
                                    },
                                    {
                                        label: "Urgent",
                                        value: "urgent",
                                        key: "priority",
                                    },
                                ]}
                            />
                            <ListFilter
                                name="Status"
                                handleFilter={handleFilter}
                                options={[
                                    {
                                        label: "Semua",
                                        value: "",
                                        key: "status",
                                    },
                                    {
                                        label: "Draft",
                                        value: "draft",
                                        key: "status",
                                    },
                                    {
                                        label: "Assigned",
                                        value: "assigned",
                                        key: "status",
                                    },
                                    {
                                        label: "In Progress",
                                        value: "in_progress",
                                        key: "status",
                                    },
                                    {
                                        label: "Submitted",
                                        value: "submitted",
                                        key: "status",
                                    },
                                    {
                                        label: "Revision Requested",
                                        value: "revision_requested",
                                        key: "status",
                                    },
                                    {
                                        label: "Completed",
                                        value: "completed",
                                        key: "status",
                                    },
                                    {
                                        label: "Cancelled",
                                        value: "cancelled",
                                        key: "status",
                                    },
                                ]}
                            />
                            {can("task:create") && (
                                <Button onClick={() => modal.openCreate()}>
                                    <Plus /> Tambah
                                </Button>
                            )}
                        </div>
                    }
                />
                <TaskTable
                    tasks={data.data}
                    modal={modal}
                    handleChangeStatus={handleChangeStatus}
                />
                <ListPagination data={data} />
            </Layout>
        </>
    );
}
