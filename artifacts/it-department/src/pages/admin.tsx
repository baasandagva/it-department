import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, CheckCircle2, AlertCircle, Plus, Edit2, Trash2, LayoutDashboard, Users, UserPlus, Bell, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStore, Student, Teacher, Announcement, GalleryItem } from "@/lib/store";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const { toast } = useToast();
  const store = useStore();
  
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "teachers" | "announcements" | "gallery">("overview");

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
            <div>
              <input 
                type="password" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="ПИН код оруулах" 
                className={`w-full bg-background border rounded-xl px-4 py-3 text-center text-xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-destructive ${error ? 'border-destructive' : 'border-border'}`}
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
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold py-3 rounded-xl transition-colors"
            >
              Нэвтрэх
            </button>
          </form>
          <p className="text-center text-xs text-secondary mt-6">Жишээ ПИН: 9999</p>
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
        <SidebarBtn id="students" icon={Users} label="Оюутан бүртгэх" />
        <SidebarBtn id="teachers" icon={UserPlus} label="Багш бүртгэх" />
        <SidebarBtn id="announcements" icon={Bell} label="Мэдэгдэл удирдах" />
        <SidebarBtn id="gallery" icon={ImageIcon} label="Зургийн цомог" />
        
        <div className="mt-auto pt-4 border-t border-border">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
          >
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
            
            {/* OVERVIEW TAB */}
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

                <div className="bg-card border border-border p-6 rounded-2xl mt-8">
                  <h3 className="text-xl font-bold mb-4">Сүүлд бүртгэгдсэн оюутнууд</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-background">
                        <tr>
                          <th className="p-3">Нэр</th>
                          <th className="p-3">Оюутны код</th>
                          <th className="p-3">Курс</th>
                          <th className="p-3">Төлөв</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {store.students.slice(-5).reverse().map(s => (
                          <tr key={s.id}>
                            <td className="p-3">{s.name}</td>
                            <td className="p-3">{s.studentId}</td>
                            <td className="p-3">{s.year}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${s.tuitionStatus === 'Төлсөн' ? 'bg-green-500/20 text-green-500' : s.tuitionStatus === 'Төлөөгүй' ? 'bg-destructive/20 text-destructive' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                {s.tuitionStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* STUDENTS TAB */}
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
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Утас</label>
                      <input required name="phone" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Имэйл</label>
                      <input required name="email" type="email" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Сургалтын төлбөр ₮</label>
                      <input required name="tuitionAmount" type="number" defaultValue="3500000" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Төлбөр дуусах огноо</label>
                      <input required name="tuitionDue" type="date" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div className="lg:col-span-3 flex justify-end mt-2">
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
                          <th className="p-3">Оюутны код</th>
                          <th className="p-3">Курс</th>
                          <th className="p-3">Төлбөр төлөв</th>
                          <th className="p-3">Үйлдэл</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {store.students.map(s => (
                          <tr key={s.id}>
                            <td className="p-3">{s.name}</td>
                            <td className="p-3">{s.studentId}</td>
                            <td className="p-3">{s.year}</td>
                            <td className="p-3">
                              <select 
                                value={s.tuitionStatus}
                                onChange={(e) => store.updateStudent(s.id, { tuitionStatus: e.target.value as any })}
                                className={`bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer ${s.tuitionStatus === 'Төлсөн' ? 'text-green-500' : s.tuitionStatus === 'Төлөөгүй' ? 'text-destructive' : 'text-yellow-500'}`}
                              >
                                <option className="text-foreground">Төлсөн</option>
                                <option className="text-foreground">Хэсэгчлэн</option>
                                <option className="text-foreground">Төлөөгүй</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <button onClick={() => store.deleteStudent(s.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* TEACHERS TAB */}
            {activeTab === "teachers" && (
              <>
                <h2 className="text-3xl font-bold mb-6">Багш Бүртгэх</h2>
                <div className="bg-card border border-border p-6 rounded-2xl mb-8">
                  <form onSubmit={handleAddTeacher} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Нэр</label>
                      <input required name="name" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Цол/Чиг үүрэг</label>
                      <input required name="title" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Заадаг хичээл</label>
                      <input required name="subject" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Утас</label>
                      <input required name="phone" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Имэйл</label>
                      <input required name="email" type="email" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                    </div>
                    <div className="md:col-span-2 flex justify-end mt-2">
                      <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Бүртгэх
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-card border border-border p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4">Бүх Багш Нар</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-background">
                        <tr>
                          <th className="p-3">Нэр</th>
                          <th className="p-3">Цол</th>
                          <th className="p-3">Хичээл</th>
                          <th className="p-3">Холбоо барих</th>
                          <th className="p-3">Үйлдэл</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {store.teachers.map(t => (
                          <tr key={t.id}>
                            <td className="p-3">{t.name}</td>
                            <td className="p-3">{t.title}</td>
                            <td className="p-3">{t.subject}</td>
                            <td className="p-3">{t.phone}<br/><span className="text-secondary text-xs">{t.email}</span></td>
                            <td className="p-3">
                              <button onClick={() => store.deleteTeacher(t.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* ANNOUNCEMENTS TAB */}
            {activeTab === "announcements" && (
              <>
                <h2 className="text-3xl font-bold mb-6">Мэдэгдэл Удирдах</h2>
                <div className="bg-card border border-border p-6 rounded-2xl mb-8">
                  <form onSubmit={handleAddAnnouncement} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Гарчиг</label>
                        <input required name="title" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Зохиогч</label>
                        <input required name="author" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Ангилал</label>
                        <select required name="category" className="w-full bg-background border border-border rounded-lg px-3 py-2">
                          <option>Ерөнхий</option>
                          <option>Хурал</option>
                          <option>Шалгалт</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Агуулга</label>
                      <textarea required name="content" rows={4} className="w-full bg-background border border-border rounded-lg px-3 py-2 resize-none"></textarea>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Нийтлэх
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-card border border-border p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4">Бүх Мэдэгдэл</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-background">
                        <tr>
                          <th className="p-3">Гарчиг</th>
                          <th className="p-3">Ангилал</th>
                          <th className="p-3">Огноо</th>
                          <th className="p-3">Үйлдэл</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {store.announcements.map(a => (
                          <tr key={a.id}>
                            <td className="p-3 font-medium">{a.title}</td>
                            <td className="p-3">
                              <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">{a.category}</span>
                            </td>
                            <td className="p-3 text-secondary">{a.date}</td>
                            <td className="p-3">
                              <button onClick={() => store.deleteAnnouncement(a.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* GALLERY TAB */}
            {activeTab === "gallery" && (
              <>
                <h2 className="text-3xl font-bold mb-6">Зургийн Цомог Удирдах</h2>
                <div className="bg-card border border-border p-6 rounded-2xl mb-8">
                  <form onSubmit={handleAddGallery} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Гарчиг</label>
                        <input required name="title" type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-secondary mb-1">Зураг сонгох</label>
                        <input required name="image" type="file" accept="image/*" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary mb-1">Тайлбар</label>
                      <textarea required name="description" rows={2} className="w-full bg-background border border-border rounded-lg px-3 py-2 resize-none"></textarea>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Зураг нэмэх
                      </button>
                    </div>
                  </form>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {store.gallery.map(g => (
                    <div key={g.id} className="relative group rounded-xl overflow-hidden border border-border bg-card aspect-[4/3]">
                      <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => store.deleteGalleryItem(g.id)}
                          className="bg-destructive text-destructive-foreground p-3 rounded-full hover:scale-110 transition-transform"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-xs">
                        <p className="truncate font-bold">{g.title}</p>
                      </div>
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
