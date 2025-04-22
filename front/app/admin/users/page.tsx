// app/admin/users/page.tsx
import { auth } from './auth';  // Adjust the path based on the actual location of the auth module
import { redirect } from "next/navigation";
import { UsersTable } from "@/components/admin/users-table";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function UsersPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const users = await prisma.user.findMany();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button>Add User</Button>
      </div>
      <UsersTable users={users} />
    </div>
  );
}