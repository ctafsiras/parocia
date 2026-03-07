import Image from 'next/image';

interface Ingredient {
  id: number;
  name: string;
  origin: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    id: 1,
    name: 'BAKUCHIOL',
    origin: 'Psoralea corylifolia — India',
    description:
      'A plant-derived retinol alternative that delivers the same visible renewal without the sensitivity. Sourced from certified organic farms in Rajasthan.',
    imageUrl: '/hero-slide-1.webp',
    imageAlt: 'Bakuchiol botanical',
  },
  {
    id: 2,
    name: 'DAMASCUS ROSE',
    origin: 'Rosa damascena — Türkiye',
    description:
      'Harvested at dawn in the Valley of Roses for peak essential-oil potency. Rich in antioxidants and deeply hydrating fatty acids.',
    imageUrl: '/hero-slide-2.webp',
    imageAlt: 'Damascus rose',
  },
  {
    id: 3,
    name: 'SEA BUCKTHORN',
    origin: 'Hippophae rhamnoides — Norway',
    description:
      'Among the most vitamin-C-dense botanicals on earth. Cold-pressed to preserve its vibrant bioflavonoids and regenerative omega-7 oils.',
    imageUrl: '/hero-slide-3.webp',
    imageAlt: 'Sea buckthorn berries',
  },
];

export default function IngredientsSection() {
  return (
    <section
      id="ingredients"
      className="w-full bg-white py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-18 gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 font-sans">
              THE APOTHECARY
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-black leading-[1.05] max-w-[480px]">
              INGREDIENTS WE SWEAR BY
            </h2>
          </div>
          <p className="text-[14px] text-gray-600 leading-relaxed font-sans max-w-[360px]">
            We trace every active to its source. Below are three keystones of
            the Parocia formulation philosophy.
          </p>
        </div>

        {/* Ingredients grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {INGREDIENTS.map((ingredient) => (
            <div key={ingredient.id} className="flex flex-col">
              {/* Image */}
              <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden mb-6">
                <Image
                  src={ingredient.imageUrl}
                  alt={ingredient.imageAlt ?? ingredient.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Subtle dark bar at bottom for contrast */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Text */}
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-2 font-sans">
                {ingredient.origin}
              </p>
              <h3 className="text-[20px] font-extrabold uppercase tracking-tight text-black mb-3 font-sans">
                {ingredient.name}
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed font-sans">
                {ingredient.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
