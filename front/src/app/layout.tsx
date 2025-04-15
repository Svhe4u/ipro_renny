import type { ReactNode } from "react";
import Header from "./components/Header";
import "./styles.css"; // Ensure global styles are applied

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
