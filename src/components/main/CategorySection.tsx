import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    image: '/hero-slide-1.webp',
    title: 'DISCOVER THE\nLATEST BLOG',
    link: '#',
  },
  {
    id: 2,
    image: '/hero-slide-2.webp',
    title: 'HAIR BY\nSCHWARZKOPFPRO\n2026',
    link: '#',
  },
  {
    id: 3,
    image: '/hero-slide-3.webp',
    title: 'BRANDS &\nPRODUCTS',
    link: '#',
  },
];

export default function CategorySection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-14">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a] mb-2">
            WELCOME
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
            WHAT ARE YOU SEARCHING FOR?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mt-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="flex items-center gap-6 group hover:opacity-90 transition-opacity"
            >
              <div className="relative w-36 h-36 md:w-32 md:h-32 lg:w-40 lg:h-40 shrink-0 bg-gray-100 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title.replace('\n', ' ')}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h4 className="text-sm lg:text-base font-bold uppercase leading-snug tracking-wide text-[#1a1a1a] whitespace-pre-line">
                {category.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
