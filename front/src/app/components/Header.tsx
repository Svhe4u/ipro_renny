// src/app/components/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link href="/">MyLogo</Link>
      </div>

      {/* Navigation */}
      <nav className="flex gap-4">
        <Link href="/login" className="hover:underline">Login</Link>
        <Link href="/register" className="hover:underline">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
