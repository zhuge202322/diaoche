"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FaqList({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div key={item.question} className={`faq-item ${open === index ? "open" : ""}`}>
          <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
            {item.question}
            <ChevronDown
              size={18}
              style={{ transform: open === index ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 180ms ease" }}
            />
          </button>
          <div className="faq-panel">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
