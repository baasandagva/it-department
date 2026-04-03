import { Router, type IRouter } from "express";
import healthRouter from "./health";
import fs from "fs";
import path from "path";

const router: IRouter = Router();
router.use(healthRouter);

const DB_FILE = path.join(process.cwd(), "data.json");

// Өгөгдөл хадгалах файлын бүтэц унших эсвэл үүсгэх
let db = {
    students: [] as any[],
    teachers: [] as any[],
    schedules: {} as any,
    announcements: [] as any[],
    gallery: [] as any[]
};

if (fs.existsSync(DB_FILE)) {
    try {
        db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    } catch (e) {
        console.error("DB file read error:", e);
    }
}

function saveDB() {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
}

// Оюутан (Students)
router.get("/students", (req, res) => res.json(db.students));
router.post("/students", (req, res) => {
    // Generate an ID if needed or just save
    const newStudent = { id: Date.now().toString(), ...req.body };
    db.students.push(newStudent);
    saveDB();
    res.status(201).json(newStudent);
});
router.delete("/students/:id", (req, res) => {
    db.students = db.students.filter(s => s.id !== req.params.id);
    saveDB();
    res.status(200).json({ success: true });
});

// Хуваарь (Schedule) - Обьект байдлаар хадгалах
router.get("/schedule", (req, res) => res.json(db.schedules));
router.post("/schedule", (req, res) => {
    const { year, day, time, ...entry } = req.body;
    
    if (!db.schedules[year]) db.schedules[year] = {};
    if (!db.schedules[year][day]) db.schedules[year][day] = {};
    
    db.schedules[year][day][time] = entry;
    saveDB();
    
    res.status(201).json(entry);
});
router.delete("/schedule/:year/:day/:time", (req, res) => {
    const { year, day, time } = req.params;
    if (db.schedules[year]?.[day]?.[time]) {
        delete db.schedules[year][day][time];
        saveDB();
    }
    res.status(200).json({ success: true });
});

// Багш (Teachers)
router.get("/teachers", (req, res) => res.json(db.teachers));
router.post("/teachers", (req, res) => {
    const newTeacher = { id: Date.now().toString(), ...req.body };
    db.teachers.push(newTeacher);
    saveDB();
    res.status(201).json(newTeacher);
});
router.delete("/teachers/:id", (req, res) => {
    db.teachers = db.teachers.filter(t => t.id !== req.params.id);
    saveDB();
    res.status(200).json({ success: true });
});

// Мэдэгдэл (Announcements)
router.get("/announcements", (req, res) => res.json(db.announcements));
router.post("/announcements", (req, res) => {
    const newAnn = { id: Date.now().toString(), ...req.body };
    db.announcements.push(newAnn);
    saveDB();
    res.status(201).json(newAnn);
});
router.delete("/announcements/:id", (req, res) => {
    db.announcements = db.announcements.filter(a => a.id !== req.params.id);
    saveDB();
    res.status(200).json({ success: true });
});

// Цомог (Gallery)
router.get("/gallery", (req, res) => res.json(db.gallery));
router.post("/gallery", (req, res) => {
    const newItem = { id: Date.now().toString(), ...req.body };
    db.gallery.push(newItem);
    saveDB();
    res.status(201).json(newItem);
});
router.delete("/gallery/:id", (req, res) => {
    db.gallery = db.gallery.filter(g => g.id !== req.params.id);
    saveDB();
    res.status(200).json({ success: true });
});

export default router;