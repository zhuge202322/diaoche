import Image from "next/image";
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
  Truck
} from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { featuredProducts } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";

const categoryCards = [
  {
    icon: Truck,
    title: "Used Cranes",
    text: "Mobile cranes, truck cranes, crawler cranes and compact lifting options from Chinese suppliers."
  },
  {
    icon: Building2,
    title: "Aerial Work Platforms",
    text: "Boom lifts and scissor lifts for maintenance, installation, rental and industrial access."
  },
  {
    icon: Boxes,
    title: "Accessories & Parts",
    text: "Lifting accessories, hydraulic parts, spare-parts packages and export documentation support."
  }
];

const services = [
  {
    icon: ClipboardCheck,
    title: "Requirement Review",
    text: "Machine type, working height, lifting capacity, year range, condition and destination are checked before quotation."
  },
  {
    icon: Factory,
    title: "Brand Sourcing",
    text: "Close cooperation with major Chinese brands helps buyers compare new and used equipment options."
  },
  {
    icon: Ship,
    title: "Export Logistics",
    text: "RoRo, container, flat rack and CKD packing options are prepared with loading documents."
  },
  {
    icon: Headset,
    title: "After-Sales Support",
    text: "Accessories, manuals, remote guidance and replenishment packages support long-term fleets."
  }
];

const process = [
  ["01", "Clarify Specs", "Confirm equipment type, capacity, working height, year range, condition and destination market."],
  ["02", "Match Options", "Compare suitable cranes, aerial platforms, accessories, shipping plans and commercial terms."],
  ["03", "Review Condition", "Coordinate photos, machine details, available documents and buyer confirmation."],
  ["04", "Ship Worldwide", "Prepare packing, customs documents, loading photos and logistics tracking."],
  ["05", "Support Fleet", "Supply spare parts, manuals, remote commissioning and distributor support."]
];

const news = [
  {
    date: "2026-05-18",
    title: "Choosing between telescopic and knuckle boom cranes",
    text: "A buyer's guide for matching lifting work, truck chassis and operating environment."
  },
  {
    date: "2026-04-26",
    title: "Preparing aerial platforms for rental fleets",
    text: "Battery, tire, telematics and service package choices that affect lifetime value."
  },
  {
    date: "2026-03-12",
    title: "Export packing notes for truck-mounted equipment",
    text: "How RoRo, flat rack and CKD shipment choices change delivery planning."
  }
];

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Product range</span>
                <h2>Used cranes, aerial work platforms and accessories for B2B procurement.</h2>
              </div>
              <p className="muted">
                {siteConfig.description}
              </p>
            </div>
          </Reveal>

          <div className="category-grid">
            {categoryCards.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title}>
                  <article className="category-card">
                    <span className="category-icon">
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

      <section className="section paper">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Featured products</span>
                <h2>Hot categories for construction, rental and maintenance fleets.</h2>
              </div>
              <div className="button-row">
                <Link className="btn dark" href="/products">
                  Full Catalog <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <Reveal key={product.slug}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <div className="media-panel">
              <Image src="/assets/equipment/factory-workshop.png" alt="Crane and aerial platform assembly workshop" fill sizes="(max-width: 1080px) 100vw, 54vw" />
            </div>
          </Reveal>
          <Reveal>
            <div>
              <span className="eyebrow">Pillarlift export support</span>
              <h2>Equipment sourcing support from model selection to shipment.</h2>
              <p className="muted">
                {siteConfig.companyIntro}
              </p>
              <div className="metric-grid">
                <div className="metric-card">
                  <strong>2018</strong>
                  <span>Established in Shenzhen</span>
                </div>
                <div className="metric-card">
                  <strong>New + Used</strong>
                  <span>Lifting equipment supply</span>
                </div>
                <div className="metric-card">
                  <strong>Major</strong>
                  <span>Chinese brand cooperation</span>
                </div>
                <div className="metric-card">
                  <strong>Sarah</strong>
                  <span>WhatsApp: {siteConfig.whatsapp}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Why buyers choose us</span>
                <h2>Clear sourcing communication for used equipment deals.</h2>
              </div>
              <p className="muted">
                Every inquiry is handled with practical equipment knowledge, transparent available options and export-focused communication.
              </p>
            </div>
          </Reveal>
          <div className="service-grid">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title}>
                  <article className="service-card">
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

      <section className="section dark tight">
        <div className="container">
          <Reveal>
            <div className="process">
              {process.map(([step, title, text]) => (
                <div className="process-step" key={step}>
                  <strong>{step}</strong>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Partner ecosystem</span>
                <h2>Close cooperation with leading Chinese equipment brands.</h2>
              </div>
              <p className="muted">
                Pillarlift helps distributors, contractors and rental companies source reliable lifting equipment, cranes and accessories from China.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="brand-row">
              {["SCISSOR LIFTS", "BOOM LIFTS", "MOBILE CRANES", "TRUCK CRANES", "ACCESSORIES"].map((brand) => (
                <div className="brand-tile" key={brand}>
                  {brand}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section paper">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Insights</span>
                <h2>Practical buying notes for machinery importers.</h2>
              </div>
              <Link className="text-link" href="/inquiry">
                Talk to a specialist <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <div className="news-grid">
            {news.map((item) => (
              <Reveal key={item.title}>
                <article className="news-card">
                  <time>{item.date}</time>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow" style={{ color: "white" }}>
              <ShieldCheck size={16} /> Export quote
            </span>
            <h2>Send your working height, lifting capacity or equipment request.</h2>
            <p>Sarah will help match available cranes, aerial platforms or accessories from China.</p>
          </div>
          <Link className="btn light" href="/inquiry">
            Start Inquiry <BadgeCheck size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
