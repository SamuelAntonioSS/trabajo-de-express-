import productsModel from "../models/Products.js";
import cloudinary from "cloudinary";
import fs from "fs-extra"; // fs-extra tiene funciones para manejo de archivos mejoradas
import path from "path";
import { config } from "../config.js"; // donde tienes las variables de entorno para Cloudinary

// Configurar Cloudinary
cloudinary.v2.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const productsController = {};

// Obtener todos los productos
productsController.getProducts = async (req, res) => {
  try {
    const products = await productsModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Insertar un producto con subida a Cloudinary
productsController.insertProducts = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    let imageUrl = "";

    if (req.file) {
      // Subir imagen a Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "products", // Carpeta en Cloudinary opcional
      });
      imageUrl = result.secure_url;

      // Eliminar imagen local luego de subirla
      await fs.unlink(req.file.path);
    }

    const newProduct = new productsModel({
      name,
      description,
      price,
      stock,
      image: imageUrl,
    });

    await newProduct.save();

    res.json({ message: "Producto guardado", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar producto", error });
  }
};

// Actualizar producto con imagen en Cloudinary
productsController.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    let imageUrl = "";

    if (req.file) {
      // Subir nueva imagen
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "products",
      });
      imageUrl = result.secure_url;

      // Eliminar local
      await fs.unlink(req.file.path);
    }

    // Si no subió imagen nueva, no modificamos la existente
    const updateData = {
      name,
      description,
      price,
      stock,
    };
    if (imageUrl) updateData.image = imageUrl;

    const updatedProduct = await productsModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: "Producto actualizado", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// Eliminar producto
productsController.deleteProduct = async (req, res) => {
  try {
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};

export default productsController;
