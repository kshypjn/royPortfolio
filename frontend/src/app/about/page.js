// Remove "use client" and all hooks, this is a server component
import { BlocksRenderer } from '@strapi/blocks-react-renderer'; // If you use Strapi blocks

// Fetch About Me data from Strapi
async function getAboutMeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about-me`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch About Me data");
  return res.json();
}

export default async function AboutPage() {
  const aboutMe = await getAboutMeData();
  const { content } = aboutMe.data || {};

  return (
    <main className="bg-white text-[#111] min-h-screen px-5 sm:px-8 py-10 flex flex-col items-center">
      {/* Optional Profile Image */}
      {aboutMe.data?.attributes?.profileImage?.data?.attributes?.url && (
        <img
          src={aboutMe.data.attributes.profileImage.data.attributes.url}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover mb-6 shadow-sm border border-gray-100"
        />
      )}
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold font-sans text-center mb-6">About Me</h1>
      {/* About Me Text */}
      {content && (
        <div className="max-w-2xl mx-auto mb-8 text-lg font-serif leading-relaxed" style={{ lineHeight: 1.7 }}>
          {/* If using Strapi blocks */}
          <BlocksRenderer content={content} />
          {/* If not using blocks, fallback to raw JSON */}
          {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
        </div>
      )}
    </main>
  );
} 