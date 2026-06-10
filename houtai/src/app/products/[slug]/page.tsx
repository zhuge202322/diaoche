import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock3, Download, ShieldCheck } from "lucide-react";
import FaqList from "@/components/site/FaqList";
import ProductCard from "@/components/site/ProductCard";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { loadRelatedProducts, loadSiteProduct } from "@/lib/site-data";

const faqs = [
  {
    question: "Can you provide used equipment condition details?",
    answer:
      "Yes. Pillarlift can provide available photos, core specifications and practical condition notes before quotation confirmation.",
  },
  {
    question: "What information should I send before quotation?",
    answer:
      "Please share machine type, lifting capacity or working height, preferred brand, year range, budget, quantity and destination port.",
  },
  {
    question: "Can you provide accessories or spare parts with the shipment?",
    answer:
      "Yes. Pillarlift supplies lifting equipment accessories and can prepare suitable spare-parts support for cranes and aerial platforms.",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await loadSiteProduct(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.short,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await loadSiteProduct(slug);

  if (!product) notFound();

  const related = await loadRelatedProducts(product);

  return (
    <SiteFrame>
      <section className="pl-section pl-paper">
        <div className="pl-container pl-detail-grid">
          <Reveal>
            <div className="pl-detail-media">
              <img src={product.image} alt={product.name} />
            </div>
          </Reveal>
          <Reveal>
            <div>
              <span className="pl-eyebrow">{product.badge}</span>
              <h1>{product.name}</h1>
              <p className="pl-muted">{product.summary}</p>
              <div className="pl-meta">
                <span>
                  <Clock3 size={14} /> Lead time: {product.leadTime}
                </span>
                <span>
                  <ShieldCheck size={14} /> Export support
                </span>
              </div>
              <div className="pl-button-row">
                <Link className="pl-btn" href={`/inquiry?product=${product.slug}`}>
                  Request Quote <ArrowRight size={18} />
                </Link>
                <a className="pl-btn pl-btn-dark" href="#specs">
                  <Download size={18} /> View Specs
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pl-section" id="specs">
        <div className="pl-container pl-two-column">
          <div>
            <Reveal>
              <div className="pl-section-head" style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <span className="pl-eyebrow">Technical snapshot</span>
                  <h2>Core specifications and configuration notes.</h2>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="pl-spec-grid">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div className="pl-spec-item" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <aside className="pl-side-panel">
              <h3>Quotation checklist</h3>
              <p>
                Share destination country, machine type, preferred brand, year range, condition needs, quantity and target budget for a faster quote.
              </p>
              <div className="pl-meta">
                {product.applications.map((item) => (
                  <span className="pl-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <Link className="pl-btn" href={`/inquiry?product=${product.slug}`}>
                Send Requirements <ArrowRight size={17} />
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="pl-section pl-paper">
        <div className="pl-container pl-split">
          <Reveal>
            <div>
              <span className="pl-eyebrow">Built for buyers</span>
              <h2>Practical details for used equipment procurement.</h2>
              <ul className="pl-feature-list">
                {product.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={18} /> <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="pl-gallery">
              {product.gallery.map((image, index) => (
                <div key={`${image}-${index}`}>
                  <img src={image} alt={`${product.name} gallery ${index + 1}`} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container pl-two-column">
          <Reveal>
            <div>
              <span className="pl-eyebrow">Buyer questions</span>
              <h2>Common details before order confirmation.</h2>
            </div>
          </Reveal>
          <Reveal>
            <FaqList items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="pl-section pl-paper">
        <div className="pl-container">
          <Reveal>
            <div className="pl-section-head">
              <div>
                <span className="pl-eyebrow">Related models</span>
                <h2>Compare equipment from the same procurement family.</h2>
              </div>
              <Link className="pl-text-link" href="/products">
                Back to catalog <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <div className="pl-product-grid pl-catalog-grid">
            {related.map((item) => (
              <Reveal key={item.slug}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
