import Image from 'next/image';

interface ChangeMakerItem {
  header: string;
  description: string;
}

interface ChangeMakersSectionProps {
  title: string;
  items: ChangeMakerItem[];
  footerHeader?: string;
  footerText?: string;
  imageUrl: string;
  imageAlt?: string;
}

export default function ChangeMakersSection({
  title,
  items,
  footerHeader,
  footerText,
  imageUrl,
  imageAlt = 'Change Makers',
}: ChangeMakersSectionProps) {
  return (
    <section className="w-full bg-white py-16 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="w-full md:w-[45%] flex flex-col pt-4">
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-black mb-10 leading-tight">
              {title}
            </h2>

            <div className=" space-y-8">
              {items.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <h3 className="text-[16px] font-bold uppercase tracking-wider text-black mb-4">
                    {item.header}
                  </h3>
                  <p className="text-[15px] text-black leading-relaxed max-w-[400px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {(footerHeader || footerText) && (
              <div className="mt-12 flex flex-col">
                {footerHeader && (
                  <h3 className="text-[14px] font-bold uppercase tracking-wider text-black mb-2">
                    {footerHeader}
                  </h3>
                )}
                {footerText && (
                  <p className="text-[15px] text-black leading-relaxed">
                    {footerText.split(' ').map((word, i) => (
                      <span
                        key={i}
                        className={word === 'TOGETHER' ? 'font-bold' : ''}
                      >
                        {word}{' '}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="w-full md:w-[55%] relative aspect-4/5 bg-gray-100">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
