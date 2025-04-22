// components/admin/sidebar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="admin-sidebar p-4">
      <nav className="space-y-1">
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link href="/admin/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link href="/admin/users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Link>
        </Button>
        
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link href="/admin/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </nav>
    </aside>
  );
}