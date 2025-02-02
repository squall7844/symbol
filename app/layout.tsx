import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChangeTheme } from "@/components/Theme/ChangeTheme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ChangeTheme>{children}</ChangeTheme>
      </body>
    </html>
  );
}
