// app/layout.tsx
import './globals.css'; // <== must be present at the top

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
