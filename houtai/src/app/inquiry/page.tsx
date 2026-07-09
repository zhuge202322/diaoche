import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck, TimerReset } from "lucide-react";
import InquiryForm from "@/components/site/InquiryForm";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { siteConfig } from "@/lib/site-config";
import { loadSiteProduct, loadSiteProducts } from "@/lib/site-data";

export const metadata = {
  title: "Inquiry",
  description: "Contact Pillarlift for aerial work platforms, cranes, spare parts and available stock from China.",
};

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;
  const products = await loadSiteProducts();
  const selected = params?.product ? await loadSiteProduct(params.product) : null;

  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">Request quotation</span>
          <h1>Request a quote for aerial work platforms, cranes or spare parts.</h1>
          <p>
            Share your required machine type, working height, lifting capacity, customization needs, quantity and destination market.
          </p>
        </div>
      </section>

      <section className="pl-section pl-paper">
        <div className="pl-container pl-inquiry-layout">
          <Reveal>
            <InquiryForm products={products} selectedProduct={selected?.name || ""} />
          </Reveal>

          <Reveal>
            <aside className="pl-contact-card">
              <span className="pl-eyebrow">Fast response</span>
              <h2 style={{ fontSize: 30 }}>What to include</h2>
              <p className="pl-muted">
                The more complete the request, the faster Pillarlift can match equipment, stock machines, spare parts and export-ready quotation details.
              </p>
              <ul className="pl-feature-list">
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
              <div className="pl-contact-list">
                <a href={siteConfig.whatsappHref}>
                  <Phone size={18} /> WhatsApp: {siteConfig.whatsapp}
                </a>
                <a href={siteConfig.emailHref}>
                  <Mail size={18} /> {siteConfig.email}
                </a>
                <span>
                  <MapPin size={18} /> {siteConfig.location}
                </span>
              </div>
              <Link className="pl-text-link" href="/products" style={{ marginTop: 22 }}>
                Compare products first <ArrowRight size={16} />
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>
    </SiteFrame>
  );
}
