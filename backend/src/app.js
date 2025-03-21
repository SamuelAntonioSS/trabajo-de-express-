// Importo todo lo de la libreria express
import express from "express";
import productsRoutes from "./routes/products.js";
import customersRoutes from "./routes/customers.js";
import EmployeesRoutes from "./routes/Employees.js";
import BranchesRoutes from "./routes/Branches.js";
import reviewsRoutes from "./models/Reviews.js";
// Creo un constante que es igual
// a la libreria que importe y la ejecuta

const app = express();


// Uso middleware para que acepte datos Json
app.use(express.json());

//Definir la ruta
app.use ("/api/products" , productsRoutes);

app.use ("/api/customers", customersRoutes);

app.use ("/api/employees", EmployeesRoutes);

app.ude ("/api/branches", BranchesRoutes);

app.use ("/api/reviews", reviewsRoutes);


//Exporto la constante para poder usar el express en otros lados
export default app;

