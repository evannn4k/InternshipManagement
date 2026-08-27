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
    CircleCheck,
    Download,
    FileCheck,
    FileX,
} from "lucide-react";
import { useCan } from "@/hooks/use-can";
import { useModal } from "@/hooks/use-modal";
import DocumentReviewForm from "./components/document-review-form";

export default function DocumentShow({ document }) {
    const { can } = useCan();
    const modal = useModal();

    const formatBytes = (bytes) => {
        if (!bytes || bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <>
            <Head>
                <title>Dokumen</title>
                <meta name="description" content="Mengelola data dokumen" />
            </Head>
            <Layout header="Dokumen">
                {can("document:review") && document.status === "pending" && (
                    <DocumentReviewForm modal={modal} />
                )}
                <PageHeader
                    title={document.title ?? "-"}
                    titleAddOn={
                        <Badge
                            variant={
                                document.status === "accepted"
                                    ? "success"
                                    : document.status === "rejected"
                                      ? "destructive"
                                      : "outline"
                            }
                        >
                            {document.status === "accepted" ? (
                                <CircleCheck />
                            ) : document.status === "rejected" ? (
                                <FileX />
                            ) : null}
                            {document.status}
                        </Badge>
                    }
                    description={document.description ?? "-"}
                    leftActions={
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft /> Kembali
                        </Button>
                    }
                    rightActions={
                        can("document:review") &&
                        document.status === "pending" && (
                            <div className="flex gap-2 items-center">
                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        modal.openModal("reject", document)
                                    }
                                >
                                    <FileX /> Tolak
                                </Button>
                                <Button
                                    onClick={() =>
                                        modal.openModal("accept", document)
                                    }
                                >
                                    <FileCheck /> Terima
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
                                Informasi Dokumen
                            </TabsTrigger>
                            <TabsTrigger value="berkas">
                                Detail Berkas
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="informasi">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">Informasi Dokumen</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Pemilik Dokumen
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {document.placement?.intern?.name ??
                                                "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Pengunggah
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {document.uploader?.name ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Kategori
                                        </CardDescription>
                                        <Badge variant="secondary">
                                            {document.category ?? "-"}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Status Peninjauan
                                        </CardDescription>
                                        <Badge
                                            variant={
                                                document.status === "accepted"
                                                    ? "success"
                                                    : document.status ===
                                                        "rejected"
                                                      ? "destructive"
                                                      : "outline"
                                            }
                                        >
                                            {document.status === "accepted"
                                                ? "Diterima"
                                                : document.status === "rejected"
                                                  ? "Ditolak"
                                                  : "Menunggu Persetujuan"}
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
                                            {formatDate(document.created_at)}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Terakhir diedit
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {formatDate(document.updated_at)}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="berkas">
                            <Card>
                                <CardHeader>
                                    <h2 className="m-0">Detail Berkas</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Nama File Asli
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {document.original_filename ?? "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Tipe MIME
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {document.mime_type ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Ukuran Berkas
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {formatBytes(document.file_size)}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Unduh Berkas
                                        </CardDescription>
                                        {document.file_path ? (
                                            <a
                                                href={`/storage/${document.file_path}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 underline text-lg"
                                            >
                                                <Download className="w-4 h-4" />
                                                Unduh File
                                            </a>
                                        ) : (
                                            <CardTitle className="text-neutral-700">
                                                -
                                            </CardTitle>
                                        )}
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
                                            Ditinjau Oleh
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {document.reviewer?.name ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Ditinjau Pada
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {document.reviewed_at
                                                ? formatDate(
                                                      document.reviewed_at,
                                                  )
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                                        <CardDescription>
                                            Catatan Reviewer
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 whitespace-pre-line">
                                            {document.review_notes ?? "-"}
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
                                            Diupload Pada
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-neutral-700">
                                                {document.created_at
                                                    ? formatDate(
                                                          document.created_at,
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
                                                {document.reviewed_at
                                                    ? formatDate(
                                                          document.reviewed_at,
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
