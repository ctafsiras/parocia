'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface SocialFeedItem {
  id: string | number;
  imageUrl: string;
  itemHandle: string;
}

export interface SocialFeedSectionProps {
  title: string;
  handle: string;
  items: SocialFeedItem[];
  buttonText: string;
  buttonHref?: string;
}

export default function SocialFeedSection({
  title,
  handle,
  items,
  buttonText,
  buttonHref = '#',
}: SocialFeedSectionProps) {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-extrabold uppercase tracking-tight text-black mb-4">
            {title}
          </h2>
          <p className="text-[14px] md:text-[15px] font-bold text-black tracking-wide">
            {handle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5 mb-12">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
            >
              <Image
                src={item.imageUrl}
                alt={`Social post by ${item.itemHandle}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay Handle */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black/40 to-transparent">
                <span className="text-[12px] md:text-[13px] text-white font-medium">
                  {item.itemHandle}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="flex justify-center">
          <Link
            href={buttonHref}
            className="bg-[#5e4141] text-white font-medium px-10 py-3 rounded-none hover:bg-[#4d3535] transition-colors inline-block text-[15px]"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
