import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
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
              <small>Heavy Machinery</small>
            </span>
          </Link>
          <p>{siteConfig.description}</p>
        </div>
        <div>
          <h3>Products</h3>
          <Link href="/aerial-work-platforms">Aerial Work Platforms</Link>
          <Link href="/cranes">Cranes</Link>
          <Link href="/spare-parts">Spare Parts</Link>
          <Link href="/available-stock">Available Stock</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/solutions">Solutions</Link>
          <Link href="/about">About Us</Link>
          <Link href="/news">News</Link>
          <Link href="/contact-us">Contact Us</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <span><MapPin size={18} /> {siteConfig.location}</span>
          <a href={siteConfig.whatsappHref}><Phone size={18} /> WhatsApp: {siteConfig.whatsapp}</a>
          <a href={siteConfig.emailHref}><Mail size={18} /> {siteConfig.email}</a>
          <Link className="pl-btn" href="/contact-us"><Send size={17} /> Send Inquiry</Link>
        </div>
      </div>
      <div className="pl-container pl-footer-bottom">
        <span>Copyright 2026 {siteConfig.company}. All rights reserved.</span>
        <span>Manufacturer, rental fleet partner and export supplier from China.</span>
      </div>
    </footer>
  );
}
