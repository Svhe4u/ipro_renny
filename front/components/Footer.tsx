// components/Footer.tsx

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }
  