"use client";
import { useState } from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default function AboutPageClient({ aboutMe }) {
  const data = aboutMe.data || {};
  const content = data.content;
  const introduction = data.Introduction;
  const CTAtext = data.CTAtext;
  const CTAlink = data.CTAlink;
  const sections = data.sections || [];
  const profilePicture = data.profilePicture;

  // Get best available image size
  let profilePictureUrl = null;
  if (profilePicture && profilePicture.url) {
    profilePictureUrl =
      profilePicture.formats?.medium?.url ||
      profilePicture.formats?.small?.url ||
      profilePicture.url;
    if (!profilePictureUrl.startsWith('http')) {
      profilePictureUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${profilePictureUrl}`;
    }
  }

  // Tab logic for sections (dynamic from Strapi)
  const tabNames = Array.from(new Set(sections.map(s => (s.tab || 'WORK').toUpperCase())));
  // Default to first tab
  const [activeTab, setActiveTab] = useState(tabNames[0] || 'WORK');
  const filteredSections = sections.filter(
    (section) => (section.tab || 'WORK').toUpperCase() === activeTab
  );

  return (
    <main className="bg-white min-h-screen flex flex-col items-center py-10 px-2 sm:px-0">
      <div className="w-full sm:max-w-4xl sm:bg-white sm:rounded-2xl sm:shadow-xl sm:border sm:border-gray-100 sm:p-12 flex flex-col sm:flex-row gap-0 sm:gap-12 relative p-0">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* About Me Heading */}
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-2 tracking-wide text-gray-900">ABOUT ME</h2>
          <hr className="border-t border-gray-300 mb-6 w-24" />
          {/* Introduction Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900 leading-tight">
            {introduction || "Hello, I'm [Your Name]!"}
          </h1>
          {/* Profile Image (MOBILE ONLY) */}
          {profilePictureUrl && (
            <div className="flex sm:hidden justify-center items-center w-full mb-6">
              <img
                src={profilePictureUrl}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg bg-gray-100"
                style={{ objectPosition: 'center top' }}
              />
            </div>
          )}
          {/* Main Content Blocks */}
          {content && (
            <div className="mb-8 text-lg font-serif leading-relaxed text-gray-800 max-w-2xl">
              <BlocksRenderer content={content} />
            </div>
          )}
          {/* Sections Tabs (WORK and EXPERIENCE) */}
          {sections.length > 0 && (
            <>
              <div className="flex gap-6 mb-4 mt-2 text-xs sm:text-sm font-mono tracking-widest uppercase text-gray-600">
                {tabNames.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-1 border-b-2 transition-colors duration-200 ${
                      activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
                    }`}
                  >
                    {tab.charAt(0) + tab.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
              <hr className="border-t border-gray-300 mb-6" />
              <div className="mb-8">
                {filteredSections.map((section, idx) => (
                  <div key={idx} className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 font-serif text-gray-900">{section.title}</h4>
                    {section.description && <BlocksRenderer content={section.description} />}
                  </div>
                ))}
              </div>
            </>
          )}
          {/* CTA Section */}
          {CTAtext && CTAlink && (
            <div className="mt-1 flex justify-center">
              <a
                href={CTAlink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 bg-white text-black rounded-md font-semibold shadow border border-black text-sm tracking-wide transition-all duration-200 hover:bg-black hover:text-white hover:shadow-2xl hover:-translate-y-1 focus:bg-black focus:text-white"
              >
                {CTAtext}
              </a>
            </div>
          )}
        </div>
        {/* Right: Profile Image (DESKTOP ONLY) */}
        {profilePictureUrl && (
          <div className="hidden sm:flex flex-shrink-0 justify-center items-start sm:items-center w-full sm:w-auto mt-8 sm:mt-0">
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-40 h-40 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-white shadow-lg bg-gray-100"
              style={{ objectPosition: 'center top' }}
            />
          </div>
        )}
      </div>
    </main>
  );
} 