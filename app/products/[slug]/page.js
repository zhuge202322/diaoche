import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock3, Download, ShieldCheck } from "lucide-react";
import FaqList from "@/components/FaqList";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";

const faqs = [
  {
    question: "Can you provide used equipment condition details?",
    answer:
      "Yes. Pillarlift can provide available photos, core specifications and practical condition notes before quotation confirmation."
  },
  {
    question: "What information should I send before quotation?",
    answer:
      "Please share machine type, lifting capacity or working height, preferred brand, year range, budget, quantity and destination port."
  },
  {
    question: "Can you provide accessories or spare parts with the shipment?",
    answer:
      "Yes. Pillarlift supplies lifting equipment accessories and can prepare suitable spare-parts support for cranes and aerial platforms."
  }
];

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.short
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero-grid">
          <Reveal>
            <div className="detail-media">
              <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1080px) 100vw, 55vw" />
            </div>
          </Reveal>
          <Reveal>
            <div className="detail-copy">
              <span className="eyebrow">{product.badge}</span>
              <h1>{product.name}</h1>
              <p className="muted">{product.summary}</p>
              <div className="product-meta">
                <span>
                  <Clock3 size={14} /> Lead time: {product.leadTime}
                </span>
                <span>
                  <ShieldCheck size={14} /> Export support
                </span>
              </div>
              <div className="button-row detail-actions">
                <Link className="btn" href={`/inquiry?product=${product.slug}`}>
                  Request Quote <ArrowRight size={18} />
                </Link>
                <a className="btn dark" href="#specs">
                  <Download size={18} /> View Specs
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="specs">
        <div className="container two-column">
          <div>
            <Reveal>
              <div className="section-head" style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <span className="eyebrow">Technical snapshot</span>
              <h2>Core specifications and configuration notes.</h2>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="spec-grid">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div className="spec-item" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <aside className="detail-side">
              <h3>Quotation checklist</h3>
              <p className="muted">
                Share destination country, machine type, preferred brand, year range, condition needs, quantity and target budget for a faster quote.
              </p>
              <div className="product-meta">
                {product.applications.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <Link className="btn" href={`/inquiry?product=${product.slug}`}>
                Send Requirements <ArrowRight size={17} />
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="section paper">
        <div className="container split">
          <Reveal>
            <div>
              <span className="eyebrow">Built for buyers</span>
              <h2>Practical details for used equipment procurement.</h2>
              <ul className="feature-list">
                {product.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={18} /> <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="detail-gallery">
              {product.gallery.map((image, index) => (
                <div className="gallery-shot" key={image}>
                  <Image src={image} alt={`${product.name} gallery ${index + 1}`} fill sizes="(max-width: 1080px) 33vw, 18vw" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <Reveal>
            <div>
              <span className="eyebrow">Buyer questions</span>
              <h2>Common details before order confirmation.</h2>
            </div>
          </Reveal>
          <Reveal>
            <FaqList items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="section paper">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Related models</span>
                <h2>Compare equipment from the same procurement family.</h2>
              </div>
              <Link className="text-link" href="/products">
                Back to catalog <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <div className="product-grid catalog-grid">
            {related.map((item) => (
              <Reveal key={item.slug}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
