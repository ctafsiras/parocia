'use client';

import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from 'react';

/* ──────────────────────────────────────────────
   Mega-menu content per nav item
   ────────────────────────────────────────────── */
interface MenuColumn {
  title: string;
  links: string[];
  /** Optional map of link label → href. Falls back to '#' when omitted. */
  hrefs?: Record<string, string>;
}

const megaMenuData: Record<string, MenuColumn[]> = {
  SKINCARE: [
    {
      title: 'By Concern',
      links: [
        'Anti-Aging',
        'Hydration',
        'Brightening',
        'Acne & Blemishes',
        'Sensitive Skin',
      ],
    },
    {
      title: 'By Product',
      links: [
        'Cleansers',
        'Serums',
        'Moisturizers',
        'Eye Creams',
        'Face Masks',
        'Sunscreen',
      ],
    },
    {
      title: 'Collections',
      links: ['Radiance Revival', 'Timeless Elixir', 'Velvet Touch'],
    },
  ],
  HAIRCARE: [
    {
      title: 'By Concern',
      links: [
        'Damage Repair',
        'Color Protection',
        'Volume & Thickness',
        'Scalp Care',
        'Frizz Control',
      ],
    },
    {
      title: 'By Product',
      links: [
        'Shampoo',
        'Conditioner',
        'Hair Masks',
        'Oils & Serums',
        'Styling',
      ],
    },
    {
      title: 'Featured',
      links: ['Silk Restore Collection', 'Keratin Complex', 'View All'],
    },
  ],
  MAKEUP: [
    {
      title: 'Face',
      links: [
        'Foundation',
        'Concealer',
        'Powder',
        'Blush',
        'Highlighter',
        'Primer',
      ],
    },
    {
      title: 'Eyes & Lips',
      links: ['Lipstick', 'Lip Gloss', 'Eyeshadow', 'Mascara', 'Eyeliner'],
    },
    {
      title: 'Collections',
      links: ['Luxe Matte', 'Satin Glow', 'Bridal Edit'],
    },
  ],
  FRAGRANCES: [
    {
      title: 'Women',
      links: ['Eau de Parfum', 'Eau de Toilette', 'Body Mists', 'Gift Sets'],
    },
    {
      title: 'Men',
      links: ['Eau de Parfum', 'Eau de Toilette', 'After Shave', 'Gift Sets'],
    },
    {
      title: 'Bestsellers',
      links: ['Noir Éternel', 'Rosé Lumière', 'Amber Velvet'],
    },
  ],
  COLLECTIONS: [
    {
      title: 'Seasonal',
      links: [
        'Spring / Summer 2026',
        'Autumn / Winter 2025',
        'Holiday Limited Edition',
      ],
    },
    {
      title: 'Signature Lines',
      links: ['Maison Parocia', 'Atelier Series', 'Heritage'],
    },
    {
      title: 'Collaborations',
      links: ['Artist Editions', 'Designer Capsules', 'View All'],
    },
  ],
  ABOUT: [
    {
      title: 'Our Story',
      links: ['Brand Heritage', 'Philosophy', 'Sustainability', 'Ingredients'],
      hrefs: {
        'Brand Heritage': '/about#heritage',
        'Philosophy': '/about#philosophy',
        'Sustainability': '/about#sustainability',
        'Ingredients': '/about#ingredients',
      },
    },
    {
      title: 'Community',
      links: ['Journal', 'Events', 'Ambassadors'],
      hrefs: {
        'Ambassadors': '/about#ambassadors',
      },
    },
    {
      title: 'Support',
      links: ['Contact Us', 'FAQs', 'Store Locator'],
    },
  ],
};

