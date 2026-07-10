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
    title: "Cranes",
    text: "Truck cranes, all-terrain cranes, rough-terrain cranes, crawler cranes and used crane options.",
  },
  {
    icon: Building2,
    title: "Aerial Work Platforms",
    text: "Scissor lifts, boom lifts, spider lifts, truck-mounted platforms and used aerial lifts.",
  },
  {
    icon: Boxes,
    title: "Spare Parts",
    text: "Factory-direct spare parts, hydraulic components, maintenance kits and accessories.",
  },
];

const scrollingImages = [
  { src: "/assets/equipment/scissor-lift.png", alt: "Scissor lift" },
  { src: "/assets/equipment/articulating-boom-lift.png", alt: "Articulating boom lift" },
  { src: "/assets/equipment/telescopic-truck-crane.png", alt: "Truck crane" },
  { src: "/assets/equipment/knuckle-boom-crane.png", alt: "Truck-mounted lifting equipment" },
  { src: "/assets/equipment/hero-fleet.png", alt: "Pillarlift rental fleet" },
  { src: "/assets/equipment/factory-workshop.png", alt: "Pillarlift workshop" },
];

const services = [
  {
    icon: ClipboardCheck,
    title: "Custom Requirements",
    text: "Working height, lifting capacity, power type, chassis, attachments and destination market are reviewed before quotation.",
  },
  {
    icon: Factory,
    title: "Manufacturing Strength",
    text: "Top-ranked manufacturing capability supports customized aerial platforms, cranes and spare parts supply.",
  },
  {
    icon: Ship,
    title: "Worldwide Shipping",
    text: "Container, flat rack, RoRo and spare-parts shipment plans are prepared for customers worldwide.",
  },
  {
    icon: Headset,
    title: "Rental Fleet Support",
    text: "Thousands of fleet machines and 20+ years of experience help rental companies and dealers scale quickly.",
  },
];

const process = [
  ["01", "Clarify Specs", "Confirm machine type, capacity, working height, power source, customization and destination."],
  ["02", "Match Equipment", "Compare aerial platforms, cranes, spare parts, available stock and rental fleet options."],
  ["03", "Inspect Details", "Coordinate photos, videos, machine information, inspection notes and buyer confirmation."],
  ["04", "Ship Worldwide", "Prepare packing, customs documents, loading photos and logistics tracking."],
  ["05", "Support Fleet", "Supply spare parts, manuals, technical guidance and distributor support."],
];

const news = [
  {
    date: "2026-06-01",
    title: "Aerial work platform selection for rental fleets",
    text: "Compare working height, platform capacity, power type and fleet support requirements.",
  },
  {
    date: "2026-05-18",
    title: "Crane procurement guide for machinery buyers",
    text: "Key points for truck cranes, crawler cranes, inspection details and export shipment planning.",
  },
  {
    date: "2026-04-29",
    title: "Spare parts supply planning for equipment fleets",
    text: "Parts packages, replenishment planning and combined shipments for rental companies and dealers.",
  },
];

export default async function HomePage() {
  const featuredProducts = await loadFeaturedSiteProducts();

  return (
    <SiteFrame>
      <HeroSlider />

      <section className="pl-image-marquee" aria-label="Pillarlift equipment gallery">
        <div className="pl-marquee-track">
          {[...scrollingImages, ...scrollingImages].map((image, index) => (
            <figure key={`${image.src}-${index}`}>
              <img src={image.src} alt={image.alt} />
            </figure>
          ))}
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container">
          <Reveal>
            <div className="pl-section-head">
              <div>
                <span className="pl-eyebrow">Product range</span>
                <h2>Aerial work platforms, cranes and spare parts for global buyers.</h2>
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
              <h2>Manufacturer, rental fleet partner and export supplier from China.</h2>
              <p className="pl-muted">{companyIntro}</p>
              <div className="pl-metric-grid">
                <div className="pl-metric">
                  <strong>20+</strong>
                  <span>Years of industry experience</span>
                </div>
                <div className="pl-metric">
                  <strong>Top 10</strong>
                  <span>Manufacturer ranking in China</span>
                </div>
                <div className="pl-metric">
                  <strong>Top 30</strong>
                  <span>Worldwide industry ranking</span>
                </div>
                <div className="pl-metric">
                  <strong>1000s</strong>
                  <span>Machines in rental fleet support</span>
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
                <h2>Factory-direct lifting solutions with rental fleet experience.</h2>
              </div>
              <p className="pl-muted">
                Pillarlift combines manufacturing capability, rental operation experience and export support for customers worldwide.
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
                <h2>Practical notes for rental companies, dealers and machinery importers.</h2>
              </div>
              <Link className="pl-text-link" href="/inquiry">
                Contact Pillarlift <ArrowRight size={16} />
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
            <p className="pl-muted">Pillarlift will help match aerial platforms, cranes, spare parts, stock machines and shipping plans.</p>
          </div>
          <Link className="pl-btn pl-btn-light" href="/contact-us">
            Start Inquiry <BadgeCheck size={18} />
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
