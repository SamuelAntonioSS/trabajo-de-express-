import productsModel from "../models/Products.js";
import multer from "multer";
import path from "path";

// Configuración de multer para guardar imágenes en el servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombramos la imagen con la fecha actual
  }
});

const upload = multer({ storage: storage });

// Rutas para el controlador de productos
const productsController = {};

// Obtener todos los productos
productsController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

// Insertar un producto
productsController.insertProducts = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Si se sube una imagen, la guardamos en la carpeta "uploads"
  const newProduct = new productsModel({
    name,
    description,
    price,
    stock,
    image: imageUrl,  // Guardamos la URL de la imagen
  });
  
  await newProduct.save();
  res.json({ message: "Product saved" });
};

// Eliminar un producto
productsController.deleteProduct = async (req, res) => {
  await productsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

// Actualizar un producto
productsController.updateProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';  // Si se sube una nueva imagen, actualizamos la URL
  const updatedProduct = await productsModel.findByIdAndUpdate(req.params.id, {
    name,
    description,
    price,
    stock,
    image: imageUrl,
  }, { new: true });
  
  res.json({ message: "Product updated", product: updatedProduct });
};

export default productsController;
