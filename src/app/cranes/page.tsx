import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import ProductCatalog from "@/components/site/ProductCatalog";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { craneItems } from "@/lib/navigation";
import { loadSiteProducts } from "@/lib/site-data";

const descriptions: Record<string, string> = {
  "truck-cranes": "Road-ready truck cranes for construction lifting, logistics yards, municipal work and equipment rental fleets.",
  "all-terrain-cranes": "All-terrain cranes for high mobility, complex jobsites and heavy lifting across demanding conditions.",
  "rough-terrain-cranes": "Rough-terrain cranes for jobsite lifting where compact size, traction and stability matter.",
  "crawler-cranes": "Crawler cranes for infrastructure, bridge work, energy projects and heavy construction lifting.",
  "used-cranes": "Used crane options with condition review, photos, inspection support and export documentation.",
};

export const metadata = {
  title: "Cranes",
  description: "Truck cranes, all-terrain cranes, rough-terrain cranes, crawler cranes and used cranes from Pillarlift.",
};

export default async function CranesPage() {
  const products = (await loadSiteProducts()).filter((product) => product.category === "cranes");
  const filterOptions = [
    { id: "all", label: "All Cranes" },
    ...Array.from(new Set(products.map((product) => product.categoryLabel))).map((label) => ({ id: label, label })),
  ];

  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">Cranes</span>
          <h1>Truck cranes, all-terrain cranes, crawler cranes and used crane options.</h1>
          <p>Factory-direct crane supply, rental fleet experience, inspection support and worldwide shipping.</p>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container">
          <div className="pl-card-grid">
            {craneItems.map((item) => {
              const id = item.href.split("#")[1];
              return (
                <Reveal key={item.href}>
                  <article id={id} className="pl-category-card">
                    <span className="pl-category-icon"><BadgeCheck size={24} /></span>
                    <h3>{item.label}</h3>
                    <p>{descriptions[id] || "Crane equipment and export support from Pillarlift."}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pl-section pl-paper">
        <div className="pl-container">
          <div className="pl-section-head">
            <div>
              <span className="pl-eyebrow">Crane catalog</span>
              <h2>Crane products and available equipment.</h2>
            </div>
            <Link className="pl-btn" href="/contact-us">Request Quote <ArrowRight size={18} /></Link>
          </div>
          <ProductCatalog
            products={products}
            filterOptions={filterOptions}
            filterBy="categoryLabel"
            chipLabel="Crane equipment catalog"
          />
        </div>
      </section>
    </SiteFrame>
  );
}
