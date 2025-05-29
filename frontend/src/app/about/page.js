import { BlocksRenderer } from '@strapi/blocks-react-renderer';

async function getAboutMeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about-me`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch About Me data');
  }

  return res.json();
}

export default async function AboutPage() {
  const aboutMe = await getAboutMeData();
  const { content } = aboutMe.data;

  if (!content || !Array.isArray(content)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">About Me</h1>
          <h2 className="text-2xl mt-4">About Me content not available or in unexpected format.</h2>
          <p>Please ensure you&apos;ve saved and published content in Strapi&apos;s &apos;About Me&apos; section.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 bg-white">
      <section className="w-full max-w-2xl mx-auto flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold mb-4 text-center">About Me</h1>
        <BlocksRenderer content={content} />
        <div className="flex flex-col items-center gap-2 mt-6">
          <a
            href="/resume.pdf"
            download
            className="inline-block px-6 py-3 bg-black text-white font-serif rounded-lg shadow hover:bg-[#8a7c54] hover:text-black transition-colors text-lg"
          >
            Download Resume
          </a>
        </div>
      </section>
    </main>
  );
} 