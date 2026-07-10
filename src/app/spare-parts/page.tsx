import Link from "next/link";
import { ArrowRight, Boxes, ClipboardCheck, Headset, Ship } from "lucide-react";
import ProductCard from "@/components/site/ProductCard";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { loadSiteProducts } from "@/lib/site-data";

const support = [
  { icon: Boxes, title: "Parts Packages", text: "Consumables, hydraulic components, batteries, chargers, controllers and maintenance kits." },
  { icon: ClipboardCheck, title: "Model Matching", text: "Parts lists can be matched around equipment model, serial details, photos and fleet needs." },
  { icon: Ship, title: "Export Packing", text: "Carton, crate and combined shipment options support distributors and rental fleet warehouses." },
  { icon: Headset, title: "Remote Support", text: "Technical guidance helps buyers identify replacement parts and plan replenishment." },
];

export const metadata = {
  title: "Spare Parts",
  description: "Factory-direct spare parts and accessories for aerial work platforms and cranes.",
};

export default async function SparePartsPage() {
  const products = (await loadSiteProducts()).filter((product) => product.category === "spare-parts");

  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">Spare parts</span>
          <h1>Spare parts, accessories and maintenance support for lifting equipment fleets.</h1>
          <p>Factory-direct parts support for aerial work platforms, cranes, dealers and rental companies.</p>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container">
          <div className="pl-service-grid">
            {support.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title}>
                  <article className="pl-service-card">
                    <Icon size={30} />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
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
              <span className="pl-eyebrow">Parts catalog</span>
              <h2>Spare-parts products and export packages.</h2>
            </div>
            <Link className="pl-btn" href="/contact-us">Send Parts Inquiry <ArrowRight size={18} /></Link>
          </div>
          <div className="pl-product-grid">
            {products.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
