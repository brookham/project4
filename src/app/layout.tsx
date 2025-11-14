import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project 4",
  description: "Brook Hamilton2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
