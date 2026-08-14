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
import ReviewForm from "./components/review-form";

export default function TaskShow({ task }) {
    const { can } = useCan();
    const modal = useModal();

    return (
        <>
            <Head>
                <title>Tugas</title>
                <meta name="description" content="Mengelola data tugas" />
            </Head>
            <Layout header="Tugas">
                {can("task:review") && task.status === "revision_requested" && (
                    <ReviewForm modal={modal} />
                )}
                <PageHeader
                    title={task.title ?? "-"}
                    titleAddOn={
                        <Badge
                            variant={
                                task.status === "in_progress"
                                    ? "primary"
                                    : task.status === "assigned" ||
                                        task.status === "submitted" ||
                                        task.status === "completed"
                                      ? "success"
                                      : task.status === "cancelled"
                                        ? "destructive"
                                        : task.status === "revision_requested"
                                          ? "default"
                                          : "outline"
                            }
                        >
                            {task.status === "completed" ? (
                                <CircleCheck />
                            ) : task.status === "cancelled" ? (
                                <CircleX />
                            ) : null}
                            {task.status}
                        </Badge>
                    }
                    description={task.description ?? "-"}
                    leftActions={
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft /> Kembali
                        </Button>
                    }
                    rightActions={
                        can("task:review") &&
                        task.status === "submitted" && (
                            <div className="flex gap-2 items-center">
                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        modal.openModal("revision", task)
                                    }
                                >
                                    <FileX /> Revisi
                                </Button>
                                <Button
                                    onClick={() =>
                                        modal.openModal("completed", task)
                                    }
                                >
                                    <FileCheck /> Selesaikan
                                </Button>
                            </div>
                        )
                    }
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <Tabs
                        defaultValue="ringkasan"
                        className="col-span-1 md:col-span-2"
                    >
                        <TabsList>
                            <TabsTrigger value="informasi">
                                Informasi Tugas
                            </TabsTrigger>
                            <TabsTrigger value="pengumpulan">
                                Pengumpulan
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="informasi">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">Informasi Tugas</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>Nama</CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {task.placement?.intern?.name ??
                                                "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Mentor
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {task.placement?.mentor?.name ??
                                                "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Kriteria Pengumpulan
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {task.acceptance_criteria ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Estimasi Waktu
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {task.estimated_hours
                                                ? task.estimated_hours + " Jam"
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Pengumpulan
                                        </CardDescription>
                                        <Badge
                                            variant={
                                                task.status === "submitted" || task.status === "completed"
                                                    ? task.submitted_at >
                                                      task.due_date
                                                        ? "destructive"
                                                        : "success"
                                                    : task.status ===
                                                        "cancelled"
                                                      ? "secondary"
                                                      : "outline"
                                            }
                                        >
                                            {task.status === "submitted" || task.status === "completed"
                                                ? task.submitted_at >
                                                  task.due_date
                                                    ? "Terlambat"
                                                    : "Tepat Waktu"
                                                : task.status === "cancelled"
                                                  ? "Dibatalkan"
                                                  : "Belum Disubmit"}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Prioritas
                                        </CardDescription>
                                        <Badge
                                            variant={
                                                task.priority === "high"
                                                    ? "destructive"
                                                    : task.priority === "medium"
                                                      ? "primary"
                                                      : task.priority === "low"
                                                        ? "success"
                                                        : "default"
                                            }
                                        >
                                            {task.priority}
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
                                            {formatDate(task.created_at)}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Terakhir diedit
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {formatDate(task.updated_at)}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="pengumpulan">
                            <Card>
                                <CardHeader>
                                    <h2 className="m-0">Detail Pengumpulan</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Link Repositori
                                        </CardDescription>
                                        {task.repository_url ? (
                                            <a
                                                href={task.repository_url}
                                                className="text-blue-600 hover:text-blue-700 underline text-lg"
                                            >
                                                {task.repository_url}
                                            </a>
                                        ) : (
                                            <CardTitle className="text-neutral-700">
                                                -
                                            </CardTitle>
                                        )}
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Link Demo
                                        </CardDescription>
                                        {task.demo_url ? (
                                            <a
                                                href={task.demo_url ?? ""}
                                                className="text-blue-600 hover:text-blue-700 underline text-lg"
                                            >
                                                {task.demo_url ?? "-"}
                                            </a>
                                        ) : (
                                            <CardTitle className="text-neutral-700">
                                                -
                                            </CardTitle>
                                        )}
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Catatan Pengumpulan
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {task.submission_notes ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>{" "}
                                <CardContent>
                                    <Separator />
                                </CardContent>
                                <CardHeader>
                                    <h2 className="m-0">Detail Pengumpulan</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Ditinjau Pada
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {task.reviewed_at
                                                ? formatDate(task.reviewed_at)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Diselesaikan Pada
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {task.completed_at
                                                ? formatDate(task.completed_at)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                                        <CardDescription>
                                            Catatan Reviewer
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {task.review_notes ?? "-"}
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
                                            Dimulai
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {task.start_date
                                                    ? formatDate(
                                                          task.start_date,
                                                      )
                                                    : "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Deadline
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {task.due_date
                                                    ? formatDate(task.due_date)
                                                    : "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Mulai Pengerjaan
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {task.started_at
                                                    ? formatDate(
                                                          task.started_at,
                                                      )
                                                    : "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Dikumpulkan
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {task.submitted_at
                                                    ? formatDate(
                                                          task.submitted_at,
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
                                                {task.reviewed_at
                                                    ? formatDate(
                                                          task.reviewed_at,
                                                      )
                                                    : "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Diselesaikan Pada
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {task.completed_at
                                                    ? formatDate(
                                                          task.completed_at,
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
