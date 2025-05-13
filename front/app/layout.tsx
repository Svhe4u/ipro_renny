import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { User, LogOut, FileText, Menu, X } from "lucide-react";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create professional resumes in minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur"></div>
                  <div className="relative flex items-center">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                      Resume Builder
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                  Templates
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                  Features
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                  Pricing
                </a>
                <div className="h-6 w-px bg-gray-200"></div>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200">
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="hidden md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Templates
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Features
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Pricing
              </a>
              <div className="border-t border-gray-200 my-2"></div>
              <button className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <User className="h-5 w-5 mr-2" />
                Profile
              </button>
              <button className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </nav>
        <div className="pt-16">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
