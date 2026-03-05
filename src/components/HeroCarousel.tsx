'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

interface Slide {
  image: string;
  label: string;
  heading: string;
  description: string;
  cta: string;
  ctaLink: string;
  /** If true, text is dark (for light backgrounds). Default: white text. */
  darkText?: boolean;
}

const slides: Slide[] = [
  {
    image: '/hero-slide-1.webp',
    label: 'NEW ARRIVAL',
    heading: 'RADIANCE REVIVAL COLLECTION',
    description:
      'Unlock 72 hours of deep hydration with our award-winning moisture complex. Visibly luminous skin from the very first application.',
    cta: 'EXPLORE THE RANGE',
    ctaLink: '#',
  },
  {
    image: '/hero-slide-2.webp',
    label: 'HAIRCARE',
    heading: 'SILK RESTORE PROFESSIONAL 2026',
    description:
      'A new generation of salon-grade repair. Crafted for the modern professional, designed for effortless beauty.',
    cta: 'DISCOVER NOW',
    ctaLink: '#',
    darkText: true,
  },
  {
    image: '/hero-slide-3.webp',
    label: 'BESTSELLERS',
    heading: 'YOUR DAILY ESSENTIALS — REIMAGINED',
    description:
      'New formulations featuring our exclusive Botanical-Boost Complex, delivering enhanced radiance, softness, and lasting protection.',
    cta: "SEE WHAT'S NEW",
    ctaLink: '#',
    darkText: true,
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 500);
    },
    [current, isTransitioning],
  );

  /* Auto-advance */
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];
  const textColor = slide.darkText ? '#1A1A1A' : '#fff';
  const mutedColor = slide.darkText ? '#555' : 'rgba(255,255,255,0.85)';
  const indicatorInactive = slide.darkText
    ? 'rgba(0,0,0,0.25)'
    : 'rgba(255,255,255,0.35)';
  const indicatorActive = slide.darkText ? '#1A1A1A' : '#fff';

  return (
    <section className="relative w-full h-dvh lg:h-screen lg:min-h-[600px] lg:max-h-[900px] overflow-hidden flex flex-col lg:block">
      {/* Background images — all rendered, only one visible */}
      <div className="relative w-full h-[55%] md:h-[60%] lg:h-full lg:absolute lg:inset-0 shrink-0">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: i === current && !isTransitioning ? 1 : 0,
              zIndex: i === current ? 1 : 0,
            }}
          >
            <Image
              src={s.image}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
              fill
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Text content */}
      <div className="relative lg:absolute inset-0 z-10 flex items-center bg-[#F9F9F9] lg:bg-transparent h-[45%] md:h-[40%] lg:h-full lg:pt-[80px]">
        <div className="w-full max-w-7xl mx-auto px-6 py-8 md:px-12 flex lg:justify-end">
          <div
            className="max-w-lg transition-all duration-700 ease-out"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(16px)' : 'translateY(0)',
            }}
          >
            {/* Label */}
            <p
              className="text-[10px] md:text-xs font-sans tracking-[0.25em] uppercase mb-3 md:mb-5 text-[#555] lg:text-(--desktop-muted)"
              style={{ '--desktop-muted': mutedColor } as React.CSSProperties}
            >
              {slide.label}
            </p>

            {/* Heading */}
            <h1
              className="font-heading text-3xl md:text-4xl lg:text-[3.2rem] font-semibold leading-[1.1] tracking-[0.02em] mb-4 md:mb-6 text-[#1A1A1A] lg:text-(--desktop-text)]"
              style={{ '--desktop-text': textColor } as React.CSSProperties}
            >
              {slide.heading}
            </h1>

            {/* Description */}
            <p
              className="text-sm md:text-base font-sans leading-relaxed mb-6 md:mb-8 max-w-md text-[#555] lg:text-(--desktop-muted)]"
              style={{ '--desktop-muted': mutedColor } as React.CSSProperties}
            >
              {slide.description}
            </p>

            {/* CTA */}
            <a
              href={slide.ctaLink}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-sans font-semibold tracking-[0.15em] uppercase group text-[#1a1a1a] lg:text-(--desktop-text)]"
              style={{ '--desktop-text': textColor } as React.CSSProperties}
            >
              <span className="text-sm md:text-base leading-none transition-transform duration-200 group-hover:translate-x-1">
                ›
              </span>
              {slide.cta}
            </a>
          </div>
        </div>
      </div>

      {/* ── Slide Indicators ── */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative w-8 h-0.5 rounded-full overflow-hidden transition-all duration-300 bg-[rgba(0,0,0,0.2)] lg:bg-(--indicator-inactive)]"
            style={
              {
                '--indicator-inactive': indicatorInactive,
              } as React.CSSProperties
            }
          >
            <span
              className="absolute inset-0 rounded-full transition-transform duration-300 origin-left bg-[#1a1a1a] lg:bg-(--indicator-active)]"
              style={
                {
                  '--indicator-active': indicatorActive,
                  transform: i === current ? 'scaleX(1)' : 'scaleX(0)',
                } as React.CSSProperties
              }
            />
          </button>
        ))}
      </div>
    </section>
  );
}
