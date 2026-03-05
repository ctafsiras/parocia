'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const inspirationItems = [
  {
    id: 1,
    image: '/hero-slide-1.webp',
    title: 'HAIR BY SCHWARZKOPFPRO 2026',
    link: '#',
  },
  {
    id: 2,
    image: '/hero-slide-2.webp',
    title: 'TRENDS FROM ASIA',
    link: '#',
  },
  {
    id: 3,
    image: '/hero-slide-3.webp',
    title: '40 BRAIDS CAPPADOCIA',
    link: '#',
  },
  {
    id: 4,
    image: '/hero-slide-1.webp',
    title: 'ESSENTIAL LOOKS 2026',
    link: '#',
  },
  {
    id: 5,
    image: '/hero-slide-2.webp',
    title: 'STREET STYLE INSPIRATION',
    link: '#',
  },
  {
    id: 6,
    image: '/hero-slide-3.webp',
    title: 'SALON EXCLUSIVE',
    link: '#',
  },
];

export default function InspirationSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(inspirationItems.length / itemsPerPage);

  return (
    <section className="relative w-full bg-white py-16 md:py-24 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>

      {/* Background Animated Text */}
      <div className="absolute top-1/2 left-0 w-[200%] -translate-y-1/2 pointer-events-none flex z-0 select-none">
        <div className="animate-marquee flex whitespace-nowrap pt-8 md:pt-16">
          <span className="text-[12rem] md:text-[18rem] lg:text-[20rem] font-black text-black uppercase tracking-tighter leading-none pr-32">
            PAROCIA
          </span>
          <span className="text-[12rem] md:text-[18rem] lg:text-[20rem] font-black text-black uppercase tracking-tighter leading-none pr-32">
            PAROCIA
          </span>
          <span className="text-[12rem] md:text-[18rem] lg:text-[20rem] font-black text-black uppercase tracking-tighter leading-none pr-32">
            PAROCIA
          </span>
          <span className="text-[12rem] md:text-[18rem] lg:text-[20rem] font-black text-black uppercase tracking-tighter leading-none pr-32">
            PAROCIA
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Header content */}
        <div className="text-center mb-10 md:mb-14 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-xl">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-[#555] mb-2 md:mb-4">
            HAIR BY SCHWARZKOPFPRO 2026
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
            EXPLORE MORE INSPIRATION
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Slides */}
          <div className="w-full px-2 md:px-4">
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="flex-none w-full flex justify-center space-x-4 md:space-x-8"
                  >
                    {inspirationItems
                      .slice(
                        pageIndex * itemsPerPage,
                        (pageIndex + 1) * itemsPerPage,
                      )
                      .map((item) => (
                        <Link
                          key={item.id}
                          href={item.link}
                          className="group flex flex-col flex-1 min-w-0 hover:opacity-90 transition-opacity"
                        >
                          <div className="relative aspect-4/5 w-full bg-gray-100 overflow-hidden mb-4 shadow-lg">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <h4 className="text-sm md:text-base font-bold uppercase tracking-wide text-[#1a1a1a] bg-white/90 backdrop-blur-sm self-start pr-4 py-1">
                            {item.title}
                          </h4>
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-3 mt-12 bg-white/80 backdrop-blur-sm mx-auto w-max px-4 py-2 rounded-full">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-black scale-110'
                    : 'bg-black/30 hover:bg-black/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
