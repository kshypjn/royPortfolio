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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] mb-12">
        <div className="prose lg:prose-xl dark:prose-invert">
          <h1 className="text-4xl font-bold mb-8">About Me</h1>
          <BlocksRenderer content={content} />
        </div>
      </section>
    </main>
  );
} 