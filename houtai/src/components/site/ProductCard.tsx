import Link from "next/link";
import { ArrowRight, CalendarDays, Gauge } from "lucide-react";
import type { SiteProduct } from "@/lib/site-data";

export default function ProductCard({ product }: { product: SiteProduct }) {
  return (
    <article className="pl-product-card">
      <Link className="pl-product-media" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
        <span>{product.badge}</span>
      </Link>
      <div className="pl-product-body">
        <h3>{product.name}</h3>
        <p>{product.short}</p>
        <div className="pl-meta">
          <span><Gauge size={14} /> {Object.values(product.specs)[0]}</span>
          <span><CalendarDays size={14} /> {product.leadTime}</span>
        </div>
        <Link className="pl-text-link" href={`/products/${product.slug}`}>
          View details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
