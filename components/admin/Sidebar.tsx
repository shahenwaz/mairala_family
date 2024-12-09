"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const handleLogout = () => {
    document.cookie =
      "admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/login";
  };

  return (
    <SidebarProvider>
      <Sidebar className="bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)]">
        {/* Sidebar Header */}
        <SidebarHeader className="text-lg font-bold p-4 border-b border-[var(--sidebar-border)]">
          Admin Panel
        </SidebarHeader>

        {/* Sidebar Menu */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin" className="hover:text-[var(--primary)]">
                    Dashboard
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/admin/tournaments"
                    className="hover:text-[var(--primary)]"
                  >
                    Tournaments
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/admin/blogs"
                    className="hover:text-[var(--primary)]"
                  >
                    Blogs
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarSeparator />
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="p-4 text-sm">
          <div className="flex justify-between items-center">
            <span>
              Logged in as: <strong>Admin</strong>
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="hover:bg-[var(--destructive)] hover:text-[var(--destructive-foreground)]"
            >
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AdminSidebar;
