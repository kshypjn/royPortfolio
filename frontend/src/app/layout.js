import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Header from './components/Header';
import HamburgerMenu from './components/HamburgerMenu';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aditya Roy | Portfolio",
  description: "Portfolio of journalist Aditya Roy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black min-h-screen`}> 
        {/* Left sidebar containing hamburger menu, division line, and 'A' logo */}
        <div className="fixed left-0 top-0 h-full z-50 flex flex-col items-center" style={{width: '72px'}}>
          {/* Hamburger menu at top */}
          <div className="pt-8">
            <HamburgerMenu />
          </div>
          
          {/* Vertical division line */}
          <div className="absolute right-0 top-0 h-full w-px bg-gray-400 transition-transform hover:translate-x-1" style={{opacity: 0.5}} />
          
          {/* 'A' Logo positioned at bottom */}
          <div className="flex-1 flex flex-col justify-end items-center">
            <Link href="/" className="mb-12 pointer-events-auto" aria-label="Home">
              <span className="text-3xl md:text-4xl lg:text-5xl font-serif text-black transform -rotate-90 transition-all hover:scale-110" style={{lineHeight: 1}}>A</span>
            </Link>
          </div>
        </div>

        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
