import AboutPageClient from './AboutPageClient';

async function getAboutMeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about-me?populate=*`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch About Me data");
  return res.json();
}

export default async function AboutPage() {
  const aboutMe = await getAboutMeData();
  return <AboutPageClient aboutMe={aboutMe} />;
} 