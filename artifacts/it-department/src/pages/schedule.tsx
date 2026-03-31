import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIMES = ["08:00-09:30", "09:40-11:10", "11:20-12:50", "13:40-15:10", "15:20-16:50"];
const DAYS = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];

const scheduleData = {
  1: {
    "Даваа": { "08:00-09:30": { subject: "Математик", teacher: "Б. Болд", room: "301", type: "primary" }, "11:20-12:50": { subject: "Программчлалын үндэс", teacher: "С. Туяа", room: "302", type: "accent" } },
    "Мягмар": { "09:40-11:10": { subject: "Мэдээллийн технологийн үндэс", teacher: "Д. Бат", room: "303", type: "muted" } },
    "Лхагва": { "13:40-15:10": { subject: "Англи хэл", teacher: "Э. Саруул", room: "201", type: "primary" } },
    "Пүрэв": { "08:00-09:30": { subject: "Программчлалын үндэс", teacher: "С. Туяа", room: "302", type: "accent" } },
    "Баасан": { "11:20-12:50": { subject: "Математик", teacher: "Б. Болд", room: "301", type: "primary" } },
    "Бямба": {}
  },
  2: {
    "Даваа": { "09:40-11:10": { subject: "Өгөгдлийн бүтэц", teacher: "Г. Ганзориг", room: "304", type: "accent" } },
    "Мягмар": { "11:20-12:50": { subject: "Алгоритм", teacher: "М. Мөнх", room: "305", type: "primary" } },
    "Лхагва": { "08:00-09:30": { subject: "Вэб хөгжүүлэлт 1", teacher: "О. Онон", room: "302", type: "muted" } },
    "Пүрэв": { "13:40-15:10": { subject: "Өгөгдлийн бүтэц", teacher: "Г. Ганзориг", room: "304", type: "accent" } },
    "Баасан": { "09:40-11:10": { subject: "Алгоритм", teacher: "М. Мөнх", room: "305", type: "primary" } },
    "Бямба": {}
  },
  3: {
    "Даваа": { "11:20-12:50": { subject: "Сүлжээ", teacher: "Н. Наран", room: "306", type: "muted" } },
    "Мягмар": { "08:00-09:30": { subject: "Өгөгдлийн сан", teacher: "Т. Төгс", room: "307", type: "primary" } },
    "Лхагва": { "15:20-16:50": { subject: "Вэб хөгжүүлэлт 2", teacher: "О. Онон", room: "302", type: "accent" } },
    "Пүрэв": { "11:20-12:50": { subject: "Сүлжээ", teacher: "Н. Наран", room: "306", type: "muted" } },
    "Баасан": { "13:40-15:10": { subject: "Өгөгдлийн сан", teacher: "Т. Төгс", room: "307", type: "primary" } },
    "Бямба": {}
  },
  4: {
    "Даваа": { "13:40-15:10": { subject: "Мэдээллийн аюулгүй байдал", teacher: "Б. Бат-Эрдэнэ", room: "308", type: "accent" } },
    "Мягмар": { "15:20-16:50": { subject: "AI & Machine Learning", teacher: "Х. Хаш", room: "309", type: "primary" } },
    "Лхагва": { "09:40-11:10": { subject: "Төслийн менежмент", teacher: "Ч. Чинзориг", room: "310", type: "muted" } },
    "Пүрэв": { "08:00-09:30": { subject: "Мэдээллийн аюулгүй байдал", teacher: "Б. Бат-Эрдэнэ", room: "308", type: "accent" } },
    "Баасан": { "15:20-16:50": { subject: "AI & Machine Learning", teacher: "Х. Хаш", room: "309", type: "primary" } },
    "Бямба": {}
  }
};

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="py-12 flex-1 container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-gradient">Хичээлийн Хуваарь</h1>
        <p className="text-secondary">2025-2026 оны хичээлийн жил</p>
      </motion.div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {[1, 2, 3, 4].map(year => (
          <button
            key={year}
            onClick={() => setActiveTab(year as 1 | 2 | 3 | 4)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === year 
              ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(37,99,235,0.5)]" 
              : "bg-card border border-border text-secondary hover:text-foreground hover:border-primary/50"
            }`}
          >
            {year}-р курс
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xl"
        >
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border">
                <th className="p-4 font-semibold text-secondary uppercase tracking-widest text-sm w-32 border-r border-border/50">Цаг / Гараг</th>
                {TIMES.map(time => (
                  <th key={time} className="p-4 font-semibold text-center text-secondary tracking-wider text-sm border-r border-border/50 last:border-0">{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day, dIdx) => (
                <tr key={day} className="border-b border-border/50 last:border-0">
                  <td className="p-4 font-medium bg-background/30 border-r border-border/50">{day}</td>
                  {TIMES.map((time, tIdx) => {
                    // @ts-ignore
                    const cell = scheduleData[activeTab][day]?.[time];
                    return (
                      <td key={time} className="p-2 border-r border-border/50 last:border-0 h-28 relative">
                        {cell && (
                          <div className={`glow-card h-full p-3 rounded-xl border flex flex-col justify-between
                            ${cell.type === 'primary' ? 'border-primary/30 bg-primary/5' : ''}
                            ${cell.type === 'accent' ? 'border-accent/30 bg-accent/5' : ''}
                            ${cell.type === 'muted' ? 'border-border bg-background' : ''}
                          `}>
                            <h4 className="font-bold text-sm leading-tight mb-2">{cell.subject}</h4>
                            <div className="flex justify-between items-end mt-auto text-xs">
                              <span className="text-secondary">{cell.teacher}</span>
                              <span className="bg-background/80 px-2 py-1 rounded text-accent font-semibold">{cell.room}</span>
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
