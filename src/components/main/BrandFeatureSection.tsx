import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BrandFeatureSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  reverse?: boolean;
}

export default function BrandFeatureSection({
  subtitle = 'BLONDME',
  title = 'UNLEASH YOUR INNER\nGLOW',
  description = 'Experience blonde that glows from within – with improved BLONDME Lighteners and our truly acidic Glow Toner.',
  linkText = 'GO TO BRAND OVERVIEW',
  linkHref = '#',
  imageUrl = '/hero-slide-2.webp', // Using existing image as fallback
  imageAlt = 'Blonde model',
  reverse = false,
}: BrandFeatureSectionProps) {
  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-360 mx-auto px-12 md:px-16 lg:px-20 relative">
        <div
          className={`flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24 ${
            reverse ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <h3 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold uppercase tracking-tight text-[#c2a991] mb-2">
              {subtitle}
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold uppercase tracking-tight text-black mb-6 whitespace-pre-line leading-[1.1]">
              {title}
            </h2>
            <p className="text-[15px] md:text-base text-gray-700 leading-relaxed font-sans mb-8 max-w-[420px]">
              {description}
            </p>
            <Link
              href={linkHref}
              className="inline-flex items-center group text-black font-bold uppercase tracking-tight text-[15px]"
            >
              <ChevronRight
                strokeWidth={3}
                className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1"
              />
              {linkText}
            </Link>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 relative aspect-4/5 max-h-[600px] bg-gray-100 overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
