import Link from "next/link";
import { MapPin, Phone, Send, UserRound } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link className="brand" href="/" aria-label={`${siteConfig.brand} home`}>
            <span className="brand-mark" aria-hidden="true" />
            <span>
              <strong>{siteConfig.brand}</strong>
              <span>Cranes & Access</span>
            </span>
          </Link>
          <p style={{ marginTop: 20 }}>
            {siteConfig.description}
          </p>
        </div>
        <div>
          <h3>Products</h3>
          <div className="footer-links">
            <Link href="/products">Used Cranes</Link>
            <Link href="/products">Mobile Cranes</Link>
            <Link href="/products">Boom Lifts</Link>
            <Link href="/products">Scissor Lifts</Link>
          </div>
        </div>
        <div>
          <h3>Company</h3>
          <div className="footer-links">
            <Link href="/about">About Us</Link>
            <Link href="/products">Product Catalog</Link>
            <Link href="/inquiry">Request Quote</Link>
            <Link href="/inquiry">Distributor Inquiry</Link>
          </div>
        </div>
        <div>
          <h3>Contact</h3>
          <div className="contact-list">
            <span>
              <MapPin size={18} /> {siteConfig.location}
            </span>
            <span>
              <UserRound size={18} /> {siteConfig.contactName}
            </span>
            <a href={siteConfig.whatsappHref}>
              <Phone size={18} /> WhatsApp: {siteConfig.whatsapp}
            </a>
          </div>
          <Link className="btn" href="/inquiry" style={{ marginTop: 22 }}>
            <Send size={17} /> Send Inquiry
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Copyright 2026 {siteConfig.company}. All rights reserved.</span>
        <span>English default site for used cranes and aerial work platforms.</span>
      </div>
    </footer>
  );
}
