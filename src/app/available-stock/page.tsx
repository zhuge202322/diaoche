import Link from "next/link";
import { ArrowRight, ClipboardCheck, Ship, TimerReset } from "lucide-react";
import ProductCard from "@/components/site/ProductCard";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { loadSiteProducts } from "@/lib/site-data";

const stockSteps = [
  { icon: ClipboardCheck, title: "Stock Confirmation", text: "Confirm model, working height, capacity, year, configuration and available photos." },
  { icon: TimerReset, title: "Fast Delivery Plan", text: "Prepare quotation, inspection details, payment terms and loading schedule quickly." },
  { icon: Ship, title: "Export Shipment", text: "Arrange container, flat rack, RoRo or combined spare-parts shipment for global customers." },
];

export const metadata = {
  title: "Available Stock",
  description: "Available stock aerial work platforms, cranes and spare parts from Pillarlift.",
};

export default async function AvailableStockPage() {
  const products = await loadSiteProducts();

  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">Available stock</span>
          <h1>Ready equipment and fast-delivery lifting solutions.</h1>
          <p>Ask Pillarlift for current stock lists covering aerial work platforms, cranes, used equipment and spare parts.</p>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container">
          <div className="pl-card-grid">
            {stockSteps.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title}>
                  <article className="pl-category-card">
                    <span className="pl-category-icon"><Icon size={24} /></span>
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
              <span className="pl-eyebrow">Stock examples</span>
              <h2>Representative products for current stock inquiry.</h2>
            </div>
            <Link className="pl-btn" href="/contact-us">Ask for Stock List <ArrowRight size={18} /></Link>
          </div>
          <div className="pl-product-grid">
            {products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
