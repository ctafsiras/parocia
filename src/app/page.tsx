import Header from '@/components/main/Header';
import HeroCarousel from '@/components/main/HeroCarousel';
import CategorySection from '@/components/main/CategorySection';
import InspirationSection from '@/components/main/InspirationSection';
import BrandSection from '@/components/main/BrandSection';
import BrandFeatureSection from '@/components/main/BrandFeatureSection';
import StorySection from '@/components/main/StorySection';
import UpdatesSection from '@/components/main/UpdatesSection';
import CtaSection from '@/components/main/CtaSection';

export default function Page() {
  return (
    <>
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
          linkText="FIND OUT MORE"
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
        <StorySection
          subtitle="GET TO KNOW THE STORY BEHIND"
          title="OUR NEW GLOBAL BRAND AMBASSADORS"
          description="Meet Schwarzkopf's newest ambassadors, Celebrity Hairstylist Chris Appleton and Actress & Producer Sofia Vergara!"
          linkText="FIND OUT MORE"
          imageUrl="/hero-slide-1.webp"
        />
      </main>
    </>
  );
}
