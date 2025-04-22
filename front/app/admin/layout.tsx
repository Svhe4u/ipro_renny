// app/admin/layout.tsx
import { Sidebar } from "@/components/admin/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="header">
          <nav className="nav">
            <div className="navLinks">
              <a href="/admin/settings">Settings</a>
              <a href="/logout">Logout</a>
            </div>
          </nav>
        </header>
        <main className="p-6">
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
}