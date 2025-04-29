import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold">CV Maker</div>

        {/* Navigation */}
        <nav className="space-x-4">
          <Link href="/" className="text-lg hover:text-blue-400">
            Home
          </Link>
          <Link href="/cv-maker" className="text-lg hover:text-blue-400">
            CV Maker
          </Link>
          {/* Replace with login/logout logic later */}
          <Link href="/login" className="text-lg hover:text-blue-400">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
