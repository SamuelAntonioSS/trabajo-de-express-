// Importo todo lo de la libreria express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import customersRoutes from "./src/routes/customers.js";
import EmployeesRoutes from "./src/routes/Employees.js";
import BranchesRoutes from "./src/routes/Branches.js";
import reviewsRoutes from "./src/routes/reviews.js";

import cookieParser from "cookie-parser";
import registerEmployeesRoutes from "./src/routes/registerEmployees.js"
import registerClientsRoutes from "./src/routes/registerClients.js";
//LOGIN
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js"
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js"
/////
import blogRoutes from "./src/routes/blog.js"
import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";
// Creo un constante que es igual
// a la libreria que importe y la ejecuta

const app = express();
//d

// Uso middleware para que acepte datos Json
app.use(express.json());

//Que acepte cookies
app.use(cookieParser())

//Definir la ruta
app.use ("/api/products" , productsRoutes);

app.use ("/api/customers", customersRoutes);

app.use ("/api/employees", validateAuthToken(["employees"]), EmployeesRoutes);

app.use ("/api/branches", BranchesRoutes);

app.use ("/api/reviews", reviewsRoutes);

app.use("/api/registerEmployeess", registerEmployeesRoutes);

app.use("/api/registerClients",registerClientsRoutes );

// L O G I N
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);

app.use("/api/passwordRecovery", passwordRecoveryRoutes);

app.use("/api/blog", blogRoutes);


//Exporto la constante para poder usar el express en otros lados
export default app;

