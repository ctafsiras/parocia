import type { Metadata } from 'next';
import Header from '@/components/main/Header';
import HeroCarousel from '@/components/main/HeroCarousel';
import CategorySection from '@/components/main/CategorySection';
import InspirationSection from '@/components/main/InspirationSection';
import BrandSection from '@/components/main/BrandSection';
import BrandFeatureSection from '@/components/main/BrandFeatureSection';
import StorySection from '@/components/main/StorySection';
import UpdatesSection from '@/components/main/UpdatesSection';
import CtaSection from '@/components/main/CtaSection';
import ChangeMakersSection from '@/components/main/ChangeMakersSection';
import VideoIntroSection from '@/components/main/VideoIntroSection';
import SocialFeedSection from '@/components/main/SocialFeedSection';
import Footer from '@/components/main/Footer';
import { buildStaticPageMetadata } from '@/lib/seo/metadata';
import { getSiteSeoSettings, getStaticPageSeo } from '@/lib/seo/queries';
import { getJsonLdScriptPayload } from '@/lib/seo/schema';
import { getStaticPageByKey } from '@/lib/seo/static-pages';

export async function generateMetadata(): Promise<Metadata> {
  const page = getStaticPageByKey('home');
  if (!page) {
    return {};
  }

  const [siteSettings, pageSeo] = await Promise.all([
    getSiteSeoSettings(),
    getStaticPageSeo(page.key),
  ]);

  return buildStaticPageMetadata({
    page,
    pageSeo,
    siteSettings,
  });
}

export default function Page() {
  return (
    <>
      <HomepageSchemaScripts />
      {/* Header + Hero share the same visual space */}
      <div className="relative">
        <Header />
        <HeroCarousel />
      </div>

      {/* Future page sections go here */}
      <main>
        <CategorySection />
        <InspirationSection />
        <BrandSection />
        <BrandFeatureSection />
        <StorySection
          subtitle="GET TO KNOW THE STORY BEHIND"
          title="OUR NEW GLOBAL BRAND AMBASSADORS"
          description="Meet Schwarzkopf's newest ambassadors, Celebrity Hairstylist Chris Appleton and Actress & Producer Sofia Vergara!"
          linkText="FIND INFO MORE"
          imageUrl="/hero-slide-1.webp"
        />

        <UpdatesSection
          subtitle="SKILLS & INSPIRATION"
          title="READ OUR LATEST UPDATES"
          items={[
            {
              id: 1,
              imageUrl: '/hero-slide-1.webp',
              title: 'UNDERSTANDING HAIR BONDS',
              linkHref: '#',
            },
            {
              id: 2,
              imageUrl: '/hero-slide-2.webp',
              title: 'INTRODUCING OUR POLYCHROME BLONDE SERVICE',
              linkHref: '#',
            },
            {
              id: 3,
              imageUrl: '/hero-slide-3.webp',
              title: 'OUR 2026 EDUCATION SEMINAR PROGRAMME IS HERE',
              linkHref: '#',
            },
          ]}
        />
        <CtaSection
          subtitle="Looking for a Schwarzkopf Professional Hairdresser?"
          title="SEARCH FOR YOUR LOCAL SALON"
          buttonText="SALON FINDER"
          imageUrl="/bg-3.webp"
        />

        <ChangeMakersSection
          title="WE ARE CHANGE MAKERS. TOGETHER."
          items={[
            {
              header: 'WE TRANSFORM HAIR',
              description:
                'Creating innovative products, stand out colours and exciting brands – to help YOU succeed.',
            },
            {
              header: 'WE CREATE BEAUTY',
              description:
                'Developing transformational services – to strengthen YOUR offer.',
            },
            {
              header: 'WE FUEL YOUR CREATIVITY',
              description:
                'Bringing you the latest hair trends via our inspiring ambassadors and key digital influencers – enabling YOU to stand out.',
            },
          ]}
          footerHeader="WHY?"
          footerText="BECAUSE TOGETHER WE MAKE CHANGE HAPPEN"
          imageUrl="/change_makers_group.png"
        />

        <VideoIntroSection
          subtitle="ESTABLISHED IN 1898, INNOVATING EVER SINCE"
          title="SCHWARZKOPF PROFESSIONAL"
          imageUrl="/hero-slide-1.webp"
          imageAlt="Schwarzkopf Professional Intro Video"
        />

        <SocialFeedSection
          title="WANT MORE NEWS & INSPIRATION? FOLLOW US"
          handle="@schwarzkopfpro"
          buttonText="View More"
          items={[
            {
              id: 1,
              imageUrl: '/hero-slide-1.webp',
              itemHandle: '@schwarzkopfpro',
            },
            {
              id: 2,
              imageUrl: '/hero-slide-2.webp',
              itemHandle: '@schwarzkopfpro',
            },
            {
              id: 3,
              imageUrl: '/hero-slide-3.webp',
              itemHandle: '@schwarzkopfpro',
            },
            { id: 4, imageUrl: '/bg-3.webp', itemHandle: '@schwarzkopfpro' },
            {
              id: 5,
              imageUrl: '/hero-slide-1.webp',
              itemHandle: '@hairby.kala',
            },
            {
              id: 6,
              imageUrl: '/hero-slide-2.webp',
              itemHandle: '@omariikenyahair',
            },
            {
              id: 7,
              imageUrl: '/hero-slide-3.webp',
              itemHandle: '@sotiros.hair',
            },
            { id: 8, imageUrl: '/bg-3.webp', itemHandle: '@hairocity_sa' },
            {
              id: 9,
              imageUrl: '/hero-slide-1.webp',
              itemHandle: '@schwarzkopfpro',
            },
            {
              id: 10,
              imageUrl: '/hero-slide-2.webp',
              itemHandle: '@hvirby.mel',
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}

async function HomepageSchemaScripts() {
  const pageSeo = await getStaticPageSeo('home');
  const schemas = getJsonLdScriptPayload(pageSeo?.schemaMarkup);

  return schemas.map((schema, index) => (
    <script
      key={`home-schema-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ));
}
