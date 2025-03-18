import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      {/* Logo Section */}
      <div className="text-2xl font-bold">
        <Link href="/">MyLogo</Link>
      </div>

      {/* Auth Links */}
      <div className="space-x-4">
        <Link href="/login" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition">
          Login
        </Link>
        <Link href="/register" className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 transition">
          Register
        </Link>
        <Link href="/createCV" className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 transition">
          Create CV
        </Link>
      </div>
    </header>
  );
};

export default Header;
