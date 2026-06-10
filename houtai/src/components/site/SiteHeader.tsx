"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2, Menu, Phone, Send, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/inquiry", label: "Inquiry" },
  { href: "/admin", label: "Admin" },
];

function active(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("pl-lock", open);
    return () => document.body.classList.remove("pl-lock");
  }, [open]);

  return (
    <>
      <div className="pl-topbar">
        <div className="pl-container">
          <div className="pl-topbar-items">
            <a href={siteConfig.whatsappHref}><Phone size={14} /> WhatsApp: {siteConfig.whatsapp}</a>
            <span><UserRound size={14} /> {siteConfig.contactName}</span>
          </div>
          <div className="pl-topbar-items">
            <span>{siteConfig.business} from China</span>
            <span><Globe2 size={14} /> EN</span>
          </div>
        </div>
      </div>
      <header className="pl-header">
        <div className="pl-container pl-nav">
          <Link className="pl-brand" href="/" aria-label={`${siteConfig.brand} home`}>
            <span className="pl-brand-mark" aria-hidden="true" />
            <span>
              <strong>{siteConfig.brand}</strong>
              <small>Cranes & Access</small>
            </span>
          </Link>

          <nav className="pl-links" aria-label="Primary navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={active(pathname, link.href) ? "pl-active" : ""}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pl-actions">
            <span className="pl-lang"><Globe2 size={16} /> English</span>
            <Link className="pl-btn" href="/inquiry"><Send size={17} /> Get Quote</Link>
            <button className="pl-btn pl-btn-dark pl-icon-btn pl-menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <nav className={`pl-mobile-menu ${open ? "pl-open" : ""}`} aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={active(pathname, link.href) ? "pl-active" : ""}>
              {link.label}
            </Link>
          ))}
          <Link className="pl-btn" href="/inquiry"><Send size={17} /> Get Quote</Link>
        </nav>
      </header>
    </>
  );
}
