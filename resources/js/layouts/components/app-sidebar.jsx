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
import { Link, router } from "@inertiajs/react";
import {
    PieChart,
    Users,
    School,
    Shield,
    IdCard,
    User,
    CreditCard,
    Bell,
    MoreVertical,
    LogOut,
} from "lucide-react";
import { useCan } from "@/hooks/use-can";

export function AppSidebar({ ...props }) {
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
                                <SidebarMenuButton
                                    render={
                                        <Link href="/users">
                                            <Users className="size-4" /> Users
                                        </Link>
                                    }
                                />
                                <SidebarMenuButton
                                    render={
                                        <Link href="/role">
                                            <Shield className="size-4" /> Role
                                        </Link>
                                    }
                                />
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
                                                <School className="size-4" />{" "}
                                                School
                                            </Link>
                                        }
                                    />
                                )}
                                <SidebarMenuButton
                                    render={
                                        <Link href="/users">
                                            <IdCard className="size-4" />{" "}
                                            Internship
                                        </Link>
                                    }
                                />
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
                                                name{" "}
                                            </span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                email{" "}
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
                                                    name
                                                </span>
                                                <span className="truncate text-xs text-muted-foreground">
                                                    email{" "}
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
