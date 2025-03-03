//Se importa la libereia mongoose
import mongoose from "mongoose";

//Guardo en una constante 
// la direcciòn de mi base de datos
const URI = "mongodb://localhost:27017/cocacolaDB"

//Conectar la base de datos
mongoose.connect(URI)

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