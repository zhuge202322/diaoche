"use client";

import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { siteCategories, type SiteProduct } from "@/lib/site-data";

const PAGE_SIZE = 12;

type ProductFilterOption = {
  id: string;
  label: string;
};

type ProductCatalogProps = {
  products: SiteProduct[];
  filterOptions?: ProductFilterOption[];
  filterBy?: "category" | "categoryLabel";
  chipLabel?: string;
};

export default function ProductCatalog({
  products,
  filterOptions = siteCategories,
  filterBy = "category",
  chipLabel = "Manufacturer and rental fleet catalog",
}: ProductCatalogProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase();
    return products.filter((product) => {
      const filterValue = filterBy === "categoryLabel" ? product.categoryLabel : product.category;
      const categoryMatch = selectedFilter === "all" || filterValue === selectedFilter;
      const text = `${product.name} ${product.short} ${product.categoryLabel} ${product.applications.join(" ")}`.toLowerCase();
      return categoryMatch && (!term || text.includes(term));
    });
  }, [deferredQuery, filterBy, products, selectedFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const firstItem = filtered.length ? startIndex + 1 : 0;
  const lastItem = Math.min(startIndex + PAGE_SIZE, filtered.length);

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - maxButtons + 1));
    const end = Math.min(totalPages, start + maxButtons - 1);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [deferredQuery, selectedFilter]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="pl-catalog-layout">
      <aside className="pl-filter">
        <h3><SlidersHorizontal size={18} /> Filter Equipment</h3>
        <div className="pl-filter-list">
          {filterOptions.map((item) => (
            <button key={item.id} className={selectedFilter === item.id ? "pl-active" : ""} type="button" onClick={() => setSelectedFilter(item.id)}>
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
          <div>
            <strong>{filtered.length} equipment options</strong>
            <span className="pl-page-range">Showing {firstItem}-{lastItem}</span>
          </div>
          <span className="pl-chip"><Search size={14} /> {chipLabel}</span>
        </div>
        {visibleProducts.length ? (
          <>
            <div className="pl-product-grid pl-catalog-grid">
              {visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
            {totalPages > 1 ? (
              <nav className="pl-pagination" aria-label="Product catalog pagination">
                <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}>
                  <ChevronLeft size={16} /> Previous
                </button>
                <div className="pl-pagination-pages">
                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      className={pageNumber === currentPage ? "pl-active" : ""}
                      aria-current={pageNumber === currentPage ? "page" : undefined}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages}>
                  Next <ChevronRight size={16} />
                </button>
              </nav>
            ) : null}
          </>
        ) : (
          <div className="pl-empty-state">
            <strong>No matching equipment found.</strong>
            <p>Try another product type, model number or application keyword.</p>
          </div>
        )}
      </section>
    </div>
  );
}
