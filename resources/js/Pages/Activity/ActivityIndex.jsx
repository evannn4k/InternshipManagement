import PageHeader from "@/components/app/PageHeader";
import Layout from "@/layouts/layout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import ListSearch from "@/components/app/ListSearch";
import ListFilter from "@/components/app/ListFilter";
import ListPagination from "@/components/app/ListPagination";
import ActivityTable from "./components/activity-table";

export default function ActivityIndex({ data }) {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/activity/", { search: search }, { preserveState: true });
    };

    const handleFilter = (filter, key = null) => {
        router.get(
            "/activity/",
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
            label: "Present",
            value: "present",
        },
        {
            label: "Absent",
            value: "absent",
        },
        {
            label: "Late",
            value: "late",
        },
        {
            label: "Sick",
            value: "sick",
        },
        {
            label: "Permitted",
            value: "permitted",
        },
    ];

    return (
        <>
            <Head>
                <title>Log Aktivitas</title>
                <meta name="description" content="Mengelola data aktivitas" />
            </Head>
            <Layout header="Log Aktivitas">
                <PageHeader
                    title="Log Aktivitas"
                    description="Mengelola data aktivitas"
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
                        </div>
                    }
                />
                <ActivityTable activities={data.data} />
                <ListPagination data={data} />
            </Layout>
        </>
    );
}
