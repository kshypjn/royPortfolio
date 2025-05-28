import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image'; // Import Next.js Image component
import Link from 'next/link';   // Import Next.js Link component for navigation

async function getAboutMeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about-me`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch About Me data');
  }

  return res.json();
}

async function getArticles() {
  // Using populate=* for Strapi v5 to get all immediate relations (like images and tags)
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate=*`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Articles data');
  }

  return res.json();
}

export default async function Home() {
  const aboutMe = await getAboutMeData();
  const articlesData = await getArticles(); // Fetch articles data

  const { content } = aboutMe.data; // Correctly accessing content directly from data

  // Handle cases where About Me content might be missing or not in expected format
  if (!content || !Array.isArray(content)) {
    console.error("About Me content is missing or not in expected format:", content);
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">My Portfolio</h1>
          <h2 className="text-2xl mt-4">About Me content not available or in unexpected format.</h2>
          <p>Please ensure you&apos;ve saved and published content in Strapi&apos;s &apos;About Me&apos; section.</p>
        </div>
      </main>
    );
  }

  const articles = articlesData.data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 sm:p-6 md:p-12 bg-white">
      <section className="w-full max-w-7xl">
        {/* No heading, just the articles grid */}
        {articles.length === 0 ? (
          <p className="text-center text-lg">No articles found. Please add some articles in Strapi!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article) => {
              if (!article) return null;
              const { id, Title, URL, PublicationDate, image, tags } = article;

              const imageUrl = image?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`
                : '/no-image.jpg';

              return (
                <article key={id} className="border-b border-gray-200 pb-8 mb-8 bg-white">
                  {image && (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={imageUrl}
                        alt={Title || 'Article Image'}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <div className="mb-2 text-xs italic text-gray-500">
                    {PublicationDate && (
                      <>On {new Date(PublicationDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 leading-tight">{Title}</h3>
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map(tag => (
                        <span key={tag.id} className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {URL && (
                    <Link href={URL} target="_blank" rel="noopener noreferrer" className="text-black underline text-sm">
                      Read Full Article &rarr;
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}