import Link from "next/link";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Teams", href: "/admin/teams" },
    { name: "Blogs", href: "/admin/blogs" },
  ];

  return (
    <aside className="w-64 bg-[var(--muted)] text-[var(--foreground)] h-screen flex-shrink-0">
      <div className="p-4 text-lg font-bold border-b border-[var(--primary)]">
        Admin Dashboard
      </div>
      <nav className="flex flex-col space-y-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2 rounded hover:bg-[var(--accent)]"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
