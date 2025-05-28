//En este archivo dentro de la carpeta routs
//vamos a colocar, que metodos tiene la ruta "/api/products"


import express from "express";
import productsController from "../controllers/productsController.js";
import multer from "multer"; // Importamos multer
import path from "path";

// Configuración de multer para manejar la carga de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombramos la imagen con la fecha actual
  }
});

const upload = multer({ storage: storage });  // Configuramos multer

const router = express.Router();

// Rutas de productos con manejo de imágenes
router.route("/")
  .get(productsController.getProducts)
  .post(upload.single('image'), productsController.insertProducts);  // Usamos el middleware upload.single('image') para manejar la carga de una sola imagen

router.route("/:id")
  .put(upload.single('image'), productsController.updateProduct)  // También en la ruta PUT para permitir la actualización de imágenes
  .delete(productsController.deleteProduct);

export default router;
