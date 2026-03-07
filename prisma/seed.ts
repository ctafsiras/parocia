import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

const CATEGORIES = [
  {
    name: "Hair Products",
    slug: "hair-products",
    description:
      "Premium shampoos, conditioners, oils, and styling products for all hair types.",
    image: "https://placehold.co/600x400?text=Hair+Products",
    imageAlt: "Hair products collection",
  },
  {
    name: "Clothing",
    slug: "clothing",
    description:
      "Stylish branded apparel and accessories for everyday comfort and expression.",
    image: "https://placehold.co/600x400?text=Clothing",
    imageAlt: "Clothing collection",
  },
  {
    name: "Soaps",
    slug: "soaps",
    description:
      "Natural, handcrafted soaps made with plant-based ingredients for radiant skin.",
    image: "https://placehold.co/600x400?text=Soaps",
    imageAlt: "Soaps collection",
  },
  {
    name: "Oils",
    slug: "oils",
    description:
      "Pure cold-pressed and infused oils for hair, skin, and wellness rituals.",
    image: "https://placehold.co/600x400?text=Oils",
    imageAlt: "Oils collection",
  },
  {
    name: "Accessories",
    slug: "accessories",
    description:
      "Essential grooming and styling accessories to complete your self-care routine.",
    image: "https://placehold.co/600x400?text=Accessories",
    imageAlt: "Accessories collection",
  },
];

const PRODUCTS_BY_CATEGORY: Record<
  string,
  { name: string; slug: string; description: string; image: string; imageAlt: string }[]
