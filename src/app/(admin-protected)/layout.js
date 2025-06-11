"use client"; // This component must be a Client Component

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link"; // For navigation links

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession(); // Get session data and status
  const router = useRouter(); // Router hook for redirection

  // Effect to handle redirection based on authentication status
  useEffect(() => {
    if (status === "loading") return; // Do nothing while session status is loading
    if (!session) {
      // If there is no session (user is not authenticated), redirect to login page
      router.push("/admin/login");
    }
  }, [session, status, router]); // Depend on session, status, and router

  // Render a loading state or nothing if session is still loading or user is not authenticated
  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading admin panel...</p>
      </div>
    );
  }

  // If user is authenticated, render the admin layout with sidebar and content
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <Link href="/admin/dashboard" className="block text-gray-300 hover:text-white">
                Dashboard Home
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/articles" className="block text-gray-300 hover:text-white">
                Manage Articles
              </Link>
            </li>
            {/* Add more admin links here as needed */}
          </ul>
        </nav>
        <div className="mt-auto">
          <p className="text-sm mb-2">Logged in as: {session.user.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })} // Sign out and redirect to login
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">{children}</div> {/* Children will be the admin pages */}
      </main>
    </div>
  );
} 