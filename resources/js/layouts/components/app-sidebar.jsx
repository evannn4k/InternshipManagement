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
    FileText,
    ChartCandlestick,
} from "lucide-react";
import { useCan } from "@/hooks/use-can";

export function AppSidebar({ ...props }) {
    const { auth } = usePage().props;
    const { isMobile } = useSidebar();
    const { can } = useCan();
    const url = usePage().url;

    const navigation = [
        {
            title: "Master Data",
            items: [
                {
                    name: "Dashboard",
                    href: "/dashboard",
                    icon: PieChart,
                    permission: null,
                    activePattern: "/dashboard",
                },
                {
                    name: "User",
                    href: "/user",
                    icon: User,
                    permission: "user:read",
                    activePattern: "/user",
                },
                {
                    name: "Role",
                    href: "/role",
                    icon: Shield,
                    permission: "role:manage",
                    activePattern: "/role",
                },
            ],
        },
        {
            title: "Management Data",
            items: [
                {
                    name: "School",
                    href: "/school",
                    icon: School,
                    permission: "school:read",
                    activePattern: "/school",
                },
                {
                    name: "Program",
                    href: "/program",
                    icon: SquareActivity,
                    permission: "program:read",
                    activePattern: "/program",
                },
                {
                    name: "Penempatan",
                    href: "/placement",
                    icon: SquareArrowRightEnter,
                    permission: "placement:read",
                    activePattern: "/placement",
                },
                {
                    name: "Tugas",
                    href: "/task",
                    icon: ClipboardList,
                    permission: "task:read",
                    activePattern: "/task",
                },
                {
                    name: "Laporan Mingguan",
                    href: "/weekly-report",
                    icon: BookText,
                    permission: "weekly-report:read",
                    activePattern: "/weekly-report",
                },
                {
                    name: "Dokumen",
                    href: "/document",
                    icon: FileText,
                    permission: "document:read",
                    activePattern: "/document",
                },
                {
                    name: "Evaluasi",
                    href: "/evaluation",
                    icon: ChartCandlestick,
                    permission: "evaluation:read",
                    activePattern: "/evaluation",
                },
            ],
        },
        {
            title: "Absensi",
            items: [
                {
                    name: "Log Absensi",
                    href: "/attendance",
                    icon: ScrollText,
                    permission: "attendance:read",
                    activePattern: "/attendance",
                },
                {
                    name: "Ringkasan Absensi",
                    href: "/attendance/summary",
                    icon: Summary,
                    permission: "attendance:read",
                    activePattern: "/attendance/summary",
                },
            ],
        },
    ];

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
                                    className="h-10 p-1"
                                />
                                <div className="flex flex-col gap-0 leading-none">
                                    <span className="font-semibold text-emerald-700">
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
                {navigation.map((nav) => {
                    if (
                        !nav.items.some(
                            (item) => !item.permission || can(item.permission),
                        )
                    )
                        return null;
                    return (
                        <SidebarGroup key={nav.title}>
                            <SidebarGroupLabel>{nav.title}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="gap-1">
                                    {nav.items.map((item) => {
                                        const Icon = item.icon;
                                        if (
                                            item.permission &&
                                            !can(item.permission)
                                        )
                                            return null;
                                        return (
                                            <SidebarMenuItem key={item.href}>
                                                <SidebarMenuButton
                                                    variant={
                                                        url.includes(item.href)
                                                            ? "success"
                                                            : "default"
                                                    }
                                                    render={
                                                        <Link href={item.href}>
                                                            <Icon className="size-4" />

                                                            {item.name}
                                                        </Link>
                                                    }
                                                />
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    );
                })}
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