> = {
  "hair-products": [
    {
      name: "Argan Oil Shampoo",
      slug: "argan-oil-shampoo",
      description:
        "A luxurious sulfate-free shampoo enriched with pure Moroccan argan oil. Gently cleanses while restoring moisture and shine to dry, damaged hair.",
      image: "https://placehold.co/600x400?text=Argan+Oil+Shampoo",
      imageAlt: "Argan Oil Shampoo bottle",
    },
    {
      name: "Shea Repair Conditioner",
      slug: "shea-repair-conditioner",
      description:
        "Deep repair conditioner infused with shea butter and keratin to detangle, strengthen, and leave hair silky-smooth from root to tip.",
      image: "https://placehold.co/600x400?text=Shea+Repair+Conditioner",
      imageAlt: "Shea Repair Conditioner bottle",
    },
    {
      name: "Curl Defining Cream",
      slug: "curl-defining-cream",
      description:
        "Lightweight curl cream that enhances natural curl pattern, reduces frizz, and provides long-lasting definition without crunch or stiffness.",
      image: "https://placehold.co/600x400?text=Curl+Defining+Cream",
      imageAlt: "Curl Defining Cream jar",
    },
    {
      name: "Herbal Scalp Tonic",
      slug: "herbal-scalp-tonic",
      description:
        "Stimulating scalp tonic blended with rosemary, peppermint, and tea tree extracts to promote healthy hair growth and a balanced scalp.",
      image: "https://placehold.co/600x400?text=Herbal+Scalp+Tonic",
      imageAlt: "Herbal Scalp Tonic dropper bottle",
    },
    {
      name: "Leave-In Moisture Mist",
      slug: "leave-in-moisture-mist",
      description:
        "A lightweight daily leave-in spray that adds lasting moisture, reduces breakage, and refreshes styles between wash days.",
      image: "https://placehold.co/600x400?text=Leave-In+Moisture+Mist",
      imageAlt: "Leave-In Moisture Mist spray bottle",
    },
  ],
  clothing: [
    {
      name: "Logo T-Shirt",
      slug: "logo-tshirt",
      description:
        "Classic crew-neck tee in 100% organic cotton, featuring the Parocia logo embroidered on the chest. Available in multiple colourways.",
      image: "https://placehold.co/600x400?text=Logo+T-Shirt",
      imageAlt: "Parocia branded logo t-shirt",
    },
    {
      name: "Cotton Head Wrap",
      slug: "cotton-head-wrap",
      description:
        "Soft, breathable cotton head wrap that protects styles overnight and adds a chic finishing touch to any daytime look.",
      image: "https://placehold.co/600x400?text=Cotton+Head+Wrap",
      imageAlt: "Cotton head wrap in neutral colour",
    },
    {
      name: "Relaxed Lounge Set",
      slug: "relaxed-lounge-set",
      description:
        "Two-piece matching lounge set crafted from French terry fabric. Perfect for self-care days, lounging, and light errands.",
      image: "https://placehold.co/600x400?text=Relaxed+Lounge+Set",
      imageAlt: "Relaxed two-piece lounge set",
    },
    {
      name: "Branded Apron",
      slug: "branded-apron",
      description:
        "Durable canvas apron with adjustable neck strap and deep front pockets — ideal for professional stylists and home enthusiasts alike.",
      image: "https://placehold.co/600x400?text=Branded+Apron",
      imageAlt: "Parocia branded canvas apron",
    },
    {
      name: "Everyday Tote",
      slug: "everyday-tote",
      description:
        "Spacious heavyweight canvas tote with inside zip pocket and reinforced handles, perfect for carrying all your essentials.",
      image: "https://placehold.co/600x400?text=Everyday+Tote",
      imageAlt: "Parocia branded everyday canvas tote bag",
    },
  ],
  soaps: [
    {
      name: "Charcoal Cleansing Bar",
      slug: "charcoal-cleansing-bar",
      description:
        "Activated charcoal soap that draws out impurities and excess oil, leaving skin thoroughly cleansed, refreshed, and balanced.",
      image: "https://placehold.co/600x400?text=Charcoal+Cleansing+Bar",
      imageAlt: "Dark charcoal cleansing soap bar",
    },
    {
      name: "Turmeric Glow Soap",
      slug: "turmeric-glow-soap",
      description:
        "Brightening turmeric and honey soap that evens skin tone, reduces dark spots, and imparts a warm, healthy glow with every wash.",
      image: "https://placehold.co/600x400?text=Turmeric+Glow+Soap",
      imageAlt: "Golden turmeric glow soap bar",
    },
    {
      name: "Honey Oat Soap",
      slug: "honey-oat-soap",
      description:
        "Gentle exfoliating soap made with colloidal oats and raw honey — ideal for sensitive skin that needs soothing, nourishing care.",
      image: "https://placehold.co/600x400?text=Honey+Oat+Soap",
      imageAlt: "Honey and oat soap bar",
    },
    {
      name: "Lavender Calm Bar",
      slug: "lavender-calm-bar",
      description:
        "Aromatherapy-grade lavender essential oil soap that calms the senses, hydrates the skin, and helps ease tension at the end of the day.",
      image: "https://placehold.co/600x400?text=Lavender+Calm+Bar",
      imageAlt: "Purple lavender calm soap bar",
    },
    {
      name: "Citrus Fresh Soap",
      slug: "citrus-fresh-soap",
      description:
        "Energising blend of sweet orange, lemon, and grapefruit essential oils in a moisturising shea base. An uplifting way to start the morning.",
      image: "https://placehold.co/600x400?text=Citrus+Fresh+Soap",
      imageAlt: "Bright orange citrus fresh soap bar",
    },
  ],
  oils: [
    {
      name: "Argan Hair Oil",
      slug: "argan-hair-oil",
      description:
        "100% pure cold-pressed Moroccan argan oil that adds brilliant shine, tames frizz, and deeply nourishes every strand without greasy residue.",
      image: "https://placehold.co/600x400?text=Argan+Hair+Oil",
      imageAlt: "Argan hair oil amber dropper bottle",
    },
    {
      name: "Coconut Body Oil",
      slug: "coconut-body-oil",
      description:
        "Unrefined virgin coconut oil infused with vanilla and sweet almond for an ultra-rich body oil that seals in moisture all day long.",
      image: "https://placehold.co/600x400?text=Coconut+Body+Oil",
      imageAlt: "Coconut body oil glass bottle",
    },
    {
      name: "Rosemary Growth Oil",
      slug: "rosemary-growth-oil",
      description:
        "Clinically studied rosemary oil blend formulated to strengthen roots, stimulate follicles, and support thicker, fuller hair growth over time.",
      image: "https://placehold.co/600x400?text=Rosemary+Growth+Oil",
      imageAlt: "Rosemary growth oil dark glass bottle",
    },
    {
      name: "Beard & Scalp Oil",
      slug: "beard-scalp-oil",
      description:
        "Conditioning multi-use oil blended with jojoba, castor, and cedarwood essential oil — softens beard hair, soothes the scalp, and reduces flakes.",
      image: "https://placehold.co/600x400?text=Beard+%26+Scalp+Oil",
      imageAlt: "Beard and scalp oil bottle",
    },
    {
      name: "Nourishing Massage Oil",
      slug: "nourishing-massage-oil",
      description:
        "Luxurious blend of sweet almond, grapeseed, and chamomile oils for a deeply relaxing massage that softens and replenishes the skin barrier.",
      image: "https://placehold.co/600x400?text=Nourishing+Massage+Oil",
      imageAlt: "Nourishing massage oil pump bottle",
    },
  ],
  accessories: [
    {
      name: "Wide Tooth Comb",
      slug: "wide-tooth-comb",
      description:
        "Anti-static wide-tooth comb crafted from sustainable bamboo — designed to detangle wet or dry hair gently with minimal breakage.",
      image: "https://placehold.co/600x400?text=Wide+Tooth+Comb",
      imageAlt: "Bamboo wide tooth detangling comb",
    },
    {
      name: "Satin Bonnet",
      slug: "satin-bonnet",
      description:
        "Double-lined satin bonnet with adjustable elastic band to protect natural styles, locs, and braids overnight from friction and moisture loss.",
      image: "https://placehold.co/600x400?text=Satin+Bonnet",
      imageAlt: "Black satin sleep bonnet",
    },
    {
      name: "Hair Clips Set",
      slug: "hair-clips-set",
      description:
        "Set of 6 sturdy alligator hair clips in assorted neutral tones — perfect for sectioning during styling, deep conditioning, or everyday use.",
      image: "https://placehold.co/600x400?text=Hair+Clips+Set",
      imageAlt: "Set of alligator hair sectioning clips",
    },
    {
      name: "Wooden Beard Brush",
      slug: "wooden-beard-brush",
      description:
        "Handcrafted walnut-handle beard brush with firm boar bristles that train beard growth, distribute oils evenly, and remove debris.",
      image: "https://placehold.co/600x400?text=Wooden+Beard+Brush",
      imageAlt: "Wooden handled boar bristle beard brush",
    },
    {
      name: "Travel Storage Pouch",
      slug: "travel-storage-pouch",
      description:
        "Water-resistant zip pouch with divided interior compartments to organise all your hair and skincare essentials, at home or on the go.",
      image: "https://placehold.co/600x400?text=Travel+Storage+Pouch",
      imageAlt: "Water-resistant travel storage pouch",
    },
  ],
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Seeding database...\n");

  for (const cat of CATEGORIES) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        image: cat.image,
        imageAlt: cat.imageAlt,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        imageAlt: cat.imageAlt,
      },
    });

    console.log(`  Category: ${category.name} (${category.id})`);

    const products = PRODUCTS_BY_CATEGORY[cat.slug] ?? [];

    for (const prod of products) {
      const product = await prisma.product.upsert({
        where: { slug: prod.slug },
        update: {
          name: prod.name,
          description: prod.description,
          image: prod.image,
          imageAlt: prod.imageAlt,
          categoryId: category.id,
        },
        create: {
          name: prod.name,
          slug: prod.slug,
          description: prod.description,
          image: prod.image,
          imageAlt: prod.imageAlt,
          categoryId: category.id,
        },
      });

      console.log(`    Product: ${product.name} (${product.id})`);
    }
  }

  console.log("\nSeed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
