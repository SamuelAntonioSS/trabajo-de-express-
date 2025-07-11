import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import productsRoutes from "./src/routes/products.js";
import customersRoutes from "./src/routes/customers.js";
import EmployeesRoutes from "./src/routes/Employees.js";
import BranchesRoutes from "./src/routes/Branches.js";
import reviewsRoutes from "./src/routes/reviews.js";
import registerEmployeesRoutes from "./src/routes/registerEmployees.js";
import registerClientsRoutes from "./src/routes/registerClients.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";
import blogRoutes from "./src/routes/blog.js";
import swaggerUI from "swagger-ui-express"
import salesRoutes from "./src/routes/sales.js"

import fs from "fs";
import path from "path";
// import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";

const app = express();

// ✅ Middleware CORS configurado correctamente
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ Middleware para parsear JSON
app.use(express.json());

// ✅ Middleware para parsear cookies
app.use(cookieParser());

//Utilizar el sistema de archivos para leer el json de swagger y ver mi documentación
const swaggerDocument = JSON.parse(fs.readFileSync(
  path.resolve("./CocaColaMern2.json"),
"utf-8")
)

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))


// ✅ Servir imágenes u otros archivos desde /uploads
app.use("/uploads", express.static("uploads"));

// ✅  rutas
app.use("/api/products", productsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employees", EmployeesRoutes);
// app.use("/api/employees", validateAuthToken(["employees"]), EmployeesRoutes);
app.use("/api/branches", BranchesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/registerEmployeess", registerEmployeesRoutes);
app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);

app.use("/api/blog", blogRoutes);

app.use("/api/sales", salesRoutes)



export default app;
