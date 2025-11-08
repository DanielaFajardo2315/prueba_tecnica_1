import express from "express";
import { postEmployee, getAllEmployees, putEmployee, deleteEmployeeById } from "../controllers/employees.controller.js";

export const employeeRouter = express.Router();

employeeRouter.post("/", postEmployee);

employeeRouter.get("/", getAllEmployees);

employeeRouter.put("/:id", putEmployee);

employeeRouter.delete("/:id", deleteEmployeeById);