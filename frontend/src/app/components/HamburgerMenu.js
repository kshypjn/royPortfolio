'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger icon */}
      <button
        className="flex flex-col gap-1 group cursor-pointer"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <span className="block w-8 h-1 bg-black rounded transition-colors group-hover:bg-blue-600"></span>
        <span className="block w-8 h-1 bg-black rounded transition-colors group-hover:bg-blue-600"></span>
        <span className="block w-8 h-1 bg-black rounded transition-colors group-hover:bg-blue-600"></span>
      </button>
      {/* Overlay menu */}
      {open && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
          {/* Close X icon on the left */}
          <button
            className="mt-8 ml-8 w-12 h-12 flex items-center justify-center text-black bg-white rounded-full shadow-lg hover:bg-gray-100 transition self-start cursor-pointer"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="8" y1="8" x2="24" y2="24" stroke="black" strokeWidth="2.5" />
              <line x1="24" y1="8" x2="8" y2="24" stroke="black" strokeWidth="2.5" />
            </svg>
          </button>
          <nav className="flex flex-1 flex-col items-center justify-center gap-10">
            <Link href="/" className="text-3xl font-bold tracking-widest text-white hover:underline underline-offset-8 transition-all" onClick={() => setOpen(false)}>
              HOME
            </Link>
            <Link href="/about" className="text-3xl font-bold tracking-widest text-white hover:underline underline-offset-8 transition-all" onClick={() => setOpen(false)}>
              ABOUT ME
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
