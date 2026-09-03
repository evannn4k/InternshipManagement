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
import {
    Archive,
    ArrowLeft,
    CheckCircle,
    FileText,
    XCircle,
} from "lucide-react";

export default function ProgramShow({ program, mentors, interns }) {
    const parseWorkingDays = (days) => {
        if (!days) return "-";
        if (Array.isArray(days)) return days.join(", ");

        return Array.isArray(JSON.parse(days))
            ? parsed.join(", ")
            : String(days);
    };

    return (
        <>
            <Head>
                <title>Program</title>
                <meta name="description" content="Mengelola data program" />
            </Head>
            <Layout header="Program">
                <PageHeader
                    title={program.name ?? "-"}
                    titleAddOn={
                        <Badge
                            variant={
                                program.status === "active"
                                    ? "success"
                                    : program.status === "inactive" ||
                                        program.status === "archived"
                                      ? "destructive"
                                      : "outline"
                            }
                        >
                            {program.status === "active" ? (
                                <CheckCircle />
                            ) : program.status === "inactive" ? (
                                <XCircle />
                            ) : program.status === "archived" ? (
                                <Archive />
                            ) : (
                                <FileText />
                            )}
                            {program.status}
                        </Badge>
                    }
                    description={program.description ?? "-"}
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
                        defaultValue="informasi"
                        className="col-span-1 md:col-span-2"
                    >
                        <TabsList>
                            <TabsTrigger value="informasi">
                                Informasi Program
                            </TabsTrigger>
                            <TabsTrigger value="jadwal">
                                Jadwal & Jam Kerja
                            </TabsTrigger>
                            <TabsTrigger value="intern">
                                Mentor dan peserta Magang
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="informasi">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">Informasi Program</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Nama Program
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {program.name ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Pembuat Program
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {program.created_by?.name ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Status Program
                                        </CardDescription>
                                        <Badge
                                            variant={
                                                program.status == "draft"
                                                    ? "outline"
                                                    : program.status == "active"
                                                      ? "success"
                                                      : program.status ==
                                                          "inactive"
                                                        ? "destructive"
                                                        : "default"
                                            }
                                        >
                                            {program.status}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Tanggal Penghentian (Terminate)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {program.terminate_date
                                                ? formatDate(
                                                      program.terminate_date,
                                                  )
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent>
                                    <Separator />
                                </CardContent>
                                <CardHeader>
                                    <h2 className="m-0">Informasi Periode</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Tanggal Mulai
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {program.start_date
                                                ? formatDate(program.start_date)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Tanggal Selesai
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {program.end_date
                                                ? formatDate(program.end_date)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="jadwal">
                            <Card>
                                <CardHeader>
                                    <h2 className="m-0">Detail Jam Kerja</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Jam Masuk Kerja
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {program.work_start_time ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Jam Pulang Kerja
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {program.work_end_time ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Toleransi Keterlambatan
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {program.late_tolerance_minutes
                                                ? `${program.late_tolerance_minutes} Menit`
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent>
                                    <Separator />
                                </CardContent>
                                <CardHeader>
                                    <h2 className="m-0">Detail Hari Kerja</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Hari Kerja Berlaku
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {parseWorkingDays(
                                                program.working_days,
                                            )}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="intern">
                            <Card>
                                <CardHeader>
                                    <h2 className="m-0">
                                        Mentor yang ditugaskan
                                    </h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
                                        {mentors.map((mentor, i) => (
                                            <div
                                                key={mentor.id}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="text-muted-foreground">
                                                    {i + 1}.
                                                </div>
                                                <div className="text-slate-800">
                                                    {mentor.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardContent>
                                    <Separator />
                                </CardContent>
                                <CardHeader>
                                    <h2 className="m-0">
                                        Peserta magang yang ditugaskan
                                    </h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
                                        {interns.map((intern, i) => (
                                            <div
                                                key={intern.id}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="text-muted-foreground">
                                                    {i + 1}.
                                                </div>
                                                <div className="text-slate-800">
                                                    {intern.name}
                                                </div>
                                                <div className="ms-auto text-slate-800">
                                                    Mentor :{" "}
                                                    {
                                                        intern
                                                            .placement_as_intern[0]
                                                            .mentor.name
                                                    }
                                                </div>
                                            </div>
                                        ))}
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
                                            Dibuat Pada
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {program.created_at
                                                    ? formatDate(
                                                          program.created_at,
                                                      )
                                                    : "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Terakhir Diedit
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {program.updated_at
                                                    ? formatDate(
                                                          program.updated_at,
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
