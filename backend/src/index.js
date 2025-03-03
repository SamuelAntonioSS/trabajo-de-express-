// Importar el archivo app.js
import app from "./app.js";
import "./database.js";

// creo una funciòn que s encarga de ejecutar el servidor
async function main() {
    const port = 4000;
    app.listen(port);
    console.log("Server is running");
}

//Ejecutamos todo
main();