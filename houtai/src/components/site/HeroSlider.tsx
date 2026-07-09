"use client";

import Link from "next/link";
import { ArrowRight, ClipboardCheck, Factory } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const slides = [
  {
    title: "Aerial Work Platforms & Cranes from China",
    text: "Manufacturer, rental fleet partner and export supplier for scissor lifts, boom lifts, truck-mounted platforms, cranes and spare parts.",
    image: "/assets/equipment/hero-fleet.png",
    label: "Heavy Machinery",
    note: "Access + cranes",
  },
  {
    title: "Top-ranked Manufacturer with Rental Fleet Experience",
    text: "With more than 20 years of industry experience, Pillarlift supports rental companies, contractors, dealers and importers worldwide.",
    image: "/assets/equipment/telescopic-truck-crane.png",
    label: "Top 10 China",
    note: "Top 30 worldwide",
  },
  {
    title: "Customized Equipment and Factory-direct Pricing",
    text: "Choose scissor lifts, boom lifts, spider lifts, truck-mounted aerial platforms, cranes and spare parts with fast delivery.",
    image: "/assets/equipment/articulating-boom-lift.png",
    label: "Customization",
    note: "Fast delivery",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 5800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="pl-hero">
      <div className="pl-hero-media">
        {slides.map((item, index) => (
          <img key={item.image} src={item.image} alt={item.label} className={active === index ? "pl-show" : ""} />
        ))}
      </div>
      <div className="pl-container pl-hero-content">
        <div className="pl-hero-copy">
          <span className="pl-eyebrow">B2B heavy machinery</span>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <div className="pl-button-row">
            <Link className="pl-btn" href="/aerial-work-platforms">Browse Products <ArrowRight size={18} /></Link>
            <Link className="pl-btn pl-btn-ghost" href="/contact-us">Request Quote <ClipboardCheck size={18} /></Link>
          </div>
        </div>
        <aside className="pl-hero-panel">
          <Factory size={26} color="var(--pl-red)" />
          <h3>{siteConfig.company}</h3>
          <p>{siteConfig.tagline}</p>
          <div className="pl-hero-tabs">
            {slides.map((item, index) => (
              <button key={item.label} className={active === index ? "pl-active" : ""} type="button" onClick={() => setActive(index)}>
                <span>{index + 1}</span>
                <strong>{item.label}<small>{item.note}</small></strong>
              </button>
            ))}
          </div>
        </aside>
      </div>
      <div className="pl-container pl-hero-stats">
        <div><strong>20+</strong><span>Years experience</span></div>
        <div><strong>1000s</strong><span>Rental fleet machines</span></div>
        <div><strong>Top 30</strong><span>Worldwide ranking</span></div>
      </div>
    </section>
  );
}
