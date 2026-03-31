import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Paperclip, ChevronRight } from "lucide-react";

type Category = "Бүгд" | "Ерөнхий" | "Хурал" | "Шалгалт";

const announcements = [
  {
    id: 1,
    title: "2025-2026 оны хичээлийн жилийн 2-р улирлын шалгалтын хуваарь",
    date: "2025-05-10",
    category: "Шалгалт",
    author: "Сургалтын алба",
    content: "Энэ улирлын нэгдсэн шалгалт 5 сарын 20-ноос эхлэн 14 хоног үргэлжлэх тул оюутнууд хуваариа цаг тухайд нь шалгана уу.",
    hasAttachment: true
  },
  {
    id: 2,
    title: "МТ Тэнхимийн багш нарын хурал",
    date: "2025-04-28",
    category: "Хурал",
    author: "Тэнхимийн эрхлэгч",
    content: "МТ Тэнхимийн ээлжит хурал 5 сарын 1-ний 15:00 цагт 301 тоотод болно. Бүх багш нар цагтаа ирнэ үү.",
    hasAttachment: false
  },
  {
    id: 3,
    title: "Дипломын ажлын удирдамж шинэчлэгдлээ",
    date: "2025-04-15",
    category: "Ерөнхий",
    author: "Академик зөвлөл",
    content: "Төгсөх ангийн оюутнууд дипломын ажлын шинэчилсэн удирдамжтай танилцаж, форматаа нийцүүлэн засна уу.",
    hasAttachment: true
  },
  {
    id: 4,
    title: "Интернет хичээлийн цаг өөрчлөгдлөө",
    date: "2025-03-20",
    category: "Ерөнхий",
    author: "Сургалтын алба",
    content: "3-р курсын Сүлжээний хичээлийн цаг Даваа гарагийн 11:20 болж урагшиллаа.",
    hasAttachment: false
  },
  {
    id: 5,
    title: "Хаврын шалгалт - хуваарь",
    date: "2025-02-15",
    category: "Шалгалт",
    author: "Сургалтын алба",
    content: "Хаврын улирлын завсрын шалгалтын хуваарь гарлаа. Оюутны вэбээр орж шалгана уу.",
    hasAttachment: true
  }
];

export default function Announcements() {
  const [activeCategory, setActiveCategory] = useState<Category>("Бүгд");

  const filtered = announcements.filter(a => activeCategory === "Бүгд" || a.category === activeCategory);

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
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat 
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
              <p className="text-secondary leading-relaxed mb-6">
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
