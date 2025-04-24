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
import { Toaster  } from '@/components/ui/sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

const AdminRow = ({
    admin,
    onUpdate,
    onDelete
}: {
    admin: Admin,
    onUpdate: (id: string, updatedAdmin: Partial<Admin>) => void,
    onDelete: (id: string) => void
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(admin.name);
    const [email, setEmail] = useState(admin.email);
    const { toast } = useToast();

    const handleSave = () => {
        onUpdate(admin.id, { name, email });
        setIsEditing(false);
        toast({
            title: "Admin Updated",
            description: "Admin information has been updated successfully."
        })
    };

    return (
        <motion.tr
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
        >
            <TableCell>{admin.id}</TableCell>
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
                                setName(admin.name);
                                setEmail(admin.email);
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
                                        This action cannot be undone. This will permanently delete this admin.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        className="bg-gray-700 hover:bg-gray-600 text-white"
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => onDelete(admin.id)}
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

export default function AdminAdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
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

    try {
      setUser(JSON.parse(storedUser));
    } catch (e) {
      console.error("Failed to parse user", e);
      router.push('/login');
      return;
    }

    const fetchAdmins = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/admin/admins'); // Your backend API
        if (!response.ok) {
          throw new Error(`Failed to fetch admins: ${response.status}`);
        }
        const data = await response.json();
        setAdmins(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch admins.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role !== 'admin') {
      router.push('/dashboard'); // Redirect non-admins
    } else {
      fetchAdmins();
    }
  }, [router, user?.role]);

  const handleUpdateAdmin = async (id: string, updatedAdmin: Partial<Admin>) => {
    try {
      const response = await fetch(`/api/admin/admins/${id}`, { // Your backend API
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAdmin),
      });
      if (!response.ok) {
        throw new Error(`Failed to update admin: ${response.status}`);
      }
      setAdmins(admins.map((a) => (a.id === id ? { ...a, ...updatedAdmin } : a)));
      toast({
        title: "Admin Updated",
        description: "Admin information has been updated successfully."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update admin."
      });
      console.error('Error updating admin:', error);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/admins/${id}`, { // Your backend API
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete admin: ${response.status}`);
      }
      setAdmins(admins.filter((a) => a.id !== id));
      toast({
        title: "Admin Deleted",
        description: "Admin has been deleted successfully."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete admin."
      });
      console.error('Error deleting admin:', error);
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
      <h1 className="text-3xl font-bold text-white">Manage Admins</h1>
      <Card className="bg-gray-800/80 backdrop-blur-md border border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Admin List</CardTitle>
        </CardHeader>
        <CardContent>
          {admins.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">ID</TableHead>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {admins.map((admin) => (
                      <AdminRow
                        key={admin.id}
                        admin={admin}
                        onUpdate={handleUpdateAdmin}
                        onDelete={handleDeleteAdmin}
                      />
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-400">No admins found.</p>
          )}
          <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">Add New Admin</Button>
        </CardContent>
      </Card>
    </div>
  );
}