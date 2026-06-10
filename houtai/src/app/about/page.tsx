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
  ["2018", "Shenzhen Pillarlift Co., Ltd. was established as a lifting equipment supplier and exporter from China."],
  ["2020", "Expanded sourcing cooperation with major Chinese brands for cranes, aerial work platforms and accessories."],
  ["2023", "Strengthened new and used equipment supply for overseas distributors, contractors and rental fleets."],
  ["2026", "Improved the independent website experience for faster B2B inquiry and product comparison."],
];

const capabilities = [
  {
    icon: Factory,
    title: "Chinese Brand Network",
    text: "Close cooperation with major Chinese brands for scissor lifts, boom lifts, mobile cranes, truck cranes and crawler cranes.",
  },
  {
    icon: ShieldCheck,
    title: "New and Used Equipment",
    text: "Reliable new and used lifting equipment options with condition photos, configuration review and practical export support.",
  },
  {
    icon: Wrench,
    title: "Accessories Support",
    text: "Lifting equipment accessories, spare parts and documentation prepared for global customers and fleet operators.",
  },
];

export default function AboutPage() {
  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">About {siteConfig.brand}</span>
          <h1>A professional aerial work platform supplier and crane equipment exporter.</h1>
          <p>Established in 2018, Pillarlift supplies reliable new and used lifting equipment, cranes and accessories from China.</p>
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
                Our main business covers used cranes and aerial work platforms, including scissor lifts, boom lifts, mobile cranes, truck cranes, crawler cranes and lifting equipment accessories.
              </p>
              <div className="pl-button-row">
                <Link className="pl-btn" href="/products">
                  View Catalog <ArrowRight size={18} />
                </Link>
                <Link className="pl-btn" href="/inquiry">
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
                <h2>Built around reliable equipment sourcing and export service.</h2>
              </div>
              <p className="pl-muted">
                Pillarlift works with global customers who need competitive prices, clear equipment information and professional export coordination.
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
                <h2>Equipment sourcing, accessories and export support in one workflow.</h2>
              </div>
              <p className="pl-muted">
                Sarah and the Pillarlift team help buyers compare models, review condition details, confirm accessories and prepare shipment information.
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
              <h2>Supplying lifting equipment and accessories worldwide.</h2>
              <p className="pl-muted">
                Pillarlift supplies aerial work platforms, cranes and accessories to global customers through professional China-based sourcing and export service.
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
