import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface StorySectionProps {
  subtitle?: string;
  title: string;
  description: string;
  linkText: string;
  linkHref?: string;
  imageUrl: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

export default function StorySection({
  subtitle,
  title,
  description,
  linkText,
  linkHref = '#',
  imageUrl,
  imageAlt = 'Story image',
  imagePosition = 'left',
}: StorySectionProps) {
  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative">
        <div
          className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${
            imagePosition === 'right' ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* Image */}
          <div className="w-full md:w-1/2 relative aspect-square max-h-[600px] bg-gray-100 overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            {subtitle && (
              <h3 className="text-[13px] md:text-[14px] font-medium uppercase tracking-wider text-gray-800 mb-3 md:mb-4">
                {subtitle}
              </h3>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase tracking-tight text-black mb-6 whitespace-pre-line leading-[1.1] max-w-[500px]">
              {title}
            </h2>
            <p className="text-[15px] md:text-base text-gray-800 leading-relaxed font-sans mb-8 max-w-[460px]">
              {description}
            </p>
            <Link
              href={linkHref}
              className="inline-flex items-center group text-black font-extrabold uppercase tracking-tight text-[14px] md:text-[15px]"
            >
              <ChevronRight
                strokeWidth={3}
                className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1"
              />
              {linkText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
