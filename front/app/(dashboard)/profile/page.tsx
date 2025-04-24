'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { removeUser } from '@/lib/auth';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setName(JSON.parse(storedUser).name || '');
      setEmail(JSON.parse(storedUser).email || '');
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      if (!user?.id) return;
      const response = await fetch(`/api/users/${user.id}`, { // Your backend API
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ ...user, name, email }));
        setUser({ ...user, name, email });
        toast({
          title: 'Profile updated!',
          description: 'Your profile information has been updated.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Update failed.',
          description: data.message || 'Something went wrong updating your profile.',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Update error.',
        description: error.message || 'There was an error updating your profile.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    removeUser();
    router.push('/login');
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen text-white">Loading profile...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Your Profile</h1>
      <Card className="bg-gray-800/80 backdrop-blur-md border border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-900 border-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900 border-gray-700"
              disabled
            />
            <p className="text-sm text-gray-400 mt-1">You cannot change your email address.</p>
          </div>
          <Button onClick={handleUpdateProfile} className="bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Profile'
            )}
          </Button>
        </CardContent>
      </Card>

      <Button onClick={handleLogout} variant="destructive" className="bg-red-500 hover:bg-red-600 text-white">
        Logout
      </Button>
    </div>
  );
}