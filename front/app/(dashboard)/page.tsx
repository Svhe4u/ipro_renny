'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Cv {
  id: string;
  title: string;
  // ... other CV properties
}

const CvCard = ({ cv, onEdit, onView }: { cv: Cv; onEdit: () => void; onView: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white/5 backdrop-blur-md rounded-lg p-4 shadow-md border border-white/10"
  >
    <div className="flex items-center justify-between py-2">
      <span className="text-lg font-semibold text-white">{cv.title}</span>
      <div className="space-x-2">
        <Button size="sm" onClick={onEdit} className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300">
          Edit
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onView}
          className="bg-gray-700/50 text-white hover:bg-gray-700 hover:text-gray-200 border-gray-700/50"
        >
          View
        </Button>
        {/* Add delete button with appropriate logic */}
      </div>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  const [userCvs, setUserCvs] = useState<Cv[]>([]);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      router.push('/login');
      return;
    }

    const fetchCvs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/cvs?userId=${user.id}`); // Your backend API
        if (!response.ok) {
          throw new Error(`Failed to fetch CVs: ${response.status}`);
        }
        const data = await response.json();
        setUserCvs(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch CVs.');
      } finally {
        setLoading(false);
      }
    };

    fetchCvs();
  }, [router, user?.id]);

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

  const handleCreateNewCv = () => {
    router.push('/cvs/new');
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">
        Welcome, {user?.name || 'User'}!
      </h1>

      <Card className="bg-gray-800/80 backdrop-blur-md border border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Your CVs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {userCvs.length > 0 ? (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userCvs.map((cv) => (
                  <CvCard
                    key={cv.id}
                    cv={cv}
                    onEdit={() => router.push(`/cvs/${cv.id}/edit`)}
                    onView={() => router.push(`/cvs/${cv.id}/view`)}
                  />
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <p className="text-gray-400">You haven't created any CVs yet.</p>
          )}
          <Button
            onClick={handleCreateNewCv}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Create New CV
          </Button>
        </CardContent>
      </Card>

      {user?.role === 'admin' && (
        <Card className="bg-gray-800/80 backdrop-blur-md border border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Admin Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => router.push('/admin/users')}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Manage Users
            </Button>
            <Button
              onClick={() => router.push('/admin/admins')}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Manage Admins
            </Button>
            {/* Add other admin-specific actions */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}