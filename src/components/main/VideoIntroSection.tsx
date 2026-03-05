import Image from 'next/image';
import { Play } from 'lucide-react';

interface VideoIntroSectionProps {
  subtitle: string;
  title: string;
  imageUrl: string;
  imageAlt?: string;
  videoUrl?: string; // Potential for video integration
}

export default function VideoIntroSection({
  subtitle,
  title,
  imageUrl,
  imageAlt = 'Video Introduction',
}: VideoIntroSectionProps) {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        {/* Header Block */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-[14px] md:text-[16px] font-medium uppercase tracking-[0.2em] text-black mb-4">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-black leading-tight">
            {title}
          </h2>
        </div>

        {/* Video/Image Placeholder */}
        <div className="w-full max-w-6xl relative group cursor-pointer overflow-hidden rounded-sm shadow-lg">
          <div className="relative aspect-video w-full bg-gray-100">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-black flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
              </div>
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
