const AdminDashboard = () => {
  const dashboardItems = [
    {
      title: "Manage Teams",
      description: "Add, edit, or delete teams for tournaments.",
    },
    { title: "View Blogs", description: "Create and manage blog posts." },
    { title: "Settings", description: "Configure admin dashboard settings." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardItems.map((item, index) => (
        <div
          key={index}
          className="bg-[var(--muted)] p-4 rounded shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">
            {item.title}
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
