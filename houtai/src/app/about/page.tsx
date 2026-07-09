import Link from "next/link";
import { ArrowRight, BadgeCheck, Factory, Globe2, ShieldCheck, Wrench } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { companyIntro, siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "About",
  description: siteConfig.description,
};

const timeline = [
  ["20+ Years", "Deep industry experience in aerial work platforms, cranes, rental operations and export supply."],
  ["Top 10 China", "Recognized among China's leading manufacturers for lifting equipment and access machinery."],
  ["Top 30 Worldwide", "Global ranking and export experience support international buyers and distributors."],
  ["1000s Fleet", "Large rental fleet operation helps customers compare equipment, stock and long-term support."],
];

const capabilities = [
  {
    icon: Factory,
    title: "Manufacturing Capability",
    text: "Custom aerial work platforms, cranes and spare parts supported by strong production and factory-direct pricing.",
  },
  {
    icon: ShieldCheck,
    title: "Rental Fleet Experience",
    text: "Thousands of machines in rental operation help buyers understand real jobsite performance and fleet needs.",
  },
  {
    icon: Wrench,
    title: "Worldwide Export Support",
    text: "Inspection, documents, spare parts, packing and shipping plans prepared for global customers and dealers.",
  },
];

export default function AboutPage() {
  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">About {siteConfig.brand}</span>
          <h1>A leading manufacturer and rental service provider for aerial work platforms and cranes.</h1>
          <p>Pillarlift supplies customized lifting equipment, spare parts and export support for customers worldwide.</p>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container pl-split">
          <Reveal>
            <div>
              <span className="pl-eyebrow">What we do</span>
              <h2>{siteConfig.company}</h2>
              <p className="pl-muted">{companyIntro}</p>
              <p className="pl-muted">
                Our core categories are aerial work platforms, cranes and spare parts, covering scissor lifts, boom lifts, truck-mounted platforms, spider lifts, truck cranes, crawler cranes and accessories.
              </p>
              <div className="pl-button-row">
                <Link className="pl-btn" href="/aerial-work-platforms">
                  View Catalog <ArrowRight size={18} />
                </Link>
                <Link className="pl-btn" href="/contact-us">
                  Send Inquiry <BadgeCheck size={18} />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="pl-media-panel">
              <img src="/assets/equipment/factory-workshop.png" alt="Crane and aerial lift workshop" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pl-section pl-paper">
        <div className="pl-container">
          <Reveal>
            <div className="pl-section-head">
              <div>
                <span className="pl-eyebrow">Development path</span>
                <h2>Built around manufacturing, rental fleets and export service.</h2>
              </div>
              <p className="pl-muted">
                Pillarlift works with global customers who need high-quality equipment, reliable performance, fast delivery and cost-effective lifting solutions.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pl-spec-grid">
              {timeline.map(([year, text]) => (
                <div className="pl-spec-item" key={year}>
                  <span>{year}</span>
                  <strong>{text}</strong>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container">
          <Reveal>
            <div className="pl-section-head">
              <div>
                <span className="pl-eyebrow">Capabilities</span>
                <h2>Manufacturing, rental experience, spare parts and export support in one workflow.</h2>
              </div>
              <p className="pl-muted">
                The Pillarlift team helps buyers compare models, customize requirements, confirm spare parts and prepare shipment information.
              </p>
            </div>
          </Reveal>
          <div className="pl-card-grid">
            {capabilities.map((item) => {
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

      <section className="pl-section pl-dark">
        <div className="pl-container pl-split">
          <Reveal>
            <div>
              <span className="pl-eyebrow">Global coverage</span>
              <h2>Supplying lifting equipment, spare parts and stock machines worldwide.</h2>
              <p className="pl-muted">
                Pillarlift supplies aerial work platforms, cranes and spare parts to global customers through professional China-based manufacturing and export service.
              </p>
              <div className="pl-meta">
                {["English documents", "Port loading photos", "Parts packages", "Remote support"].map((item) => (
                  <span className="pl-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="pl-side-panel" style={{ position: "static" }}>
              <Globe2 size={34} color="var(--pl-red)" />
              <h3>Export coordination for global buyers</h3>
              <p>
                Equipment is prepared around buyer requirements, from machine condition and accessories to shipping method and documentation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteFrame>
  );
}
