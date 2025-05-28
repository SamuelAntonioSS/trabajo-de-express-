/*
  CAmpos:
  name
  description
  price
  stock
*/

import { Schema, model } from "mongoose";

// Esquema de producto con imagen
const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  image: {  // Nuevo campo para la imagen
    type: String,  // Guardaremos la URL de la imagen
    required: false,
  }
}, {
  timestamps: true,
  strict: false
});

export default model("productsModel", productsSchema);
