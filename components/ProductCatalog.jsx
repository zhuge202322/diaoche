"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";

export default function ProductCatalog({ products }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const textMatch =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.short.toLowerCase().includes(normalized) ||
        product.applications.join(" ").toLowerCase().includes(normalized);

      return categoryMatch && textMatch;
    });
  }, [category, products, query]);

  return (
    <div className="catalog-layout">
      <aside className="filter-panel">
        <h3>
          <SlidersHorizontal size={18} /> Filter Equipment
        </h3>
        <div className="filter-group" role="tablist" aria-label="Product categories">
          {categories.map((item) => (
            <button
              key={item.id}
              className={`filter-btn ${category === item.id ? "active" : ""}`}
              type="button"
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="field">
          <label htmlFor="product-search">Search</label>
          <input
            id="product-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Crane, boom lift, rental..."
          />
        </div>
      </aside>

      <section>
        <div className="catalog-top">
          <strong>{filtered.length} equipment options</strong>
          <span className="tag">
            <Search size={14} /> Export-ready specs
          </span>
        </div>
        <div className="product-grid catalog-grid">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
