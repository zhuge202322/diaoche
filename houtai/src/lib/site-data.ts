import { getFeaturedProductsData, getPostBySlug, getPostsData, getProductBySlug, getProductsData } from "@/lib/cms";

export type SiteCategory = {
  id: string;
  label: string;
  description: string;
};

export type SiteProduct = {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  badge: string;
  image: string;
  short: string;
  summary: string;
  specs: Record<string, string>;
  features: string[];
  applications: string[];
  leadTime: string;
  gallery: string[];
};

export type SitePost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

export const siteCategories: SiteCategory[] = [
  {
    id: "all",
    label: "All Equipment",
    description: "Aerial work platforms, cranes, spare parts and available stock.",
  },
  {
    id: "aerial-work-platforms",
    label: "Aerial Work Platforms",
    description: "Scissor lifts, boom lifts, spider lifts, truck-mounted platforms and used aerial lifts.",
  },
  {
    id: "cranes",
    label: "Cranes",
    description: "Truck cranes, all-terrain cranes, rough-terrain cranes, crawler cranes and used cranes.",
  },
  {
    id: "spare-parts",
    label: "Spare Parts",
    description: "Factory-direct spare parts, maintenance kits, hydraulic parts and accessories.",
  },
];

export const fallbackProducts: SiteProduct[] = [
  {
    slug: "used-telescopic-truck-crane",
    name: "Used Telescopic Truck Crane",
    category: "cranes",
    categoryLabel: "Cranes",
    badge: "Export ready",
    image: "/assets/equipment/telescopic-truck-crane.png",
    short: "Road-ready used truck crane options for construction, logistics and municipal lifting.",
    summary:
      "A practical used telescopic crane solution for buyers who need proven lifting capacity, fast delivery and professional export support.",
    specs: {
      "Lifting class": "25-50 t options",
      "Boom type": "Telescopic boom",
      "Condition": "Used / inspected",
      "Shipping": "RoRo or flat rack",
      "Support": "Parts and documents",
    },
    features: [
      "Inspected condition photos before confirmation",
      "Flexible brand and chassis matching from Chinese suppliers",
      "Export packing, loading photos and document support",
      "Recommended spare-parts package available",
    ],
    applications: ["Construction lifting", "Rental fleets", "Utility projects", "Steel handling"],
    leadTime: "15-35 days",
    gallery: [
      "/assets/equipment/telescopic-truck-crane.png",
      "/assets/equipment/hero-fleet.png",
      "/assets/equipment/factory-workshop.png",
    ],
  },
  {
    slug: "used-knuckle-boom-crane",
    name: "Used Knuckle Boom Crane",
    category: "cranes",
    categoryLabel: "Cranes",
    badge: "Compact reach",
    image: "/assets/equipment/knuckle-boom-crane.png",
    short: "Foldable truck-mounted loader crane for materials delivery and roadside handling.",
    summary:
      "A compact used loader crane option for distributors and contractors needing flexible side reach and efficient truck body layout.",
    specs: {
      "Lifting moment": "8-20 t.m options",
      "Boom style": "Knuckle boom",
      "Control": "Manual / remote options",
      "Condition": "Used / refurbished options",
      "Shipping": "RoRo or container plan",
    },
    features: [
      "Foldable boom geometry for urban delivery routes",
      "Hydraulic system inspection before export",
      "Attachments can be quoted with the machine",
      "Subframe and truck body review available",
    ],
    applications: ["Building materials", "Port logistics", "Municipal service", "Agricultural supply"],
    leadTime: "15-30 days",
    gallery: [
      "/assets/equipment/knuckle-boom-crane.png",
      "/assets/equipment/factory-workshop.png",
      "/assets/equipment/hero-fleet.png",
    ],
  },
  {
    slug: "used-articulating-boom-lift",
    name: "Used Articulating Boom Lift",
    category: "aerial-work-platforms",
    categoryLabel: "Aerial Work Platforms",
    badge: "Up-and-over",
    image: "/assets/equipment/articulating-boom-lift.png",
    short: "Used articulating boom lift for plant maintenance, facade work and rental fleets.",
    summary:
      "Aerial work platform options sourced for buyers who need working height, obstacle reach and competitive used-equipment pricing.",
    specs: {
      "Working height": "16-30 m options",
      "Platform capacity": "200-250 kg",
      "Power": "Diesel / electric options",
      "Condition": "Used / inspected",
      "Documents": "Manuals and loading plan",
    },
    features: [
      "Working height and outreach matched to project needs",
      "Condition videos and photos before shipment",
      "Battery, tire and controller details checked",
      "Rental fleet purchase batches supported",
    ],
    applications: ["Industrial maintenance", "Facade work", "Power plants", "Rental fleets"],
    leadTime: "10-30 days",
    gallery: [
      "/assets/equipment/articulating-boom-lift.png",
      "/assets/equipment/scissor-lift.png",
      "/assets/equipment/factory-workshop.png",
    ],
  },
  {
    slug: "used-scissor-lift",
    name: "Used Scissor Lift",
    category: "aerial-work-platforms",
    categoryLabel: "Aerial Work Platforms",
    badge: "Large deck",
    image: "/assets/equipment/scissor-lift.png",
    short: "Used scissor lift options for warehouses, installation work and rental fleets.",
    summary:
      "A cost-effective aerial platform category for buyers needing vertical access equipment with export support from China.",
    specs: {
      "Working height": "6-16 m options",
      "Platform type": "Electric / rough-terrain",
      "Capacity": "230-450 kg options",
      "Condition": "Used / inspected",
      "Shipping": "Container friendly",
    },
    features: [
      "Battery and charger status can be checked",
      "Non-marking tire options for indoor work",
      "Batch sourcing for rental companies",
      "Spare parts and manuals available",
    ],
    applications: ["Warehouse fit-out", "MEP installation", "Factory maintenance", "Rental fleets"],
    leadTime: "10-25 days",
    gallery: [
      "/assets/equipment/scissor-lift.png",
      "/assets/equipment/articulating-boom-lift.png",
      "/assets/equipment/hero-fleet.png",
    ],
  },
  {
    slug: "used-crawler-crane",
    name: "Used Crawler Crane",
    category: "cranes",
    categoryLabel: "Cranes",
    badge: "Stable lifting",
    image: "/assets/equipment/hero-fleet.png",
    short: "Used crawler crane sourcing for heavy lifting, infrastructure and restricted ground sites.",
    summary:
      "Crawler crane options are selected around lifting load, boom length, site ground condition and export transport limits.",
    specs: {
      "Capacity range": "50-150 t options",
      "Undercarriage": "Crawler",
      "Condition": "Used / inspected",
      "Shipping": "Breakbulk / flat rack plan",
      "Support": "Parts package available",
    },
    features: [
      "Machine history and condition review before quotation",
      "Transport plan prepared around boom and counterweight",
      "Chinese major-brand sourcing network",
      "Remote inspection support for overseas buyers",
    ],
    applications: ["Infrastructure", "Bridge work", "Energy projects", "Heavy construction"],
    leadTime: "20-45 days",
    gallery: [
      "/assets/equipment/hero-fleet.png",
      "/assets/equipment/telescopic-truck-crane.png",
      "/assets/equipment/factory-workshop.png",
    ],
  },
  {
    slug: "lifting-accessories-export-package",
    name: "Lifting Accessories Export Package",
    category: "spare-parts",
    categoryLabel: "Spare Parts",
    badge: "Parts support",
    image: "/assets/equipment/factory-workshop.png",
    short: "Accessories, hydraulic parts and spare-parts packages for cranes and aerial platforms.",
    summary:
      "Pillarlift can prepare supporting accessories and parts packages alongside used equipment shipments.",
    specs: {
      "Scope": "Accessories and spare parts",
      "Documentation": "Parts list and packing plan",
      "Brands": "Chinese major-brand support",
      "Packing": "Export carton / crate",
      "Support": "Remote matching assistance",
    },
    features: [
      "Parts list prepared around equipment model",
      "Consumables and common service items available",
      "Packing labels for distributor warehouse intake",
      "Can be shipped with equipment or separately",
    ],
    applications: ["Distributor stock", "Fleet service", "Project spares", "Maintenance teams"],
    leadTime: "7-20 days",
    gallery: [
      "/assets/equipment/factory-workshop.png",
      "/assets/equipment/knuckle-boom-crane.png",
      "/assets/equipment/scissor-lift.png",
    ],
  },
];

