import Link from "next/link";
import { ArrowRight, MapPin, Phone, ShieldCheck, TimerReset, UserRound } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import { getProductBySlug } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: "Inquiry",
  description: "Contact Sarah for used cranes, aerial work platforms and lifting equipment accessories from China."
};

export default async function InquiryPage({ searchParams }) {
  const params = await searchParams;
  const selected = params?.product ? getProductBySlug(params.product) : null;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Request quotation</span>
          <h1>Contact Sarah for used cranes and aerial work platforms.</h1>
          <p>
            Share your required machine type, working height, lifting capacity, year range, condition preference and destination market.
          </p>
        </div>
      </section>

      <section className="section paper">
        <div className="container inquiry-layout">
          <Reveal>
            <InquiryForm selectedProduct={selected?.name || ""} />
          </Reveal>

          <Reveal>
            <aside className="contact-card">
              <span className="eyebrow">Fast response</span>
              <h2 style={{ fontSize: 30 }}>What to include</h2>
              <p className="muted">
                The more complete the request, the faster Sarah can match available equipment and prepare an export-ready quotation.
              </p>
              <ul className="feature-list">
                <li>
                  <ShieldCheck size={18} /> <span>Required lifting capacity, working height or machine type</span>
                </li>
                <li>
                  <TimerReset size={18} /> <span>Purchase timeline and destination port</span>
                </li>
                <li>
                  <ArrowRight size={18} /> <span>Preferred brand, year range, condition or accessories</span>
                </li>
              </ul>
              <div className="contact-list">
                <span>
                  <UserRound size={18} /> {siteConfig.contactName}
                </span>
                <a href={siteConfig.whatsappHref}>
                  <Phone size={18} /> WhatsApp: {siteConfig.whatsapp}
                </a>
                <span>
                  <MapPin size={18} /> {siteConfig.location}
                </span>
              </div>
              <Link className="text-link" href="/products" style={{ marginTop: 22 }}>
                Compare products first <ArrowRight size={16} />
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
