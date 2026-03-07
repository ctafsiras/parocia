import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { buildRootMetadata } from '@/lib/seo/metadata';
import { getSiteSeoSettings } from '@/lib/seo/queries';
import { getJsonLdScriptPayload } from '@/lib/seo/schema';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSeoSettings();
  return buildRootMetadata(settings);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans">
        <GlobalSchemaScripts />
        {children}
      </body>
    </html>
  );
}

async function GlobalSchemaScripts() {
  const settings = await getSiteSeoSettings();
  const schemas = getJsonLdScriptPayload(
    settings.organizationSchema,
    settings.websiteSchema
  );

  return schemas.map((schema, index) => (
    <script
      key={`global-schema-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ));
}
