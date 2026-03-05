'use client';

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
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background images — all rendered, only one visible */}
      {slides.map((s, i) => (
        <div
          key={s.image}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: i === current && !isTransitioning ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      ))}

      {/* Text content */}
      <div
        className="absolute inset-0 z-10 flex items-center"
        style={{ paddingTop: '80px' }}
      >
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-12 flex justify-end">
          <div
            className="max-w-lg transition-all duration-700 ease-out"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(24px)' : 'translateY(0)',
            }}
          >
            {/* Label */}
            <p
              className="text-xs font-sans tracking-[0.25em] uppercase mb-5"
              style={{ color: mutedColor }}
            >
              {slide.label}
            </p>

            {/* Heading */}
            <h1
              className="font-heading text-4xl md:text-5xl lg:text-[3.2rem] font-semibold leading-[1.1] tracking-[0.02em] mb-6"
              style={{ color: textColor }}
            >
              {slide.heading}
            </h1>

            {/* Description */}
            <p
              className="text-sm md:text-base font-sans leading-relaxed mb-8 max-w-md"
              style={{ color: mutedColor }}
            >
              {slide.description}
            </p>

            {/* CTA */}
            <a
              href={slide.ctaLink}
              className="inline-flex items-center gap-2 text-sm font-sans font-semibold tracking-[0.15em] uppercase group"
              style={{ color: textColor }}
            >
              <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1">
                ›
              </span>
              {slide.cta}
            </a>
          </div>
        </div>
      </div>

      {/* ── Slide Indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative w-8 h-0.5 rounded-full overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: indicatorInactive,
            }}
          >
            <span
              className="absolute inset-0 rounded-full transition-transform duration-300 origin-left"
              style={{
                backgroundColor: indicatorActive,
                transform: i === current ? 'scaleX(1)' : 'scaleX(0)',
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
