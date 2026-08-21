import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, router, usePage } from "@inertiajs/react";
import {
    PieChart,
    School,
    Shield,
    User,
    CreditCard,
    Bell,
    MoreVertical,
    LogOut,
    SquareActivity,
    SquareArrowRightEnter,
    ClipboardList,
    ScrollText,
    Summary,
    BookText,
} from "lucide-react";
import { useCan } from "@/hooks/use-can";

export function AppSidebar({ ...props }) {
    const { auth } = usePage().props;
    const { isMobile } = useSidebar();
    const { can } = useCan();

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="h-auto rounded-lg hover:bg-muted cursor-default">
                            <div className="flex items-center gap-2 h-full">
                                <img
                                    src="/storage/images/main/logo.png"
                                    alt="logo"
                                    className="h-10"
                                />
                                <div className="flex flex-col gap-0 leading-none">
                                    <span className="font-semibold">
                                        Internship
                                    </span>
                                    <span className="text-sm">Management</span>
                                </div>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Master Data</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    render={
                                        <Link href="/dashboard">
                                            <PieChart className="size-4" />{" "}
                                            Dashboard
                                        </Link>
                                    }
                                />
                                {can("user:read") && (
                                    <SidebarMenuButton
                                        render={
                                            <Link href="/user">
                                                <User className="size-4" />{" "}
                                                User
                                            </Link>
                                        }
                                    />
                                )}
                                {can("role:manage") && (
                                    <SidebarMenuButton
                                        render={
                                            <Link href="/role">
                                                <Shield className="size-4" />{" "}
                                                Role
                                            </Link>
                                        }
                                    />
                                )}
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Management Data</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                {can("school:read") && (
                                    <SidebarMenuButton
                                        render={
                                            <Link href="/school">
                                                <School className="size-4" />
                                                School
                                            </Link>
                                        }
                                    />
                                )}
                                {can("program:read") && (
                                    <SidebarMenuButton
                                        render={
                                            <Link href="/program">
                                                <SquareActivity className="size-4" />
                                                Program
                                            </Link>
                                        }
                                    />
                                )}
                                {can("placement:read") && (
                                    <SidebarMenuButton
                                        render={
                                            <Link href="/placement">
                                                <SquareArrowRightEnter className="size-4" />
                                                Penempatan
                                            </Link>
                                        }
                                    />
                                )}
                                {can("task:read") && (
                                    <SidebarMenuButton
                                        render={
                                            <Link href="/task">
                                                <ClipboardList className="size-4" />
                                                Tugas
                                            </Link>
                                        }
                                    />
                                )}
                                {can("weekly-report:read") && (
                                    <SidebarMenuButton
                                        render={
                                            <Link href="/weekly-report">
                                                <BookText className="size-4" />
                                                Laporan Mingguan
                                            </Link>
                                        }
                                    />
                                )}
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Absensi</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                {can("attendance:read") && (
                                    <SidebarMenuButton
                                        render={
                                            <Link href="/attendance">
                                                <ScrollText className="size-4" />
                                                Log Absensi
                                            </Link>
                                        }
                                    />
                                )}
                                {can("attendance:read") && (
                                    <SidebarMenuButton
                                        render={
                                            <Link href="/attendance/summary">
                                                <Summary className="size-4" />
                                                Ringkasan Absensi
                                            </Link>
                                        }
                                    />
                                )}
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg grayscale">
                                            <AvatarImage />
                                            <AvatarFallback className="rounded-lg">
                                                CN
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {auth.name}
                                            </span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                {auth.email}
                                            </span>
                                        </div>
                                        <MoreVertical className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                }
                            />
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage />
                                                <AvatarFallback className="rounded-lg">
                                                    CN
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">
                                                    {auth.name}
                                                </span>
                                                <span className="truncate text-xs text-muted-foreground">
                                                    {auth.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                        <User className="size-4" />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                        <CreditCard className="size-4" />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                        <Bell className="size-4" />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => router.post("/logout")}
                                >
                                    <LogOut className="size-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
