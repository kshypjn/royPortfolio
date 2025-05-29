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
      <section className="w-full max-w-7xl mx-auto">
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
                <Link
                  key={id}
                  href={URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block focus:outline-none"
                  tabIndex={0}
                >
                  <div className="w-full">
                    <div className="relative w-full aspect-[4/3] mb-4">
                      <Image
                        src={imageUrl}
                        alt={Title || 'Article Image'}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-xl transition-transform duration-200 group-hover:scale-[1.02] group-focus:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        priority={false}
                      />
                    </div>
                    <div className="mb-1 text-sm font-serif italic text-[#8a7c54]">
                      {PublicationDate && (
                        <>On {new Date(PublicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-serif font-normal mb-3 leading-tight text-black transition-colors group-hover:text-[#8a7c54] group-focus:text-[#8a7c54]">
                      {Title}
                    </h3>
                    <hr className="border-t border-gray-200 mb-2" />
                    {tags && tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-1">
                        {tags.map(tag => (
                          <span key={tag.id} className="rounded-full bg-black/90 text-white text-[10px] font-sans uppercase px-3 py-1 tracking-widest">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-block align-middle ml-1 text-black/60 group-hover:text-black group-focus:text-black transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5h6m0 0v6m0-6L10 16l-4 4-2-2 4-4L21 5Z"/></svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}