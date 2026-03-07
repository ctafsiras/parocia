import Image from 'next/image';
import Link from 'next/link';

export interface AboutCtaSectionProps {
  imageUrl?: string;
  imageAlt?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export default function AboutCtaSection({
  imageUrl = '/hero-slide-1.webp',
  imageAlt = 'Parocia collection',
  eyebrow = 'NEXT STEPS',
  title = 'READY TO EXPERIENCE\nPAROCIA?',
  body = 'Discover the full range of formulations — each one an expression of everything you have read here.',
  primaryText = 'EXPLORE PRODUCTS',
  primaryHref = '/',
  secondaryText = 'CONTACT US',
  secondaryHref = '#',
}: AboutCtaSectionProps) {
  return (
    <section className="relative w-full py-20 md:py-32 flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50 mb-5 font-sans">
            {eyebrow}
          </p>
        )}
        <h2 className="font-heading text-4xl md:text-5xl lg:text-[52px] font-extrabold uppercase tracking-tight text-white leading-[1.05] whitespace-pre-line mb-6">
          {title}
        </h2>
        {body && (
          <p className="text-[15px] text-white/70 font-sans leading-relaxed max-w-[440px] mb-10">
            {body}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={primaryHref}
            className="bg-white text-black font-bold uppercase tracking-wider text-[13px] font-sans px-10 py-3.5 hover:bg-gray-100 transition-colors inline-block"
          >
            {primaryText}
          </Link>
          <Link
            href={secondaryHref}
            className="border border-white text-white font-bold uppercase tracking-wider text-[13px] font-sans px-10 py-3.5 hover:bg-white/10 transition-colors inline-block"
          >
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}
