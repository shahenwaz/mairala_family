"use client";

import Link from "next/link";

const AdminDashboard = () => {
  const dashboardItems = [
    {
      title: "Manage Tournaments",
      description: "Create, edit, and manage tournaments.",
      link: "/admin/tournaments",
    },
    {
      title: "View Blogs",
      description: "Create and manage blog posts.",
      link: "/admin/blogs",
    },
    {
      title: "Settings",
      description: "Configure admin dashboard settings.",
      link: "/admin/settings",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardItems.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="bg-card text-foreground p-4 rounded-lg card-hover"
        >
          <h2 className="text-lg font-bold mb-2">{item.title}</h2>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default AdminDashboard;
