import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Plus, Save, ScrollText } from "lucide-react";
import { useCan } from "@/hooks/use-can";
import { useModal } from "@/hooks/use-modal";
import ListSearch from "@/components/app/ListSearch";
import ListFilter from "@/components/app/ListFilter";
import ListPagination from "@/components/app/ListPagination";
import AttendanceTable from "./components/attendance-table";
// import AttendanceForm from "./components/attendance-form";
import { DeleteAlert } from "@/components/delete-alert";
import AlertModal from "@/components/app/AlertModal";
import FormSection from "@/components/app/FormSection";
import FormField from "@/components/app/FormField";
import { Spinner } from "@/components/ui/spinner";

export default function AttendanceIndex({ data }) {
    const { can } = useCan();
    const [search, setSearch] = useState("");
    const modal = useModal();
    const internNotesForm = useForm({ intern_notes: "" })

    const handleDelete = () => {
        router.delete("/attendance/" + modal.data);
        modal.closeModal();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/attendance/", { search: search }, { preserveState: true });
    };

    const handleFilter = (filter, key = null) => {
        router.get(
            "/attendance/",
            { filter: filter, key: key },
            { preserveState: true },
        );
    };

    const handleCheckIn = () => {
        internNotesForm.post("/attendance/check-in", {
            onSuccess: () => {
                modal.closeModal();
                internNotesForm.reset();
            },
        });
    };

    const filterPriority = [
        {
            label: "Semua",
            value: "",
            key: "priority",
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
    ];

    const handleChangeInternNotes = (e) => {
        internNotesForm.setData({ intern_notes: e.target.value })
    };

    return (
        <>
            <Head>
                <title>Absensi</title>
                <meta name="description" content="Mengelola data absensi" />
            </Head>
            <Layout header="Absensi">
                {can("attendance:check-in") && (
                    <AlertModal
                        modal={modal}
                        nameModal="check-in"
                        icon={<ScrollText />}
                        title="Check In"
                        name="check-in"
                        description="Masukkan data absensi Anda"
                        action={handleCheckIn}
                        disabled={internNotesForm.processing}
                        actionLabel={
                            <>
                                {internNotesForm.processing && <Spinner />}
                                Check In
                            </>
                        }
                        addon={
                            <form>
                                <FormSection>
                                    <FormField
                                        label="Catatan"
                                        name="intern_notes"
                                        error={internNotesForm.errors.intern_notes}
                                        value={internNotesForm.data.intern_notes}
                                        type="textarea"
                                        onChange={handleChangeInternNotes}
                                    />
                                </FormSection>
                            </form>
                        }
                    />
                )}
                {can("attendance:delete") && (
                    <DeleteAlert
                        form={modal}
                        title="Hapus data absensi"
                        description="Ini akan menghapus data absensi secara permanen"
                        onDelete={handleDelete}
                    />
                )}
                <PageHeader
                    title="Absensi"
                    description="Mengelola data absensi"
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
                                options={filterPriority}
                            />
                            {can("attendance:check-in") && (
                                <Button
                                    onClick={() => modal.openModal("check-in")}
                                >
                                    <Plus /> Check In
                                </Button>
                            )}
                        </div>
                    }
                />
                <AttendanceTable attendances={data.data} modal={modal} />
                <ListPagination data={data} />
            </Layout>
        </>
    );
}
