import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import Layout from "@/layouts/layout";
import { formatDate } from "@/lib/format-date";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useCan } from "@/hooks/use-can";
import DetailData from "./../../components/app/DetailData";

export default function AttendanceShow({ attendance }) {
    const { can } = useCan();

    const attendanceInformation = [
        {
            name: "Nama peserta magang",
            value: attendance.placement.intern.name,
        },
        {
            name: "Nama mentor",
            value: attendance.placement.mentor.name,
        },
        {
            name: "Nama program",
            value: attendance.placement.program.name,
        },
        {
            name: "Status",
            value: attendance.status,
        },
        {
            name: "Catatan peserta magang",
            value: attendance.intern_notes,
        },
        {
            name: "Catatan mentor",
            value: attendance.mentor_notes,
        },
        {
            name: "Dikoreksi oleh",
            value: attendance.corrected_by?.name,
        },
        {
            name: "Alasan koreksi",
            value: attendance.corrected_reason,
        },
    ];

    const attendanceTimeDetail = [
        {
            name: "Telat (menit)",
            value: attendance.late_minutes + " menit",
        },
        {
            name: "Masuk pada",
            value: attendance.check_in_at,
        },
        {
            name: "Keluar pada",
            value: attendance.check_out_at,
        },
    ];

    return (
        <>
            <Head>
                <title>Detail absensi</title>
                <meta name="description" content="Halaman detail absensi" />
            </Head>
            <Layout header="Detail Absensi">
                <PageHeader
                    title={attendance.placement.intern.name ?? "-"}
                    description={attendance.placement.program.name ?? "-"}
                    leftActions={
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft /> Kembali
                        </Button>
                    }
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <Card className="flex flex-col gap-4 col-span-1 md:col-span-2">
                        <CardHeader>
                            <h2 className="m-0">Informasi Absensi</h2>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground grid md:grid-cols-2 grid-cols-1 gap-4">
                            {attendanceInformation.map((data, i) => (
                                <DetailData key={i} {...data} />
                            ))}
                        </CardContent>
                        <CardContent>
                            <Separator />
                        </CardContent>
                        <CardHeader>
                            <h2 className="m-0">Informasi Data</h2>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground grid md:grid-cols-2 grid-cols-1 gap-4">
                            <div className="flex flex-col gap-1">
                                <CardDescription>Dibuat</CardDescription>
                                <CardTitle className="text-neutral-700">
                                    {formatDate(attendance.created_at)}
                                </CardTitle>
                            </div>
                            <div className="flex flex-col gap-1">
                                <CardDescription>
                                    Terakhir diedit
                                </CardDescription>
                                <CardTitle className="text-neutral-700">
                                    {formatDate(attendance.updated_at)}
                                </CardTitle>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="col-span-1">
                        <Card className="bg-white">
                            <CardHeader>
                                <h2 className="m-0">Detail Waktu</h2>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                {attendanceTimeDetail.map((data, i) => (
                                    <DetailData key={i} {...data} />
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Layout>
        </>
    );
}
