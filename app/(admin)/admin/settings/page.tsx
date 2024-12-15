"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SettingsPage = () => {
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
              <span className="text-lightGray font-medium">Settings</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <h2 className="text-2xl font-bold text-foreground">Dashboard Settings</h2>
      <div className="p-4 bg-card text-foreground rounded-lg shadow">
        <p className="text-sm text-muted-foreground">
          Customize admin settings here.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
