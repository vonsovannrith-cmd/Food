import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader"; // បន្ថែម Header 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Admin Sidebar ខាងឆ្វេង */}
      <AdminSidebar />

      {/* Main Content ខាងស្តាំ */}
      <div className="flex flex-1 flex-col">
        {/* Admin Header នៅផ្នែកខាងលើ */}
        <AdminHeader />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}