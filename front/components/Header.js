// components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="navLinks">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
