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
    ArrowLeft,
    Eye,
    EyeOff,
} from "lucide-react";

export default function EvaluationShow({ evaluation }) {
    return (
        <>
            <Head>
                <title>Evaluasi</title>
                <meta name="description" content="Mengelola data evaluasi" />
            </Head>
            <Layout header="Evaluasi">
                <PageHeader
                    title={`Evaluasi: ${evaluation.evaluation_type ?? "-"}`}
                    titleAddOn={
                        <Badge
                            variant={
                                evaluation.is_visible_to_intern
                                    ? "success"
                                    : "outline"
                            }
                        >
                            {evaluation.is_visible_to_intern ? (
                                <Eye />
                            ) : (
                                <EyeOff />
                            )}
                            {evaluation.is_visible_to_intern
                                ? "Terlihat oleh Intern"
                                : "Tersembunyi"}
                        </Badge>
                    }
                    description={`Periode: ${
                        evaluation.period_start_date
                            ? formatDate(evaluation.period_start_date)
                            : "-"
                    } - ${
                        evaluation.period_end_date
                            ? formatDate(evaluation.period_end_date)
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
                        defaultValue="penilaian"
                        className="col-span-1 md:col-span-2"
                    >
                        <TabsList>
                            <TabsTrigger value="penilaian">
                                Nilai Kinerja
                            </TabsTrigger>
                            <TabsTrigger value="catatan">
                                Ulasan & Catatan
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="penilaian">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">Nilai Kompetensi</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Reliability (Keandalan)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {evaluation.reliability_score ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Learning (Kemampuan Belajar)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {evaluation.learning_score ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Code Quality (Kualitas Kode)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {evaluation.code_quality_score ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Problem Solving (Pemecahan Masalah)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {evaluation.problem_solving_score ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Collaboration (Kolaborasi)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {evaluation.collaboration_score ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Communication (Komunikasi)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {evaluation.communication_score ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Documentation (Dokumentasi)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {evaluation.documentation_score ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent>
                                    <Separator />
                                </CardContent>
                                <CardHeader>
                                    <h2 className="m-0">Informasi Evaluator</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Evaluator
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {evaluation.evaluator?.name ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Tipe Evaluasi
                                        </CardDescription>
                                        <Badge variant="secondary">
                                            {evaluation.evaluation_type ?? "-"}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="catatan">
                            <Card>
                                <CardHeader>
                                    <h2 className="m-0">Ulasan & Umpan Balik</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Kekuatan (Strengths)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {evaluation.strengths ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Area Pengembangan (Improvement Areas)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {evaluation.improvement_areas ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Rencana Aksi (Action Plan)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {evaluation.action_plan ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Komentar Keseluruhan
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {evaluation.overall_comment ?? "-"}
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
                                            Dibuat Pada
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {evaluation.created_at
                                                    ? formatDate(
                                                          evaluation.created_at,
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
                                                {evaluation.updated_at
                                                    ? formatDate(
                                                          evaluation.updated_at,
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