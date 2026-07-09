import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { solutionItems } from "@/lib/navigation";

const descriptions: Record<string, string> = {
  "equipment-rental-companies": "Fleet expansion support, fast stock matching, spare parts and reliable equipment options.",
  "construction-contractors": "Jobsite lifting and access equipment selected around height, reach, load and terrain.",
  "machinery-dealers": "Dealer-friendly product categories, export documents, brand support and repeat supply.",
  "importers-and-distributors": "Container planning, documentation, product comparison and factory-direct pricing.",
  "used-equipment-purchasing": "Used equipment condition review, photos, inspection notes and shipment coordination.",
  "spare-parts-supply": "Parts packages, replenishment support and model matching for fleet maintenance.",
  "equipment-inspection": "Visual checks, machine details, available documents and buyer confirmation support.",
  "worldwide-shipping": "RoRo, container, flat rack and combined shipment plans for global destinations.",
};

export const metadata = {
  title: "Solutions",
  description: "Lifting equipment solutions for rental companies, contractors, dealers, importers and distributors.",
};

export default function SolutionsPage() {
  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">Solutions</span>
          <h1>Cost-effective lifting equipment solutions for global B2B customers.</h1>
          <p>Pillarlift supports rental companies, contractors, dealers, importers and distributors with equipment, parts and shipping.</p>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container">
          <div className="pl-service-grid">
            {solutionItems.map((item) => {
              const id = item.href.split("#")[1];
              return (
                <Reveal key={item.href}>
                  <article id={id} className="pl-service-card">
                    <BadgeCheck size={30} />
                    <h3>{item.label}</h3>
                    <p>{descriptions[id] || "Professional lifting equipment support from China."}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="pl-button-row" style={{ marginTop: 30 }}>
            <Link className="pl-btn" href="/contact-us">Discuss Your Solution <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
