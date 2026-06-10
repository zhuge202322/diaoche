import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  ClipboardCheck,
  Factory,
  Headset,
  ShieldCheck,
  Ship,
  Truck,
} from "lucide-react";
import HeroSlider from "@/components/site/HeroSlider";
import ProductCard from "@/components/site/ProductCard";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { companyIntro, siteConfig } from "@/lib/site-config";
import { loadFeaturedSiteProducts } from "@/lib/site-data";

const categoryCards = [
  {
    icon: Truck,
    title: "Used Cranes",
    text: "Mobile cranes, truck cranes, crawler cranes and compact lifting options from Chinese suppliers.",
  },
  {
    icon: Building2,
    title: "Aerial Work Platforms",
    text: "Boom lifts and scissor lifts for maintenance, installation, rental and industrial access.",
  },
  {
    icon: Boxes,
    title: "Accessories & Parts",
    text: "Lifting accessories, hydraulic parts, spare-parts packages and export documentation support.",
  },
];

const services = [
  {
    icon: ClipboardCheck,
    title: "Requirement Review",
    text: "Machine type, working height, lifting capacity, year range, condition and destination are checked before quotation.",
  },
  {
    icon: Factory,
    title: "Brand Sourcing",
    text: "Close cooperation with major Chinese brands helps buyers compare new and used equipment options.",
  },
  {
    icon: Ship,
    title: "Export Logistics",
    text: "RoRo, container, flat rack and parts shipment options are prepared with loading documents.",
  },
  {
    icon: Headset,
    title: "After-Sales Support",
    text: "Accessories, manuals, remote guidance and replenishment packages support long-term fleets.",
  },
];

const process = [
  ["01", "Clarify Specs", "Confirm equipment type, capacity, working height, year range, condition and destination."],
  ["02", "Match Options", "Compare suitable cranes, aerial platforms, accessories, shipping plans and commercial terms."],
  ["03", "Review Condition", "Coordinate photos, machine details, available documents and buyer confirmation."],
  ["04", "Ship Worldwide", "Prepare packing, customs documents, loading photos and logistics tracking."],
  ["05", "Support Fleet", "Supply spare parts, manuals, remote guidance and distributor support."],
];

const news = [
  {
    date: "2026-06-01",
    title: "Used crane buying checklist for overseas buyers",
    text: "Key points to confirm before paying for a used truck crane or crawler crane.",
  },
  {
    date: "2026-05-18",
    title: "Boom lift or scissor lift: which aerial platform fits your project?",
    text: "Compare reach, height, platform size and jobsite conditions before sourcing.",
  },
  {
    date: "2026-04-29",
    title: "Shipping used lifting equipment from China",
    text: "RoRo, flat rack and container planning notes for cranes and aerial platforms.",
  },
];

export default async function HomePage() {
  const featuredProducts = await loadFeaturedSiteProducts();

  return (
    <SiteFrame>
      <HeroSlider />

      <section className="pl-section">
        <div className="pl-container">
          <Reveal>
            <div className="pl-section-head">
              <div>
                <span className="pl-eyebrow">Product range</span>
                <h2>Used cranes, aerial work platforms and accessories for B2B procurement.</h2>
              </div>
              <p className="pl-muted">{siteConfig.description}</p>
            </div>
          </Reveal>

          <div className="pl-card-grid">
            {categoryCards.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title}>
                  <article className="pl-category-card">
                    <span className="pl-category-icon">
                      <Icon size={26} />
                    </span>
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
          <Reveal>
            <div className="pl-section-head">
              <div>
                <span className="pl-eyebrow">Featured products</span>
                <h2>Hot categories for construction, rental and maintenance fleets.</h2>
              </div>
              <div className="pl-button-row">
                <Link className="pl-btn pl-btn-dark" href="/products">
                  Full Catalog <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="pl-product-grid">
            {featuredProducts.map((product) => (
              <Reveal key={product.slug}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container pl-split">
          <Reveal>
            <div className="pl-media-panel">
              <img src="/assets/equipment/factory-workshop.png" alt="Crane and aerial platform workshop" />
            </div>
          </Reveal>
          <Reveal>
            <div>
              <span className="pl-eyebrow">Pillarlift export support</span>
              <h2>Equipment sourcing support from model selection to shipment.</h2>
              <p className="pl-muted">{companyIntro}</p>
              <div className="pl-metric-grid">
                <div className="pl-metric">
                  <strong>2018</strong>
                  <span>Established in Shenzhen</span>
                </div>
                <div className="pl-metric">
                  <strong>New + Used</strong>
                  <span>Lifting equipment supply</span>
                </div>
                <div className="pl-metric">
                  <strong>Major</strong>
                  <span>Chinese brand cooperation</span>
                </div>
                <div className="pl-metric">
                  <strong>Sarah</strong>
                  <span>WhatsApp: {siteConfig.whatsapp}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pl-section pl-dark">
        <div className="pl-container">
          <Reveal>
            <div className="pl-section-head">
              <div>
                <span className="pl-eyebrow">Why buyers choose us</span>
                <h2>Clear sourcing communication for used equipment deals.</h2>
              </div>
              <p className="pl-muted">
                Every inquiry is handled with practical equipment knowledge, transparent available options and export-focused communication.
              </p>
            </div>
          </Reveal>
          <div className="pl-service-grid">
            {services.map((item) => {
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

      <section className="pl-section pl-dark pl-tight">
        <div className="pl-container">
          <Reveal>
            <div className="pl-process">
              {process.map(([step, title, text]) => (
                <div key={step}>
                  <strong>{step}</strong>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pl-section pl-paper">
        <div className="pl-container">
          <Reveal>
            <div className="pl-section-head">
              <div>
                <span className="pl-eyebrow">Insights</span>
                <h2>Practical buying notes for machinery importers.</h2>
              </div>
              <Link className="pl-text-link" href="/inquiry">
                Talk to Sarah <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <div className="pl-news-grid">
            {news.map((item) => (
              <Reveal key={item.title}>
                <article className="pl-news-card">
                  <time>{item.date}</time>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pl-section pl-dark">
        <div className="pl-container pl-section-head">
          <div>
            <span className="pl-eyebrow">Export quote</span>
            <h2>Send your working height, lifting capacity or equipment request.</h2>
            <p className="pl-muted">Sarah will help match available cranes, aerial platforms or accessories from China.</p>
          </div>
          <Link className="pl-btn pl-btn-light" href="/inquiry">
            Start Inquiry <BadgeCheck size={18} />
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
