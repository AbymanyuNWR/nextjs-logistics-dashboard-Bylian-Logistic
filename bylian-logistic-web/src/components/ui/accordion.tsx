"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: {
    id: string;
    question: string;
    answer: string;
  }[];
  className?: string;
  allowMultiple?: boolean;
}

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newOpenItems = new Set(prev);
      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(id);
      }
      return newOpenItems;
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div 
            key={item.id} 
            className={cn(
              "border rounded-xl bg-white overflow-hidden transition-colors",
              isOpen ? "border-brand-accent shadow-sm" : "border-brand-border"
            )}
          >
            <button
              className="w-full px-6 py-4 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-inset"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
            >
              <span className={cn(
                "font-bold text-lg transition-colors", 
                isOpen ? "text-brand-accent" : "text-brand-primary"
              )}>
                {item.question}
              </span>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0",
                isOpen ? "bg-brand-accent text-white" : "bg-brand-bg-light text-brand-primary"
              )}>
                <ChevronDown 
                  size={18} 
                  className={cn(
                    "transition-transform duration-300",
                    isOpen ? "rotate-180" : ""
                  )} 
                />
              </div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-5 pt-0 text-brand-text-muted leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
