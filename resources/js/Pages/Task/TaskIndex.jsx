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

    const handleFilter = (filter) => {
        router.get("/task/", { filter: filter }, { preserveState: true });
    };

    const handleChangeStatus = (id, status) => {
        router.patch("/task/" + id + "/change-status", { status: status });
    };

    return (
        <>
            <Head>
                <title>Tugas</title>
                <meta name="description" content="Mengelola data tugas" />
            </Head>
            <Layout header="Tugas">
                <TaskForm modal={modal} placements={placements} />
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
                                handleFilter={handleFilter}
                                options={[
                                    { label: "Aktif", value: "aktif" },
                                    {
                                        label: "Tidak Aktif",
                                        value: "tidak-aktif",
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
