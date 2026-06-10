import Link from "next/link";
import { MapPin, Phone, Send, UserRound } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="pl-footer">
      <div className="pl-container pl-footer-grid">
        <div>
          <Link className="pl-brand" href="/">
            <span className="pl-brand-mark" aria-hidden="true" />
            <span>
              <strong>{siteConfig.brand}</strong>
              <small>Cranes & Access</small>
            </span>
          </Link>
          <p>{siteConfig.description}</p>
        </div>
        <div>
          <h3>Products</h3>
          <Link href="/products">Used Cranes</Link>
          <Link href="/products">Scissor Lifts</Link>
          <Link href="/products">Boom Lifts</Link>
          <Link href="/products">Accessories</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/about">About Us</Link>
          <Link href="/products">Product Catalog</Link>
          <Link href="/inquiry">Request Quote</Link>
          <Link href="/admin">Admin Panel</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <span><MapPin size={18} /> {siteConfig.location}</span>
          <span><UserRound size={18} /> {siteConfig.contactName}</span>
          <a href={siteConfig.whatsappHref}><Phone size={18} /> WhatsApp: {siteConfig.whatsapp}</a>
          <Link className="pl-btn" href="/inquiry"><Send size={17} /> Send Inquiry</Link>
        </div>
      </div>
      <div className="pl-container pl-footer-bottom">
        <span>Copyright 2026 {siteConfig.company}. All rights reserved.</span>
        <span>Frontend and admin are integrated in one Next.js project.</span>
      </div>
    </footer>
  );
}
