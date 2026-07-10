import Link from "next/link";
import { ArrowRight, CalendarDays, Gauge } from "lucide-react";
import type { SiteProduct } from "@/lib/site-data";

function resizeProductImage(src: string, width: number) {
  if (!src || !src.includes("usimg.bjyyb.net") || src.includes("x-oss-process")) return src;
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}x-oss-process=image/resize,m_lfit,w_${width}`;
}

export default function ProductCard({ product }: { product: SiteProduct }) {
  const image = product.image || "/assets/equipment/hero-fleet.png";
  const image360 = resizeProductImage(image, 360);
  const image640 = resizeProductImage(image, 640);
  const image900 = resizeProductImage(image, 900);

  return (
    <article className="pl-product-card">
      <Link className="pl-product-media" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <img
          src={image640}
          srcSet={`${image360} 360w, ${image640} 640w, ${image900} 900w`}
          sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1080px) calc((100vw - 56px) / 2), 320px"
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
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
