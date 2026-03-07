'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Ambassador {
  id: number;
  name: string;
  title: string;
  imageUrl: string;
  imageAlt?: string;
}

const AMBASSADORS: Ambassador[] = [
  {
    id: 1,
    name: 'ISABELLE MARCHAND',
    title: 'Celebrity Makeup Artist',
    imageUrl: '/hero-slide-1.webp',
    imageAlt: 'Isabelle Marchand',
  },
  {
    id: 2,
    name: 'SOFIA REYES',
    title: 'Actress & Activist',
    imageUrl: '/hero-slide-2.webp',
    imageAlt: 'Sofia Reyes',
  },
  {
    id: 3,
    name: 'CHEN LIYA',
    title: 'Fashion Editor',
    imageUrl: '/hero-slide-3.webp',
    imageAlt: 'Chen Liya',
  },
  {
    id: 4,
    name: 'AMARA OSEI',
    title: 'Skincare Educator',
    imageUrl: '/bg-3.webp',
    imageAlt: 'Amara Osei',
  },
  {
    id: 5,
    name: 'ELENA VORONOVA',
    title: 'Model & Entrepreneur',
    imageUrl: '/change_makers_group.png',
    imageAlt: 'Elena Voronova',
  },
];

export default function AmbassadorsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const imageRef = useRef<HTMLDivElement>(null);
  const [arrowTop, setArrowTop] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }

      if (imageRef.current) {
        setArrowTop(imageRef.current.offsetHeight / 2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, itemsPerPage]);

  const totalPages = Math.ceil(AMBASSADORS.length / itemsPerPage);

  const next = () => setCurrentIndex((p) => (p + 1) % totalPages);
  const prev = () => setCurrentIndex((p) => (p - 1 + totalPages) % totalPages);

  return (
    <section
      id="ambassadors"
      className="w-full bg-white py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 md:mb-16 gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 font-sans">
              FACES OF PAROCIA
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-black leading-[1.05]">
              OUR AMBASSADORS
            </h2>
          </div>
          {/* Arrow controls — desktop only, positioned next to header */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous ambassador"
              className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
            >
              <ChevronLeft strokeWidth={1.5} className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next ambassador"
              className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
            >
              <ChevronRight strokeWidth={1.5} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-full">
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="flex-none w-full flex gap-6 md:gap-8"
                >
                  {AMBASSADORS.slice(
                    pageIndex * itemsPerPage,
                    (pageIndex + 1) * itemsPerPage,
                  ).map((ambassador, idx) => (
                    <div
                      key={ambassador.id}
                      className="flex flex-col flex-1 min-w-0"
                    >
                      <div
                        ref={
                          pageIndex === currentIndex && idx === 0
                            ? imageRef
                            : null
                        }
                        className="relative aspect-3/4 w-full bg-gray-100 overflow-hidden mb-5"
                      >
                        <Image
                          src={ambassador.imageUrl}
                          alt={ambassador.imageAlt ?? ambassador.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-1.5 font-sans">
                        {ambassador.title}
                      </p>
                      <h4 className="text-[17px] font-extrabold uppercase tracking-tight text-black font-sans">
                        {ambassador.name}
                      </h4>
                    </div>
                  ))}

                  {/* Fill empty spots on last page */}
                  {Array.from({
                    length:
                      itemsPerPage -
                      AMBASSADORS.slice(
                        pageIndex * itemsPerPage,
                        (pageIndex + 1) * itemsPerPage,
                      ).length,
                  }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="flex flex-col flex-1 min-w-0"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile arrow controls */}
          <button
            onClick={prev}
            style={{ top: `${arrowTop}px` }}
            aria-label="Previous ambassador"
            className="sm:hidden absolute -left-4 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white shadow rounded-full text-gray-600 hover:text-black z-10"
          >
            <ChevronLeft strokeWidth={1.5} className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            style={{ top: `${arrowTop}px` }}
            aria-label="Next ambassador"
            className="sm:hidden absolute -right-4 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white shadow rounded-full text-gray-600 hover:text-black z-10"
          >
            <ChevronRight strokeWidth={1.5} className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-px transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-8 bg-black'
                    : 'w-4 bg-gray-300 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
