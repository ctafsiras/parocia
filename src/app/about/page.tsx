import type { Metadata } from 'next';
import Header from '@/components/main/Header';
import Footer from '@/components/main/Footer';
import AboutHero from '@/components/about/AboutHero';
import BrandHeritageSection from '@/components/about/BrandHeritageSection';
import PhilosophySection from '@/components/about/PhilosophySection';
import IngredientsSection from '@/components/about/IngredientsSection';
import SustainabilitySection from '@/components/about/SustainabilitySection';
import AmbassadorsSection from '@/components/about/AmbassadorsSection';
import AboutCtaSection from '@/components/about/AboutCtaSection';

export const metadata: Metadata = {
  title: 'About Us — Parocia',
  description:
    'Learn about Parocia: our founding story, philosophy, key ingredients, sustainability commitments, and the faces who represent our brand.',
  openGraph: {
    title: 'About Us — Parocia',
    description:
      'Learn about Parocia: our founding story, philosophy, key ingredients, sustainability commitments, and the faces who represent our brand.',
    type: 'website',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Header overlays the hero */}
      <div className="relative">
        <Header />
        <AboutHero />
      </div>

      <main>
        <BrandHeritageSection />
        <PhilosophySection />
        <IngredientsSection />
        <SustainabilitySection />
        <AmbassadorsSection />
        <AboutCtaSection />
      </main>

      <Footer />
    </>
  );
}
