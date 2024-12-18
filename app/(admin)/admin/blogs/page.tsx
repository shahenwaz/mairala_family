"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BlogsPage = () => {
  const blogs = [
    { id: 1, title: "Welcome to Mairala Family", date: "Dec 1, 2024" },
    { id: 2, title: "How to Join Tournaments?", date: "Dec 5, 2024" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-lightGray font-medium">Blogs</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <h2 className="text-2xl font-bold text-foreground">Manage Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-4 bg-card text-foreground rounded-lg card-hover"
          >
            <h3 className="font-semibold">{blog.title}</h3>
            <p className="text-sm text-muted-foreground">
              Published: {blog.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
