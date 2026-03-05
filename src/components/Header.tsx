'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

/* ──────────────────────────────────────────────
   Mega-menu content per nav item
   ────────────────────────────────────────────── */
interface MenuColumn {
  title: string;
  links: string[];
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
    },
    {
      title: 'Community',
      links: ['Journal', 'Events', 'Ambassadors'],
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

  return (
    <header ref={headerRef} className="absolute top-0 left-0 w-full z-50">
      {/* ── Announcement Bar ── */}
      <div className="bg-brand-dark text-white text-center text-xs tracking-[0.2em] uppercase py-2.5 font-sans">
        <span className="mr-1">›</span> Complimentary shipping on all orders
        over $150
      </div>

      {/* ── Main Nav Bar ── */}
      <nav className="relative">
        {/* Nav inner */}
        <div className="flex items-center justify-between px-8 lg:px-12 py-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 z-10">
            <span
              className="font-heading text-2xl lg:text-3xl font-semibold tracking-[0.04em] text-white transition-colors duration-300"
              style={{ color: activeMenu ? '#1A1A1A' : undefined }}
            >
              PAROCIA
            </span>
          </a>

          {/* Center nav links */}
          <ul
            className="hidden lg:flex items-center gap-8 xl:gap-10 absolute left-1/2 -translate-x-1/2"
            onMouseLeave={closeMenu}
          >
            {navItems.map((item) => (
              <li key={item} onMouseEnter={() => openMenu(item)}>
                <button
                  className="text-[13px] font-sans font-medium tracking-[0.15em] uppercase py-2 border-b-2 transition-colors duration-300"
                  style={{
                    color: activeMenu ? '#1A1A1A' : '#fff',
                    borderColor:
                      activeMenu === item
                        ? activeMenu
                          ? '#1A1A1A'
                          : '#fff'
                        : 'transparent',
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          {/* Right utilities */}
          <div className="hidden lg:flex items-center gap-6 z-10">
            <a
              href="#"
              className="text-[11px] font-sans tracking-[0.12em] uppercase transition-colors duration-300"
              style={{ color: activeMenu ? '#1A1A1A' : '#fff' }}
            >
              <span className="mr-1">◉</span> Store Locator
            </a>
            <a
              href="#"
              className="text-[11px] font-sans tracking-[0.12em] uppercase transition-colors duration-300"
              style={{ color: activeMenu ? '#1A1A1A' : '#fff' }}
            >
              Account
            </a>
            {/* Search icon */}
            <button
              className="transition-colors duration-300"
              aria-label="Search"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                stroke={activeMenu ? '#1A1A1A' : '#fff'}
                className="transition-colors duration-300"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden z-10" aria-label="Menu">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>

        {/* ── Divider line under nav ── */}
        <div
          className="absolute bottom-0 left-0 w-full h-px transition-opacity duration-300"
          style={{
            backgroundColor: activeMenu ? '#e0ddd9' : 'rgba(255,255,255,0.2)',
          }}
        />

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
                      <p className="text-sm font-sans font-semibold tracking-[0.08em] text-brand-dark mb-4">
                        {col.title}
                      </p>
                      <ul className="space-y-3">
                        {col.links.map((link) => (
                          <li key={link}>
                            <a
                              href="#"
                              className="text-sm font-sans text-brand-muted hover:text-brand-dark transition-colors duration-200"
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
