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
import EvaluationForm from "./components/evaluation-form";
import EvaluationTable from "./components/evaluation-table";
import { DeleteAlert } from "@/components/delete-alert";

export default function EvaluationIndex({ data, placements }) {
    const { can } = useCan();
    const [search, setSearch] = useState("");
    const modal = useModal();

    placements = placements?.map((placement) => ({
        value: placement.id,
        label: placement.intern.name + " - " + placement.program.name,
    }));

    const handleDelete = () => {
        router.delete("/evaluation/" + modal.data);
        modal.closeModal();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/evaluation/", { search: search }, { preserveState: true });
    };

    const handleFilter = (filter, key = null) => {
        router.get(
            "/evaluation/",
            { filter: filter, key: key },
            { preserveState: true },
        );
    };

    const filterStatus = [
        {
            label: "Semua",
            value: "",
        },
    ];

    return (
        <>
            <Head>
                <title>Evaluasi</title>
                <meta name="description" content="Mengelola data evaluasi" />
            </Head>
            <Layout header="Evaluasi">
                {(can("evaluation:create") || can("evaluation:update")) && (
                    <EvaluationForm modal={modal} placements={placements} />
                )}
                {can("evaluation:delete") && (
                    <DeleteAlert
                        form={modal}
                        title="Hapus evaluasi"
                        description="Ini akan menghapus evaluasi secara permanen"
                        onDelete={handleDelete}
                    />
                )}
                <PageHeader
                    title="Evaluasi"
                    description="Mengelola data evaluasi"
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
                            {can("evaluation:create") && (
                                <Button onClick={() => modal.openCreate()}>
                                    <Plus /> Tambah
                                </Button>
                            )}
                        </div>
                    }
                />
                <EvaluationTable evaluations={data.data} modal={modal} />
                <ListPagination data={data.meta} links={data.links} />
            </Layout>
        </>
    );
}
