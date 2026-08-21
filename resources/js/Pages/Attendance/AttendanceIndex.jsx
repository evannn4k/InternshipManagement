import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { LogOut, Plus, Save, ScrollText } from "lucide-react";
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
import AttendanceForm from "./components/attendance-form";

export default function AttendanceIndex({ data, placements }) {
    const { can } = useCan();
    const [search, setSearch] = useState("");
    const modal = useModal();
    const internNotesForm = useForm({ intern_notes: "" });

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

    const handleCheckOut = () => {
        internNotesForm.put("/attendance/" + modal.data.id + "/check-out", {
            onSuccess: () => {
                modal.closeModal();
                internNotesForm.reset();
            },
        });
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

    const handleChangeInternNotes = (e) => {
        internNotesForm.setData({ intern_notes: e.target.value });
    };

    return (
        <>
            <Head>
                <title>Log Absensi</title>
                <meta name="description" content="Mengelola data absensi" />
            </Head>
            <Layout header="Log Absensi">
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
                                        error={
                                            internNotesForm.errors.intern_notes
                                        }
                                        value={
                                            internNotesForm.data.intern_notes
                                        }
                                        type="textarea"
                                        onChange={handleChangeInternNotes}
                                    />
                                </FormSection>
                            </form>
                        }
                    />
                )}
                {can("attendance:check-out") && (
                    <AlertModal
                        modal={modal}
                        nameModal="check-out"
                        icon={<LogOut />}
                        title="Check Out"
                        name="check-out"
                        description="Tandai selesai"
                        action={handleCheckOut}
                        disabled={internNotesForm.processing}
                        actionLabel={
                            <>
                                {internNotesForm.processing && <Spinner />}
                                Check Out
                            </>
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
                {(can("attendance:create") || can("attendance:update")) && (
                    <AttendanceForm modal={modal} placements={placements} />
                )}
                <PageHeader
                    title="Log Absensi"
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
                                options={filterStatus}
                                keyFilter="status"
                            />
                            {can("attendance:check-in") && (
                                <Button
                                    onClick={() => modal.openModal("check-in")}
                                >
                                    <Plus /> Check In
                                </Button>
                            )}
                            {can("attendance:create") && (
                                <Button
                                    onClick={() => modal.openCreate()}
                                >
                                    <Plus /> Tambah
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