const navItems = Object.keys(megaMenuData);

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(
    null,
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const openMenu = useCallback((item: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(item);
  }, []);

  const closeMenu = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  /* Close mega-menu on scroll */
  useEffect(() => {
    const onScroll = () => setActiveMenu(null);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <header
      ref={headerRef}
      className={`absolute top-0 left-0 w-full z-50 transition-colors duration-300 ${activeMenu || isMobileOpen ? 'bg-white' : ''}`}
    >
      {/* ── Announcement Bar ── */}
      <div
        className={`relative z-50 text-center text-[10px] md:text-sm font-semibold tracking-[0.2em] uppercase py-1.5 font-sans h-[60px] md:h-[70px] flex items-center justify-center transition-colors duration-300 ${activeMenu || isMobileOpen ? 'text-[#1a1a1a] bg-white' : 'text-white bg-[#1a1a1a]'}`}
      >
        <span className="mr-1">›</span> Complimentary shipping on all orders
        over $150
      </div>

      {/* ── Main Nav Bar ── */}
      <nav
        className={`relative transition-colors duration-300 ${activeMenu || isMobileOpen ? 'bg-white' : ''}`}
      >
        {/* Nav inner */}
        <div className="flex items-center justify-between px-6 md:px-8 xl:px-12 pb-4 pt-6 md:pt-10">
          {/* Logo */}
          <Link href="/" className="shrink-0 z-50 relative">
            <span
              className="font-heading text-xl md:text-2xl xl:text-3xl font-semibold tracking-[0.04em] transition-colors duration-300"
              style={{
                color: activeMenu || isMobileOpen ? '#1A1A1A' : 'white',
              }}
            >
              PAROCIA
            </span>
          </Link>

          {/* Center nav links */}
          <ul
            className="hidden xl:flex items-center gap-8 xl:gap-10 absolute left-1/2 -translate-x-1/2"
            onMouseLeave={closeMenu}
          >
            {navItems.map((item) => (
              <li key={item} onMouseEnter={() => openMenu(item)}>
                <button
                  className="text-[16px] font-sans font-semibold tracking-[0.15em] uppercase py-2 border-b-2 transition-colors duration-300 hover:cursor-pointer"
                  style={{
                    color: activeMenu ? '#1A1A1A' : '#1A1A1A',
                    borderColor:
                      activeMenu === item
                        ? activeMenu
                          ? '#1A1A1A'
                          : '#1A1A1A'
                        : 'transparent',
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          {/* Right utilities */}
          <div className="hidden xl:flex items-center gap-6 z-10">
            <a
              href="#"
              className="text-[11px] font-sans tracking-[0.12em] uppercase transition-colors duration-300 font-semibold"
              style={{ color: activeMenu ? '#1A1A1A' : '#1a1a1a' }}
            >
              <span className="mr-1">◉</span> Store Locator
            </a>
            <a
              href="#"
              className="text-[11px] font-sans tracking-[0.12em] uppercase transition-colors duration-300 font-semibold"
              style={{ color: activeMenu ? '#1A1A1A' : '#1a1a1a' }}
            >
              Account
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="xl:hidden z-50 relative p-2 -mr-2 transition-colors duration-300"
            aria-label="Menu"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{ color: activeMenu || isMobileOpen ? '#1A1A1A' : 'white' }}
          >
            {isMobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Divider line under nav ── */}
        <div
          className="absolute bottom-0 left-0 w-full h-px transition-opacity duration-300"
          style={{
            backgroundColor: activeMenu ? '#e0ddd9' : 'rgba(255,255,255,0.2)',
          }}
        />

        {/* ── Mobile Menu Panel ── */}
        <div
          className="xl:hidden fixed inset-0 w-full h-dvh bg-white overflow-y-auto transition-all duration-400 ease-in-out z-40"
          style={{
            opacity: isMobileOpen ? 1 : 0,
            pointerEvents: isMobileOpen ? 'auto' : 'none',
          }}
        >
          {/* Pad top to account for the header (announcement + nav inner) */}
          <div
            className="flex flex-col px-6 md:px-8 pb-24 pt-[110px] md:pt-[130px] transition-transform duration-500 ease-out"
            style={{
              transform: isMobileOpen ? 'translateY(0)' : 'translateY(-20px)',
            }}
          >
            {navItems.map((item) => (
              <div
                key={item}
                className="border-b border-gray-100 last:border-b-0"
              >
                <button
                  className="w-full flex items-center justify-between py-5 text-sm md:text-base font-sans font-semibold tracking-[0.15em] uppercase text-[#1a1a1a]"
                  onClick={() =>
                    setMobileExpandedMenu(
                      mobileExpandedMenu === item ? null : item,
                    )
                  }
                >
                  {item}
                  <span className="text-xl leading-none font-light">
                    {mobileExpandedMenu === item ? '−' : '+'}
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: mobileExpandedMenu === item ? '1000px' : '0',
                    opacity: mobileExpandedMenu === item ? 1 : 0,
                  }}
                >
                  <div className="pb-6 pl-2 flex flex-col gap-6">
                    {megaMenuData[item].map((col) => (
                      <div key={col.title}>
                        <p className="text-xs md:text-sm font-sans font-bold tracking-[0.08em] text-black mb-3">
                          {col.title}
                        </p>
                        <ul className="space-y-3">
                          {col.links.map((link) => (
                            <li key={link}>
                              <a
                                href={col.hrefs?.[link] ?? '#'}
                                className="text-sm font-sans text-gray-500 hover:text-black transition-colors duration-200"
                              >
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile Utilities */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col gap-6">
              <a
                href="#"
                className="text-xs md:text-sm font-sans tracking-[0.12em] uppercase font-semibold text-[#1a1a1a]"
              >
                <span className="mr-2">◉</span> Store Locator
              </a>
              <a
                href="#"
                className="text-xs md:text-sm font-sans tracking-[0.12em] uppercase font-semibold text-[#1a1a1a]"
              >
                Account
              </a>
            </div>
          </div>
        </div>

        {/* ── Mega Menu Panel ── */}
        <div
          className="absolute top-full left-0 w-full overflow-hidden pointer-events-none"
          style={{ zIndex: 40 }}
        >
          <div
            className="bg-white pointer-events-auto transition-all duration-300 ease-in-out"
            style={{
              transform: activeMenu ? 'translateY(0)' : 'translateY(-100%)',
              opacity: activeMenu ? 1 : 0,
            }}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={closeMenu}
          >
            {activeMenu && megaMenuData[activeMenu] && (
              <div className="max-w-6xl mx-auto px-12 py-10">
                <div className="flex gap-20">
                  {megaMenuData[activeMenu].map((col) => (
                    <div key={col.title} className="min-w-[180px]">
                      <p className="text-base font-sans font-bold tracking-[0.08em] text-black mb-4">
                        {col.title}
                      </p>
                        <ul className="space-y-4">
                          {col.links.map((link) => (
                            <li key={link}>
                              <a
                                href={col.hrefs?.[link] ?? '#'}
                                className="text-base font-sans text-brand-muted hover:text-black transition-colors duration-200"
                              >
                                {link}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
