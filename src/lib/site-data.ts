import cstopAutoProducts from "@/data/cstopauto-products.json";
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
  image?: string;
  sourceUrl?: string;
  category?: string;
  readTime?: string;
  content?: SitePostSection[];
};

export type SitePostSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
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

const partsSubcategoryPriority = ["joystick-controls", "motor-controllers", "platform-control-units"];

const importedCatalogProducts = [
  ...(kingliftProducts as CollectedProduct[]),
  ...(jhCraneProducts as CollectedProduct[]),
  ...(cstopAutoProducts as unknown as CollectedProduct[]),
];

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
    slug: "aerial-work-platform-rental-market-2025",
    title: 'Has the "golden age" of aerial work platform rental come to an end? A set of data tells you the answer.',
    excerpt: "In 2025, lifting work platform sales reached 165,171 units, down 28.6% year on year, while China's domestic market declined by 42.4%.",
    date: "2026-07-13",
    image: "/assets/news/aerial-platform-rental-market.png",
    sourceUrl: "https://www.marestorm.com/newsinfo/3206440.html",
    category: "Industry News",
    readTime: "6 min read",
    content: [
      {
        heading: "A market moving from rapid growth to structural adjustment",
        paragraphs: [
          "China's aerial work platform market entered a clear adjustment period in 2025. Industry sales reached 165,171 units, down 28.6% year on year, while domestic sales fell by 42.4%.",
          "The picture began to change in early 2026. From January through May, domestic sales totaled 25,791 units, down 11.6%, while April and May returned to year-on-year growth. The decline is narrowing, but rental prices and utilization remain under pressure.",
        ],
      },
      {
        heading: "Exports are carrying more of the industry's growth",
        paragraphs: [
          "From January through May 2026, total lifting platform sales reached 86,834 units, up 16.5%. Exports accounted for 61,043 units, an increase of 34.6%, showing that international demand is now a major growth engine for manufacturers and fleet suppliers.",
          "For overseas buyers, stronger export competition means more equipment choice, but it also makes inspection, documentation, parts support and supplier reliability more important.",
        ],
      },
      {
        heading: "Three issues reshaping the rental market",
        paragraphs: [
          "Large installed fleets and continued production have created a short-term supply imbalance. At the same time, demand is separating by equipment class: lower-height models face heavier price competition, while medium and high working-height equipment is seeing stronger demand.",
        ],
        bullets: [
          "Fleet utilization and rental yield matter more than headline purchase price.",
          "Compliant, well-maintained equipment is becoming more valuable as safety requirements increase.",
          "Used equipment with clear condition records can help buyers control depreciation risk.",
          "Export buyers should confirm parts availability, inspection support and shipping plans before purchase.",
        ],
      },
      {
        heading: "What buyers should do next",
        paragraphs: [
          "Rental companies should model utilization, maintenance cost, resale value and local rental rates before expanding a fleet. Dealers and importers should prioritize products that match real demand in their market instead of purchasing only by price.",
          "Pillarlift can provide equipment photos, operating videos, condition details and export support for new and used aerial work platforms and cranes.",
        ],
      },
    ],
  },
  {
    slug: "new-vs-used-aerial-lifts",
    title: "New vs Used Aerial Lifts: Which Is Better for Rental Companies?",
    excerpt: "Compare the real cost of new and used aerial lifts, including depreciation, payback periods and business risk for rental fleets.",
    date: "2026-07-09",
    image: "/assets/news/new-vs-used-aerial-lifts.jpg",
    sourceUrl: "https://www.marestorm.com/newsinfo/3205783.html",
    category: "Buying Guide",
    readTime: "8 min read",
    content: [
      {
        heading: "Purchase price is only the beginning",
        paragraphs: [
          "New aerial lifts look professional and usually require less immediate maintenance, but rental companies need to calculate depreciation as well as monthly income.",
          "One example from the rental market involved a boom lift purchased for about RMB 590,000. After two years, the owner had paid about RMB 160,000 and earned roughly RMB 180,000 in rental income, but the machine's estimated market value had fallen to RMB 300,000-400,000. Once depreciation and operating costs were included, the real profit was very limited.",
        ],
      },
      {
        heading: "Compare total cost of ownership",
        paragraphs: [
          "A useful equipment decision includes financing, depreciation, maintenance, batteries, tires, transportation, storage, insurance, idle periods and expected resale value.",
          "In a competitive rental market, a scissor lift may need around five years to recover its cost, while some boom lifts may require eight years or longer. Long payback periods increase exposure to price changes, downtime and major repairs.",
        ],
        bullets: [
          "Estimate realistic annual utilization rather than best-case utilization.",
          "Include battery, hydraulic and drive-system replacement costs.",
          "Allow for transport, storage and periods without rental income.",
          "Use conservative resale-value assumptions.",
        ],
      },
      {
        heading: "When used aerial lifts make sense",
        paragraphs: [
          "Used equipment can reduce the steepest stage of depreciation and allow the same budget to cover more machines. A larger mixed fleet can serve more projects and limits the amount of capital concentrated in one asset.",
          "Used machines are especially practical for new rental businesses, uncertain demand, fleet expansion and customers who prioritize operating function over appearance.",
        ],
      },
      {
        heading: "When new equipment is the better choice",
        paragraphs: [
          "New equipment may be justified when a buyer has stable long-term contracts, strict equipment-age requirements, guaranteed utilization or limited local maintenance capability. Major industrial and infrastructure projects may also require newer machines with complete records.",
        ],
      },
      {
        heading: "Used-equipment inspection checklist",
        paragraphs: [
          "A lower price is only valuable when the machine condition is understood. Buyers should request real operating evidence before confirming an order.",
        ],
        bullets: [
          "Verify model, serial number, year, working hours and ownership history.",
          "Inspect the boom or scissor structure, chassis, platform, welds and corrosion.",
          "Check hydraulic cylinders, hoses, pumps, seals and leakage.",
          "Test controls, sensors, emergency functions, alarms, brakes and steering.",
          "Review battery age, charger condition and operating duration for electric models.",
          "Request detailed photos, operation videos and third-party inspection support.",
        ],
      },
    ],
  },
  {
    slug: "used-equipment-saudi-arabia",
    title: "Used Cranes and Aerial Work Platforms for Saudi Arabia",
    excerpt: "Reliable new and used cranes, boom lifts and scissor lifts for rental companies, contractors and industrial projects across Saudi Arabia.",
    date: "2026-07-09",
    image: "/assets/news/used-equipment-saudi-arabia.jpg",
    sourceUrl: "https://www.marestorm.com/newsinfo/3205771.html",
    category: "Market Solutions",
    readTime: "5 min read",
    content: [
      {
        heading: "Equipment demand across Saudi Arabia",
        paragraphs: [
          "Construction, industrial maintenance, logistics and large infrastructure programs are creating steady demand for cranes and aerial work platforms in Saudi Arabia.",
          "Rental companies and contractors often need a balanced fleet of scissor lifts, articulated boom lifts, telescopic boom lifts and mobile cranes rather than a single equipment type.",
        ],
      },
      {
        heading: "Used boom lifts and scissor lifts",
        paragraphs: [
          "Used telescopic and articulated boom lifts can support construction and industrial projects at working heights from approximately 14 meters to more than 40 meters. Common brands include Genie, JLG, Sinoboom, Dingli and SANY.",
          "Electric scissor lifts are suitable for warehouses and indoor installation, while diesel and rough-terrain models support outdoor sites and uneven ground.",
        ],
      },
      {
        heading: "Export process for Saudi buyers",
        paragraphs: [
          "A clear procurement process reduces risk for buyers who cannot inspect equipment in person.",
        ],
        bullets: [
          "Confirm equipment type, brand, working height or lifting capacity.",
          "Review available machines, specifications, condition photos and quotation.",
          "Request operation videos or arrange a third-party inspection.",
          "Confirm export documents, loading method and destination port.",
          "Arrange spare parts and after-sales support with the shipment.",
        ],
      },
      {
        heading: "Shipping and documentation support",
        paragraphs: [
          "Pillarlift supports container, flat-rack and RoRo shipment planning for Riyadh, Jeddah, Dammam, Al Khobar, Jubail, Yanbu and other Saudi project markets through the appropriate destination ports.",
          "Before shipment, buyers can review machine identification, working hours, operating videos, inspection results and loading records.",
        ],
      },
    ],
  },
  {
    slug: "sinoboom-terrain-technology",
    title: "Sinoboom Terrain Technology for Demanding Construction Sites",
    excerpt: "An all-wheel floating system, full floating suspension and high ground clearance improve terrain adaptability, stability and working efficiency.",
    date: "2026-07-03",
    image: "/assets/news/sinoboom-terrain-technology.png",
    sourceUrl: "https://www.marestorm.com/newsinfo/3204390.html",
    category: "Product Technology",
    readTime: "4 min read",
    content: [
      {
        heading: "Difficult ground is often the real jobsite challenge",
        paragraphs: [
          "For boom-lift operators, working height is only part of the problem. Mud, gravel, slopes and potholes can reduce traction, stability and productivity before the platform even reaches its working position.",
          "A full-time floating axle system is designed to keep all four tires in contact with uneven ground and help the chassis adapt to changing terrain.",
        ],
      },
      {
        heading: "What full-time floating means",
        paragraphs: [
          "Some systems provide axle movement only while the machine is driving. A full-time design remains active across a wider operating range, helping maintain ground contact during travel and positioning.",
          "This is not a substitute for operating within the manufacturer's slope and stability limits. It is a chassis technology that improves terrain adaptation when the machine is used correctly.",
        ],
      },
      {
        heading: "Three practical benefits",
        paragraphs: [],
        bullets: [
          "Stronger off-road capability: high-torque drive and suitable tires improve performance on mud, gravel and slopes.",
          "Better terrain adaptation: axle movement helps the chassis maintain stable tire contact on uneven surfaces.",
          "Higher operating efficiency: crews spend less time repositioning equipment or preparing minor ground irregularities.",
        ],
      },
      {
        heading: "What buyers should confirm",
        paragraphs: [
          "When selecting a rough-terrain boom lift, compare gradeability, ground clearance, axle configuration, tire type, drive mode, platform capacity and the manufacturer's operating limits.",
          "Pillarlift can help match boom-lift configurations to rental fleets, construction contractors and industrial maintenance applications.",
        ],
      },
    ],
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
  if (label.toLowerCase().includes("control") || label.toLowerCase().includes("part")) {
    return [
      "Spare-parts option for lifting equipment maintenance and repair",
      "Model, interface and photo details can be checked before quotation",
      "Suitable for rental fleets, service teams, dealers and distributors",
      "Export packing and combined spare-parts shipment support available",
    ];
  }

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
  if (label.toLowerCase().includes("control") || label.toLowerCase().includes("part")) {
    return ["Fleet maintenance", "Replacement parts", "Dealer stock", "Service teams"];
  }

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
  const partsSubcategory = partsSubcategoryPriority
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

  if (primary?.normalizedSlug === "spare-parts" || partsSubcategory) {
    return {
      category: "spare-parts",
      label: partsSubcategory?.name || primary?.name || "Spare Parts",
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
    specs: Object.keys(specs).length
      ? specs
      : defaultSpecs(
          cat.label,
          cat.category === "cranes" ? "Cranes" : cat.category === "spare-parts" ? "Spare Parts" : "Aerial Work Platforms",
        ),
    features: description
      ? description.split(/\. |\n/).map((item) => item.trim()).filter(Boolean).slice(0, 4)
      : defaultFeatures(cat.label),
    applications: defaultApplications(cat.label),
    leadTime: "Confirm before quotation",
    gallery,
  };
}

function mapCmsPost(post: any): SitePost {
  const body = stripHtml(post.content?.rendered || post.content || "");
  return {
    slug: post.slug,
    title: stripHtml(post.title?.rendered || post.title || ""),
    excerpt: stripHtml(post.excerpt?.rendered || post.excerpt || ""),
    date: String(post.date || "").slice(0, 10),
    image: post.featuredImage || "",
    category: "News",
    readTime: "5 min read",
    content: body ? [{ heading: "Article", paragraphs: [body] }] : [],
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