export const fallbackPosts: SitePost[] = [
  {
    slug: "choosing-aerial-work-platforms",
    title: "How to choose aerial work platforms for rental fleets",
    excerpt: "Compare working height, platform capacity, power type and jobsite conditions before purchasing.",
    date: "2026-06-01",
  },
  {
    slug: "crane-procurement-guide",
    title: "Crane procurement guide for global machinery buyers",
    excerpt: "Key points for truck cranes, crawler cranes, inspection details and export shipment planning.",
    date: "2026-05-18",
  },
  {
    slug: "spare-parts-supply-planning",
    title: "Spare parts supply planning for lifting equipment fleets",
    excerpt: "How rental companies and dealers can plan parts packages, replenishment and combined shipments.",
    date: "2026-04-29",
  },
];

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function parseSpecs(value = "") {
  const text = stripHtml(value);
  const result: Record<string, string> = {};
  for (const part of text.split(/\n|;|\|/)) {
    const [rawKey, ...rest] = part.split(/:|：/);
    if (!rawKey || rest.length === 0) continue;
    const key = rawKey.trim();
    const val = rest.join(":").trim();
    if (key && val) result[key] = val;
  }
  return result;
}

function categoryFromCms(product: any) {
  const cat = product.categories?.[0];
  if (!cat) return { category: "cranes", label: "Cranes" };
  const aliases: Record<string, string> = {
    "used-cranes": "cranes",
    "aerial-platforms": "aerial-work-platforms",
    accessories: "spare-parts",
  };
  const slug = aliases[cat.slug] || cat.slug || "cranes";
  const known = siteCategories.find((item) => item.id === slug);
  return { category: known?.id || slug, label: cat.name || known?.label || "Equipment" };
}

