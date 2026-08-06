import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import Layout from "@/layouts/layout";
import SchoolForm from "./components/school-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/format-date";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    CheckCircle2,
    CircleX,
    Mail,
    MessageCircle,
    Phone,
    SquarePen,
    User,
} from "lucide-react";
import { useCan } from "@/hooks/use-can";

export default function SchoolShow({ school }) {
    const modal = useModal();
    const { can } = useCan();

    return (
        <Layout header={school.name}>
            <SchoolForm form={modal} />
            <div className="flex flex-col gap-6 typeset typeset-docs">
                <div className="w-full flex justify-between items-start md:items-end flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h1 className="m-0">{school.name}</h1>
                            {school.is_active ? (
                                <Badge
                                    variant="success"
                                    className="font-semibold m-0 flex items-center gap-1"
                                >
                                    <CheckCircle2 className="size-4" />
                                    Aktif
                                </Badge>
                            ) : (
                                <Badge
                                    variant="destructive"
                                    className="font-semibold flex items-center gap-1"
                                >
                                    <CircleX className="size-4" />
                                    Tidak Aktif
                                </Badge>
                            )}
                        </div>
                        <p className="m-0">NPSN : {school.npsn}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft />
                            Kembali
                        </Button>
                        {can("school:update") && (
                            <Button
                                variant="default"
                                onClick={() => modal.openEdit(school)}
                            >
                                <SquarePen /> Edit
                            </Button>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <Tabs
                        defaultValue="ringkasan"
                        className="col-span-1 md:col-span-2"
                    >
                        <TabsList>
                            <TabsTrigger value="ringkasan">
                                Ringkasan
                            </TabsTrigger>
                            <TabsTrigger value="catatan">Catatan</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ringkasan">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">Informasi Sekolah</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Alamat Lengkap
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {school.address ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Kota / Kabupaten
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {school.city ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Provinsi
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {school.province ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Alamat Lengkap
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {school.address ?? "-"}
                                        </CardTitle>
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
                                            {formatDate(school.created_at)}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Terakhir diedit
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {formatDate(school.updated_at)}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="catatan">
                            <Card>
                                <CardHeader>
                                    <h2 className="m-0">Catatan</h2>
                                </CardHeader>
                                <CardContent className="text-sm">
                                    <CardDescription>
                                        {school.notes ?? "-"}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    <div className="col-span-1 md:pt-[40px]">
                        <Card className="bg-white">
                            <CardHeader>
                                <h2 className="m-0">Kontak Utama</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Nama Narahubung
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <User className="size-4" />
                                            <CardTitle className="text-neutral-700">
                                                {school.contact_person_name ??
                                                    "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Nomor Narahubung
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <Phone className="size-4" />
                                            <CardTitle className="text-neutral-700">
                                                {school.contact_person_phone ??
                                                    "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Email Narahubung
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <Mail className="size-4" />
                                            <CardTitle className="text-neutral-700">
                                                {school.contact_person_email ??
                                                    "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="flex-1 gap-2"
                                            nativeButton={false}
                                            render={
                                                <a
                                                    className="no-underline"
                                                    href={
                                                        "https://wa.me/" +
                                                        school.contact_person_phone
                                                    }
                                                />
                                            }
                                        >
                                            <MessageCircle className="size-4" />
                                            WhatsApp
                                        </Button>
                                        <Button
                                            className="flex-1 gap-2"
                                            nativeButton={false}
                                            render={
                                                <a
                                                    className="no-underline"
                                                    href={
                                                        "mailto:" +
                                                        school.contact_person_email
                                                    }
                                                />
                                            }
                                        >
                                            <Mail className="size-4" />
                                            Email
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
