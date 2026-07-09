import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, TimerReset } from "lucide-react";
import InquiryForm from "@/components/site/InquiryForm";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { siteConfig } from "@/lib/site-config";
import { loadSiteProducts } from "@/lib/site-data";

export const metadata = {
  title: "Contact Us",
  description: "Contact Shenzhen Pillarlift Heavy Machinery Co., Ltd. for aerial work platforms, cranes and spare parts.",
};

export default async function ContactUsPage() {
  const products = await loadSiteProducts();

  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">Contact us</span>
          <h1>Contact Pillarlift for aerial work platforms, cranes, spare parts and stock equipment.</h1>
          <p>Send your working height, lifting capacity, quantity, destination and customization requirements.</p>
        </div>
      </section>

      <section className="pl-section pl-paper">
        <div className="pl-container pl-inquiry-layout">
          <Reveal>
            <InquiryForm products={products} selectedProduct="" />
          </Reveal>

          <Reveal>
            <aside className="pl-contact-card">
              <span className="pl-eyebrow">Direct contact</span>
              <h2 style={{ fontSize: 30 }}>{siteConfig.company}</h2>
              <p className="pl-muted">
                Share your equipment type, working height, lifting capacity, delivery timeline and destination. Pillarlift will help prepare a suitable quotation.
              </p>
              <ul className="pl-feature-list">
                <li><ShieldCheck size={18} /> <span>Factory-direct pricing and customization support</span></li>
                <li><TimerReset size={18} /> <span>Fast response for stock, rental fleet and export inquiries</span></li>
              </ul>
              <div className="pl-contact-list">
                <a href={siteConfig.whatsappHref}><Phone size={18} /> WhatsApp: {siteConfig.whatsapp}</a>
                <a href={siteConfig.emailHref}><Mail size={18} /> {siteConfig.email}</a>
                <span><MapPin size={18} /> {siteConfig.location}</span>
              </div>
              <Link className="pl-text-link" href="/available-stock" style={{ marginTop: 22 }}>
                Check available stock
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>
    </SiteFrame>
  );
}
