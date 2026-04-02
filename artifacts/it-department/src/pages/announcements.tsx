import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Paperclip, ChevronRight } from "lucide-react";
import { useStore, Announcement } from "@/lib/store";

type Category = "Бүгд" | "Ерөнхий" | "Хурал" | "Шалгалт";

export default function Announcements() {
  const [activeCategory, setActiveCategory] = useState<Category>("Бүгд");
  const store = useStore();

  const sortedAnnouncements = [...store.announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const filtered = sortedAnnouncements.filter(a => activeCategory === "Бүгд" || a.category === activeCategory);

  return (
    <div className="py-12 flex-1 container mx-auto px-4 md:px-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-gradient">Мэдэгдэл</h1>
        <p className="text-secondary">Зарлал, мэдээлэл болон удирдамж</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {(["Бүгд", "Ерөнхий", "Хурал", "Шалгалт"] as Category[]).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                : "bg-card border border-border text-secondary hover:text-foreground hover:border-primary/50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glow-card bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                    ${item.category === 'Шалгалт' ? 'bg-destructive/20 text-destructive border border-destructive/30' : ''}
                    ${item.category === 'Хурал' ? 'bg-accent/20 text-accent border border-accent/30' : ''}
                    ${item.category === 'Ерөнхий' ? 'bg-primary/20 text-primary border border-primary/30' : ''}
                  `}>
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 flex-wrap text-xs text-secondary">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
                {item.hasAttachment && (
                  <div className="flex items-center gap-1 text-xs text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20 cursor-pointer hover:bg-accent/20 transition-colors">
                    <Paperclip className="w-3 h-3" />
                    <span>Хавсралттай</span>
                  </div>
                )}
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-3">{item.title}</h2>
              <p className="text-secondary leading-relaxed mb-6 whitespace-pre-wrap">
                {item.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <User className="w-4 h-4" />
                  <span>{item.author}</span>
                </div>
                <button className="text-sm font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1">
                  Дэлгэрэнгүй <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-secondary"
          >
            Мэдээлэл олдсонгүй.
          </motion.div>
        )}
      </div>
    </div>
  );
}
