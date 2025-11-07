import express from "express";
import dotenv from "dotenv";
import { conectMongo } from "./src/config/db.js";

// Configuración de dependencias
const app = express();
dotenv.config();

const port = process.env.PORT;
conectMongo();