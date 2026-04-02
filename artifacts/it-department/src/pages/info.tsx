import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Users, BookOpen, Calendar, GraduationCap } from "lucide-react";

const faculty = [
  { name: "Д. Бат-Эрдэнэ", title: "Тэнхимийн эрхлэгч, Доктор (Ph.D)", specialty: "Мэдээллийн аюулгүй байдал" },
  { name: "Б. Болд", title: "Дэд профессор", specialty: "Алгоритм, Математик" },
  { name: "С. Туяа", title: "Ахлах багш", specialty: "Программчлал, Өгөгдлийн бүтэц" },
  { name: "О. Онон", title: "Багш", specialty: "Вэб хөгжүүлэлт, UI/UX" },
  { name: "Н. Наран", title: "Багш", specialty: "Сүлжээ, Систем админ" }
];

export default function Info() {
  return (
    <div className="py-12 flex-1 container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-gradient">Ерөнхий Мэдээлэл</h1>
        <p className="text-secondary">МТ Тэнхимтэй холбоотой чухал мэдээллүүд</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glow-card bg-card p-8 rounded-2xl border border-border"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-6">Холбоо барих</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-secondary">
              <Phone className="w-5 h-5 text-accent" />
              <span>+976 86423060</span>
            </div>
            <div className="flex items-center gap-4 text-secondary">
              <Mail className="w-5 h-5 text-accent" />
              <span>d.majigsuren@ider.edu.mn</span>
            </div>
            <div className="flex items-center gap-4 text-secondary">
              <MapPin className="w-5 h-5 text-accent" />
              <span>Улаанбаатар хот, СБД 8-р хороо, Идэр Их Сургууль, Багшийн Сургуулийн 3 давхар</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glow-card bg-card p-8 rounded-2xl border border-border lg:col-span-2 flex flex-col justify-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-2 text-secondary">
                <Users className="w-5 h-5" />
                <span className="font-medium uppercase tracking-wider text-sm">Суралцагчийн тоо</span>
              </div>
              <p className="text-4xl font-bold text-gradient">100+</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2 text-secondary">
                <Clock className="w-5 h-5" />
                <span className="font-medium uppercase tracking-wider text-sm">Цагийн хуваарь</span>
              </div>
              <p className="text-xl font-bold mt-2">Даваа - Бямба</p>
              <p className="text-accent">08:00 - 17:00</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2 text-secondary">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium uppercase tracking-wider text-sm">Хөтөлбөр</span>
              </div>
              <p className="text-xl font-bold mt-2">Бакалавр</p>
              <p className="text-accent">Мэдээллийн Технологи</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Faculty */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card p-8 rounded-2xl border border-border"
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">Багш нарын бүрэлдэхүүн</h2>
          </div>
          <div className="space-y-4">
            {faculty.map((f, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-background/50 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div>
                  <h3 className="font-bold text-lg">{f.name}</h3>
                  <p className="text-secondary text-sm">{f.title}</p>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right">
                  <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-semibold">
                    {f.specialty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Academic Calendar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card p-8 rounded-2xl border border-border"
        >
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-bold">Академик Хуанли</h2>
          </div>
          <div className="relative border-l border-primary/30 ml-4 space-y-8 pb-4">
            {[
              { term: "Намрын улирал", date: "9 сарын 1 - 12 сарын 25", desc: "Хичээл эхлэх, завсрын болон эцсийн шалгалт" },
              { term: "Өвлийн амралт", date: "12 сарын 26 - 1 сарын 25", desc: "Оюутны өвлийн амралт" },
              { term: "Хаврын улирал", date: "1 сарын 26 - 5 сарын 20", desc: "Хичээл эхлэх, завсрын болон эцсийн шалгалт" },
              { term: "Төгсөлтийн үйл ажиллагаа", date: "6 сарын эхээр", desc: "Дипломын хамгаалалт, Эрдмийн баяр" }
            ].map((event, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute w-4 h-4 rounded-full bg-background border-2 border-accent -left-[9px] top-1" />
                <h3 className="font-bold text-lg text-primary">{event.term}</h3>
                <p className="text-accent font-medium text-sm mb-2">{event.date}</p>
                <p className="text-secondary text-sm">{event.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-primary/5 p-8 md:p-12 rounded-3xl border border-primary/20 text-center max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 uppercase">Тэнхимийн Дотоод Журам</h2>
        <p className="text-secondary leading-relaxed mb-8">
          Оюутан бүр хичээлийн танхимд зохистой хувцаслах, лабораторийн тоног төхөөрөмжтэй зөв боловсон харьцах, хоцрохгүй байх болон бусдыг хүндэтгэх зарчмыг баримтална. Лабораторид хоол хүнс хэрэглэхийг хатуу хориглоно.
        </p>
        <button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-8 py-3 rounded-full transition-colors">
          Бүрэн журамтай танилцах
        </button>
      </motion.div>
    </div>
  );
}
