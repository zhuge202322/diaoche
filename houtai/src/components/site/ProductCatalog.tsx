"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { siteCategories, type SiteProduct } from "@/lib/site-data";

export default function ProductCatalog({ products }: { products: SiteProduct[] }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const text = `${product.name} ${product.short} ${product.applications.join(" ")}`.toLowerCase();
      return categoryMatch && (!term || text.includes(term));
    });
  }, [category, products, query]);

  return (
    <div className="pl-catalog-layout">
      <aside className="pl-filter">
        <h3><SlidersHorizontal size={18} /> Filter Equipment</h3>
        <div className="pl-filter-list">
          {siteCategories.map((item) => (
            <button key={item.id} className={category === item.id ? "pl-active" : ""} type="button" onClick={() => setCategory(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <label className="pl-field">
          <span>Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Scissor lift, boom lift, crane, parts..." />
        </label>
      </aside>
      <section>
        <div className="pl-catalog-top">
          <strong>{filtered.length} equipment options</strong>
          <span className="pl-chip"><Search size={14} /> Manufacturer and rental fleet catalog</span>
        </div>
        <div className="pl-product-grid pl-catalog-grid">
          {filtered.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>
    </div>
  );
}
