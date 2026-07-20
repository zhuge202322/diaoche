import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

process.env.DATABASE_URL ||= "file:./dev.db";

const prisma = new PrismaClient();
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(scriptDir, "../src/data/cstopauto-products.json");
const products = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const categoryDefinitions = [
  {
    name: "Spare Parts",
    slug: "spare-parts",
    sortOrder: 30,
    imageUrl: "/assets/equipment/factory-workshop.png",
  },
  {
    name: "Joystick Controls",
    slug: "joystick-controls",
    sortOrder: 31,
    imageUrl: products.find((item) => item.subCategorySlug === "joystick-controls")?.image || "",
  },
  {
    name: "Motor Controllers",
    slug: "motor-controllers",
    sortOrder: 32,
    imageUrl: products.find((item) => item.subCategorySlug === "motor-controllers")?.image || "",
  },
  {
    name: "Platform Control Units",
    slug: "platform-control-units",
    sortOrder: 33,
    imageUrl: products.find((item) => item.subCategorySlug === "platform-control-units")?.image || "",
  },
];

function specsToText(specs = {}) {
  return Object.entries(specs)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}

async function main() {
  const existingImportedProducts = await prisma.product.findMany({
    where: { slug: { startsWith: "cstopauto-" } },
    select: { slug: true },
  });
  const importSlugs = [
    ...new Set([...products.map((product) => product.slug), ...existingImportedProducts.map((product) => product.slug)]),
  ];

  await prisma.productSkuImage.deleteMany({
    where: { sku: { product: { slug: { in: importSlugs } } } },
  });
  await prisma.productSku.deleteMany({
    where: { product: { slug: { in: importSlugs } } },
  });
  await prisma.productImage.deleteMany({
    where: { product: { slug: { in: importSlugs } } },
  });
  await prisma.product.deleteMany({
    where: { slug: { in: importSlugs } },
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

  for (const product of products) {
    const categorySlugs = ["spare-parts", product.subCategorySlug].filter((slug, index, self) => Boolean(slug) && self.indexOf(slug) === index);

    await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        shortDescription: product.short,
        description: product.summary,
        specs: specsToText(product.specs),
        featured: Boolean(product.featured),
        sortOrder: product.sortOrder ?? 3000,
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

  console.log(`Imported ${products.length} spare-parts products.`);
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
