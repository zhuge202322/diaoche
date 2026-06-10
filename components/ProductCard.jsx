import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Gauge } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-media" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 25vw" />
        <span className="product-badge">{product.badge}</span>
      </Link>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p>{product.short}</p>
        <div className="product-meta">
          <span>
            <Gauge size={14} /> {Object.values(product.specs)[0]}
          </span>
          <span>
            <CalendarDays size={14} /> {product.leadTime}
          </span>
        </div>
        <Link className="text-link" href={`/products/${product.slug}`}>
          View details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
