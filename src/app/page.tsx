import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';

export default function Page() {
  return (
    <>
      {/* Header + Hero share the same visual space */}
      <div className="relative">
        <Header />
        <HeroCarousel />
      </div>

      {/* Future page sections go here */}
      <main></main>
    </>
  );
}
