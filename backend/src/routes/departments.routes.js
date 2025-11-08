import express from "express";
import { postDepartment, getAllDepartments, putDepartmentById, deleteDepartmentById } from "../controllers/departments.controller.js";

export const departmentRouter = express.Router();

departmentRouter.post("/", postDepartment);

departmentRouter.get("/", getAllDepartments);

departmentRouter.put("/:id", putDepartmentById);

departmentRouter.delete("/:id", deleteDepartmentById);