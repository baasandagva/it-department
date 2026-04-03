import { Router, type IRouter } from "express";
import healthRouter from "./health";
// Энд бусад router-үүдээ импорт хийнэ (Жишээ нь):
// import studentRouter from "./students";
// import teacherRouter from "./teachers";

const router: IRouter = Router();

router.use(healthRouter);

// --- ДАТА ХАДГАЛАХ ХЭСГИЙГ ЭНД НЭМЛЭЭ ---

// Түр зуур туршиж үзэхэд зориулж шууд энд нь бичиж болно:
let students = [
    { id: 1, name: "Туршилтын Оюун", major: "IT" }
];

router.get("/students", (req, res) => {
    res.json(students);
});

router.post("/students", (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Багш болон хуваарийн замуудыг бас ижилхэн нэмнэ:
router.get("/teachers", (req, res) => res.json([]));
router.get("/schedule", (req, res) => res.json([]));

export default router;