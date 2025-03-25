// Importar el archivo app.js
import app from "./app.js";
import { config } from "./src/config.js";
import "./src/database.js";

// creo una funciòn que s encarga de ejecutar el servidor
async function main() {
    app.listen(config.server.port);
    console.log("Server is running" + config.server.port);
}

//Ejecutamos todo
main();