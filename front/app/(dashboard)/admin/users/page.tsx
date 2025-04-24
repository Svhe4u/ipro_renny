'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

const UserRow = ({
    user,
    onUpdate,
    onDelete
}: {
    user: User,
    onUpdate: (id: string, updatedUser: Partial<User>) => void,
    onDelete: (id: string) => void
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const { toast } = useToast();

    const handleSave = () => {
        onUpdate(user.id, { name, email, role });
        setIsEditing(false);
        toast({
            title: "User Updated",
            description: "User information has been updated successfully."
        })
    };

    return (
        <motion.tr
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
        >
            <TableCell>{user.id}</TableCell>
            <TableCell>
                {isEditing ? (
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="h-8" />
                ) : (
                    name
                )}
            </TableCell>
            <TableCell>
                {isEditing ? (
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-8" />
                ) : (
                    email
                )}
            </TableCell>
            <TableCell>
                {isEditing ? (
                    <Select onValueChange={setRole} defaultValue={role}>
                        <SelectTrigger className="w-full h-8">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                ) : (
                    role
                )}
            </TableCell>
            <TableCell className="text-right">
                {isEditing ? (
                    <>
                        <Button
                            size="sm"
                            onClick={handleSave}
                            className="bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 mr-2"
                        >
                            Save
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                                setIsEditing(false);
                                setName(user.name);
                                setEmail(user.email);
                                setRole(user.role);
                            }}
                            className="bg-gray-700/50 text-white hover:bg-gray-700 hover:text-gray-200 border-gray-700/50"
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 mr-2"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-800 text-white border-gray-700">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-lg">Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone.  This will permanently delete
                                        this user and all their data.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        className="bg-gray-700 hover:bg-gray-600 text-white"
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => onDelete(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )}
            </TableCell>
        </motion.tr>
    );
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    try{
        setUser(JSON.parse(storedUser));
    } catch(e){
        console.error("Failed to parse user", e);
        router.push('/login');
        return;
    }


    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/admin/users'); // Your backend API
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role !== 'admin') {
      router.push('/dashboard'); // Redirect non-admins
    } else {
      fetchUsers();
    }
  }, [router, user?.role]);

  const handleUpdateUser = async (id: string, updatedUser: Partial<User>) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, { // Your backend API
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.status}`);
      }
      // Update the user in the local state
      setUsers(
        users.map((u) => (u.id === id ? { ...u, ...updatedUser } : u))
      );

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update user."
        })
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, { // Your backend API
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`);
      }
      // Remove the user from the local state
      setUsers(users.filter((u) => u.id !== id));
        toast({
            title: "User Deleted",
            description: "User has been deleted successfully."
        })
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to delete user."
        })
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Manage Users</h1>
      <Card className="bg-gray-800/80 backdrop-blur-md border border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white">User List</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">ID</TableHead>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Role</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onUpdate={handleUpdateUser}
                            onDelete={handleDeleteUser}
                        />
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-400">No users found.</p>
          )}
          {/* Implement create user functionality */}
          <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">Add New User</Button>
        </CardContent>
      </Card>
    </div>
  );
}