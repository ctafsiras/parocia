import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BrandHeritageSectionProps {
  eyebrow?: string;
  title?: string;
  paragraphs?: string[];
  linkText?: string;
  linkHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

export default function BrandHeritageSection({
  eyebrow = 'ESTABLISHED 1998',
  title = 'BORN FROM A\nPASSION FOR PURITY',
  paragraphs = [
    'Parocia was founded with a singular obsession: to create beauty products as honest as nature itself. Our founders spent years travelling across the globe sourcing rare botanicals, forging relationships with small-scale cultivators, and studying the chemistry of the skin.',
    'What began as a small-batch atelier in Paris has grown into a global maison — but our principles have never wavered. Every formula is designed to work in harmony with the body, not against it.',
  ],
  linkText = 'OUR FULL STORY',
  linkHref = '#',
  imageUrl = '/hero-slide-1.webp',
  imageAlt = 'Parocia brand heritage',
  imagePosition = 'left',
}: BrandHeritageSectionProps) {
  return (
    <section
      id="heritage"
      className="w-full bg-white py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div
          className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${
            imagePosition === 'right' ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* Image */}
          <div className="w-full md:w-1/2 relative aspect-4/5 max-h-[640px] bg-gray-100 overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 font-sans">
                {eyebrow}
              </p>
            )}
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[52px] font-extrabold uppercase tracking-tight text-black mb-8 whitespace-pre-line leading-[1.05] max-w-[500px]">
              {title}
            </h2>
            <div className="space-y-4 mb-10">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] text-gray-700 leading-relaxed font-sans max-w-[460px]"
                >
                  {p}
                </p>
              ))}
            </div>
            <Link
              href={linkHref}
              className="inline-flex items-center group text-black font-extrabold uppercase tracking-tight text-[13px] md:text-[14px] font-sans"
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
