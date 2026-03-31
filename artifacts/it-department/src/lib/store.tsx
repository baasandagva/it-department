import React, { createContext, useContext, useEffect, useState } from "react";

export type Student = {
  id: string;
  name: string;        // Нэр
  studentId: string;   // Оюутны үнэмлэхний дугаар
  year: 1 | 2 | 3 | 4; // Курс
  phone: string;
  email: string;
  tuitionAmount: number; // ₮
  tuitionStatus: "Төлсөн" | "Хэсэгчлэн" | "Төлөөгүй";
  tuitionDue: string;    // date string
  paidAmount: number;
  registeredAt: string;
};

export type Teacher = {
  id: string;
  name: string;
  title: string;       // Тэнхимийн эрхлэгч, Дэд профессор, Багш, etc.
  subject: string;     // Заадаг хичээл
  phone: string;
  email: string;
  registeredAt: string;
};

export type Announcement = {
  id: string;
  title: string;
  category: "Ерөнхий" | "Хурал" | "Шалгалт";
  content: string;
  author: string;
  date: string;
  hasAttachment: boolean;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;    // base64 or URL
  date: string;
};

type StoreData = {
  students: Student[];
  teachers: Teacher[];
  announcements: Announcement[];
  gallery: GalleryItem[];
};

type StoreContextType = StoreData & {
  addStudent: (student: Student) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addTeacher: (teacher: Teacher) => void;
  deleteTeacher: (id: string) => void;
  addAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
};

const initialData: StoreData = {
  students: [
    { id: "1", name: "Б. Анар", studentId: "IT21D001", year: 1, phone: "99112233", email: "anar@ider.edu.mn", tuitionAmount: 3500000, tuitionStatus: "Төлсөн", tuitionDue: "2025-01-15", paidAmount: 3500000, registeredAt: "2024-09-01" },
    { id: "2", name: "Г. Бат", studentId: "IT21D002", year: 2, phone: "99112234", email: "bat@ider.edu.mn", tuitionAmount: 3500000, tuitionStatus: "Хэсэгчлэн", tuitionDue: "2025-03-01", paidAmount: 1500000, registeredAt: "2024-09-01" },
    { id: "3", name: "Д. Сараа", studentId: "IT21D003", year: 3, phone: "99112235", email: "saraa@ider.edu.mn", tuitionAmount: 3500000, tuitionStatus: "Төлөөгүй", tuitionDue: "2025-02-15", paidAmount: 0, registeredAt: "2024-09-01" },
    { id: "4", name: "Э. Болд", studentId: "IT21D004", year: 1, phone: "99112236", email: "bold@ider.edu.mn", tuitionAmount: 3500000, tuitionStatus: "Төлсөн", tuitionDue: "2025-01-15", paidAmount: 3500000, registeredAt: "2024-09-01" },
    { id: "5", name: "М. Мөнх", studentId: "IT21D005", year: 4, phone: "99112237", email: "munkh@ider.edu.mn", tuitionAmount: 3500000, tuitionStatus: "Хэсэгчлэн", tuitionDue: "2025-03-01", paidAmount: 2000000, registeredAt: "2024-09-01" },
  ],
  teachers: [
    { id: "1", name: "Б. Болдбаатар", title: "Тэнхимийн эрхлэгч", subject: "Мэдээллийн систем", phone: "99887766", email: "boldbaatar@ider.edu.mn", registeredAt: "2020-09-01" },
    { id: "2", name: "С. Наранцэцэг", title: "Дэд профессор", subject: "Өгөгдлийн сан", phone: "99887767", email: "narantsetseg@ider.edu.mn", registeredAt: "2021-09-01" },
    { id: "3", name: "Г. Тэмүүжин", title: "Багш", subject: "Объект хандлагат программчлал", phone: "99887768", email: "temuujin@ider.edu.mn", registeredAt: "2022-09-01" },
  ],
  announcements: [
    { id: "1", title: "2025-2026 оны хичээлийн жилийн 2-р улирлын шалгалтын хуваарь", date: "2025-05-10", category: "Шалгалт", author: "Сургалтын алба", content: "Энэ улирлын нэгдсэн шалгалт 5 сарын 20-ноос эхлэн 14 хоног үргэлжлэх тул оюутнууд хуваариа цаг тухайд нь шалгана уу.", hasAttachment: true },
    { id: "2", title: "МТ Тэнхимийн багш нарын хурал", date: "2025-04-28", category: "Хурал", author: "Тэнхимийн эрхлэгч", content: "МТ Тэнхимийн ээлжит хурал 5 сарын 1-ний 15:00 цагт 301 тоотод болно. Бүх багш нар цагтаа ирнэ үү.", hasAttachment: false },
    { id: "3", title: "Дипломын ажлын удирдамж шинэчлэгдлээ", date: "2025-04-15", category: "Ерөнхий", author: "Академик зөвлөл", content: "Төгсөх ангийн оюутнууд дипломын ажлын шинэчилсэн удирдамжтай танилцаж, форматаа нийцүүлэн засна уу.", hasAttachment: true },
    { id: "4", title: "Интернет хичээлийн цаг өөрчлөгдлөө", date: "2025-03-20", category: "Ерөнхий", author: "Сургалтын алба", content: "3-р курсын Сүлжээний хичээлийн цаг Даваа гарагийн 11:20 болж урагшиллаа.", hasAttachment: false },
    { id: "5", title: "Хаврын шалгалт - хуваарь", date: "2025-02-15", category: "Шалгалт", author: "Сургалтын алба", content: "Хаврын улирлын завсрын шалгалтын хуваарь гарлаа. Оюутны вэбээр орж шалгана уу.", hasAttachment: true }
  ],
  gallery: [
    { id: "1", title: "МТ Тэнхимийн лаборатори", description: "Орчин үеийн компьютерээр тоноглогдсон сургалтын орчин.", imageUrl: "/gallery-1.png", date: "2025-01-10" },
    { id: "2", title: "Код бичих орчин", description: "Оюутнууд өгөгдсөн даалгавар дээр багаар ажиллаж байна.", imageUrl: "/gallery-2.png", date: "2025-01-12" },
    { id: "3", title: "Тэнхимийн коридор", description: "Сургуулийн байрны интерьер дизайн.", imageUrl: "/gallery-3.png", date: "2025-01-15" },
    { id: "4", title: "Төслийн танилцуулга", description: "Дипломын төслийн урьдчилсан хамгаалалт.", imageUrl: "/gallery-4.png", date: "2025-01-18" },
    { id: "5", title: "Программчлал", description: "Хичээлийн үеэрх практик дадлага.", imageUrl: "/gallery-5.png", date: "2025-02-01" },
    { id: "6", title: "Серверийн өрөө", description: "Сүлжээ, дата төвийн дадлагын бааз.", imageUrl: "/gallery-6.png", date: "2025-02-05" },
  ]
};

