import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Нүүр" },
  { href: "/schedule", label: "Хуваарь" },
  { href: "/gallery", label: "Зургийн цомог" },
  { href: "/announcements", label: "Мэдэгдэл" },
  { href: "/info", label: "Мэдээлэл" },
  { href: "/teacher", label: "Багшийн булан" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-primary/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <Code className="w-4 h-4 text-accent" />
          </div>
          <span className="font-bold text-lg tracking-wide uppercase">МТ Тэнхим</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => {
            const isActive = location === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-secondary'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
        
        <button className="md:hidden text-secondary hover:text-accent" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary/30 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map(link => {
                const isActive = location === link.href;
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium ${isActive ? 'text-accent' : 'text-secondary'}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
