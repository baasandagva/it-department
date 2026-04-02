import { create } from 'zustand';
import axios from 'axios';

// Render дээрх чиний Backend хаяг
const API_URL = "https://it-department-8v6p.onrender.com/api";

// --- Interfaces ---
export interface Student {
  id: string;
  name: string;
  studentId: string;
  year: 1 | 2 | 3 | 4;
  phone?: string;
  email?: string;
  tuitionStatus: "Төлсөн" | "Төлөөгүй" | "Хэсэгчлэн";
  registeredAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  subject: string;
  registeredAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface ScheduleEntry {
  subject: string;
  teacher: string;
  room: string;
  type: "primary" | "accent" | "muted";
}

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
  schedule: FullSchedule;
  isLoading: boolean;

  fetchInitialData: () => Promise<void>;
  addStudent: (student: Student) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  addTeacher: (teacher: Teacher) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  updateSchedule: (year: number, day: string, time: string, entry: ScheduleEntry) => Promise<void>;
  deleteScheduleEntry: (year: number, day: string, time: string) => Promise<void>;
}

export const useStore = create<SchoolStore>((set, get) => ({
  students: [],
  teachers: [],
  announcements: [],
  schedule: {},
  isLoading: false,

  fetchInitialData: async () => {
    set({ isLoading: true });
    try {
      const [stRes, tcRes, schRes] = await Promise.all([
        axios.get(`${API_URL}/students`),
        axios.get(`${API_URL}/teachers`),
        axios.get(`${API_URL}/schedule`)
      ]);
      set({
        students: stRes.data || [],
        teachers: tcRes.data || [],
        schedule: schRes.data || {},
        isLoading: false
      });
    } catch (error) {
      console.error("Дата татахад алдаа гарлаа:", error);
      set({ isLoading: false });
    }
  },

  addStudent: async (student) => {
    try {
      const res = await axios.post(`${API_URL}/students`, student);
      set((state) => ({ students: [...state.students, res.data] }));
    } catch (error) {
      console.error("Оюутан нэмэхэд алдаа гарлаа");
    }
  },

  deleteStudent: async (id) => {
    try {
      await axios.delete(`${API_URL}/students/${id}`);
      set((state) => ({ students: state.students.filter(s => s.id !== id) }));
    } catch (error) {
      console.error("Устгахад алдаа гарлаа");
    }
  },

  addTeacher: async (teacher) => {
    try {
      const res = await axios.post(`${API_URL}/teachers`, teacher);
      set((state) => ({ teachers: [...state.teachers, res.data] }));
    } catch (error) {
      console.error("Багш нэмэхэд алдаа гарлаа");
    }
  },

  deleteTeacher: async (id) => {
    try {
      await axios.delete(`${API_URL}/teachers/${id}`);
      set((state) => ({ teachers: state.teachers.filter(t => t.id !== id) }));
    } catch (error) {
      console.error("Багш устгахад алдаа гарлаа");
    }
  },

  updateSchedule: async (year, day, time, entry) => {
    try {
      await axios.post(`${API_URL}/schedule`, { year, day, time, ...entry });
      set((state) => ({
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
      }));
    } catch (error) {
      console.error("Хуваарь шинэчлэхэд алдаа гарлаа");
    }
  },

  deleteScheduleEntry: async (year, day, time) => {
    try {
      await axios.delete(`${API_URL}/schedule/${year}/${day}/${time}`);
      const currentSchedule = { ...get().schedule };
      if (currentSchedule[year]?.[day]) {
        delete currentSchedule[year][day][time];
        set({ schedule: currentSchedule });
      }
    } catch (error) {
      console.error("Хуваарь устгахад алдаа гарлаа");
    }
  }
}));