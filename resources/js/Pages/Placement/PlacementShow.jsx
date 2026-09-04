import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Head, Link, router } from "@inertiajs/react";
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
import { Progress } from "@/components/ui/progress";
import {
    ArrowLeft,
    Award,
    Calendar,
    CheckCircle,
    CheckCircle2,
    Clock,
    FileText,
    FolderCheck,
    User,
    UserCheck,
    XCircle,
    AlertCircle,
} from "lucide-react";

export default function PlacementShow({ placement, attendance }) {
    const attendanceSummary = placement.attendance_summary ?? {
        total_days: attendance.efective_days,
        present: attendance.present,
        permission: attendance.sickAndPermitted,
        absent: attendance.absent,
        percentage: attendance.attendance_percentage,
    };

    const tasksSummary = placement.tasks_summary ?? {
        total_tasks: 10,
        completed: 8,
        in_progress: 1,
        pending: 1,
        completion_rate: 80,
    };

    console.log(attendance);

    const handleDownload = (path) => {
        window.location.href = `/download?path=${path}`;
    };

    return (
        <>
            <Head>
                <title>Penempatan Intern</title>
                <meta
                    name="description"
                    content="Mengelola data penempatan intern"
                />
            </Head>
            <Layout header="Penempatan">
                <PageHeader
                    title={`Penempatan: ${placement.position_title ?? "Internship"}`}
                    titleAddOn={
                        <Badge
                            variant={
                                placement.status === "active"
                                    ? "success"
                                    : placement.status === "completed"
                                      ? "outline"
                                      : placement.status === "terminated"
                                        ? "destructive"
                                        : "secondary"
                            }
                        >
                            {placement.status === "active" ? (
                                <CheckCircle />
                            ) : placement.status === "completed" ? (
                                <UserCheck />
                            ) : placement.status === "terminated" ? (
                                <XCircle />
                            ) : (
                                <Clock />
                            )}
                            {placement.status}
                        </Badge>
                    }
                    description={`Periode: ${
                        placement.start_date
                            ? formatDate(placement.start_date)
                            : "-"
                    } - ${
                        placement.end_date
                            ? formatDate(placement.end_date)
                            : "-"
                    }`}
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
                    <Tabs
                        defaultValue="ringkasan"
                        className="col-span-1 md:col-span-2"
                    >
                        <TabsList className="flex flex-wrap gap-1 h-auto p-1">
                            <TabsTrigger value="ringkasan">
                                Ringkasan
                            </TabsTrigger>
                            <TabsTrigger value="presensi">
                                Presensi & Tugas
                            </TabsTrigger>
                            <TabsTrigger value="laporan">
                                Laporan & Evaluasi
                            </TabsTrigger>
                            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
                        </TabsList>

                        {/* TAB 1: RINGKASAN */}
                        <TabsContent value="ringkasan">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">
                                        Informasi Pihak Terkait
                                    </h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Peserta Magang (Intern)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 flex items-center gap-1.5">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {placement.intern?.name ??
                                                "Intern Dummy"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Program Magang
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            {placement.program?.name ??
                                                "Program Dummy"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Pembimbing (Mentor)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 flex items-center gap-1.5">
                                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                                            {placement.mentor?.name ??
                                                "Mentor Dummy"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent>
                                    <Separator />
                                </CardContent>
                                <CardHeader>
                                    <h2 className="m-0">
                                        Tujuan & Informasi Penempatan
                                    </h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Posisi / Jabatan
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {placement.position_title ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Status Penempatan
                                        </CardDescription>
                                        <Badge
                                            className="w-fit"
                                            variant={
                                                placement.status === "active"
                                                    ? "success"
                                                    : placement.status ===
                                                        "completed"
                                                      ? "outline"
                                                      : placement.status ===
                                                          "terminated"
                                                        ? "destructive"
                                                        : "secondary"
                                            }
                                        >
                                            {placement.status}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Tujuan Penempatan (Objective)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line font-normal">
                                            {placement.objective ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                {placement.termination_date && (
                                    <>
                                        <CardContent>
                                            <Separator />
                                        </CardContent>
                                        <CardHeader>
                                            <h2 className="m-0 text-destructive">
                                                Informasi Penghentian
                                                (Termination)
                                            </h2>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <CardDescription>
                                                    Tanggal Penghentian
                                                </CardDescription>
                                                <CardTitle className="text-neutral-700">
                                                    {formatDate(
                                                        placement.termination_date,
                                                    )}
                                                </CardTitle>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <CardDescription>
                                                    Alasan Penghentian
                                                </CardDescription>
                                                <CardTitle className="text-neutral-700 whitespace-pre-line font-normal">
                                                    {placement.termination_reason ??
                                                        "-"}
                                                </CardTitle>
                                            </div>
                                        </CardContent>
                                    </>
                                )}
                            </Card>
                        </TabsContent>

                        {/* TAB 2: PRESENSI & TUGAS */}
                        <TabsContent value="presensi">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">Ringkasan Kehadiran</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <CardDescription>
                                            Tingkat Kehadiran
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {attendanceSummary.percentage}%
                                        </CardTitle>
                                    </div>
                                    <Progress
                                        value={attendanceSummary.percentage}
                                        className="h-2"
                                    />
                                    <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                                        <div className="bg-neutral-50 p-2 rounded border">
                                            <CardDescription>
                                                Hadir
                                            </CardDescription>
                                            <CardTitle className="text-neutral-700">
                                                {attendanceSummary.present} Hari
                                            </CardTitle>
                                        </div>
                                        <div className="bg-neutral-50 p-2 rounded border">
                                            <CardDescription>
                                                Izin/Sakit
                                            </CardDescription>
                                            <CardTitle className="text-neutral-700">
                                                {attendanceSummary.permission}{" "}
                                                Hari
                                            </CardTitle>
                                        </div>
                                        <div className="bg-neutral-50 p-2 rounded border">
                                            <CardDescription>
                                                Alpa
                                            </CardDescription>
                                            <CardTitle className="text-neutral-700">
                                                {attendanceSummary.absent} Hari
                                            </CardTitle>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardContent>
                                    <Separator />
                                </CardContent>
                                <CardHeader>
                                    <h2 className="m-0">Statistik Tugas</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <CardDescription>
                                            Penyelesaian Tugas
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {tasksSummary.completion_rate}%
                                        </CardTitle>
                                    </div>
                                    <Progress
                                        value={tasksSummary.completion_rate}
                                        className="h-2"
                                    />
                                    <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                                        <div className="bg-neutral-50 p-2 rounded border">
                                            <CardDescription>
                                                Selesai
                                            </CardDescription>
                                            <CardTitle className="text-neutral-700">
                                                {tasksSummary.completed}
                                            </CardTitle>
                                        </div>
                                        <div className="bg-neutral-50 p-2 rounded border">
                                            <CardDescription>
                                                Sedang Dikerjakan
                                            </CardDescription>
                                            <CardTitle className="text-neutral-700">
                                                {tasksSummary.in_progress}
                                            </CardTitle>
                                        </div>
                                        <div className="bg-neutral-50 p-2 rounded border">
                                            <CardDescription>
                                                Belum Dikerjakan
                                            </CardDescription>
                                            <CardTitle className="text-neutral-700">
                                                {tasksSummary.pending}
                                            </CardTitle>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* TAB 3: LAPORAN & EVALUASI */}
                        <TabsContent value="laporan">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">Laporan Mingguan</h2>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    {placement?.weekly_report?.length > 0 ? (
                                        placement?.weekly_report.map(
                                            (report) => (
                                                <Link
                                                    key={report.id}
                                                    href={`/weekly-report/${report.id}`}
                                                    className="flex items-center justify-between p-3 rounded-lg border bg-neutral-50/50"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="h-5 w-5 text-neutral-500" />

                                                        <CardDescription>
                                                            {formatDate(
                                                                report.submitted_at,
                                                            )}
                                                        </CardDescription>
                                                    </div>
                                                    <Badge
                                                        variant={
                                                            placement.status ==
                                                            "planed"
                                                                ? "outline"
                                                                : placement.status ==
                                                                    "active"
                                                                  ? "success"
                                                                  : placement.status ==
                                                                      "terminated"
                                                                    ? "destructive"
                                                                    : "default"
                                                        }
                                                    >
                                                        {placement.status}
                                                    </Badge>
                                                </Link>
                                            ),
                                        )
                                    ) : (
                                        <CardDescription>
                                            Belum ada laporan mingguan.
                                        </CardDescription>
                                    )}
                                </CardContent>
                                <CardContent>
                                    <Separator />
                                </CardContent>
                                <CardHeader>
                                    <h2 className="m-0">Hasil Evaluasi</h2>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    {placement?.evaluation.length > 0 ? (
                                        placement?.evaluation.map(
                                            (evalItem) => (
                                                <Link
                                                    href={`/evaluation/${evalItem.id}`}
                                                    key={evalItem.id}
                                                    className="flex items-center justify-between p-3 rounded-lg border bg-neutral-50/50"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Award className="h-5 w-5 text-neutral-500" />
                                                        <div>
                                                            <CardTitle className="text-sm font-medium text-neutral-700">
                                                                {
                                                                    evalItem.evaluation_type
                                                                }
                                                            </CardTitle>
                                                            <CardDescription>
                                                                Evaluator:{" "}
                                                                {
                                                                    evalItem
                                                                        .evaluator
                                                                        .name
                                                                }
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                    <CardTitle className="text-base text-neutral-700">
                                                        {evalItem.average_score}{" "}
                                                        / 4
                                                    </CardTitle>
                                                </Link>
                                            ),
                                        )
                                    ) : (
                                        <CardDescription>
                                            Belum ada evaluasi tercatat.
                                        </CardDescription>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* TAB 4: DOKUMEN */}
                        <TabsContent value="dokumen">
                            <Card>
                                <CardHeader>
                                    <h2 className="m-0">Dokumen Pendukung</h2>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    {placement?.document?.length > 0 ? (
                                        placement?.document.map((doc) => (
                                            <Link
                                                href={`/document/${doc.id}`}
                                                key={doc.id}
                                                className="flex items-center justify-between p-3 rounded-lg border bg-neutral-50/50"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <FolderCheck className="h-5 w-5 text-neutral-500" />
                                                    <div>
                                                        <CardTitle className="text-sm font-medium text-neutral-700">
                                                            {
                                                                doc.original_filename
                                                            }
                                                        </CardTitle>
                                                        <CardDescription>
                                                            Ukuran:{" "}
                                                            {doc.file_size}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDownload(
                                                            doc.file_path,
                                                        )
                                                    }
                                                >
                                                    Unduh
                                                </Button>
                                            </Link>
                                        ))
                                    ) : (
                                        <CardDescription>
                                            Belum ada dokumen yang diunggah.
                                        </CardDescription>
                                    )}
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
                                            Tanggal Mulai
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {placement.start_date
                                                ? formatDate(
                                                      placement.start_date,
                                                  )
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Tanggal Selesai
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {placement.end_date
                                                ? formatDate(placement.end_date)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <Separator />
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Dibuat Pada
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {placement.created_at
                                                ? formatDate(
                                                      placement.created_at,
                                                  )
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Terakhir Diedit
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {placement.updated_at
                                                ? formatDate(
                                                      placement.updated_at,
                                                  )
                                                : "-"}
                                        </CardTitle>
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
