import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CircleCheck, FileCheck, FileX } from "lucide-react";
import { useCan } from "@/hooks/use-can";
import { useModal } from "@/hooks/use-modal";
// import ReviewForm from "./components/review-form";

export default function WeeklyReportShow({ weeklyReport:report }) {
    const { can } = useCan();
    const modal = useModal();

    console.log(report)

    return (
        <>
            <Head>
                <title>Laporan Mingguan</title>
                <meta name="description" content="Mengelola data laporan mingguan" />
            </Head>
            <Layout header="Laporan Mingguan">
                {/* {can("weekly_report:review") &&
                    (report.status === "revision_requested" ||
                        report.status === "submitted") && (
                        <ReviewForm modal={modal} />
                    )} */}
                <PageHeader
                    title={`Laporan Minggu (${report.week_start_date ? formatDate(report.week_start_date) : "-"} - ${report.week_end_date ? formatDate(report.week_end_date) : "-"})`}
                    titleAddOn={
                        <Badge
                            variant={
                                report.status === "submitted"
                                    ? "primary"
                                    : report.status === "approved"
                                      ? "success"
                                      : report.status === "revision_requested"
                                        ? "destructive"
                                        : "outline"
                            }
                        >
                            {report.status === "approved" ? (
                                <CircleCheck />
                            ) : report.status === "revision_requested" ? (
                                <FileX />
                            ) : null}
                            {report.status}
                        </Badge>
                    }
                    description={`Laporan mingguan oleh ${report.placement?.intern?.name ?? "-"}`}
                    leftActions={
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft /> Kembali
                        </Button>
                    }
                    rightActions={
                        can("weekly_report:review") &&
                        report.status === "submitted" && (
                            <div className="flex gap-2 items-center">
                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        modal.openModal("revision", report)
                                    }
                                >
                                    <FileX /> Revisi
                                </Button>
                                <Button
                                    onClick={() =>
                                        modal.openModal("approved", report)
                                    }
                                >
                                    <FileCheck /> Setujui
                                </Button>
                            </div>
                        )
                    }
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <Tabs
                        defaultValue="informasi"
                        className="col-span-1 md:col-span-2"
                    >
                        <TabsList>
                            <TabsTrigger value="informasi">
                                Informasi Laporan
                            </TabsTrigger>
                            <TabsTrigger value="detail">
                                Detail Kegiatan
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="informasi">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">Informasi Laporan</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>Nama</CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {report.placement?.intern?.name ??
                                                "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Mentor Reviewer
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {report.reviewer?.name ??
                                                report.placement?.mentor?.name ??
                                                "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Tanggal Mulai Minggu
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {report.week_start_date
                                                ? formatDate(report.week_start_date)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Tanggal Selesai Minggu
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {report.week_end_date
                                                ? formatDate(report.week_end_date)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Status Pengumpulan
                                        </CardDescription>
                                        <Badge
                                            variant={
                                                report.status === "submitted" ||
                                                report.status === "approved"
                                                    ? "success"
                                                    : report.status === "draft"
                                                      ? "secondary"
                                                      : "outline"
                                            }
                                        >
                                            {report.status === "submitted" ||
                                            report.status === "approved"
                                                ? "Sudah Disubmit"
                                                : report.status === "draft"
                                                  ? "Draft"
                                                  : "Belum Disubmit"}
                                        </Badge>
                                    </div>
                                </CardContent>
                                <CardContent>
                                    <Separator />
                                </CardContent>
                                <CardHeader>
                                    <h2 className="m-0">Informasi Data</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Dibuat
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {formatDate(report.created_at)}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Terakhir diedit
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {formatDate(report.updated_at)}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="detail">
                            <Card>
                                <CardHeader>
                                    <h2 className="m-0">Detail Kegiatan</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Pekerjaan Selesai
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {report.completed_work ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Tantangan / Kendala
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {report.challenges ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Solusi
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {report.solutions ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Pelajaran yang Dipelajari
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {report.lessons_learned ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Rencana Minggu Depan
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {report.next_week_plan ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Dukungan yang Dibutuhkan
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {report.support_needed ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent>
                                    <Separator />
                                </CardContent>
                                <CardHeader>
                                    <h2 className="m-0">Detail Review</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Ditinjau Pada
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {report.reviewed_at
                                                ? formatDate(report.reviewed_at)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                                        <CardDescription>
                                            Umpan Balik Mentor (Feedback)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {report.mentor_feedback ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    <div className="col-span-1 md:pt-[40px]">
                        <Card className="bg-white">
                            <CardHeader>
                                <h2 className="m-0">Detail Waktu</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Awal Minggu
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {report.week_start_date
                                                    ? formatDate(
                                                          report.week_start_date,
                                                      )
                                                    : "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Akhir Minggu
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {report.week_end_date
                                                    ? formatDate(
                                                          report.week_end_date,
                                                      )
                                                    : "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Dikumpulkan
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {report.submitted_at
                                                    ? formatDate(
                                                          report.submitted_at,
                                                      )
                                                    : "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Ditinjau Pada
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {report.reviewed_at
                                                    ? formatDate(
                                                          report.reviewed_at,
                                                      )
                                                    : "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Layout>
        </>
    );
}