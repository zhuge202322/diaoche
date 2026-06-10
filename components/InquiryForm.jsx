"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { products } from "@/data/products";

export default function InquiryForm({ selectedProduct = "" }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 4200);
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" placeholder="Company name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="name@company.com" required />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" name="phone" placeholder="+1 000 000 0000" />
        </div>
        <div className="field">
          <label htmlFor="country">Destination Country</label>
          <input id="country" name="country" placeholder="Country / region" required />
        </div>
        <div className="field">
          <label htmlFor="product">Interested Product</label>
          <select id="product" name="product" defaultValue={selectedProduct}>
            <option value="">Select equipment</option>
            {products.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="quantity">Quantity</label>
          <input id="quantity" name="quantity" placeholder="1 unit, 5 units..." />
        </div>
        <div className="field">
          <label htmlFor="timeline">Purchase Timeline</label>
          <select id="timeline" name="timeline" defaultValue="30-60 days">
            <option>Immediately</option>
            <option>30-60 days</option>
            <option>3-6 months</option>
            <option>Planning stage</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="message">Project Requirements</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us lifting capacity, working height, chassis preference, delivery port or tender requirements."
            required
          />
        </div>
      </div>
      <button className="btn" type="submit">
        <Send size={17} /> Submit Inquiry
      </button>
      <div className={`success-note ${submitted ? "show" : ""}`} role="status">
        <CheckCircle2 size={18} /> Inquiry captured. Sarah will follow up by WhatsApp or email.
      </div>
    </form>
  );
}
