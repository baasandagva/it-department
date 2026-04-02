import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store"; // Store-оо импортлох

// Админ панел дээрх цагуудтай ижил байх ёстой
const TIMES = ["09:00", "10:40", "12:50", "14:30", "16:10"];
const DAYS = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"];

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4>(1);
  const { schedule } = useStore(); // Store-оос хуваарийг татаж авах

  return (
    <div className="py-12 flex-1 container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-gradient">
          Хичээлийн Хуваарь
        </h1>
        <p className="text-secondary">2025-2026 оны хичээлийн жил</p>
      </motion.div>

      {/* Курс сонгох товчлуурууд */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {[1, 2, 3, 4].map((year) => (
          <button
            key={year}
            onClick={() => setActiveTab(year as 1 | 2 | 3 | 4)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === year
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
                <th className="p-4 font-semibold text-secondary uppercase tracking-widest text-sm w-32 border-r border-border/50">
                  Гараг / Цаг
                </th>
                {TIMES.map((time) => (
                  <th
                    key={time}
                    className="p-4 font-semibold text-center text-secondary tracking-wider text-sm border-r border-border/50 last:border-0"
                  >
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day) => (
                <tr key={day} className="border-b border-border/50 last:border-0">
                  <td className="p-4 font-bold bg-background/30 border-r border-border/50 text-primary">
                    {day}
                  </td>
                  {TIMES.map((time) => {
                    // Store-оос тухайн курс, гараг, цагт харгалзах хичээлийг хайх
                    const cell = schedule[activeTab]?.[day]?.[time];

                    return (
                      <td
                        key={time}
                        className="p-2 border-r border-border/50 last:border-0 h-32 relative"
                      >
                        {cell ? (
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`h-full p-3 rounded-xl border flex flex-col justify-between shadow-sm
                              ${cell.type === "primary" ? "border-primary/30 bg-primary/10 text-primary-foreground" : ""}
                              ${cell.type === "accent" ? "border-destructive/30 bg-destructive/10" : ""}
                              ${cell.type === "muted" ? "border-border bg-muted/50" : ""}
                            `}
                          >
                            <div>
                              <h4 className="font-bold text-sm leading-tight mb-1 line-clamp-2 uppercase">
                                {cell.subject}
                              </h4>
                              <p className="text-[10px] opacity-80 font-medium">
                                {cell.teacher}
                              </p>
                            </div>
                            <div className="flex justify-end mt-auto">
                              <span className="bg-background/40 px-2 py-0.5 rounded text-[11px] font-bold border border-border/20">
                                {cell.room} өрөө
                              </span>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="h-full w-full flex items-center justify-center opacity-10">
                            <span className="text-[10px]">---</span>
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

      <p className="mt-6 text-center text-xs text-secondary italic">
        * Хичээлийн хуваарьт өөрчлөлт орсон тохиолдолд Админ хэсгээс шинэчлэгдэх болно.
      </p>
    </div>
  );
}