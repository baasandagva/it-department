import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, CheckCircle2, AlertCircle, Send, Edit, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockStudents = [
  { id: 1, name: "Б. Анар", year: 1, amount: 3500000, status: "Төлсөн", dueDate: "2025-01-15" },
  { id: 2, name: "Г. Бат", year: 2, amount: 3500000, status: "Хэсэгчлэн", dueDate: "2025-03-01" },
  { id: 3, name: "Д. Сараа", year: 3, amount: 3500000, status: "Төлөөгүй", dueDate: "2025-02-15" },
  { id: 4, name: "Э. Болд", year: 1, amount: 3500000, status: "Төлсөн", dueDate: "2025-01-15" },
  { id: 5, name: "М. Мөнх", year: 4, amount: 3500000, status: "Хэсэгчлэн", dueDate: "2025-03-01" },
  { id: 6, name: "Н. Цэцэг", year: 2, amount: 3500000, status: "Төлсөн", dueDate: "2025-01-15" },
  { id: 7, name: "О. Очир", year: 3, amount: 3500000, status: "Төлөөгүй", dueDate: "2025-02-15" },
  { id: 8, name: "С. Сувд", year: 1, amount: 3500000, status: "Төлсөн", dueDate: "2025-01-15" },
];

export default function Teacher() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Амжилттай!",
      description: "Мэдэгдэл амжилттай нийтлэгдлээ.",
    });
    (e.target as HTMLFormElement).reset();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Багшийн Булан</h1>
            <p className="text-secondary text-sm">Зөвхөн багш, ажилчдад зориулагдсан хэсэг</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="ПИН код оруулах" 
                className={`w-full bg-background border rounded-xl px-4 py-3 text-center text-xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary ${error ? 'border-destructive focus:ring-destructive' : 'border-border'}`}
                autoFocus
              />
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-destructive text-sm text-center mt-2 flex items-center justify-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" /> Буруу ПИН код байна
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-colors"
            >
              Нэвтрэх
            </button>
          </form>
          <p className="text-center text-xs text-secondary mt-6">Жишээ ПИН: 1234</p>
        </motion.div>
      </div>
    );
  }

  const stats = {
    total: mockStudents.length,
    paid: mockStudents.filter(s => s.status === 'Төлсөн').length,
    unpaid: mockStudents.filter(s => s.status === 'Төлөөгүй').length,
    collected: mockStudents.filter(s => s.status === 'Төлсөн').reduce((sum, s) => sum + s.amount, 0)
  };

  return (
    <div className="py-8 flex-1 container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide">Удирдлагын Хэсэг</h1>
          <p className="text-secondary">Багш: Админ</p>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-lg hover:bg-destructive/20 transition-colors font-medium border border-destructive/20"
        >
          <LogOut className="w-4 h-4" /> Гарах
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Payments */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Төлбөрийн Мэдээлэл</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-background border border-border p-4 rounded-xl text-center">
                <p className="text-secondary text-xs font-semibold uppercase mb-1">Нийт Оюутан</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-background border border-border p-4 rounded-xl text-center">
                <p className="text-secondary text-xs font-semibold uppercase mb-1">Төлсөн</p>
                <p className="text-2xl font-bold text-green-500">{stats.paid}</p>
              </div>
              <div className="bg-background border border-border p-4 rounded-xl text-center">
                <p className="text-secondary text-xs font-semibold uppercase mb-1">Төлөөгүй</p>
                <p className="text-2xl font-bold text-destructive">{stats.unpaid}</p>
              </div>
              <div className="bg-background border border-border p-4 rounded-xl text-center">
                <p className="text-secondary text-xs font-semibold uppercase mb-1">Орлого (сая ₮)</p>
                <p className="text-2xl font-bold text-primary">{(stats.collected / 1000000).toFixed(1)}</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="p-3 font-medium text-secondary">Оюутан</th>
                    <th className="p-3 font-medium text-secondary">Курс</th>
                    <th className="p-3 font-medium text-secondary">Дүн (₮)</th>
                    <th className="p-3 font-medium text-secondary">Төлөв</th>
                    <th className="p-3 font-medium text-secondary">Эцсийн хугацаа</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {mockStudents.map(student => (
                    <tr key={student.id} className="hover:bg-background/50 transition-colors">
                      <td className="p-3 font-medium">{student.name}</td>
                      <td className="p-3">{student.year}</td>
                      <td className="p-3">{student.amount.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold
                          ${student.status === 'Төлсөн' ? 'bg-green-500/20 text-green-500' : ''}
                          ${student.status === 'Төлөөгүй' ? 'bg-destructive/20 text-destructive' : ''}
                          ${student.status === 'Хэсэгчлэн' ? 'bg-yellow-500/20 text-yellow-500' : ''}
                        `}>
                          {student.status === 'Төлсөн' && <CheckCircle2 className="w-3 h-3" />}
                          {student.status}
                        </span>
                      </td>
                      <td className="p-3 text-secondary">{student.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Send className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-bold">Зарлал Оруулах</h2>
            </div>
            <form onSubmit={handlePostAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Гарчиг</label>
                <input required type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Зарлалын гарчиг" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Төрөл</label>
                <select className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Ерөнхий</option>
                  <option>Хурал</option>
                  <option>Шалгалт</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Агуулга</label>
                <textarea required rows={4} className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Мэдээллийн дэлгэрэнгүй..."></textarea>
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                Нийтлэх
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Edit className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Хуваарь Засах</h2>
            </div>
            <p className="text-sm text-secondary mb-4">Хичээлийн хуваарь болон цагийн өөрчлөлтийг удирдах хэсэг.</p>
            <button 
              className="w-full bg-background border border-border hover:border-primary/50 text-foreground font-medium py-2.5 rounded-lg transition-colors group relative overflow-hidden"
              title="Тун удахгүй..."
            >
              <span className="relative z-10 group-hover:opacity-0 transition-opacity">Засварлах</span>
              <span className="absolute inset-0 flex items-center justify-center bg-primary/10 text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Тун удахгүй...
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
