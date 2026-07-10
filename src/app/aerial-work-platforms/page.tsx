import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import ProductCatalog from "@/components/site/ProductCatalog";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { aerialWorkPlatformItems } from "@/lib/navigation";
import { loadSiteProducts } from "@/lib/site-data";

const descriptions: Record<string, string> = {
  "scissor-lifts": "Electric and rough-terrain scissor lifts for warehouses, construction sites, maintenance teams and rental fleets.",
  "articulating-boom-lifts": "Up-and-over boom lifts for plant maintenance, facade work, industrial access and complex jobsite reach.",
  "telescopic-boom-lifts": "Straight boom lifts for long horizontal outreach, high working height and outdoor construction projects.",
  "spider-lifts": "Compact spider lifts for narrow access, indoor maintenance, landscaping, glass installation and atrium work.",
  "truck-mounted-platforms": "Truck-mounted aerial platforms designed for utilities, road maintenance, signage, lighting and municipal work.",
  "used-aerial-lifts": "Inspected used aerial lifts for buyers who need fast delivery, competitive pricing and export-ready options.",
};

export const metadata = {
  title: "Aerial Work Platforms",
  description: "Scissor lifts, boom lifts, spider lifts, truck-mounted platforms and used aerial lifts from Pillarlift.",
};

export default async function AerialWorkPlatformsPage() {
  const products = (await loadSiteProducts()).filter((product) => product.category === "aerial-work-platforms");
  const filterOptions = [
    { id: "all", label: "All Aerial Platforms" },
    ...Array.from(new Set(products.map((product) => product.categoryLabel))).map((label) => ({ id: label, label })),
  ];

  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">Aerial work platforms</span>
          <h1>Scissor lifts, boom lifts, spider lifts and truck-mounted platforms.</h1>
          <p>Customized aerial access equipment for rental companies, contractors, dealers and global importers.</p>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container">
          <div className="pl-card-grid">
            {aerialWorkPlatformItems.map((item) => {
              const id = item.href.split("#")[1];
              return (
                <Reveal key={item.href}>
                  <article id={id} className="pl-category-card">
                    <span className="pl-category-icon"><BadgeCheck size={24} /></span>
                    <h3>{item.label}</h3>
                    <p>{descriptions[id] || "Custom aerial work platform solutions from China."}</p>
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
              <span className="pl-eyebrow">Available equipment</span>
              <h2>Aerial platform products and stock options.</h2>
            </div>
            <Link className="pl-btn" href="/contact-us">Request Quote <ArrowRight size={18} /></Link>
          </div>
          <ProductCatalog
            products={products}
            filterOptions={filterOptions}
            filterBy="categoryLabel"
            chipLabel="Aerial platform catalog"
          />
        </div>
      </section>
    </SiteFrame>
  );
}
