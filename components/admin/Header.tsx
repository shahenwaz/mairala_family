import { Button } from "@/components/ui/button";

const Header = () => {
  const handleLogout = () => {
    document.cookie =
      "admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/login";
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[var(--background)] border-b border-[var(--primary)]">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">
        Admin Panel
      </h1>
      <Button onClick={handleLogout} variant="destructive">
        Logout
      </Button>
    </header>
  );
};

export default Header;
