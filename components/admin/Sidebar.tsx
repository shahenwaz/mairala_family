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

const AdminSidebar = () => {
  return (
    <SidebarProvider>
      <Sidebar className="bg-[var(--muted)] text-[var(--foreground)]">
        {/* Sidebar Header */}
        <SidebarHeader className="text-lg font-bold p-4 border-b border-[var(--primary)]">
          Admin Panel
        </SidebarHeader>

        {/* Sidebar Menu */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin">Dashboard</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/teams">Teams</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/blogs">Blogs</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarSeparator />
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="p-4 text-sm">
          Logged in as: <strong>Admin</strong>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AdminSidebar;
