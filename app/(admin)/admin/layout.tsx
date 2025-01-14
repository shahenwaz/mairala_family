"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    document.cookie =
      "admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/login";
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-background border-b border-darkGray">
          <Link href="/admin" className="text-xl font-bold text-purple">
            ADMIN DASHBOARD
          </Link>
          {/* Ensure the logout button stays as a client component */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className="hover:bg-darkGray hover:text-white card-hover"
          >
            Logout
          </Button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
