import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, LogOut, CheckCircle2, AlertCircle, Plus,
  Trash2, LayoutDashboard, Users, UserPlus,
  Bell, Image as ImageIcon, Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStore, Student, Teacher, Announcement, GalleryItem, ScheduleEntry } from "@/lib/store";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const { toast } = useToast();
  const store = useStore();

  // Tab-ууд дээр "schedule" нэмэгдсэн
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "teachers" | "announcements" | "gallery" | "schedule">("overview");

  // Хуваарь засахад ашиглах state-үүд
  const [schedYear, setSchedYear] = useState<number>(1);
  const [schedDay, setSchedDay] = useState("Даваа");
  const [schedTime, setSchedTime] = useState("09:00");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "9999") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  // --- Functions for Store ---

  const handleAddStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newStudent: Student = {
      id: Date.now().toString(),
      name: fd.get("name") as string,
      studentId: fd.get("studentId") as string,
      year: parseInt(fd.get("year") as string) as any,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      tuitionAmount: parseInt(fd.get("tuitionAmount") as string),
      tuitionStatus: "Төлөөгүй",
      tuitionDue: fd.get("tuitionDue") as string,
      paidAmount: 0,
      registeredAt: new Date().toISOString()
    };
    store.addStudent(newStudent);
    toast({ title: "Амжилттай!", description: "Оюутан бүртгэгдлээ." });
    e.currentTarget.reset();
  };

  const handleAddTeacher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      name: fd.get("name") as string,
      title: fd.get("title") as string,
      subject: fd.get("subject") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      registeredAt: new Date().toISOString()
    };
    store.addTeacher(newTeacher);
    toast({ title: "Амжилттай!", description: "Багш бүртгэгдлээ." });
    e.currentTarget.reset();
  };

  const handleAddAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
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
    toast({ title: "Амжилттай!", description: "Мэдэгдэл нэмэгдлээ." });
    e.currentTarget.reset();
  };

  const handleAddGallery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const file = (fd.get("image") as File);
    if (!file || file.size === 0) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        title: fd.get("title") as string,
        description: fd.get("description") as string,
        imageUrl: reader.result as string,
        date: new Date().toISOString().split('T')[0]
      };
      store.addGalleryItem(newItem);
      toast({ title: "Амжилттай!", description: "Зураг нэмэгдлээ." });
      (e.target as HTMLFormElement).reset();
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const entry: ScheduleEntry = {
      subject: fd.get("subject") as string,
      teacher: fd.get("teacher") as string,
      room: fd.get("room") as string,
      type: fd.get("type") as any,
    };
    store.updateSchedule(schedYear, schedDay, schedTime, entry);
    toast({ title: "Шинэчлэгдлээ", description: `${schedYear}-р курс, ${schedDay} гараг, ${schedTime} цагийн хуваарь солигдлоо.` });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive via-accent to-destructive" />
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4 border border-destructive/20">
              <Lock className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold">Админ Булан</h1>
            <p className="text-secondary text-sm">Зөвхөн эрх бүхий админ нэвтэрнэ</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="ПИН код оруулах"
              className={`w-full bg-background border rounded-xl px-4 py-3 text-center text-xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-destructive ${error ? 'border-destructive' : 'border-border'}`}
              autoFocus
            />
            <button type="submit" className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold py-3 rounded-xl transition-colors">
              Нэвтрэх
            </button>
          </form>
          {/* <p className="text-center text-xs text-secondary mt-6"></p> */}
        </motion.div>
      </div>
    );
  }

  const SidebarBtn = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === id ? 'bg-primary text-primary-foreground font-bold shadow-lg' : 'text-secondary hover:bg-card hover:text-foreground'}`}
    >
      <Icon className="w-5 h-5" /> {label}
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-hidden h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-card border-r border-border p-4 flex flex-col gap-2 overflow-y-auto shrink-0">
        <div className="mb-6 px-2">
          <h2 className="text-xl font-bold uppercase tracking-wider text-destructive">Админ Панел</h2>
        </div>
        <SidebarBtn id="overview" icon={LayoutDashboard} label="Ерөнхий тойм" />
        <SidebarBtn id="schedule" icon={Calendar} label="Хуваарь удирдах" />
        <SidebarBtn id="students" icon={Users} label="Оюутан бүртгэх" />
        <SidebarBtn id="teachers" icon={UserPlus} label="Багш бүртгэх" />
        <SidebarBtn id="announcements" icon={Bell} label="Мэдэгдэл удирдах" />
        <SidebarBtn id="gallery" icon={ImageIcon} label="Зургийн цомог" />

        <div className="mt-auto pt-4 border-t border-border">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-5 h-5" /> Гарах
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-6xl mx-auto space-y-8"
          >

            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && (
              <>
                <h2 className="text-3xl font-bold mb-6">Ерөнхий Тойм</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-card border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Users className="w-8 h-8 text-primary mb-2" />
                    <p className="text-3xl font-bold">{store.students.length}</p>
                    <p className="text-xs text-secondary uppercase">Нийт оюутан</p>
                  </div>
                  <div className="bg-card border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                    <UserPlus className="w-8 h-8 text-accent mb-2" />
                    <p className="text-3xl font-bold">{store.teachers.length}</p>
                    <p className="text-xs text-secondary uppercase">Нийт багш</p>
                  </div>
                  <div className="bg-card border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Bell className="w-8 h-8 text-yellow-500 mb-2" />
                    <p className="text-3xl font-bold">{store.announcements.length}</p>
                    <p className="text-xs text-secondary uppercase">Нийт мэдэгдэл</p>
                  </div>
                  <div className="bg-card border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                    <p className="text-3xl font-bold text-green-500">{store.students.filter(s => s.tuitionStatus === 'Төлсөн').length}</p>
                    <p className="text-xs text-secondary uppercase">Төлбөр төлсөн</p>
                  </div>
                  <div className="bg-card border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                    <AlertCircle className="w-8 h-8 text-destructive mb-2" />
                    <p className="text-3xl font-bold text-destructive">{store.students.filter(s => s.tuitionStatus === 'Төлөөгүй').length}</p>
                    <p className="text-xs text-secondary uppercase">Төлбөр төлөөгүй</p>
                  </div>
                </div>
              </>
            )}

            {/* 2. SCHEDULE TAB */}
            {activeTab === "schedule" && (
              <>
                <h2 className="text-3xl font-bold mb-6">Хичээлийн Хуваарь Удирдах</h2>
                <div className="bg-card border border-border p-6 rounded-2xl space-y-8">

                  {/* Нэмэх/Шинэчлэх Форм */}
                  <form onSubmit={handleUpdateSchedule} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Курс сонгох</label>
                        <select value={schedYear} onChange={(e) => setSchedYear(Number(e.target.value))} className="w-full bg-background border border-border rounded-lg px-3 py-2">
                          {[1, 2, 3, 4].map(y => <option key={y} value={y}>{y}-р курс</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Гараг</label>
                        <select value={schedDay} onChange={(e) => setSchedDay(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2">
                          {["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"].map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Цаг</label>
                        <select value={schedTime} onChange={(e) => setSchedTime(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2">
                          {["09:00", "10:40", "12:50", "14:30", "16:10"].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-background/50 rounded-xl border border-dashed border-border">
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Хичээлийн нэр</label>
                        <input required name="subject" type="text" placeholder="Жишээ: Математик" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Багш</label>
                        <input required name="teacher" type="text" placeholder="Багшийн нэр" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Өрөө</label>
                        <input required name="room" type="text" placeholder="301" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Өнгө</label>
                        <select name="type" className="w-full bg-background border border-border rounded-lg px-3 py-2">
                          <option value="primary">Цэнхэр</option>
                          <option value="accent">Улаан</option>
                          <option value="muted">Саарал</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" /> Энэ цаг дээр хуваарь хадгалах
                    </button>
                  </form>

                  {/* Одоо байгаа хуваарийг хянах хэсэг + ТУСДАА УСТГАХ ТОВЧНУУД */}
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <LayoutDashboard className="w-5 h-5 text-secondary" />
                      {schedYear}-р курс, {schedDay} гарагийн хуваарь
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                      {["09:00", "10:40", "12:50", "14:30", "16:10"].map(time => {
                        const item = store.schedule[schedYear]?.[schedDay]?.[time];
                        return (
                          <div key={time} className={`p-3 rounded-lg border relative group ${item ? 'bg-card border-primary/20' : 'bg-muted/10 border-border opacity-50'}`}>
                            <p className="text-[10px] font-bold text-secondary mb-1">{time}</p>
                            {item ? (
                              <>
                                <div className="pr-6">
                                  <p className="text-xs font-bold line-clamp-1">{item.subject}</p>
                                  <p className="text-[10px] text-secondary">{item.room} өрөө</p>
                                </div>
                                {/* ТУСДАА УСТГАХ ТОВЧ (Зөвхөн энэ цагийг) */}
                                <button
                                  onClick={() => {
                                    if (confirm(`${time} цагийн хичээлийг устгах уу?`)) {
                                      store.deleteScheduleEntry(schedYear, schedDay, time);
                                      toast({ title: "Устлаа", variant: "destructive" });
                                    }
                                  }}
                                  className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <p className="text-[10px] italic">Хоосон</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* 3. STUDENTS TAB */}
            {activeTab === "students" && (
              <>
                <h2 className="text-3xl font-bold mb-6">Оюутан Бүртгэх</h2>
                <div className="bg-card border border-border p-6 rounded-2xl mb-8">
                  <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Нэр</label>
                      <input required name="name" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Оюутны дугаар</label>
                      <input required name="studentId" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Курс</label>
                      <select required name="year" className="w-full bg-background border border-border rounded-lg px-3 py-2">
                        <option value="1">1-р курс</option>
                        <option value="2">2-р курс</option>
                        <option value="3">3-р курс</option>
                        <option value="4">4-р курс</option>
                      </select>
                    </div>
                    <div className="lg:col-span-3 flex justify-end">
                      <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Бүртгэх
                      </button>
                    </div>
                  </form>
                </div>
                <div className="bg-card border border-border p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4">Бүх Оюутан</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-background">
                        <tr>
                          <th className="p-3">Нэр</th>
                          <th className="p-3">Код</th>
                          <th className="p-3">Төлөв</th>
                          <th className="p-3">Үйлдэл</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {store.students.map(s => (
                          <tr key={s.id}>
                            <td className="p-3">{s.name}</td>
                            <td className="p-3">{s.studentId}</td>
                            <td className="p-3">
                              <select
                                value={s.tuitionStatus}
                                onChange={(e) => store.updateStudent(s.id, { tuitionStatus: e.target.value as any })}
                                className="bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer"
                              >
                                <option value="Төлсөн">Төлсөн</option>
                                <option value="Хэсэгчлэн">Хэсэгчлэн</option>
                                <option value="Төлөөгүй">Төлөөгүй</option>
                              </select>
                            </td>
                            <td className="p-3 text-destructive cursor-pointer" onClick={() => store.deleteStudent(s.id)}><Trash2 className="w-4 h-4" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* 4. TEACHERS TAB */}
            {activeTab === "teachers" && (
              <>
                <h2 className="text-3xl font-bold mb-6">Багш Бүртгэх</h2>
                <div className="bg-card border border-border p-6 rounded-2xl mb-8">
                  <form onSubmit={handleAddTeacher} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required name="name" placeholder="Нэр" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    <input required name="title" placeholder="Цол" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    <input required name="subject" placeholder="Хичээл" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold">Бүртгэх</button>
                  </form>
                </div>
                <div className="bg-card border border-border p-6 rounded-2xl">
                  {store.teachers.map(t => (
                    <div key={t.id} className="flex justify-between p-3 border-b">
                      <span>{t.name} - {t.subject}</span>
                      <Trash2 className="w-4 h-4 text-destructive cursor-pointer" onClick={() => store.deleteTeacher(t.id)} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 5. ANNOUNCEMENTS TAB */}
            {activeTab === "announcements" && (
              <>
                <h2 className="text-3xl font-bold mb-6">Мэдэгдэл Удирдах</h2>
                <div className="bg-card border border-border p-6 rounded-2xl mb-8">
                  <form onSubmit={handleAddAnnouncement} className="space-y-4">
                    <input required name="title" placeholder="Гарчиг" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    <textarea required name="content" placeholder="Агуулга" className="w-full bg-background border border-border rounded-lg px-3 py-2 h-32" />
                    <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold">Нийтлэх</button>
                  </form>
                </div>
                <div className="space-y-2">
                  {store.announcements.map(a => (
                    <div key={a.id} className="bg-card p-4 rounded-xl flex justify-between">
                      <span>{a.title}</span>
                      <Trash2 className="w-4 h-4 text-destructive cursor-pointer" onClick={() => store.deleteAnnouncement(a.id)} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 6. GALLERY TAB */}
            {activeTab === "gallery" && (
              <>
                <h2 className="text-3xl font-bold mb-6">Зургийн Цомог</h2>
                <div className="bg-card border border-border p-6 rounded-2xl mb-8">
                  <form onSubmit={handleAddGallery} className="space-y-4">
                    <input required name="title" placeholder="Зургийн гарчиг" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    <textarea required name="description" placeholder="Зургийн тайлбар" className="w-full bg-background border border-border rounded-lg px-3 py-2" rows={3} />
                    <input required name="image" type="file" accept="image/*" className="w-full" />
                    <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold">Нэмэх</button>
                  </form>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {store.gallery.map(g => (
                    <div key={g.id} className="relative aspect-square">
                      <img src={g.imageUrl} className="w-full h-full object-cover rounded-xl" />
                      <button onClick={() => store.deleteGalleryItem(g.id)} className="absolute top-2 right-2 p-1 bg-destructive rounded-full text-white"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}