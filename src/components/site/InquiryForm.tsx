"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import type { SiteProduct } from "@/lib/site-data";

export default function InquiryForm({ products, selectedProduct = "" }: { products: SiteProduct[]; selectedProduct?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setBusy(false);
    if (!res.ok) {
      setError("Please check required fields and submit again.");
      return;
    }
    setSubmitted(true);
    form.reset();
    window.setTimeout(() => setSubmitted(false), 4200);
  }

  return (
    <form className="pl-form-panel" onSubmit={handleSubmit}>
      <div className="pl-form-grid">
        <label className="pl-field"><span>Full Name</span><input name="name" placeholder="Your name" required /></label>
        <label className="pl-field"><span>Company</span><input name="company" placeholder="Company name" required /></label>
        <label className="pl-field"><span>Email</span><input name="email" type="email" placeholder="name@company.com" required /></label>
        <label className="pl-field"><span>Phone / WhatsApp</span><input name="phone" placeholder="+1 000 000 0000" /></label>
        <label className="pl-field"><span>Destination Country</span><input name="country" placeholder="Country / region" required /></label>
        <label className="pl-field">
          <span>Interested Product</span>
          <select name="product" defaultValue={selectedProduct}>
            <option value="">Select equipment</option>
            {products.map((product) => <option key={product.slug} value={product.name}>{product.name}</option>)}
          </select>
        </label>
        <label className="pl-field"><span>Quantity</span><input name="quantity" placeholder="1 unit, 5 units..." /></label>
        <label className="pl-field">
          <span>Purchase Timeline</span>
          <select name="timeline" defaultValue="30-60 days">
            <option>Immediately</option>
            <option>30-60 days</option>
            <option>3-6 months</option>
            <option>Planning stage</option>
          </select>
        </label>
        <label className="pl-field pl-full"><span>Project Requirements</span><textarea name="message" placeholder="Tell us working height, lifting capacity, brand preference, year range, delivery port or tender requirements." required /></label>
      </div>
      <button className="pl-btn" type="submit" disabled={busy}><Send size={17} /> {busy ? "Submitting..." : "Submit Inquiry"}</button>
      {error && <div className="pl-error">{error}</div>}
      <div className={`pl-success ${submitted ? "pl-show" : ""}`} role="status"><CheckCircle2 size={18} /> Inquiry saved to backend.</div>
    </form>
  );
}
