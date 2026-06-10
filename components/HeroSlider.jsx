"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Factory } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";

const slides = [
  {
    title: "Used Cranes & Aerial Work Platforms from China",
    text: "Source used truck cranes, crawler cranes, scissor lifts, boom lifts and lifting accessories with Pillarlift export support.",
    image: "/assets/equipment/hero-fleet.png",
    label: "Used Equipment",
    note: "Cranes + access"
  },
  {
    title: "Reliable Lifting Equipment for Global Buyers",
    text: "We work with major Chinese brands to provide competitive new and used equipment for distributors, contractors and rental fleets.",
    image: "/assets/equipment/telescopic-truck-crane.png",
    label: "Crane Sourcing",
    note: "Truck + mobile"
  },
  {
    title: "Aerial Platforms for Maintenance and Rental Fleets",
    text: "Boom lifts and scissor lifts configured for industrial maintenance, building work, energy sites and equipment rental operations.",
    image: "/assets/equipment/articulating-boom-lift.png",
    label: "Access Equipment",
    note: "Boom + scissor"
  }
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % slides.length);
    }, 5800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-media">
        {slides.map((item, index) => (
          <Image
            key={item.image}
            src={item.image}
            alt={item.label}
            fill
            priority={index === 0}
            sizes="100vw"
            style={{
              opacity: active === index ? 1 : 0,
              transform: active === index ? "scale(1)" : "scale(1.04)"
            }}
          />
        ))}
      </div>

      <div className="container hero-content">
        <div className="hero-copy">
          <span className="eyebrow">B2B machinery export</span>
          <h1>{slide.title}</h1>
          <p className="muted">{slide.text}</p>
          <div className="button-row">
            <Link className="btn" href="/products">
              Browse Products <ArrowRight size={18} />
            </Link>
            <Link className="btn ghost" href="/inquiry">
              Request Quote <ClipboardCheck size={18} />
            </Link>
          </div>
        </div>

        <aside className="hero-strip" aria-label="Featured equipment groups">
          <Factory size={26} color="var(--red)" />
          <h3>{siteConfig.company}</h3>
          <p className="muted">
            {siteConfig.tagline}
          </p>
          <div className="hero-tabs">
            {slides.map((item, index) => (
              <button
                key={item.label}
                className={`hero-tab ${active === index ? "active" : ""}`}
                type="button"
                onClick={() => setActive(index)}
              >
                <span className="hero-tab-index">{index + 1}</span>
                <span>
                  <strong>{item.label}</strong>
                  <span>{item.note}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <div className="container hero-stats" aria-label="Company highlights">
        <div className="hero-stat">
          <strong>2018</strong>
          <span>Established</span>
        </div>
        <div className="hero-stat">
          <strong>New + Used</strong>
          <span>Equipment supply</span>
        </div>
        <div className="hero-stat">
          <strong>Sarah</strong>
          <span>WhatsApp support</span>
        </div>
      </div>
    </section>
  );
}
