// Importo todo lo de la libreria express
import express from "express";
import productsRoutes from "./routes/products.js";
import customersRoutes from "./routes/customers.js";
import EmployeesRoutes from "./routes/Employees.js";
import BranchesRoutes from "./routes/Branches.js";
import reviewsRoutes from "./routes/reviews.js";

import cookieParser from "cookie-parser";
import registerEmployeesRoutes from "./routes/registerEmployees.js"
//LOGIN
import loginController from "./routes/login.js";
// Creo un constante que es igual
// a la libreria que importe y la ejecuta

const app = express();


// Uso middleware para que acepte datos Json
app.use(express.json());

//Que acepte cookies
app.use(cookieParser())

//Definir la ruta
app.use ("/api/products" , productsRoutes);

app.use ("/api/customers", customersRoutes);

app.use ("/api/employees", EmployeesRoutes);

app.use ("/api/branches", BranchesRoutes);

app.use ("/api/reviews", reviewsRoutes);

app.use("/api/registerEmployeess", registerEmployeesRoutes);

// L O G I N
app.use("/api/login", loginController);


//Exporto la constante para poder usar el express en otros lados
export default app;

