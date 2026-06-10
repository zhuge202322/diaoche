"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Globe2, Menu, Phone, Send, UserRound, X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/inquiry", label: "Inquiry" }
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-items">
            <a className="topbar-item" href={siteConfig.whatsappHref}>
              <Phone size={14} /> WhatsApp: {siteConfig.whatsapp}
            </a>
            <span className="topbar-item">
              <UserRound size={14} /> {siteConfig.contactName}
            </span>
          </div>
          <div className="topbar-items">
            <span>{siteConfig.business} from China</span>
            <span className="topbar-item">
              <Globe2 size={14} /> EN
            </span>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-shell">
          <Link className="brand" href="/" aria-label={`${siteConfig.brand} home`}>
            <span className="brand-mark" aria-hidden="true" />
            <span>
              <strong>{siteConfig.brand}</strong>
              <span>Cranes & Access</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(pathname, link.href) ? "active" : ""}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <span className="language-pill">
              <Globe2 size={16} /> English
            </span>
            <Link className="btn dark" href="/inquiry">
              <Send size={17} /> Get Quote
            </Link>
            <button
              className="btn dark icon-only menu-toggle"
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <nav className={`mobile-menu ${open ? "open" : ""}`} aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={isActive(pathname, link.href) ? "active" : ""}>
              {link.label}
            </Link>
          ))}
          <Link className="btn" href="/inquiry">
            <Send size={17} /> Get Quote
          </Link>
        </nav>
      </header>
    </>
  );
}
