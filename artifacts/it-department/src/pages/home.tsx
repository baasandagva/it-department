import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Building,
  Cpu,
  Code,
  Zap,
  Globe,
  Terminal,
  Database,
  Network,
  ChevronDown,
  Shield,
  Award,
  Lightbulb,
  MapPin,
  MonitorPlay
} from "lucide-react";

const stats = [
  { icon: Users, label: "Оюутан", sub: "Active Students", value: "100+" },
  { icon: Building, label: "Талбай", sub: "Half the Floor", value: "50%" },
];

const features = [
  { icon: Code, title: "Программ хангамж", desc: "Орчин үеийн хэлнүүд болон фреймворкууд дээр суурилсан вэб, гар утасны аппликэйшн хөгжүүлэлт." },
  { icon: Database, title: "Өгөгдлийн сан", desc: "Их хэмжээний өгөгдөл боловсруулах, бүтэц зохион байгуулалт, анализ хийх дэвшилтэт чадвар." },
  { icon: Network, title: "Сүлжээ", desc: "Байгууллагын сүлжээний дэд бүтэц, мэдээллийн аюулгүй байдлын цогц шийдлүүд." },
  { icon: Cpu, title: "Хиймэл оюун ухаан", desc: "AI болон Machine Learning алгоритмуудын практик хэрэглээ, өгөгдөл дээр суурилсан загварчлал." },
];

const techStack = [
  { name: "React", type: "Frontend" },
  { name: "Node.js", type: "Backend" },
  { name: "Python", type: "AI / Data" },
  { name: "PostgreSQL", type: "Database" },
  { name: "Docker", type: "DevOps" },
  { name: "AWS", type: "Cloud" },
  { name: "TypeScript", type: "Language" },
  { name: "Figma", type: "Design" }
];

const rooms = [
  // { id: "301", name: "Хичээлийн танхим 301", capacity: "30 оюутан", equip: "30x i7 Desktop, Ухаалаг самбар", type: "lab", photo: "/gallery-1.png" },
  { id: "302", name: "Хичээлийн танхим 302", capacity: "25 оюутан", equip: "25x iMac, Проектор", type: "lab", photo: "/gallery-2.png" },
  { id: "303", name: "Хичээлийн танхим 303", capacity: "40 оюутан", equip: "Сүлжээний төхөөрөмжүүд, Серверүүд", type: "lab", photo: "/gallery-4.png" },
  { id: "304", name: "Хичээлийн танхим 304", capacity: "20 оюутан", equip: "Уулзалтын ширээ, Проектор, Хэвлэгч", type: "lab", photo: "/gallery-6.png" },
];

