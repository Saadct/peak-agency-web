import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peak Agency - Digital Excellence",
  description: "Transforming ideas into digital reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
