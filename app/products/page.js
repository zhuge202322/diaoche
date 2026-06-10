import ProductCatalog from "@/components/ProductCatalog";
import Reveal from "@/components/Reveal";
import { categories, products } from "@/data/products";

export const metadata = {
  title: "Products",
  description: "Browse used cranes, aerial work platforms, scissor lifts, boom lifts and lifting equipment accessories from China."
};

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Equipment catalog</span>
          <h1>Used cranes and aerial work platforms for global buyers.</h1>
          <p>
            Filter by equipment family, compare core specifications and open product pages for condition details, applications and quotation steps.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Product groups</span>
                <h2>Select by lifting work, access height or accessory package.</h2>
              </div>
              <p className="muted">
                {categories
                  .filter((category) => category.id !== "all")
                  .map((category) => category.description)
                  .join(" ")}
              </p>
            </div>
          </Reveal>
          <ProductCatalog products={products} />
        </div>
      </section>
    </>
  );
}
