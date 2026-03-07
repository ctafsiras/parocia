import { Leaf, Sparkles, Shield, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface PhilosophyValue {
  icon: LucideIcon;
  label: string;
  heading: string;
  body: string;
}

const VALUES: PhilosophyValue[] = [
  {
    icon: Leaf,
    label: 'NATURE',
    heading: 'ROOTED IN THE NATURAL WORLD',
    body: 'Every ingredient we choose is selected for its proven efficacy and its compatibility with the body. We never introduce a synthetic when nature offers a superior alternative.',
  },
  {
    icon: Sparkles,
    label: 'CRAFT',
    heading: 'UNCOMPROMISING IN CRAFT',
    body: 'Our formulations pass through dozens of iterations before reaching you. Texture, scent, absorption — each dimension is refined until nothing can be improved.',
  },
  {
    icon: Shield,
    label: 'INTEGRITY',
    heading: 'TRANSPARENT BY DESIGN',
    body: 'We publish every ingredient, every sourcing decision, and every third-party test result. You should always know exactly what you are putting on your skin.',
  },
  {
    icon: Heart,
    label: 'COMMUNITY',
    heading: 'PEOPLE AT THE CENTRE',
    body: 'From the farmers who grow our botanicals to the artisans who hand-fill our bottles, we build lasting partnerships grounded in fair pay and shared purpose.',
  },
];

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="w-full bg-[#f9f8f6] py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 font-sans">
            OUR BELIEFS
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-black leading-[1.05]">
            A PHILOSOPHY BUILT TO LAST
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {VALUES.map(({ icon: Icon, label, heading, body }) => (
            <div
              key={label}
              className="flex flex-col items-start pt-8 pb-8 px-0 border-t border-gray-200"
            >
              <div className="mb-5">
                <Icon
                  strokeWidth={1.5}
                  className="w-7 h-7 text-[#1a1a1a]"
                />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-3 font-sans">
                {label}
              </p>
              <h3 className="text-[16px] font-extrabold uppercase tracking-tight text-black mb-4 leading-snug font-sans">
                {heading}
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed font-sans">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
