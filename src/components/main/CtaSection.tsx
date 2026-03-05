import Image from 'next/image';
import Link from 'next/link';

export interface CtaSectionProps {
  subtitle?: string;
  title: string;
  buttonText: string;
  buttonHref?: string;
  imageUrl: string;
  imageAlt?: string;
  overlayClassName?: string;
}

export default function CtaSection({
  subtitle,
  title,
  buttonText,
  buttonHref = '#',
  imageUrl,
  imageAlt = 'Background image',
  overlayClassName = 'bg-black/40',
}: CtaSectionProps) {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 flex items-center justify-center overflow-hidden mt-[80px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-gray-900 m-[20px]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover opacity-80"
        />
        {/* Overlay */}
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        {subtitle && (
          <p className="text-white text-[15px] md:text-base mb-3 md:mb-4">
            {subtitle}
          </p>
        )}
        <h2 className="text-white text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase tracking-tight mb-8 md:mb-10 leading-[1.1]">
          {title}
        </h2>
        <Link
          href={buttonHref}
          className="bg-black text-white font-bold uppercase tracking-wider text-[14px] md:text-[15px] px-8 md:px-10 py-3.5 md:py-4 hover:bg-[#1a1a1a] transition-colors inline-block"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
