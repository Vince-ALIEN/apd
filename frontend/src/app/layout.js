import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Église Saint-Jean-Baptiste d’Aulès",
  description: "Site officiel de restauration et de soutien",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent text-white min-h-screen overflow-x-hidden overflow-y-auto`}
      >
        {children}
      </body>
    </html>
  );
}
