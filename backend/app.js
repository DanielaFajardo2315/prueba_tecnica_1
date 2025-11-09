import express from "express";
import dotenv from "dotenv";
import { conectMongo } from "./src/config/db.js";
import { employeeRouter } from "./src/routes/employees.routes.js";
import { departmentRouter } from "./src/routes/departments.routes.js";
import cors from "cors";
import path from "path";

// Configuración de dependencias
const app = express();
dotenv.config();

const port = process.env.PORT;
conectMongo();

app.get("/", (req, res) => {
    res.send("El servidor funciona")
});

app.use(cors());
app.use(express.json());
app.use("/empleados", employeeRouter);
app.use("/departamentos", departmentRouter);

app.listen(port, () => {
    console.log(`El servidor está corriendo en http://localhost:${port}`);
});