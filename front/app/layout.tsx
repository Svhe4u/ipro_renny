import { Inter, Roboto_Mono } from 'next/font/google';
import { Providers } from './providers';
import ResumeHeader from '@/components/ResumeHeader';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <Providers>
          <div className="antialiased min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <ResumeHeader />
            <main className="flex-1 w-full">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}