import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

process.env.DATABASE_URL ||= "file:./dev.db";

const prisma = new PrismaClient();
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(scriptDir, "../src/data/kinglift-products.json");
const products = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const oldSampleProductSlugs = [
  "used-telescopic-truck-crane",
  "used-knuckle-boom-crane",
  "used-articulating-boom-lift",
  "used-scissor-lift",
  "used-crawler-crane",
  "lifting-accessories-export-package",
];

const oldSampleCategorySlugs = ["used-cranes", "aerial-platforms", "accessories"];

const categoryDefinitions = [
  {
    name: "Aerial Work Platforms",
    slug: "aerial-work-platforms",
    sortOrder: 10,
    imageUrl: "/assets/equipment/scissor-lift.png",
  },
  {
    name: "Scissor Lifts",
    slug: "scissor-lifts",
    sortOrder: 11,
    imageUrl: products.find((item) => item.subCategorySlug === "scissor-lifts")?.image || "",
  },
  {
    name: "Boom Lifts",
    slug: "boom-lifts",
    sortOrder: 12,
    imageUrl: products.find((item) => item.subCategorySlug === "boom-lifts")?.image || "",
  },
  {
    name: "Articulating Boom Lifts",
    slug: "articulating-boom-lifts",
    sortOrder: 13,
    imageUrl: products.find((item) => item.subCategorySlug === "articulating-boom-lifts")?.image || "",
  },
  {
    name: "Telescopic Boom Lifts",
    slug: "telescopic-boom-lifts",
    sortOrder: 14,
    imageUrl: products.find((item) => item.subCategorySlug === "telescopic-boom-lifts")?.image || "",
  },
  {
    name: "Towable Boom Lifts",
    slug: "towable-boom-lifts",
    sortOrder: 15,
    imageUrl: products.find((item) => item.subCategorySlug === "towable-boom-lifts")?.image || "",
  },
];

function specsToText(specs = {}) {
  return Object.entries(specs)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}

async function main() {
  const importSlugs = products.map((product) => product.slug);
  const cleanupSlugs = [...oldSampleProductSlugs, ...importSlugs];

  await prisma.productSkuImage.deleteMany({
    where: { sku: { product: { slug: { in: cleanupSlugs } } } },
  });
  await prisma.productSku.deleteMany({
    where: { product: { slug: { in: cleanupSlugs } } },
  });
  await prisma.productImage.deleteMany({
    where: { product: { slug: { in: cleanupSlugs } } },
  });
  await prisma.product.deleteMany({
    where: { slug: { in: cleanupSlugs } },
  });

  for (const category of categoryDefinitions) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        imageUrl: category.imageUrl,
        sortOrder: category.sortOrder,
      },
      create: category,
    });
  }

  await prisma.category.deleteMany({
    where: {
      slug: { in: oldSampleCategorySlugs },
      products: { none: {} },
    },
  });

  for (const product of products) {
    const categorySlugs = [
      "aerial-work-platforms",
      product.subCategorySlug?.includes("boom") ? "boom-lifts" : "",
      product.subCategorySlug,
    ].filter((slug, index, self) => Boolean(slug) && self.indexOf(slug) === index);
    await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        shortDescription: product.short,
        description: product.summary,
        specs: specsToText(product.specs),
        featured: Boolean(product.featured),
        sortOrder: product.sortOrder ?? 0,
        categories: {
          connect: categorySlugs.map((slug) => ({ slug })),
        },
        images: {
          create: (product.gallery?.length ? product.gallery : [product.image])
            .filter(Boolean)
            .map((src, index) => ({
              src,
              alt: product.name,
              sortOrder: index,
            })),
        },
      },
    });
  }

  const categoryCounts = await prisma.category.findMany({
    where: { slug: { in: categoryDefinitions.map((category) => category.slug) } },
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });

  console.log(`Imported ${products.length} aerial work platform products.`);
  console.table(categoryCounts.map((category) => ({
    category: category.name,
    slug: category.slug,
    products: category._count.products,
  })));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
