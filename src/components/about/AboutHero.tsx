import Image from 'next/image';

export interface AboutHeroProps {
  imageUrl?: string;
  imageAlt?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export default function AboutHero({
  imageUrl = '/bg-3.webp',
  imageAlt = 'Parocia — About Us',
  eyebrow = 'EST. 1998',
  title = 'BEAUTY ROOTED\nIN PURPOSE',
  subtitle = 'We create luxury beauty that honours nature, empowers artisans, and endures.',
}: AboutHeroProps) {
  return (
    <section className="relative w-full h-[80vh] min-h-[540px] max-h-[900px] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay — heavier at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-14 md:pb-20">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60 mb-4 font-sans">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.0] whitespace-pre-line mb-5">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[15px] md:text-base text-white/75 font-sans leading-relaxed max-w-[460px]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-8 md:right-12 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white font-sans rotate-90 origin-center">
          Scroll
        </span>
        <div className="w-px h-10 bg-white/50" />
      </div>
    </section>
  );
}
