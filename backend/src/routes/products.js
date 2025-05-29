import express from "express";
import productsController from "../controllers/productsController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // Guarda temporalmente la imagen

const router = express.Router();

router.route("/")
  .get(productsController.getProducts)
  .post(upload.single("image"), productsController.insertProducts);

router.route("/:id")
  .put(upload.single("image"), productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;
