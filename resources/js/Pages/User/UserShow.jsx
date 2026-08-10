import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import Layout from "@/layouts/layout";
import UserForm from "./components/user-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    CircleX,
    CircleCheck,
    Mail,
    Phone,
    ShieldCheck,
    SquarePen,
    User as UserIcon,
    LockKeyhole,
} from "lucide-react";
import { useCan } from "@/hooks/use-can";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/format-date";
import ResetPassword from "./components/reset-password";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

export default function UserShow({ user, roles }) {
    const modal = useModal();
    const { can } = useCan();

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <Layout header="Alex Pratama">
            <ResetPassword form={modal} />
            <UserForm form={modal} roles={roles} />
            <div className="flex flex-col gap-6 typeset typeset-docs">
                {/* Header Section */}
                <div className="w-full flex justify-between items-start md:items-end flex-col md:flex-row gap-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="size-16 border">
                            <AvatarImage
                                src={
                                    user.avatar
                                        ? `/storage/images/user/${user.avatar}`
                                        : `/storage/images/user/dfpp.jpg`
                                }
                                alt="Alex Pratama"
                                className="m-0"
                            />
                            <AvatarFallback className="flex h-full w-full items-center justify-center font-semibold">
                                Avatar
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h1 className="m-0">{user.name ?? "-"}</h1>
                                {user.is_active ? (
                                    <Badge
                                        variant="success"
                                        className="font-semibold"
                                    >
                                        <CircleCheck /> Aktif
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant="destructive"
                                        className="font-semibold"
                                    >
                                        <CircleX />
                                        Tidak Aktif
                                    </Badge>
                                )}
                            </div>
                            <p className="m-0 text-muted-foreground flex items-center gap-1">
                                <ShieldCheck className="size-4" />
                                <span className="font-medium text-neutral-700">
                                    {
                                        roles
                                            .filter(
                                                (role) =>
                                                    role.id == user.role_id,
                                            )
                                            .map((role) => role.name)[0]
                                    }
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft />
                            Kembali
                        </Button>
                        {can("user:update") && (
                            <>
                                <Button
                                    variant="default"
                                    onClick={() =>
                                        modal.openModal("reset-password", {
                                            id: user.id,
                                        })
                                    }
                                >
                                    <LockKeyhole /> Reset Password
                                </Button>

                                <Button
                                    variant="default"
                                    onClick={() => modal.openEdit(user)}
                                >
                                    <SquarePen /> Edit
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <Tabs
                        defaultValue="ringkasan"
                        className="col-span-1 md:col-span-2"
                    >
                        <TabsList>
                            <TabsTrigger value="ringkasan">
                                Ringkasan
                            </TabsTrigger>
                            <TabsTrigger value="aktivitas">
                                Aktivitas
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="ringkasan">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">Informasi Pengguna</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Nama Lengkap
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {user.name ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Email di verifikasi pada
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {user.email_verified_at ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Nomor Telepon
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {user.phone ?? "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Status Akun
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {user.is_active ? (
                                                <Badge
                                                    variant="success"
                                                    className="font-semibold"
                                                >
                                                    <CircleCheck /> Aktif
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="destructive"
                                                    className="font-semibold"
                                                >
                                                    <CircleX />
                                                    Tidak Aktif
                                                </Badge>
                                            )}
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
                                            {user.created_at
                                                ? formatDate(user.created_at)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Terakhir diedit
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {user.updated_at
                                                ? formatDate(user.updated_at)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="aktivitas">
                            <Card className="flex flex-col gap-4">
                                <CardHeader>
                                    <h2 className="m-0">Aktivitas Login</h2>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <CardDescription>
                                            Terakhir Login
                                        </CardDescription>
                                        <CardTitle className="text-neutral-700">
                                            {user.last_login_at
                                                ? formatDate(user.last_login_at)
                                                : "-"}
                                        </CardTitle>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Sidebar / Contact Info */}
                    <div className="col-span-1 md:pt-[40px]">
                        <Card className="bg-white">
                            <CardHeader>
                                <h2 className="m-0">Kontak Utama</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Nama Pengguna
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="size-4" />
                                            <CardTitle className="text-neutral-700">
                                                {user.name ?? "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>
                                            Nomor Telepon
                                        </CardDescription>
                                        <div className="flex items-center gap-2">
                                            <Phone className="size-4" />
                                            <CardTitle className="text-neutral-700">
                                                {user.phone ?? "-"}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <CardDescription>Email</CardDescription>
                                        <div className="flex items-center gap-2">
                                            <Mail className="size-4" />
                                            <CardTitle className="text-neutral-700">
                                                {user.email ?? "-"}
                                            </CardTitle>
                                        </div>
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
