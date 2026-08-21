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
import WeeklyReportTable from "./components/weekly-report-table";
import WeeklyReportForm from "./components/weekly-report-form";

export default function WeeklyReportIndex({ data, defaultDates }) {
    const { can } = useCan();
    const [search, setSearch] = useState("");
    const modal = useModal();

    const handleDelete = () => {
        router.delete("/weekly-report/" + modal.data);
        modal.closeModal();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/weekly-report/",
            { search: search },
            { preserveState: true },
        );
    };

    const handleFilter = (filter, key = null) => {
        router.get(
            "/weekly-report/",
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
            label: "Draft",
            value: "draft",
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
            label: "Approved",
            value: "approved",
        },
    ];

    return (
        <>
            <Head>
                <title>Lapotan Mingguan</title>
                <meta
                    name="description"
                    content="Mengelola data laporan mingguan"
                />
            </Head>
            <Layout header="Lapotan Mingguan">
                {(can("weekly-report:create") ||
                    can("weekly-report:update")) && (
                    <WeeklyReportForm
                        modal={modal}
                        defaultDates={defaultDates}
                    />
                )}
                <PageHeader
                    title="Lapotan Mingguan"
                    description="Mengelola data laporan mingguan"
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
                            {can("weekly-report:create") && (
                                <Button onClick={() => modal.openCreate()}>
                                    <Plus /> Tambah
                                </Button>
                            )}
                        </div>
                    }
                />
                <WeeklyReportTable weeklyReports={data.data} modal={modal} />
                <ListPagination data={data} />
            </Layout>
        </>
    );
}
