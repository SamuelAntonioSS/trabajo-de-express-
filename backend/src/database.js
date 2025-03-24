//Se importa la libereia mongoose
import mongoose from "mongoose";
import { config } from "./config.js";

//Guardo en una constante 
// la direcciòn de mi base de datos


//Conectar la base de datos
mongoose.connect(config.db.URI)

//----- comprobacion que la base sirve

const conecction = mongoose.connection;

conecction.once("open",() =>{
    console.log("DB is connected");
});

conecction.on("disconneted", () => {
    console.log("DB is desconneted");
});

conecction.on("error", (error) => {
    console.log("Error found" + error);
});