import { Geist, Geist_Mono } from "next/font/google";
import { DataContextProvider } from "@/contexts/DataContext";
import "./globals.css";
import Navbar from "@/components/nono";
import { getStaticData } from "@/lib/staticData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  Image:"/images/logo.png",
  title: "Forni Engineering",
  description: "Forni Engineering is a full-service engineering firm.",
};

export default async function RootLayout({ children }) {
  const initialData = await getStaticData();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataContextProvider initialData={initialData}>
          <Navbar />
          <main>{children}</main>
        </DataContextProvider>
      </body>
    </html>
  );
}
