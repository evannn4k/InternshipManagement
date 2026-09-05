import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Head, useForm } from "@inertiajs/react";
import Layout from "@/layouts/layout";
import { formatDate } from "@/lib/format-date";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    Save,
    School,
    Shield,
    Upload,
    XCircle,
} from "lucide-react";
import { useState } from "react";

export default function ProfileShow({ auth: user }) {
    console.log(user);

    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        avatar: null,
        password: "",
        password_confirmation: "",
    });

    const [avatarPreview, setAvatarPreview] = useState(
        user.avatar ? `/storage/${user.avatar}` : null,
    );

    const handleChange = (e) => {
        const { id, type, value, files } = e.target;

        setData({
            ...data,
            [id]: type == "file" ? (files && files[0] ? files[0] : "") : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(
            "/profile",
            {
                preserveScroll: true,
            },
            {
                onSuccess: () => {
                    setData((data) => ({
                        ...data,
                        password: "",
                        password_confirmation: "",
                    }));
                },
                onError: () => {
                    setData((data) => ({
                        ...data,
                        password: "",
                        password_confirmation: "",
                    }));
                },
            },
        );
    };
    return (
        <>
            <Head>
                <title>Profil Saya</title>
                <meta name="description" content="Pengaturan profil pengguna" />
            </Head>
            <Layout header="Profil">
                <PageHeader
                    title={user.name ?? "Pengguna"}
                    titleAddOn={
                        <Badge
                            variant={user.is_active ? "success" : "destructive"}
                        >
                            {user.is_active ? (
                                <>
                                    <CheckCircle className="mr-1 h-3 w-3" />{" "}
                                    Aktif
                                </>
                            ) : (
                                <>
                                    <XCircle className="mr-1 h-3 w-3" />{" "}
                                    Nonaktif
                                </>
                            )}
                        </Badge>
                    }
                    description={`Atur informasi pribadi dan preferensi akun Anda.`}
                    leftActions={
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft /> Kembali
                        </Button>
                    }
                />

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        {/* KIRI / UTAMA: FORM EDIT PROFIL */}
                        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
                            <Card>
                                <CardHeader>
                                    <h2 className="m-0 text-lg font-semibold">
                                        Informasi Pribadi
                                    </h2>
                                    <CardDescription>
                                        Perbarui foto profil dan detail
                                        identitas akun Anda.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-6">
                                    {/* Upload Avatar */}
                                    <div className="flex items-center gap-6">
                                        <Avatar className="h-20 w-20 border">
                                            <AvatarImage
                                                src={
                                                    avatarPreview ??
                                                    "/storage/images/main/default.jpg"
                                                }
                                                alt={data.name}
                                            />
                                        </Avatar>
                                        <div className="flex flex-col gap-2">
                                            <Label
                                                htmlFor="avatar"
                                                className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium hover:bg-neutral-50 transition"
                                            >
                                                <Upload className="h-4 w-4 text-neutral-500" />
                                                Ubah Foto Profil
                                            </Label>
                                            <input
                                                id="avatar"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleChange}
                                            />
                                            <span className="text-xs text-muted-foreground">
                                                Format JPG, PNG, atau WEBP.
                                                Maksimal 2MB.
                                            </span>
                                            {errors.avatar && (
                                                <span className="text-xs text-destructive">
                                                    {errors.avatar}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="name">
                                                Nama Lengkap
                                            </Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={handleChange}
                                                placeholder="Masukkan nama lengkap"
                                            />
                                            {errors.name && (
                                                <span className="text-xs text-destructive">
                                                    {errors.name}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="email">
                                                Alamat Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={handleChange}
                                                placeholder="nama@email.com"
                                            />
                                            {errors.email && (
                                                <span className="text-xs text-destructive">
                                                    {errors.email}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="phone">
                                                Nomor Telepon / WA
                                            </Label>
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={handleChange}
                                                placeholder="081234567890"
                                            />
                                            {errors.phone && (
                                                <span className="text-xs text-destructive">
                                                    {errors.phone}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <h2 className="m-0 text-lg font-semibold">
                                        Keamanan & Kata Sandi
                                    </h2>
                                    <CardDescription>
                                        Kosongkan kata sandi jika Anda tidak
                                        ingin menguabhnya.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="password">
                                            Kata Sandi Baru
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                        />
                                        {errors.password && (
                                            <span className="text-xs text-destructive">
                                                {errors.password}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="password_confirmation">
                                            Konfirmasi Kata Sandi
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-3">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </Button>
                            </div>
                        </div>

                        {/* KANAN: AGREGAT INFORMASI RELASI & AKUN */}
                        <div className="col-span-1 flex flex-col gap-6">
                            <Card className="bg-white">
                                <CardHeader>
                                    <h2 className="m-0 text-lg font-semibold">
                                        Informasi Sistem
                                    </h2>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Hak Akses / Peran (Role)
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 flex items-center gap-1.5 text-base font-medium">
                                            <Shield className="h-4 w-4 text-neutral-500" />
                                            {user.role ?? "-"}
                                        </CardTitle>
                                    </div>

                                    {user.schoo && (
                                        <>
                                            <Separator />
                                            <div className="flex flex-col gap-1">
                                                <CardDescription>
                                                    Instansi / Sekolah
                                                </CardDescription>
                                                <CardTitle className="text-neutral-700 flex items-center gap-1.5 text-base font-medium">
                                                    <School className="h-4 w-4 text-neutral-500" />
                                                    {user.school ?? "-"}
                                                </CardTitle>
                                            </div>
                                        </>
                                    )}

                                    <Separator />

                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Verifikasi Email
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 flex items-center gap-1.5 text-base font-medium">
                                            {user.email_verified_at ? (
                                                <Badge variant="success">
                                                    Terverifikasi
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">
                                                    Belum Verifikasi
                                                </Badge>
                                            )}
                                        </CardTitle>
                                    </div>

                                    <Separator />

                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Login Terakhir
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 flex items-center gap-1.5 text-sm font-medium">
                                            <Clock className="h-4 w-4 text-neutral-500" />
                                            {user.last_login_at
                                                ? formatDate(user.last_login_at)
                                                : "-"}
                                        </CardTitle>
                                    </div>

                                    <Separator />

                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Akun Dibuat
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700 text-sm font-medium">
                                            {user.created_at
                                                ? formatDate(user.created_at)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </Layout>
        </>
    );
}
