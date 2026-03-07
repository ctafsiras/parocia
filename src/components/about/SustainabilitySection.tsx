import Image from 'next/image';

interface SustainabilityCommitment {
  id: number;
  eyebrow: string;
  heading: string;
  body: string;
  imageUrl: string;
  imageAlt?: string;
  imagePosition: 'left' | 'right';
}

const COMMITMENTS: SustainabilityCommitment[] = [
  {
    id: 1,
    eyebrow: 'PACKAGING',
    heading: 'ZERO SINGLE-USE\nPLASTIC BY 2027',
    body: 'We have eliminated virgin plastic from our primary packaging and are on track to transition all secondary packaging to FSC-certified paper, ocean-recovered material, or refillable glass by the end of 2027. Every bottle is designed to be refilled, not discarded.',
    imageUrl: '/hero-slide-2.webp',
    imageAlt: 'Sustainable packaging',
    imagePosition: 'left',
  },
  {
    id: 2,
    eyebrow: 'SOURCING',
    heading: 'REGENERATIVE FARMS\nONLY',
    body: 'We partner exclusively with farms certified under regenerative agriculture standards. These practices actively restore soil carbon, improve biodiversity, and reduce water usage — turning every purchase into a vote for a healthier planet.',
    imageUrl: '/hero-slide-3.webp',
    imageAlt: 'Regenerative farming',
    imagePosition: 'right',
  },
  {
    id: 3,
    eyebrow: 'CARBON',
    heading: 'CLIMATE POSITIVE\nACROSS OUR SUPPLY CHAIN',
    body: 'Since 2022, Parocia has been climate positive: we remove more carbon than our entire supply chain emits. We achieve this through direct investment in verified forest restoration projects, working alongside indigenous communities who protect these ecosystems.',
    imageUrl: '/bg-3.webp',
    imageAlt: 'Climate positive forests',
    imagePosition: 'left',
  },
];

export default function SustainabilitySection() {
  return (
    <section
      id="sustainability"
      className="w-full bg-[#f9f8f6] py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 font-sans">
            OUR COMMITMENT
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-black leading-[1.05]">
            BEAUTY WITHOUT COMPROMISE
          </h2>
        </div>

        {/* Alternating rows */}
        <div className="flex flex-col gap-20 md:gap-32">
          {COMMITMENTS.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${
                item.imagePosition === 'right' ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 relative aspect-4/3 bg-gray-200 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt ?? item.heading}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 font-sans">
                  {item.eyebrow}
                </p>
                <h3 className="font-heading text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase tracking-tight text-black mb-6 whitespace-pre-line leading-[1.05] max-w-[460px]">
                  {item.heading}
                </h3>
                <p className="text-[15px] text-gray-700 leading-relaxed font-sans max-w-[440px]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
