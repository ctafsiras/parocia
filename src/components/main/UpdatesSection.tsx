import Image from 'next/image';
import Link from 'next/link';

export interface UpdateItem {
  id: string | number;
  imageUrl: string;
  imageAlt?: string;
  title: string;
  linkHref?: string;
}

export interface UpdatesSectionProps {
  subtitle: string;
  title: string;
  items: UpdateItem[];
}

export default function UpdatesSection({
  subtitle,
  title,
  items,
}: UpdatesSectionProps) {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col text-center">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-[13px] md:text-[14px] font-medium uppercase tracking-wider text-gray-800 mb-2 md:mb-3">
            {subtitle}
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase tracking-tight text-black">
            {title}
          </h2>
        </div>

        {/* Grid of items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full text-left">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.linkHref || '#'}
              className="group flex items-center gap-4 md:gap-6"
            >
              {/* Image Container */}
              <div className="relative w-1/2 aspect-square bg-gray-100 overflow-hidden shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Container */}
              <div className="w-1/2 shrink-0 pr-4">
                <h4 className="text-[15px] md:text-[16px] font-extrabold uppercase tracking-tight text-black leading-snug">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
