import Sidebar from "@/components/admin/AdminSidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/80 dark:bg-gray-950 font-sans antialiased selection:bg-orange-500 selection:text-white transition-colors duration-300">
      {/* Fixed/Sticky Admin Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
        {/* Admin Sticky Header */}
        <Header />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 bg-gray-50/50 dark:bg-gray-950/50 backdrop-blur-sm transition-colors">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}