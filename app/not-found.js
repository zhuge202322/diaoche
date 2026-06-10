import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>This equipment page is not available.</h1>
        <p>The product may have moved or the URL may be incorrect.</p>
        <div className="button-row" style={{ marginTop: 26 }}>
          <Link className="btn" href="/products">
            <ArrowLeft size={18} /> Back to Products
          </Link>
        </div>
      </div>
    </section>
  );
}
