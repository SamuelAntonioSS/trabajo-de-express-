// Importo todo lo de la libreria express
import express from "express";
import productsRoutes from "./routes/products.js";

// Creo un constante que es igual
// a la libreria que importe y la ejecuta

const app = express();


// Uso middleware para que acepte datos Json
app.use(express.json());

//Definir la ruta
app.use ("/api/products" , productsRoutes);


//Exporto la constante para poder usar el express en otros lados
export default app;

