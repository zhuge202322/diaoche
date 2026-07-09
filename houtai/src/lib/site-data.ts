import jhCraneProducts from "@/data/jhcrane-products.json";
import kingliftProducts from "@/data/kinglift-products.json";
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

type CollectedProduct = SiteProduct & {
  sourceUrl?: string;
  sourceMenuUrl?: string;
  subCategorySlug?: string;
  subCategoryLabel?: string;
  featured?: boolean;
  sortOrder?: number;
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

const aerialSubcategoryPriority = [
  "scissor-lifts",
  "articulating-boom-lifts",
  "telescopic-boom-lifts",
  "towable-boom-lifts",
  "boom-lifts",
  "spider-lifts",
  "truck-mounted-platforms",
  "used-aerial-lifts",
];

const craneSubcategoryPriority = [
  "used-cranes",
  "truck-cranes",
  "all-terrain-cranes",
  "rough-terrain-cranes",
  "crawler-cranes",
];

const importedCatalogProducts = [...(kingliftProducts as CollectedProduct[]), ...(jhCraneProducts as CollectedProduct[])];

const importedProducts: SiteProduct[] = importedCatalogProducts.map((product) => ({
  slug: product.slug,
  name: product.name,
  category: product.category || "aerial-work-platforms",
  categoryLabel: product.subCategoryLabel || product.categoryLabel || "Equipment",
  badge: product.badge || product.subCategoryLabel || product.categoryLabel || "Equipment",
  image: product.image,
  short: product.short,
  summary: product.summary,
  specs: product.specs || {},
  features: product.features || [],
  applications: product.applications || [],
  leadTime: product.leadTime || "Confirm before quotation",
  gallery: product.gallery?.length ? product.gallery : product.image ? [product.image] : [],
}));

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
  const text = value
    .replace(/<br\s*\/?>/gi, ";")
    .replace(/<\/p>/gi, ";")
    .replace(/<[^>]*>/g, " ")
    .replace(/\r?\n/g, ";")
    .replace(/\s+/g, " ")
    .trim();
  const result: Record<string, string> = {};

  for (const part of text.split(/;|\|/)) {
    const [rawKey, ...rest] = part.split(/:|\uFF1A/);
    if (!rawKey || rest.length === 0) continue;
    const key = rawKey.trim();
    const val = rest.join(":").trim();
    if (key && val) result[key] = val;
  }

  return result;
}

function defaultSpecs(label: string, category = "Aerial Work Platforms") {
  return {
    "Main category": category,
    "Product group": label,
    "Core parameter": "Confirm before quotation",
    "Inquiry support": "Inspection, parts, documents and worldwide shipping",
  };
}

function defaultFeatures(label: string) {
  if (label.toLowerCase().includes("crane")) {
    return [
      "Crane option for contractors, rental fleets, dealers and distributors",
      "Core specifications can be checked before quotation confirmation",
      "Condition photos, video inspection and documents can be coordinated",
      "Export support available for loading, customs documents and shipping planning",
    ];
  }

  if (label.toLowerCase().includes("boom")) {
    return [
      "Boom access platform for elevated work with horizontal or obstacle reach",
      "Suitable for contractors, rental fleets, dealers and distributors",
      "Model, reach type and working height can be confirmed before order",
      "Export support available for documents, packing and shipment planning",
    ];
  }

  return [
    "Vertical access platform for indoor or outdoor maintenance work",
    "Suitable for rental companies, contractors and equipment dealers",
    "Model, height and configuration can be checked before quotation",
    "Export support available for documents, packing and shipment planning",
  ];
}

function defaultApplications(label: string) {
  if (label.toLowerCase().includes("crane")) {
    return ["Construction lifting", "Rental fleets", "Infrastructure projects", "Machinery trading"];
  }

  if (label.toLowerCase().includes("boom")) {
    return ["Facade work", "Construction access", "Industrial maintenance", "Rental fleets"];
  }

  return ["Warehouse maintenance", "MEP installation", "Factory access", "Rental fleets"];
}

