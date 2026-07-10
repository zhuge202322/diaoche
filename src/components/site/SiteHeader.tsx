"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe2, Mail, Menu, Phone, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { primaryNavigation } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

function active(pathname: string, href: string) {
  const cleanHref = href.split("#")[0];
  if (cleanHref === "/") return pathname === "/";
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
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
            <a href={siteConfig.emailHref}><Mail size={14} /> {siteConfig.email}</a>
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
              <small>Heavy Machinery</small>
            </span>
          </Link>

          <nav className="pl-links" aria-label="Primary navigation">
            {primaryNavigation.map((link) => (
              <div className="pl-nav-item" key={link.href}>
                <Link href={link.href} className={active(pathname, link.href) ? "pl-active" : ""}>
                  {link.label}
                  {link.children ? <ChevronDown size={13} /> : null}
                </Link>
                {link.children ? (
                  <div className="pl-dropdown">
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="pl-actions">
            <Link className="pl-btn" href="/contact-us"><Send size={17} /> Get Quote</Link>
            <button className="pl-btn pl-btn-dark pl-icon-btn pl-menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <nav className={`pl-mobile-menu ${open ? "pl-open" : ""}`} aria-label="Mobile navigation">
          {primaryNavigation.map((link) => (
            <div className="pl-mobile-group" key={link.href}>
              <Link href={link.href} className={active(pathname, link.href) ? "pl-active" : ""}>
                {link.label}
              </Link>
              {link.children ? (
                <div className="pl-mobile-subnav">
                  {link.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <Link className="pl-btn" href="/contact-us"><Send size={17} /> Get Quote</Link>
        </nav>
      </header>
    </>
  );
}
