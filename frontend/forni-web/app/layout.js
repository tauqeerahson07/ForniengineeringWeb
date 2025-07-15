import { Geist, Geist_Mono } from "next/font/google";
import { DataContextProvider } from "@/contexts/DataContext";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Forni Engineering",
  description: "Forni Engineering is a full-service engineering firm.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataContextProvider>
          <Navbar />
          <main>{children}</main>
        </DataContextProvider>
      </body>
    </html>
  );
}