export default function Home() {
  const [activeRoom, setActiveRoom] = useState<typeof rooms[0] | null>(null);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden selection:bg-primary/30">

      {/* 1. Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <img
            src="/hero.png"
            alt="Futuristic IT Lab"
            className="w-full h-full object-cover opacity-25 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
        </div>
        <div className="scanline" />

        <div className="relative z-10 container mx-auto px-6 text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 mb-8 rounded-full border border-primary/40 bg-primary/10 text-accent text-sm md:text-base font-semibold tracking-widest uppercase backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.2)]">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Идэр Их Сургууль • Ider University
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 text-gradient uppercase leading-[1.1]">
              Мэдээллийн<br />Технологийн Тэнхим
            </h1>

            <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-light tracking-wide">
              Information Technology Department
            </p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground z-20"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
        >
          <ChevronDown className="w-10 h-10 opacity-60 text-accent" />
        </motion.div>
      </section>

      {/* 2. Stats Section */}
      {/* <section className="py-20 relative z-10 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glow-card bg-card/80 p-8 rounded-2xl flex flex-col items-center text-center border border-card-border backdrop-blur-sm group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-2 text-foreground text-gradient">{stat.value}</h3>
                <p className="text-lg font-medium text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-secondary uppercase tracking-wider">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 3. Vision / About */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-card border border-primary/30 mb-8 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <Zap className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tight">Ирээдүйг Бүтээх нь</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-10 rounded-full" />
            <p className="text-xl md:text-2xl text-secondary leading-relaxed font-light">
              Бид орчин үеийн технологийн дэвшилтэй хөл нийлүүлэн алхаж, мэдээллийн технологийн салбарт тэргүүлэх мэргэжилтнүүдийг бэлтгэхийг зорьж байна. Онол практикийг хослуулсан сургалтын системээр дамжуулан оюутан бүрийнхээ нөөц бололцоог бүрэн нээхэд бидний анхаарал төвлөрдөг.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-32 bg-card relative border-t border-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">Яагаад Биднийг Сонгох вэ?</h2>
            <p className="text-secondary text-lg">МТ Тэнхимийн онцлог, давуу талууд</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: "Инновацид Суурилсан", text: "Орчин үеийн технологийн чиг хандлагад нийцсэн шинэлэг хөтөлбөр." },
              { icon: Shield, title: "Мэргэжлийн Багш Нар", text: "Салбартаа тэргүүлэгч, туршлагатай профессорууд болон зөвлөхүүд." },
              { icon: Award, title: "Төсөлд Суурилсан", text: "Зөвхөн онол бус, бодит төслүүд дээр ажиллаж туршлага хуримтлуулах." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-background border border-border p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />
                <item.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-secondary">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Facilities */}
      <section className="py-32 bg-background relative border-t border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">Сургалтын Орчин</h2>
              <p className="text-secondary text-lg">Орчин үеийн тоног төхөөрөмжөөр бүрэн тоноглогдсон 3 өрөө бүхий академик бааз.</p>
            </div>
            <div className="md:text-right border border-border bg-card p-6 rounded-2xl flex-shrink-0">
              <p className="text-4xl font-bold text-accent mb-2">3</p>
              <p className="text-secondary uppercase tracking-widest text-xs font-semibold">Хичээлийн Танхим</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glow-card p-10 md:p-12 rounded-3xl bg-card border border-border shadow-2xl"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-8 border border-primary/20">
                <Terminal className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Хичээлийн Танхим (302–304)</h3>
              <p className="text-secondary text-lg mb-8 leading-relaxed">
                Өндөр хүчин чадал бүхий компьютерууд, ухаалаг самбар болон орчин үеийн сургалтын хэрэгслээр тоноглогдсон төрөлжсөн лабораториуд.
              </p>
              <ul className="space-y-4">
                {[
                  "302 — Программчлал, хөгжүүлэлтийн лаборатори",
                  "303 — iMac лаборатори, Проектор",
                  "304 — Сүлжээ, серверийн лаборатори"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-secondary">
                    <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glow-card p-10 md:p-12 rounded-3xl bg-card border border-border shadow-2xl"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-8 border border-primary/20">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Хичээлийн Танхим 304</h3>
              <p className="text-secondary text-lg mb-8 leading-relaxed">
                Уулзалт, хэлэлцүүлэг, танилцуулга болон жижиг бүлгийн хичээлд зориулагдсан орчин үеийн тохилог танхим.
              </p>
              <ul className="space-y-4">
                {[
                  "Уулзалтын ширээ, Проектор",
                  "Нээлттэй хэлэлцүүлэг, төслийн танилцуулга",
                  "Багтаамж: 20 оюутан"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-secondary">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Technology Stack */}
      <section className="py-24 bg-card border-t border-border overflow-hidden">
        <div className="container mx-auto px-6 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-secondary">Ашигладаг Технологиуд</h2>
        </div>
        <div className="flex whitespace-nowrap">
          <motion.div
            className="flex gap-8 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 bg-background border border-border px-6 py-3 rounded-full">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="font-bold text-lg">{tech.name}</span>
                <span className="text-secondary text-sm ml-2">({tech.type})</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Programs / Curriculums */}
      <section className="py-32 relative bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Сургалтын Чиглэл</h2>
            <p className="text-secondary text-lg">Олон улсын стандартад нийцсэн, хөдөлмөрийн зах зээлийн эрэлт хэрэгцээнд тулгуурласан хөтөлбөрүүд.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card/40 border border-border p-8 rounded-2xl hover:bg-card hover:border-primary/50 transition-all duration-300 group shadow-lg"
              >
                <div className="mb-6 p-4 bg-background rounded-xl inline-block border border-border group-hover:border-primary/30 transition-colors">
                  <feat.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-foreground">{feat.title}</h4>
                <p className="text-secondary text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Floor Map Section */}
      <section className="py-32 bg-card border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase text-gradient">Багшийн Сургуулийн 3-р давхар</h2>
            {/* <p className="text-secondary text-lg uppercase tracking-widest flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              4-р байр, 3-р давхар
            </p> */}
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-center justify-center min-h-[500px]">
            {/* 3D Isometric View */}
            <div className="relative w-full max-w-[600px] h-[400px] perspective-[1200px]">
              <motion.div
                className="w-full h-full relative"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(60deg) rotateZ(-45deg)"
                }}
              >
                {/* Floor base */}
                <div className="absolute inset-0 bg-background/50 border-2 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-primary/10 translate-y-full origin-top" style={{ transform: "rotateX(-90deg)" }} />
                <div className="absolute inset-y-0 right-0 w-4 bg-primary/5 translate-x-full origin-left" style={{ transform: "rotateY(90deg)" }} />

                {/* Corridors (Decorative) */}
                <div className="absolute top-[30%] bottom-0 left-[40%] w-[20%] bg-primary/5 border-x border-dashed border-primary/20" />

                {/* Rooms Grid */}
                <div className="absolute inset-4 grid grid-cols-3 gap-8">
                  {rooms.map((room, i) => (
                    <motion.div
                      key={room.id}
                      onClick={() => setActiveRoom(room)}
                      onHoverStart={() => !activeRoom && setActiveRoom(room)}
                      className={`relative cursor-pointer transition-all duration-300 ${activeRoom?.id === room.id ? 'z-20' : 'z-10'}`}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      whileHover={{ translateZ: 30 }}
                      animate={{ translateZ: activeRoom?.id === room.id ? 40 : 0 }}
                    >
                      {/* Room Top */}
                      <div className={`absolute inset-0 border border-primary/30 flex items-center justify-center shadow-lg transition-colors duration-300 ${activeRoom?.id === room.id ? 'bg-primary/40 shadow-[0_0_30px_rgba(0,212,255,0.4)] border-accent' : 'bg-card/80 hover:bg-primary/20'}`}>
                        <span className="font-bold text-xl md:text-3xl text-foreground/80 transform -rotate-12 select-none">
                          {room.id}
                        </span>
                      </div>

                      {/* 3D Walls */}
                      <div className={`absolute inset-x-0 bottom-0 h-12 origin-top transition-colors duration-300 ${activeRoom?.id === room.id ? 'bg-primary/60 border-accent' : 'bg-background border-primary/30'} border`} style={{ transform: "rotateX(-90deg)" }} />
                      <div className={`absolute inset-y-0 right-0 w-12 origin-left transition-colors duration-300 ${activeRoom?.id === room.id ? 'bg-primary/50 border-accent' : 'bg-card border-primary/30'} border`} style={{ transform: "rotateY(90deg)" }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Room Details Panel */}
            <div className="w-full lg:w-[400px] flex-shrink-0">
              <AnimatePresence mode="wait">
                {activeRoom ? (
                  <motion.div
                    key={activeRoom.id}
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    className="glow-card bg-background border border-accent/50 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,212,255,0.1)] relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full -z-10" />

                    {activeRoom.photo && (
                      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-6 border border-primary/20">
                        <img
                          src={activeRoom.photo}
                          alt={activeRoom.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                    )}

                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 border border-primary/30">
                      <MonitorPlay className="w-6 h-6 text-accent" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{activeRoom.name}</h3>
                    <div className="w-12 h-1 bg-accent mb-6 rounded-full" />

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-secondary uppercase tracking-wider mb-1">Багтаамж</p>
                        <p className="text-lg font-medium">{activeRoom.capacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-secondary uppercase tracking-wider mb-1">Тоног төхөөрөмж</p>
                        <p className="text-lg font-medium">{activeRoom.equip}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex items-center justify-center p-8 border border-dashed border-border rounded-2xl text-center"
                  >
                    <p className="text-secondary">Газрын зураг дээрх өрөөг дарж дэлгэрэнгүй мэдээлэл харна уу.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-secondary font-medium flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-card border border-primary/30 rounded" />
              <span>Хичээлийн танхим (302–304)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/40 border border-accent shadow-[0_0_10px_rgba(0,212,255,0.4)] rounded" />
              <span>Сонгогдсон өрөө</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Location Banner */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-10 border border-white/20 shadow-2xl">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 uppercase tracking-tight">Бидэнтэй Нэгдээрэй</h2>
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto mb-12 shadow-xl">
              <p className="text-2xl md:text-3xl text-white font-medium mb-4">
                4-р байр, 3-р давхар
              </p>
              <p className="text-primary-foreground/70 uppercase tracking-widest text-sm">Идэр Их Сургуулийн Төв Цогцолбор</p>
            </div>

            <div className="inline-flex items-center gap-4 bg-white text-primary px-8 py-4 rounded-full font-bold shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform cursor-default">
              <Building className="w-5 h-5" />
              <span className="tracking-wide uppercase text-sm">Байрны тал хэсэг (50%)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="py-12 bg-background border-t border-border text-center text-secondary text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
              <Code className="w-4 h-4 text-accent" />
            </div>
            <p className="font-medium tracking-wide">
              © {new Date().getFullYear()} Идэр Их Сургууль • МТ Тэнхим
            </p>
          </div>

          <div className="flex gap-8 uppercase tracking-widest text-xs font-semibold">
            <span className="hover:text-accent cursor-pointer transition-colors">Facebook</span>
            <span className="hover:text-accent cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-accent cursor-pointer transition-colors">Website</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
