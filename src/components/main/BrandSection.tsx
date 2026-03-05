'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const brands = [
  {
    id: 1,
    image: '/hero-slide-1.webp',
    category: 'Hair Colour',
    title: 'IGORA',
    description:
      'IGORA offers outstanding performance, even in the most challenging situations.',
  },
  {
    id: 2,
    image: '/hero-slide-2.webp',
    category: 'Hair Colour',
    title: 'BLONDME COLOUR',
    description:
      "Overcome any blonde challenge with our unique hair colour range, offering superior quality and flexibility that can be tailored to all your clients' individual needs.",
  },
  {
    id: 3,
    image: '/hero-slide-3.webp',
    category: 'Hair Care',
    title: 'BLONDME CARE',
    description:
      'Discover BLONDME Care, a range that redefines blonde haircare with cutting-edge BONDFINITY TECHNOLOGY that cater to all blond hair types.',
  },
  {
    id: 4,
    image: '/hero-slide-1.webp',
    category: 'Hair Care',
    title: 'BONACURE',
    description:
      'Learn more about how Bonacure embraces clean beauty and high-performing products that are free from compromise and full of promise.',
  },
  {
    id: 5,
    image: '/hero-slide-2.webp',
    category: 'Styling',
    title: 'OSiS+',
    description:
      'Discover OSiS+ - the creative styling range that lets you break boundaries and create truly unique looks.',
  },
  {
    id: 6,
    image: '/hero-slide-3.webp',
    category: 'Hair Care',
    title: 'FIBRE CLINIX',
    description:
      'Experience our most advanced and powerful repair technology for complete hair transformation.',
  },
  {
    id: 7,
    image: '/hero-slide-1.webp',
    category: 'Men',
    title: '[3D]MEN',
    description:
      '100% engineered for men. Discover our complete care and styling range for fundamental hair needs.',
  },
  {
    id: 8,
    image: '/hero-slide-2.webp',
    category: 'Colour',
    title: 'CHROMA ID',
    description:
      'Express your true colour identity with our first 100% customizable, semi-permanent mix and tone colour system.',
  },
];

export default function BrandSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const imageRef = useRef<HTMLDivElement>(null);
  const [arrowTop, setArrowTop] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }

      // Calculate top position for arrows to align with the title
      if (imageRef.current) {
        // height of image + margin bottom (24px) + category height (approx 20px) + half title height (approx 16px)
        const imageHeight = imageRef.current.offsetHeight;
        setArrowTop(imageHeight + 48);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    // Add a slight delay for image load
    setTimeout(handleResize, 100);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, itemsPerPage]); // Recalculate if layout changes

  const totalPages = Math.ceil(brands.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-360 mx-auto px-12 md:px-16 lg:px-20 relative">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold uppercase tracking-tight text-black">
            DISCOVER OUR BRANDS
          </h2>
        </div>

        <div className="relative w-full">
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
                  className="flex-none w-full flex justify-center gap-6 md:gap-8"
                >
                  {brands
                    .slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage,
                    )
                    .map((item, idx) => (
                      <div
                        key={item.id}
                        className="flex flex-col flex-1 min-w-0"
                      >
                        <div
                          // Only attach ref to the first item of the active page to measure image height
                          ref={
                            pageIndex === currentIndex && idx === 0
                              ? imageRef
                              : null
                          }
                          className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden mb-6"
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <div className="relative flex flex-col items-start pr-4">
                          <p className="text-sm font-medium text-gray-700 mb-2 font-sans tracking-wide">
                            {item.category}
                          </p>
                          <h4 className="text-[22px] font-bold uppercase tracking-tight text-black mb-4">
                            {item.title}
                          </h4>
                          <p className="text-[15px] text-gray-600 leading-relaxed font-sans">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  {/* Fill empty spots if last page has fewer items */}
                  {Array.from({
                    length:
                      itemsPerPage -
                      brands.slice(
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

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            style={{ top: `${arrowTop}px` }}
            className="absolute -left-8 md:-left-12 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black transition-colors z-10 bg-white md:bg-transparent rounded-full shadow-sm md:shadow-none"
            aria-label="Previous slide"
          >
            <ChevronLeft strokeWidth={1} className="w-8 h-8" />
          </button>
          <button
            onClick={nextSlide}
            style={{ top: `${arrowTop}px` }}
            className="absolute -right-8 md:-right-12 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black transition-colors z-10 bg-white md:bg-transparent rounded-full shadow-sm md:shadow-none"
            aria-label="Next slide"
          >
            <ChevronRight strokeWidth={1} className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
}
