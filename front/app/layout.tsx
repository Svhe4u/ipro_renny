import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CV Maker',
  description: 'Create professional CVs easily.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-background')}>
        {children}
      </body>
    </html>
  );
}