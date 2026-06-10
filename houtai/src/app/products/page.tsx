import ProductCatalog from "@/components/site/ProductCatalog";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { loadSiteProducts, siteCategories } from "@/lib/site-data";

export const metadata = {
  title: "Products",
  description: "Browse used cranes, aerial work platforms, scissor lifts, boom lifts and lifting equipment accessories from China.",
};

export default async function ProductsPage() {
  const products = await loadSiteProducts();

  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">Equipment catalog</span>
          <h1>Used cranes and aerial work platforms for global buyers.</h1>
          <p>
            Filter by equipment family, compare core specifications and open product pages for condition details, applications and quotation steps.
          </p>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container">
          <Reveal>
            <div className="pl-section-head">
              <div>
                <span className="pl-eyebrow">Product groups</span>
                <h2>Select by lifting work, access height or accessory package.</h2>
              </div>
              <p className="pl-muted">
                {siteCategories
                  .filter((category) => category.id !== "all")
                  .map((category) => category.description)
                  .join(" ")}
              </p>
            </div>
          </Reveal>
          <ProductCatalog products={products} />
        </div>
      </section>
    </SiteFrame>
  );
}
