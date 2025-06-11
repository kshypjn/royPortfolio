// frontend/src/app/admin/dashboard/page.js
// This can be a Client Component or Server Component.
// Making it a Client Component for simplicity, as it's part of the authenticated client-side layout.
"use client";

export default function AdminDashboardPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Admin Dashboard!</h2>
      <p className="text-gray-600 mb-4">
        Use the sidebar navigation to manage your content.
      </p>
      <p className="text-gray-600">
        Start by going to <a href="/admin/articles" className="text-blue-600 hover:underline">Manage Articles</a>.
      </p>
    </div>
  );
} 