function mapCmsProduct(product: any, index: number): SiteProduct {
  const cat = categoryFromCms(product);
  const fallback = fallbackProducts[index % fallbackProducts.length];
  const specs = parseSpecs(product.specs);
  const description = stripHtml(product.description || product.short_description || fallback.summary);
  const image = product.images?.[0]?.src || fallback.image;
  const gallery = product.images?.length ? product.images.map((img: any) => img.src).slice(0, 3) : fallback.gallery;

  return {
    slug: product.slug,
    name: stripHtml(product.name) || fallback.name,
    category: cat.category,
    categoryLabel: cat.label,
    badge: product.featured ? "Featured" : fallback.badge,
    image,
    short: stripHtml(product.short_description) || fallback.short,
    summary: description || fallback.summary,
    specs: Object.keys(specs).length ? specs : fallback.specs,
    features: description
      ? description.split(/\. |\n/).map((item) => item.trim()).filter(Boolean).slice(0, 4)
      : fallback.features,
    applications: fallback.applications,
    leadTime: fallback.leadTime,
    gallery: gallery.length ? gallery : fallback.gallery,
  };
}

function mapCmsPost(post: any): SitePost {
  return {
    slug: post.slug,
    title: stripHtml(post.title?.rendered || post.title || ""),
    excerpt: stripHtml(post.excerpt?.rendered || post.excerpt || ""),
    date: String(post.date || "").slice(0, 10),
  };
}

export async function loadSiteProducts(): Promise<SiteProduct[]> {
  try {
    const cmsProducts = await getProductsData("en");
    if (cmsProducts.length) return cmsProducts.map(mapCmsProduct);
  } catch {
    return fallbackProducts;
  }
  return fallbackProducts;
}

export async function loadFeaturedSiteProducts(): Promise<SiteProduct[]> {
  try {
    const cmsProducts = await getFeaturedProductsData("en");
    if (cmsProducts.length) return cmsProducts.map(mapCmsProduct).slice(0, 4);
  } catch {
    return fallbackProducts.slice(0, 4);
  }
  return fallbackProducts.slice(0, 4);
}

export async function loadSiteProduct(slug: string): Promise<SiteProduct | null> {
  try {
    const product = await getProductBySlug(slug, "en");
    if (product) return mapCmsProduct(product, 0);
  } catch {
    return fallbackProducts.find((item) => item.slug === slug) || null;
  }
  return fallbackProducts.find((item) => item.slug === slug) || null;
}

export async function loadRelatedProducts(product: SiteProduct): Promise<SiteProduct[]> {
  const products = await loadSiteProducts();
  return products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .concat(products.filter((item) => item.slug !== product.slug && item.category !== product.category))
    .slice(0, 3);
}

export async function loadSitePosts(limit = 3): Promise<SitePost[]> {
  try {
    const posts = await getPostsData(limit, "en");
    if (posts.length) return posts.map(mapCmsPost).slice(0, limit);
  } catch {
    return fallbackPosts.slice(0, limit);
  }
  return fallbackPosts.slice(0, limit);
}

export async function loadSitePost(slug: string): Promise<SitePost | null> {
  try {
    const post = await getPostBySlug(slug, "en");
    if (post) return mapCmsPost(post);
  } catch {
    return fallbackPosts.find((item) => item.slug === slug) || null;
  }
  return fallbackPosts.find((item) => item.slug === slug) || null;
}