const StoreContext = createContext<StoreContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<StoreData>(() => {
    try {
      const stored = localStorage.getItem("it-dept-data");
      if (stored) return JSON.parse(stored);
    } catch (err) {}
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem("it-dept-data", JSON.stringify(data));
  }, [data]);

  const addStudent = (student: Student) => setData(prev => ({ ...prev, students: [...prev.students, student] }));
  const updateStudent = (id: string, updates: Partial<Student>) => setData(prev => ({
    ...prev,
    students: prev.students.map(s => s.id === id ? { ...s, ...updates } : s)
  }));
  const deleteStudent = (id: string) => setData(prev => ({ ...prev, students: prev.students.filter(s => s.id !== id) }));

  const addTeacher = (teacher: Teacher) => setData(prev => ({ ...prev, teachers: [...prev.teachers, teacher] }));
  const deleteTeacher = (id: string) => setData(prev => ({ ...prev, teachers: prev.teachers.filter(t => t.id !== id) }));

  const addAnnouncement = (announcement: Announcement) => setData(prev => ({ ...prev, announcements: [announcement, ...prev.announcements] }));
  const deleteAnnouncement = (id: string) => setData(prev => ({ ...prev, announcements: prev.announcements.filter(a => a.id !== id) }));

  const addGalleryItem = (item: GalleryItem) => setData(prev => ({ ...prev, gallery: [item, ...prev.gallery] }));
  const deleteGalleryItem = (id: string) => setData(prev => ({ ...prev, gallery: prev.gallery.filter(g => g.id !== id) }));

  return (
    <StoreContext.Provider value={{
      ...data,
      addStudent, updateStudent, deleteStudent,
      addTeacher, deleteTeacher,
      addAnnouncement, deleteAnnouncement,
      addGalleryItem, deleteGalleryItem
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within DataProvider");
  return context;
}
