import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, User, LogOut, File, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white border-r border-gray-800">
        <div className="flex items-center h-16 px-4 border-b border-gray-800">
          <h1 className="text-lg font-semibold">CV Maker</h1>
        </div>
        <ScrollArea className="flex-1">
          <nav className="p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push('/dashboard')}
            >
              <File className="mr-2 h-4 w-4" />
              My CVs
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push('/templates')}
            >
              <File className="mr-2 h-4 w-4" />
              Templates
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={() => router.push('/profile')}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            {user.role === 'admin' && (
              <>
                <Separator className="my-2 bg-gray-800" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800"
                  onClick={() => router.push('/admin/users')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Users
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800"
                  onClick={() => router.push('/admin/admins')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Admins
                </Button>
              </>
            )}
            <Separator className="my-2 bg-gray-800" />
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-800"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </ScrollArea>
      </aside>

      {/* Mobile Menu */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="md:hidden absolute top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-900 text-white">
          <SheetHeader className="p-4 border-b border-gray-800">
            <SheetTitle className="text-lg font-semibold">CV Maker</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1">
            <nav className="p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-gray-800"
                onClick={() => {
                  router.push('/dashboard');
                  setIsSidebarOpen(false);
                }}
              >
                <File className="mr-2 h-4 w-4" />
                My CVs
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-gray-800"
                onClick={() => {
                  router.push('/templates');
                  setIsSidebarOpen(false);
                }}
              >
                <File className="mr-2 h-4 w-4" />
                Templates
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-gray-800"
                onClick={() => {
                  router.push('/profile');
                  setIsSidebarOpen(false);
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              {user.role === 'admin' && (
                <>
                  <Separator className="my-2 bg-gray-800" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-gray-800"
                    onClick={() => {
                      router.push('/admin/users');
                      setIsSidebarOpen(false);
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Users
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-gray-800"
                    onClick={() => {
                      router.push('/admin/admins');
                      setIsSidebarOpen(false);
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admins
                  </Button>
                </>
              )}
              <Separator className="my-2 bg-gray-800" />
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-gray-800"
                onClick={() => {
                  handleLogout();
                  setIsSidebarOpen(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;