"use client";

import Link from "next/link";
import { ArrowRight, ClipboardCheck, Factory } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const slides = [
  {
    title: "Used Cranes & Aerial Work Platforms from China",
    text: "Source used truck cranes, crawler cranes, scissor lifts, boom lifts and accessories with Pillarlift export support.",
    image: "/assets/equipment/hero-fleet.png",
    label: "Used Equipment",
    note: "Cranes + access",
  },
  {
    title: "Reliable Lifting Equipment for Global Buyers",
    text: "We work with major Chinese brands to provide competitive new and used equipment for distributors, contractors and rental fleets.",
    image: "/assets/equipment/telescopic-truck-crane.png",
    label: "Crane Sourcing",
    note: "Truck + mobile",
  },
  {
    title: "Aerial Platforms for Rental and Jobsite Fleets",
    text: "Compare scissor lifts and boom lifts by working height, condition, power type, shipping method and spare-parts needs.",
    image: "/assets/equipment/articulating-boom-lift.png",
    label: "Access Equipment",
    note: "Boom + scissor",
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
          <span className="pl-eyebrow">B2B machinery export</span>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <div className="pl-button-row">
            <Link className="pl-btn" href="/products">Browse Products <ArrowRight size={18} /></Link>
            <Link className="pl-btn pl-btn-ghost" href="/inquiry">Request Quote <ClipboardCheck size={18} /></Link>
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
        <div><strong>2018</strong><span>Established</span></div>
        <div><strong>New + Used</strong><span>Equipment supply</span></div>
        <div><strong>Global</strong><span>Export service</span></div>
      </div>
    </section>
  );
}