function categoryFromCms(product: any) {
  const categories = product.categories || [];
  const aliases: Record<string, string> = {
    "aerial-platforms": "aerial-work-platforms",
    accessories: "spare-parts",
  };

  const normalized = categories.map((cat: any) => ({
    ...cat,
    normalizedSlug: aliases[cat.slug] || cat.slug,
  }));

  const primary =
    normalized.find((cat: any) => cat.normalizedSlug === "aerial-work-platforms") ||
    normalized.find((cat: any) => siteCategories.some((item) => item.id === cat.normalizedSlug && item.id !== "all"));
  const subcategory = aerialSubcategoryPriority
    .map((slug) => normalized.find((cat: any) => cat.normalizedSlug === slug))
    .find(Boolean);
  const craneSubcategory = craneSubcategoryPriority
    .map((slug) => normalized.find((cat: any) => cat.normalizedSlug === slug))
    .find(Boolean);

  if (primary?.normalizedSlug === "aerial-work-platforms" || subcategory) {
    return {
      category: "aerial-work-platforms",
      label: subcategory?.name || primary?.name || "Aerial Work Platforms",
    };
  }

  if (primary?.normalizedSlug === "cranes" || craneSubcategory) {
    return {
      category: "cranes",
      label: craneSubcategory?.name || primary?.name || "Cranes",
    };
  }

  if (primary) {
    const known = siteCategories.find((item) => item.id === primary.normalizedSlug);
    return { category: known?.id || primary.normalizedSlug, label: primary.name || known?.label || "Equipment" };
  }

  return { category: "aerial-work-platforms", label: "Aerial Work Platforms" };
}

function mapCmsProduct(product: any): SiteProduct {
  const cat = categoryFromCms(product);
  const specs = parseSpecs(product.specs);
  const description = stripHtml(product.description || product.short_description || "");
  const short = stripHtml(product.short_description) || `${cat.label} available for export quotation.`;
  const image = product.images?.[0]?.src || "";
  const gallery = product.images?.length ? product.images.map((img: any) => img.src).slice(0, 3) : image ? [image] : [];

  return {
    slug: product.slug,
    name: stripHtml(product.name) || cat.label,
    category: cat.category,
    categoryLabel: cat.label,
    badge: cat.label,
    image,
    short,
    summary: description || short,
    specs: Object.keys(specs).length ? specs : defaultSpecs(cat.label, cat.category === "cranes" ? "Cranes" : "Aerial Work Platforms"),
    features: description
      ? description.split(/\. |\n/).map((item) => item.trim()).filter(Boolean).slice(0, 4)
      : defaultFeatures(cat.label),
    applications: defaultApplications(cat.label),
    leadTime: "Confirm before quotation",
    gallery,
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
    return importedProducts;
  }
  return importedProducts;
}

export async function loadFeaturedSiteProducts(): Promise<SiteProduct[]> {
  try {
    const cmsProducts = await getFeaturedProductsData("en");
    if (cmsProducts.length) return cmsProducts.map(mapCmsProduct).slice(0, 8);
  } catch {
    return importedProducts.slice(0, 8);
  }
  return importedProducts.slice(0, 8);
}

export async function loadSiteProduct(slug: string): Promise<SiteProduct | null> {
  try {
    const product = await getProductBySlug(slug, "en");
    if (product) return mapCmsProduct(product);
  } catch {
    return importedProducts.find((item) => item.slug === slug) || null;
  }
  return importedProducts.find((item) => item.slug === slug) || null;
}

export async function loadRelatedProducts(product: SiteProduct): Promise<SiteProduct[]> {
  const products = await loadSiteProducts();
  return products
    .filter((item) => item.slug !== product.slug && item.categoryLabel === product.categoryLabel)
    .concat(products.filter((item) => item.slug !== product.slug && item.category === product.category))
    .concat(products.filter((item) => item.slug !== product.slug && item.category !== product.category))
    .filter((item, index, self) => self.findIndex((candidate) => candidate.slug === item.slug) === index)
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
