import Link from 'next/link';
import { Facebook, Instagram, Youtube, Globe, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white pt-12 pb-6 px-4 md:px-8 border-t border-gray-200 font-sans text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* BRAND NEW */}
          <div>
            <h3 className="font-bold text-base mb-6 tracking-wider uppercase">
              BRAND NEW
            </h3>
            <ul className="space-y-4 text-[13px]">
              <li>
                <Link href="#" className="hover:underline">
                  IGORA Bonding
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  BLONDME Lighteners & Glow Toners
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Bonacure Moisture Kick
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Bonacure Treatments & Sealed Ends+
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  IGORA VIBRANCE Toners
                </Link>
              </li>
            </ul>
          </div>

          {/* INSPIRATION */}
          <div>
            <h3 className="font-bold text-base mb-6 tracking-wider uppercase">
              INSPIRATION
            </h3>
            <ul className="space-y-4 text-[13px]">
              <li>
                <Link href="#" className="hover:underline uppercase">
                  HAIR BY SCHWARZKOPFPRO 2026
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline uppercase">
                  HAIR BY SCHWARZKOPFPRO 2025
                </Link>
              </li>
            </ul>
          </div>

          {/* CONSULTATION TOOLS */}
          <div>
            <h3 className="font-bold text-base mb-6 tracking-wider uppercase">
              CONSULTATION TOOLS
            </h3>
            <ul className="space-y-4 text-[13px]">
              <li>
                <Link href="#" className="hover:underline">
                  House of Color
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="inline-flex items-center hover:underline group"
                >
                  SalonLab
                  <span className="ml-1 inline-block -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[10px]">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* FOLLOW US & OTHERS */}
          <div className="space-y-10">
            {/* FOLLOW US */}
            <section>
              <h3 className="font-bold text-base mb-6 tracking-wider uppercase">
                FOLLOW US
              </h3>
              <div className="flex items-center gap-4">
                <Link href="#" className="text-[#1877F2] hover:opacity-80">
                  <Facebook size={24} fill="currentColor" />
                </Link>
                <Link href="#" className="text-[#E4405F] hover:opacity-80">
                  <Instagram size={24} />
                </Link>
                <Link href="#" className="text-[#E60023] hover:opacity-80">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.372 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.131 0 3.768-2.247 3.768-5.49 0-2.87-2.061-4.877-5.008-4.877-3.411 0-5.413 2.558-5.413 5.203 0 1.03.397 2.135.892 2.735.098.12.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.36-.632-2.751-1.378l-.748 2.853c-.271 1.034-1.002 2.331-1.492 3.127C10.157 23.894 11.056 24 12 24c6.628 0 12-5.372 12-12S18.628 0 12 0z" />
                  </svg>
                </Link>
                <Link href="#" className="text-[#FF0000] hover:opacity-80">
                  <Youtube size={24} fill="currentColor" />
                </Link>
                <Link href="#" className="text-black hover:opacity-80">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M12.525.02c1.31-.032 2.61.1 3.84.4V4.7c-1.13-.15-2.26-.15-3.39-.15v3.4c1.17.03 2.34.03 3.51.03-.1.45-.19.9-.32 1.34h-3.19v12.2c-.1.35-.16.7-.16 1.05v.26c-.03 1.61-1.31 2.9-2.92 2.9h-1.04c-1.61 0-2.9-1.29-2.9-2.9v-2.08c0-1.61 1.31-2.93 2.92-2.9h1.01c.52 0 1.01.13 1.43.35V0c1.07.02 2.14.02 3.21.02z" />
                  </svg>
                </Link>
              </div>
            </section>

            {/* SELECT COUNTRY */}
            <section>
              <h3 className="font-bold text-base mb-4 tracking-wider uppercase">
                SELECT COUNTRY
              </h3>
              <div className="flex items-center gap-1.5 font-bold cursor-pointer hover:underline text-[13px]">
                <Globe size={16} strokeWidth={2.5} />
                <span>International</span>
              </div>
            </section>

            {/* SALON FINDER */}
            <section>
              <h3 className="font-bold text-base mb-4 tracking-wider uppercase">
                SALON FINDER
              </h3>
              <div className="flex items-center gap-1.5 font-bold cursor-pointer hover:underline text-[13px]">
                <ArrowRight size={18} />
                <span className="uppercase">FIND YOUR NEAREST salon</span>
              </div>
            </section>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] font-medium uppercase text-gray-700">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Link href="#" className="hover:underline">
              IMPRINT
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:underline">
              TERMS OF USE
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:underline">
              PRIVACY STATEMENT
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:underline">
              COOKIE POLICY
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:underline">
              NOTE FOR U.S. RESIDENTS
            </Link>
          </div>
          <div className="whitespace-nowrap">
            &copy; 2026 Henkel AG & Co. KGaA
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
