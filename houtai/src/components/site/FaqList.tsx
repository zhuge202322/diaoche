"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FaqList({ items }: { items: Array<{ question: string; answer: string }> }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="pl-faq-list">
      {items.map((item, index) => (
        <div key={item.question} className={`pl-faq-item ${open === index ? "pl-open" : ""}`}>
          <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
            {item.question}
            <ChevronDown size={18} />
          </button>
          <div><p>{item.answer}</p></div>
        </div>
      ))}
    </div>
  );
}
