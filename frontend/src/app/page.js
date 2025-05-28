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
          <p>Please ensure you've saved and published content in Strapi's 'About Me' section.</p>
        </div>
      </main>
    );
  }

  const articles = articlesData.data; // Accessing the articles array from Strapi's API response

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">My Portfolio</h1>
      </div>

      <section className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] mb-12">
        <div className="prose lg:prose-xl dark:prose-invert">
          <h2 className="text-3xl font-semibold mb-4">About Me</h2>
          <BlocksRenderer content={content} />
        </div>
      </section>

      <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-6 text-center">My Articles</h2>
        {articles.length === 0 ? (
          <p className="text-center text-lg">No articles found. Please add some articles in Strapi!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const { id, attributes } = article;
              // Correctly access imageUrl directly from attributes.image.url
              const imageUrl = attributes.image?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${attributes.image.url}`
                : '/no-image.jpg'; // Fallback image if none in Strapi
              const tags = attributes.tags?.data || [];

              return (
                <article key={id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  {/* Only render image div if attributes.image object exists */}
                  {attributes.image && (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={imageUrl}
                        alt={attributes.title || 'Article Image'}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{attributes.title}</h3>
                  {attributes.publicationDate && (
                    <p className="text-gray-500 text-sm mb-2">
                      Published: {new Date(attributes.publicationDate).toLocaleDateString()}
                    </p>
                  )}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map(tag => (
                        <span key={tag.id} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          {tag.attributes.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {attributes.externalLink && (
                    <Link href={attributes.externalLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Read Full Article &rarr;
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {/* You can still use this area for other content if needed */}
      </div>
    </main>
  );
}