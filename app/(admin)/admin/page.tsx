const AdminDashboard = () => {
  const dashboardItems = [
    {
      title: "Manage Tournaments",
      description: "Create, edit, and manage tournaments.",
    },
    { title: "View Blogs", description: "Create and manage blog posts." },
    { title: "Settings", description: "Configure admin dashboard settings." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardItems.map((item, index) => (
        <div
          key={index}
          className="bg-[var(--card)] text-[var(--card-foreground)] p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
        >
          <h2 className="text-lg font-bold mb-2">{item.title}</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
