"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  num: string;
  title: string;
  body: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div
          key={item.num}
          className={`border-t border-ainomiq-border ${i === items.length - 1 ? "border-b" : ""}`}
        >
          <button
            onClick={() => setActive(i === active ? -1 : i)}
            className="flex w-full items-center justify-between py-6 text-left group"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-ainomiq-text-muted">{item.num}</span>
              <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-ainomiq-text-muted transition-transform duration-300 ${
                i === active ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              i === active ? "max-h-40 pb-6" : "max-h-0"
            }`}
          >
            <p className="text-ainomiq-text-muted leading-relaxed pl-10 max-w-xl">
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
