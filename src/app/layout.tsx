import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers/app-provider";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
