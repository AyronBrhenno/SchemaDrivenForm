import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Schema-Driven Form",
  description: "A reusable React/Next.js component that generates complete, structured forms from a JSON-based schema.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
