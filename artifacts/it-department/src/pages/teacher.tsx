import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, CheckCircle2, AlertCircle, Send, Users, CreditCard, Trash2, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStore, Announcement } from "@/lib/store";

export default function Teacher() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<"students" | "announcements" | "teachers">("students");
  const { toast } = useToast();
  const store = useStore();

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

  const handlePostAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newAnn: Announcement = {
      id: Date.now().toString(),
      title: fd.get("title") as string,
      category: fd.get("category") as any,
      content: fd.get("content") as string,
      author: fd.get("author") as string,
      date: new Date().toISOString().split('T')[0],
      hasAttachment: false
    };
    store.addAnnouncement(newAnn);
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
    total: store.students.length,
    paid: store.students.filter(s => s.tuitionStatus === 'Төлсөн').length,
    unpaid: store.students.filter(s => s.tuitionStatus === 'Төлөөгүй').length,
    collected: store.students.filter(s => s.tuitionStatus === 'Төлсөн').reduce((sum, s) => sum + s.tuitionAmount, 0)
  };

  return (
    <div className="py-8 flex-1 container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide">Удирдлагын Хэсэг</h1>
          <p className="text-secondary">Багшийн Булан</p>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-lg hover:bg-destructive/20 transition-colors font-medium border border-destructive/20"
        >
          <LogOut className="w-4 h-4" /> Гарах
        </button>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button onClick={() => setActiveTab("students")} className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'students' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-secondary hover:text-foreground'}`}>
          <Users className="w-5 h-5" /> Оюутнуудын жагсаалт
        </button>
        <button onClick={() => setActiveTab("announcements")} className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'announcements' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-secondary hover:text-foreground'}`}>
          <Send className="w-5 h-5" /> Зарлал оруулах
        </button>
        <button onClick={() => setActiveTab("teachers")} className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'teachers' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-secondary hover:text-foreground'}`}>
          <GraduationCap className="w-5 h-5" /> Багш нарын жагсаалт
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          
          {activeTab === "students" && (
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold">Оюутан & Төлбөрийн Мэдээлэл</h2>
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
                        <th className="p-3 font-medium text-secondary">Оюутны дугаар</th>
                        <th className="p-3 font-medium text-secondary">Курс / Утас</th>
                        <th className="p-3 font-medium text-secondary">Дүн (₮)</th>
                        <th className="p-3 font-medium text-secondary">Төлөв</th>
                        <th className="p-3 font-medium text-secondary">Үйлдэл</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {store.students.map(student => (
                        <tr key={student.id} className="hover:bg-background/50 transition-colors">
                          <td className="p-3 font-medium">{student.name}</td>
                          <td className="p-3">{student.studentId}</td>
                          <td className="p-3">{student.year} курс<br/><span className="text-secondary text-xs">{student.phone}</span></td>
                          <td className="p-3">{student.tuitionAmount.toLocaleString()}</td>
                          <td className="p-3">
                            <select 
                              value={student.tuitionStatus}
                              onChange={(e) => store.updateStudent(student.id, { tuitionStatus: e.target.value as any })}
                              className={`bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer 
                                ${student.tuitionStatus === 'Төлсөн' ? 'text-green-500' : student.tuitionStatus === 'Төлөөгүй' ? 'text-destructive' : 'text-yellow-500'}
                              `}
                            >
                              <option className="text-foreground">Төлсөн</option>
                              <option className="text-foreground">Хэсэгчлэн</option>
                              <option className="text-foreground">Төлөөгүй</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <button onClick={() => store.deleteStudent(student.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Send className="w-6 h-6 text-accent" />
                <h2 className="text-xl font-bold">Зарлал Оруулах</h2>
              </div>
              <form onSubmit={handlePostAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Гарчиг</label>
                  <input required name="title" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Зарлалын гарчиг" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Төрөл</label>
                    <select required name="category" className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary">
                      <option>Ерөнхий</option>
                      <option>Хурал</option>
                      <option>Шалгалт</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Зохиогч</label>
                    <input required name="author" type="text" defaultValue="Багш" className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Агуулга</label>
                  <textarea required name="content" rows={6} className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Мэдээллийн дэлгэрэнгүй..."></textarea>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4">
                  Нийтлэх
                </button>
              </form>
            </div>
          )}

          {activeTab === "teachers" && (
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Багш нарын жагсаалт</h2>
              </div>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-background border-b border-border">
                    <tr>
                      <th className="p-3 font-medium text-secondary">Нэр</th>
                      <th className="p-3 font-medium text-secondary">Цол</th>
                      <th className="p-3 font-medium text-secondary">Заадаг хичээл</th>
                      <th className="p-3 font-medium text-secondary">Холбоо барих</th>
                      <th className="p-3 font-medium text-secondary">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {store.teachers.map(teacher => (
                      <tr key={teacher.id} className="hover:bg-background/50 transition-colors">
                        <td className="p-3 font-medium">{teacher.name}</td>
                        <td className="p-3">{teacher.title}</td>
                        <td className="p-3">{teacher.subject}</td>
                        <td className="p-3">{teacher.phone}<br/><span className="text-secondary text-xs">{teacher.email}</span></td>
                        <td className="p-3">
                          <button onClick={() => store.deleteTeacher(teacher.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
