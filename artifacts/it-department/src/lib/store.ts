import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Interfaces ---
export interface Student {
  id: string;
  name: string;
  studentId: string;
  year: 1 | 2 | 3 | 4;
  phone?: string;
  email?: string;
  tuitionAmount?: number;
  tuitionStatus: "Төлсөн" | "Төлөөгүй" | "Хэсэгчлэн";
  tuitionDue?: string;
  paidAmount?: number;
  registeredAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  subject: string;
  phone: string;
  email: string;
  registeredAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: "Ерөнхий" | "Хурал" | "Шалгалт";
  content: string;
  author: string;
  date: string;
  hasAttachment: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export interface ScheduleEntry {
  subject: string;
  teacher: string;
  room: string;
  type: "primary" | "accent" | "muted";
}

// Хичээлийн хуваарийн бүтэц: Курс -> Гараг -> Цаг
export interface FullSchedule {
  [year: number]: {
    [day: string]: {
      [time: string]: ScheduleEntry;
    };
  };
}

interface SchoolStore {
  students: Student[];
  teachers: Teacher[];
  announcements: Announcement[];
  gallery: GalleryItem[];
  schedule: FullSchedule;

  // Оюутан
  addStudent: (student: Student) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Багш
  addTeacher: (teacher: Teacher) => void;
  deleteTeacher: (id: string) => void;

  // Мэдэгдэл
  addAnnouncement: (ann: Announcement) => void;
  deleteAnnouncement: (id: string) => void;

  // Цомог
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  // Хуваарь
  updateSchedule: (year: number, day: string, time: string, entry: ScheduleEntry) => void;
  deleteScheduleEntry: (year: number, day: string, time: string) => void; // Шинээр нэмэгдсэн
}

export const useStore = create<SchoolStore>()(
  persist(
    (set) => ({
      students: [],
      teachers: [],
      announcements: [],
      gallery: [],
      schedule: {},

      addStudent: (s) => set((state) => ({ students: [...state.students, s] })),
      updateStudent: (id, data) => set((state) => ({
        students: state.students.map(s => s.id === id ? { ...s, ...data } : s)
      })),
      deleteStudent: (id) => set((state) => ({ students: state.students.filter(s => s.id !== id) })),

      addTeacher: (t) => set((state) => ({ teachers: [...state.teachers, t] })),
      deleteTeacher: (id) => set((state) => ({ teachers: state.teachers.filter(t => t.id !== id) })),

      addAnnouncement: (a) => set((state) => ({ announcements: [a, ...state.announcements] })),
      deleteAnnouncement: (id) => set((state) => ({ announcements: state.announcements.filter(a => a.id !== id) })),

      addGalleryItem: (item) => set((state) => ({ gallery: [item, ...state.gallery] })),
      deleteGalleryItem: (id) => set((state) => ({ gallery: state.gallery.filter(g => g.id !== id) })),

      // Хуваарь шинэчлэх эсвэл нэмэх
      updateSchedule: (year, day, time, entry) => set((state) => ({
        schedule: {
          ...state.schedule,
          [year]: {
            ...state.schedule[year],
            [day]: {
              ...(state.schedule[year]?.[day] || {}),
              [time]: entry
            }
          }
        }
      })),

      // Хуваарь устгах функц (БҮРЭН ЗАССАН)
      deleteScheduleEntry: (year, day, time) => set((state) => {
        const newSchedule = { ...state.schedule };
        if (newSchedule[year] && newSchedule[year][day]) {
          // Тухайн цаг дээрх хичээлийг устгах
          const updatedDay = { ...newSchedule[year][day] };
          delete updatedDay[time];

          newSchedule[year] = {
            ...newSchedule[year],
            [day]: updatedDay
          };
        }
        return { schedule: newSchedule };
      }),
    }),
    { name: 'school-data-storage' }
  )
);